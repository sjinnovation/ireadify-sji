/* Amplify Params - DO NOT EDIT
	API_BOOKSTORE_GRAPHQLAPIENDPOINTOUTPUT
	API_BOOKSTORE_GRAPHQLAPIIDOUTPUT
	API_BOOKSTORE_GRAPHQLAPIKEYOUTPUT
	API_BOOKSTORE_USERSUBSCRIPTIONTABLE_ARN
	API_BOOKSTORE_USERSUBSCRIPTIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

AWS.config.update({ region: process.env.TABLE_REGION });
const axios = require('axios');
var querystring = require('querystring');
const { v4: uuidv4 } = require("uuid");
const config = require('./enviormentVariables')
let env  = process.env.ENV
const enviornmentVariables = config[env]
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { validateUserCreditCard, voidTransaction, createSubscription, cancelAuthorizeSubscription } = require('./authorizeNet')
var moment = require('moment');
const { runInNewContext } = require('vm');

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

app.get('/subscription/:email', function(req, res) {
  // Add your code here
  let queryParams = {
    TableName: tableName,
    IndexName: "userByEmail",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
        ":email": req.params.email
    },
  }
  dynamodb.query(queryParams, async (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    }
     else {
       
      res.statusCode = 200;
      if(data.Items && data.Items[0]){
        res.json({success: 'Record Found!', data: data.Items[0]});
      }
      else {
        res.json({success: 'No data with Email id', data: null});
      }
      
    }
  })  
});

app.get('/subscription/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/subscription', async function(req, res) {
  req.body.id = uuidv4(); 

  let result = await getSubscriptionDetails(req.body.subscriptionId)

  let inputData = {
    ...req.body,
    isActive : true,
    istrailPeriod : true,
    lastPaymentFailed: false,
    subscriptionStartDate : result.start_time,
    nextBillingDate : result.billing_info.next_billing_time,
    type : enviornmentVariables.subscriptionType.paypal,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  let putItemParams = {
    TableName: tableName,
    Item: inputData
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

app.post('/subscription/cancel/:id', async function(req, res) {

 
  await cancelSubscription(req.body.subscriptionId)

  let nextBillingDate = req.body.istrailPeriod ? new Date().toISOString() : req.body.nextBillingDate

  const params = {
    TableName: tableName,
    Key: {
        "id": req.params.id
    },
    UpdateExpression: "set isActive = :isActive, nextBillingDate = :nextBillingDate, istrailPeriod = :istrailPeriod, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
        ":isActive":  false,
        ":nextBillingDate": nextBillingDate,
        ":istrailPeriod": false, 
        ":updatedAt": new Date().toISOString()
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
});

app.post('/subscription/update/:id', async function(req, res) {

  let result = await getSubscriptionDetails(req.body.subscriptionId)

  const params = {
    TableName: tableName,
    Key: {
        "id": req.params.id
    },
    UpdateExpression: "set lastPaymentFailed = :lastPaymentFailed, subscriptionStartDate = :subscriptionStartDate, subscriptionId = :subscriptionId, updatedAt = :updatedAt, isActive = :isActive, nextBillingDate = :nextBillingDate, istrailPeriod = :istrailPeriod",
    ExpressionAttributeValues: {
        ":isActive":  true,
        ":nextBillingDate": result.billing_info.next_billing_time,
        ":istrailPeriod": false,
        ":updatedAt": new Date().toISOString(),
        ":subscriptionStartDate": result.start_time,
        ":subscriptionId": req.body.subscriptionId,
        ":lastPaymentFailed": false,
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

app.post('/subscription/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/subscription', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/subscription/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/subscription', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/subscription/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.post('/authorize/subscribe', async function(req, res) {
  // Add your code here
  validateUserCreditCard(req.body, async function  (transactionResponse)  {
    try{
        if(transactionResponse.error){
            res.json({errors: transactionResponse.errorMessage}, 400);
        }
        else{
          voidTransaction(transactionResponse.transactionResponse.transId, async function  (voidResponse)  {
            try{
                if(voidResponse.error){
                    res.json({errors: voidResponse.errorMessage}, 400);
                }
                else{
                  req.body.subscriptionStartDate = new Date()
                  req.body.subscriptionStartDate = moment(req.body.subscriptionStartDate, "DD-MM-YYYY").add(enviornmentVariables.trailPeroidDays, 'days');
                  nextBillingDate = moment(new Date() , "DD-MM-YYYY").add(enviornmentVariables.trailPeroidDays, 'days');
                  createSubscription(req.body, async function  (subscriptionResponse)  {
                    try{
                        if(subscriptionResponse.error){
                            res.json({errors: subscriptionResponse.errorMessage}, 400);
                        }
                        else{
                      
                          let inputData = {
                            id: uuidv4(),
                            email : req.body.email,
                            subscriptionStartDate :  req.body.subscriptionStartDate.toISOString(),
                            istrailPeriod : req.body.istrailPeriod,
                            subscriptionId: subscriptionResponse.subscriptionId,
                            isActive : true,
                            lastPaymentFailed: false,
                            type : enviornmentVariables.subscriptionType.authorizeNet ,
                            nextBillingDate :  nextBillingDate.toISOString(),
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            firstPaymentDone: false,
                          }

                          let putItemParams = {
                            TableName: tableName,
                            Item: inputData
                          }
                          dynamodb.put(putItemParams, (err, data) => {
                            if(err) {
                              res.statusCode = 500;
                              res.json({error: err, url: req.url, body: req.body});
                            } else{
                              res.json({success: 'post call succeed!', url: req.url, data: data})
                            }
                          });
                        }
                      }
                      catch(error){
                          res.json({errors: error.message}, 422);
                      } 
                    });
                }
              }
              catch(error){
                  res.json({errors: error.message}, 422);
              } 
            });
        }
      }
      catch(error){
          res.json({errors: error.message}, 422);
      } 
    });
});

app.post('/authorize/update/:id', async function(req, res) {
  // Add your code here
  validateUserCreditCard(req.body, async function  (transactionResponse)  {
    try{
        if(transactionResponse.error){
            res.json({errors: transactionResponse.errorMessage}, 400);
        }
        else{
          voidTransaction(transactionResponse.transactionResponse.transId, async function  (voidResponse)  {
            try{
                if(voidResponse.error){
                    res.json({errors: voidResponse.errorMessage}, 400);
                }
                else{
                  
                  req.body.subscriptionStartDate = new Date()
                  nextBillingDate = moment(req.body.subscriptionStartDate, "DD-MM-YYYY").add(1, 'months');
                  createSubscription(req.body, async function  (subscriptionResponse)  {
                    try{
                        if(subscriptionResponse.error){
                            res.json({errors: subscriptionResponse.errorMessage}, 400);
                        }
                        else{
                      
                          const params = {
                            TableName: tableName,
                            Key: {
                                "id": req.params.id
                            },
                            UpdateExpression: "set firstPaymentDone = :firstPaymentDone, lastPaymentFailed = :lastPaymentFailed, subscriptionStartDate = :subscriptionStartDate, subscriptionId = :subscriptionId, updatedAt = :updatedAt, isActive = :isActive, nextBillingDate = :nextBillingDate, istrailPeriod = :istrailPeriod",
                            ExpressionAttributeValues: {
                                ":isActive":  true,
                                ":nextBillingDate": nextBillingDate.toISOString(),
                                ":istrailPeriod": false,
                                ":updatedAt": new Date().toISOString(),
                                ":subscriptionStartDate": req.body.subscriptionStartDate.toISOString(),
                                ":subscriptionId": subscriptionResponse.subscriptionId,
                                ":lastPaymentFailed": false,
                                ":firstPaymentDone": false,
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
                      }
                      catch(error){
                          res.json({errors: error.message}, 422);
                      } 
                    });
                }
              }
              catch(error){
                  res.json({errors: error.message}, 422);
              } 
            });
        }
      }
      catch(error){
          res.json({errors: error.message}, 422);
      } 
    });
});

app.post('/authorize/cancel/:id', async function(req, res) {

  cancelAuthorizeSubscription(req.body.subscriptionId, async function  (subscriptionResponse)  {
    try{
        if(subscriptionResponse.error){
            res.json({errors: subscriptionResponse.errorMessage}, 400);
        }
        else{
            let nextBillingDate = req.body.istrailPeriod || req.body.firstPaymentDone === false ? new Date().toISOString() : req.body.nextBillingDate

            const params = {
              TableName: tableName,
              Key: {
                  "id": req.params.id
              },
              UpdateExpression: "set firstPaymentDone = :firstPaymentDone, isActive = :isActive, nextBillingDate = :nextBillingDate, istrailPeriod = :istrailPeriod, updatedAt = :updatedAt",
              ExpressionAttributeValues: {
                  ":firstPaymentDone": false,
                  ":isActive":  false,
                  ":nextBillingDate": nextBillingDate,
                  ":istrailPeriod": false, 
                  ":updatedAt": new Date().toISOString()
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
        }
        catch(error){
            res.json({errors: error.message}, 422);
        } 
      });  
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
