var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
const config = require('./enviormentVariables')
let env  = process.env.ENV
const enviornmentVariables = config[env]

let validateUserCreditCard = async ( body, callBack ) => {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(enviornmentVariables.authorizeNetApiLoginKey);
    merchantAuthenticationType.setTransactionKey(enviornmentVariables.authorizeNetTransactionKey);

    var creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(body.number);
	creditCard.setExpirationDate(body.expiryDate);
	creditCard.setCardCode(body.cvc);
	var paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCard);

	var billTo = new ApiContracts.CustomerAddressType();
	billTo.setFirstName(body.firstName);
	billTo.setLastName(body.lastName);

	var orderType = new ApiContracts.OrderType();
	orderType.setInvoiceNumber('_' + Math.random().toString(36).substr(2, 9));
    
    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
	transactionRequestType.setAmount(enviornmentVariables.creditCardTestPrice);
	transactionRequestType.setOrder(orderType);
	transactionRequestType.setBillTo(billTo);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);
        
    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    //Defaults to sandbox
    // if(process.env.ENV == "prod"){
    //     ctrl.setEnvironment(SDKConstants.endpoint.production);
    // }
    
    ctrl.execute(function(){
        var apiResponse = ctrl.getResponse();
        var response = new ApiContracts.CreateTransactionResponse(apiResponse);
        if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				if(response.getTransactionResponse().getMessages() != null){
					callBack(response)
				}
				else {
					if(response.getTransactionResponse().getErrors() != null){
						response.errorMessage = response.getTransactionResponse().getErrors().getError()[0].getErrorText()
                        response.error = true;
                        callBack(response)
					}
				}
			}
			else {
                response.error = true;
                
				if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
                    response.errorMessage = response.getTransactionResponse().getErrors().getError()[0].getErrorText()
                    callBack(response)
				}
				else {
                   response.errorMessage = response.getMessages().getMessage()[0].getText()
                   callBack(response)
				}
			}
		}
		else {
            response.error = true;
            callBack(response);
		}
    });
}


let  voidTransaction = (transactionId, callBack) => {
	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(enviornmentVariables.authorizeNetApiLoginKey);
    merchantAuthenticationType.setTransactionKey(enviornmentVariables.authorizeNetTransactionKey);

	var transactionRequestType = new ApiContracts.TransactionRequestType();
	transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.VOIDTRANSACTION);
	transactionRequestType.setRefTransId(transactionId);

	var createRequest = new ApiContracts.CreateTransactionRequest();
	createRequest.setMerchantAuthentication(merchantAuthenticationType);
	createRequest.setTransactionRequest(transactionRequestType);

	//pretty print request
	console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    // if(process.env.ENV == "prod"){
    //     ctrl.setEnvironment(SDKConstants.endpoint.production);
    // }
    
    ctrl.execute(function(){
        var apiResponse = ctrl.getResponse();
        var response = new ApiContracts.CreateTransactionResponse(apiResponse);
        if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				if(response.getTransactionResponse().getMessages() != null){
					callBack(response)
				}
				else {
					if(response.getTransactionResponse().getErrors() != null){
						response.errorMessage = response.getTransactionResponse().getErrors().getError()[0].getErrorText()
                        response.error = true;
                        callBack(response)
					}
				}
			}
			else {
                response.error = true;
                
				if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
                    response.errorMessage = response.getTransactionResponse().getErrors().getError()[0].getErrorText()
                    callBack(response)
				}
				else {
                   response.errorMessage = response.getMessages().getMessage()[0].getText()
                   callBack(response)
				}
			}
		}
		else {
            response.error = true;
            callBack(response);
		}
    });
}

let createSubscription = async ( body , callBack ) => {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(enviornmentVariables.authorizeNetApiLoginKey);
    merchantAuthenticationType.setTransactionKey(enviornmentVariables.authorizeNetTransactionKey);
    var interval = new ApiContracts.PaymentScheduleType.Interval();
    interval.setLength(1);
	interval.setUnit('months');
	
	var paymentScheduleType = new ApiContracts.PaymentScheduleType();
	paymentScheduleType.setInterval(interval);
	paymentScheduleType.setStartDate((body.subscriptionStartDate).toISOString().substring(0, 10));
	paymentScheduleType.setTotalOccurrences(9999); //9999 without end date
	paymentScheduleType.setTrialOccurrences(0);

	var creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(body.number);
	creditCard.setExpirationDate(body.expiryDate);
	creditCard.setCardCode(body.cvc);
	
	var payment = new ApiContracts.PaymentType();
	payment.setCreditCard(creditCard);

	var customer = new ApiContracts.CustomerType();
	customer.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
	customer.setId('_' + Math.random().toString(36).substr(2, 5));
	customer.setEmail(body.email);

	var nameAndAddressType = new ApiContracts.NameAndAddressType();
	nameAndAddressType.setFirstName(body.firstName);
	nameAndAddressType.setLastName(body.lastName);
	//nameAndAddressType.setZip('46282'); //for fake transaction
	
	var orderType = new ApiContracts.OrderType();
	orderType.setInvoiceNumber('_' + Math.random().toString(36).substr(2, 9));

	var arbSubscription = new ApiContracts.ARBSubscriptionType();
	arbSubscription.setName("ireadify subscription");
	arbSubscription.setPaymentSchedule(paymentScheduleType);
	arbSubscription.setOrder(orderType);
	arbSubscription.setAmount(enviornmentVariables.subscriptionPrice);
	arbSubscription.setTrialAmount(0);
	arbSubscription.setPayment(payment);
	arbSubscription.setCustomer(customer);
	arbSubscription.setBillTo(nameAndAddressType);
	arbSubscription.setShipTo(nameAndAddressType);

	var createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
	createRequest.setMerchantAuthentication(merchantAuthenticationType);
	createRequest.setSubscription(arbSubscription);
	var ctrl = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());
    // if(process.env.ENV == "prod"){
    //     ctrl.setEnvironment(SDKConstants.endpoint.production);
    // }
	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);
        if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
					callBack(response)
			}
			else {
                response.error = true;
                response.errorMessage = response.getMessages().getMessage()[0].getText()
                callBack(response)
			}
		}
		else {
            response.error = true;
            callBack(response);
		}
    });
}

let  cancelAuthorizeSubscription = (subscriptionId, callBack) => {
	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(enviornmentVariables.authorizeNetApiLoginKey);
    merchantAuthenticationType.setTransactionKey(enviornmentVariables.authorizeNetTransactionKey);

	var cancelRequest = new ApiContracts.ARBCancelSubscriptionRequest();
	cancelRequest.setMerchantAuthentication(merchantAuthenticationType);
	cancelRequest.setSubscriptionId(subscriptionId);

	var ctrl = new ApiControllers.ARBCancelSubscriptionController(cancelRequest.getJSON());
	// if(process.env.ENV == "prod"){
    //     ctrl.setEnvironment(SDKConstants.endpoint.production);
    // }

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.ARBCancelSubscriptionResponse(apiResponse);

		if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
					callBack(response)
			}
			else {
                response.error = true;
                response.errorMessage = response.getMessages().getMessage()[0].getText()
                callBack(response)
			}
		}
		else {
            response.error = true;
            callBack(response);
		}
	});
}

module.exports = {
    validateUserCreditCard,
    voidTransaction,
    createSubscription,
    cancelAuthorizeSubscription
}