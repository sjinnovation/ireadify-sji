/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_BOOKSTORE_GRAPHQLAPIENDPOINTOUTPUT
	API_BOOKSTORE_GRAPHQLAPIIDOUTPUT
	API_BOOKSTORE_GRAPHQLAPIKEYOUTPUT
	API_BOOKSTORE_USERSUBSCRIPTIONTABLE_ARN
	API_BOOKSTORE_USERSUBSCRIPTIONTABLE_NAME
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

AWS.config.update({ region: process.env.TABLE_REGION });
const axios = require('axios');
var querystring = require('querystring');
const { v4: uuidv4 } = require("uuid");
const { getTransactionDetails } = require('./authorizeNet')
var moment = require('moment');
const config = require('./enviormentVariables')
let env  = process.env.ENV
const enviornmentVariables = config[env]

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = enviornmentVariables.subscriptionTable;
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}


// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/webhook/paymentSuccess', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});



app.get('/webhook/paymentSuccess/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/


app.post('/webhook/paymentSuccess/', async function(req, res) {
  // Add your code here
 if(req.body.resource && req.body.resource.billing_agreement_id) {
    let subscriptionId = req.body.resource.billing_agreement_id;
    let queryParams = {
      TableName: tableName,
      IndexName: "userBySubscriptionId",
      KeyConditionExpression: "subscriptionId = :subscriptionId",
      ExpressionAttributeValues: {
          ":subscriptionId": subscriptionId
      },
    }

    console.log(queryParams);
  
    dynamodb.query(queryParams, async (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({error: 'Could not load items: ' + err});
      } else {
        if(data.Items && data.Items[0]){
           let subscription = data.Items[0];
           let result = await getSubscriptionDetails(req.body.resource.billing_agreement_id)
  
           const params = {
              TableName: tableName,
              Key: {
                  "id": subscription.id
              },
              UpdateExpression: "set istrailPeriod = :istrailPeriod, lastSummary = :lastSummary, updatedAt = :updatedAt, nextBillingDate = :nextBillingDate",
              ExpressionAttributeValues: {
                  ":istrailPeriod": false,
                  ":lastSummary" : req.body.summary,
                  ":updatedAt" : new Date().toISOString(),
                  ":nextBillingDate" : result.billing_info.next_billing_time
              }
          };
          dynamodb.update(params, function(err, data) {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                res.statusCode = 500;
                res.json({error: 'Unable to update. Error:: ' + err});
            } else {
              res.statusCode = 201;
              res.json({message : "subscription updated"})
            }
         });
        
        }
        else {
          res.statusCode = 200;
          res.json({message : "subscription not found in database"})
        }
        
      }
    });
  }
  else {
    res.statusCode = 200;
    res.json({message : "Not a subscription type"})
  }
});

let getSubscriptionDetails = async (subscriptionId) => {
  let token = await getToken(); 
  let urlSubscriptionDetails = `${enviornmentVariables.paypalUrl}/v1/billing/subscriptions/${subscriptionId}`;
  let result = await axios.get(urlSubscriptionDetails , {
      headers: { Authorization: "Bearer " + token}
  })
  console.log(JSON.stringify(result.data))
  return result.data;
}

let cancelSubscription = async (subscriptionId) => {
  let token = await getToken(); 
  let urlSubscriptionDetails = `${enviornmentVariables.paypalUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`;
  let result = await axios.post(urlSubscriptionDetails , {
    reason: "Customer-requested cancel"
  } ,{
      headers: { Authorization: "Bearer " + token}
  })
  console.log(JSON.stringify(result.data))
  return result.data;
}

let getToken = async () => {
let tokenUrl = `${enviornmentVariables.paypalUrl}/v1/oauth2/token`;
let token = await axios.post(tokenUrl , querystring.stringify({
  grant_type: 'client_credentials'
}),{
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: enviornmentVariables.paypalClientId,
      password: enviornmentVariables.paypalSecretId
    }
  })
return token.data.access_token;
}


app.post('/webhook/paymentFailed', async function(req, res) { 
  // Add your code here
  if(req.body.resource && req.body.resource.id) {
    let subscriptionId = req.body.resource.id;
    let queryParams = {
      TableName: tableName,
      IndexName: "userBySubscriptionId",
      KeyConditionExpression: "subscriptionId = :subscriptionId",
      ExpressionAttributeValues: {
          ":subscriptionId": subscriptionId
      },
    }
  
    dynamodb.query(queryParams, async (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({error: 'Could not load items: ' + err});
      } else {
        if(data.Items && data.Items[0]){
           let subscription = data.Items[0];
            await cancelSubscription(req.body.resource.id)
           const params = {
              TableName: tableName,
              Key: {
                  "id": subscription.id
              },
              UpdateExpression: "set istrailPeriod = :istrailPeriod, nextBillingDate = :nextBillingDate, lastPaymentFailed = :lastPaymentFailed, isActive = :isActive, lastSummary = :lastSummary, updatedAt = :updatedAt",
              ExpressionAttributeValues: {
                  ":isActive": false,
                  ":lastSummary" : req.body.summary,
                  ":istrailPeriod": false, 
                  ":updatedAt" : new Date().toISOString(),
                  ":nextBillingDate": new Date().toISOString(),
                  ":lastPaymentFailed": true
              }
          };
          dynamodb.update(params, function(err, data) {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                res.statusCode = 500;
                res.json({error: 'Unable to update. Error:: ' + err});
            } else {
              res.statusCode = 201;
              res.json({message : "subscription updated"})
            }
         });
        
        }
        else {
          res.statusCode = 200;
          res.json({message : "subscription not found in database"})
        }
        
      }
    });
  }
  else {
    res.statusCode = 200;
    res.json({message : "Not a subscription type"})
  }
});

