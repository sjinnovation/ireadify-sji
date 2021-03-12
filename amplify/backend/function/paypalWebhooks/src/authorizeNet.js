var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
const config = require('./enviormentVariables')
let env  = process.env.ENV
const enviornmentVariables = config[env]

let getTransactionDetails = async ( transactionId, callBack ) => {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(enviornmentVariables.authorizeNetApiLoginKey);
    merchantAuthenticationType.setTransactionKey(enviornmentVariables.authorizeNetTransactionKey);

    var getRequest = new ApiContracts.GetTransactionDetailsRequest();
	getRequest.setMerchantAuthentication(merchantAuthenticationType);
	getRequest.setTransId(transactionId);

	var ctrl = new ApiControllers.GetTransactionDetailsController(getRequest.getJSON());

	if(process.env.ENV == "prod"){
        ctrl.setEnvironment(SDKConstants.endpoint.production);
    }

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.GetTransactionDetailsResponse(apiResponse);

		if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				if(response.getTransaction().getSubscription()){
					callBack(response.getTransaction().getSubscription().getId())
				}
				else{
					response.error = true;
                    callBack(response)
				}
					
			}
			else {
                response.error = true;
                callBack(response)
			}
		}
		else{
			response.error = true;
			callBack(response)
		}
		
	});
}



module.exports = {
    getTransactionDetails,
}