/****************************
* Example put method *
****************************/

app.put('/webhook/paymentSuccess', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/webhook/paymentSuccess/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/webhook/paymentSuccess', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/webhook/paymentSuccess/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

//Authorized 
app.post('/webhook/authorize/paymentSuccess', async function(req, res) {
  // Add your code here
  if(req.body.payload && req.body.payload.id) {
  try {
    getTransactionDetails(req.body.payload.id , async function  (response)  {
        try{
            if(response.error){
                res.json({errors: response.errorMessage}, 400);
            }
            else{
              let subscriptionId = response;
              let queryParams = {
                TableName: tableName,
                IndexName: "userBySubscriptionId",
                KeyConditionExpression: "subscriptionId = :subscriptionId",
                ExpressionAttributeValues: {
                    ":subscriptionId": subscriptionId.toString()
                },
              }
            
              dynamodb.query(queryParams, async (err, data) => {
                if (err) {
                  res.statusCode = 500;
                  res.json({error: 'Could not load items: ' + err});
                } else {
                  if(data.Items && data.Items[0]){
                     let subscription = data.Items[0];
                     let nextBillingDate = moment(subscription.nextBillingDate, "DD-MM-YYYY").add(1, 'months')
            
                     const params = {
                        TableName: tableName,
                        Key: {
                            "id": subscription.id
                        },
                        UpdateExpression: "set firstPaymentDone = :firstPaymentDone, istrailPeriod = :istrailPeriod, updatedAt = :updatedAt, nextBillingDate = :nextBillingDate",
                        ExpressionAttributeValues: {
                            ":firstPaymentDone": true,
                            ":istrailPeriod": false,
                            ":updatedAt" : new Date().toISOString(),
                            ":nextBillingDate" : nextBillingDate.toISOString()
                        }
                    };
                    dynamodb.update(params, function(err, data) {
                      if (err) {
                          console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                          res.statusCode = 500;
                          res.json({error: 'Unable to update. Error:: ' + err});
                      } else {
                        res.statusCode = 201;
                        res.json({message : "subscription updated"})
                      }
                   });
                  
                  }
                  else {
                    res.statusCode = 200;
                    res.json({message : "subscription not found in database"})
                  }
                  
                }
              });
               
            }
        }
        catch(error){
           res.json({errors: error.message}, 422);
        } 
    });
        
    }    
    catch(error){
       res.json({errors: error.message}, 422);
    }  
  }
  else {
    res.statusCode = 200;
    res.json({message : "Not a subscription type"})
  } 
});

app.post('/webhook/authorize/paymentFailed', async function(req, res) { 
  // Add your code here
  console.log("hello")
  console.log(req.body)
  if(req.body.payload && req.body.payload.id) {
    let subscriptionId = req.body.payload.id;
    let queryParams = {
      TableName: tableName,
      IndexName: "userBySubscriptionId",
      KeyConditionExpression: "subscriptionId = :subscriptionId",
      ExpressionAttributeValues: {
          ":subscriptionId": subscriptionId.toString()
      },
    }
  
    dynamodb.query(queryParams, async (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({error: 'Could not load items: ' + err});
      } else {
        if(data.Items && data.Items[0]){
           let subscription = data.Items[0];
           const params = {
              TableName: tableName,
              Key: {
                  "id": subscription.id
              },
              UpdateExpression: "set firstPaymentDone = :firstPaymentDone, istrailPeriod = :istrailPeriod, nextBillingDate = :nextBillingDate, lastPaymentFailed = :lastPaymentFailed, isActive = :isActive, updatedAt = :updatedAt",
              ExpressionAttributeValues: {
                  ":firstPaymentDone": false,
                  ":isActive": false,
                  ":istrailPeriod": false, 
                  ":updatedAt" : new Date().toISOString(),
                  ":nextBillingDate": new Date().toISOString(),
                  ":lastPaymentFailed": true
              }
          };
          dynamodb.update(params, function(err, data) {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                res.statusCode = 500;
                res.json({error: 'Unable to update. Error:: ' + err});
            } else {
              res.statusCode = 201;
              res.json({message : "subscription updated"})
            }
         });
        
        }
        else {
          res.statusCode = 200;
          res.json({message : "subscription not found in database"})
        }
        
      }
    });
  }
  else {
    res.statusCode = 200;
    res.json({message : "Not a subscription type"})
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
