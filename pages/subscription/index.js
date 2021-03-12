import React, { useEffect, useState, useContext, useRef} from 'react'
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { useRouter } from 'next/router'
import { Auth, API } from 'aws-amplify';
import { AuthContext } from '../../context/auth';
import { userRole} from '../../config/bootstarp'
import { PayPalButton } from "react-paypal-button-v2";
import config from '../../config/secret'
import Loader from '../../components/Loader';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
	formatCreditCardNumber,
	formatCVC,
	formatExpirationDate,
  } from "../../components/authentication/utils";

const index = () => {
    const [ loading , setLoading] = useState(true);
    const [ userCheckLoading , setUserCheckLoading] = useState(true);
    const { register, handleSubmit, watch, errors, clearErrors } = useForm();
    watch("expiry")
    const [ subscriptionDetails, setSubscriptionDetails] = useState("")
    const [paymentInProgress, setPaymentInProgress] = useState(false)
    const [ isSubscribedFirstTime, setSubscribedFirstTime] = useState(false)
    const [isPaymentButtonLoading, setPaymentButtonLoading] = useState(false)
    const router = useRouter()
    const { setUserDetails , changeLoginFormStatus, } = useContext(AuthContext)
    const [showCreditCardForm, setCreditCardForm] = useState(false)
	const [ number , setCCNumber] = useState("")
	const [ name , setCCName] = useState("")
	const [ expiry , setCCExpiry] = useState("")
	const [ cvc , setCCCvc] = useState("")
	const [ focused , setCCFocused] = useState("")

    let handleInputFocus = ({ target }) => {
		setCCFocused(target.name)
	
	  };
	
	let  handleInputChange = ({ target }) => {
		if (target.name === "number") {
		  target.value = formatCreditCardNumber(target.value);
		  setCCNumber(target.value)
		} else if (target.name === "expiry") {
		  target.value = formatExpirationDate(target.value);
		  setCCExpiry(target.value)
          if(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(target.value)){
            clearErrors("expiry");
          }
         
		} else if (target.name === "cvc") {
		  target.value = formatCVC(target.value);
		  setCCCvc(target.value)
         
		}
		else if (target.name === "name") {
			setCCName(target.value)
		}
	
		// this.setState({ [target.name]: target.value });
	  };
	
	  let handleCCFROMSubmit = async (data) => {
		  try {
			
			setPaymentButtonLoading(true)
            if(isSubscribedFirstTime) {
                let inputData = {
                    body : {
                        number : data.number.replaceAll(' ',''),
                        expiryDate: data.expiry.replace('/', ''),
                        cvc :  data.cvc,
                        firstName: Auth.user.attributes["custom:first_name"],
                        lastName: Auth.user.attributes["custom:last_name"],
                        istrailPeriod: true,
                        email : Auth.user.attributes.email
                    }
                }
                await API.post('subscription', '/authorize/subscribe', inputData);
                setPaymentButtonLoading(false)
                await router.push('/library')
            }
            else {
                let inputData = {
                    body : {
                        number : data.number.replaceAll(' ',''),
                        expiryDate: data.expiry.replace('/', ''),
                        cvc :  data.cvc,
                        firstName: Auth.user.attributes["custom:first_name"],
                        lastName: Auth.user.attributes["custom:last_name"],
                        istrailPeriod: false,
                        email : Auth.user.attributes.email
                    }
                    
                }
              
                await API.post('subscription', '/authorize/update/'+ subscriptionDetails.id, inputData);
                await router.push('/library')
            }
			
		  } catch (error) {
			  setPaymentButtonLoading(false)
              console.log(error)
			  alert(error.response.data.errors)
		  }
		  
	  };


    useEffect(() => {
        const checkUser = async () => {
            try {
              const user = await Auth.currentAuthenticatedUser()
              setUserDetails(user)
             
                let groups =  user.signInUserSession.accessToken.payload["cognito:groups"];
                if(groups && groups.includes(userRole.admin)){
                    router.push('/admin/author')
                }
                else{
                    setUserCheckLoading(false)
                    fetchUserSubscription()
                    
                }
                
            } catch (error) {
                await router.push('/' + '?redirect=profile' )
                changeLoginFormStatus()
            }
        }
        checkUser()
       
    }, [])

    let fetchUserSubscription = async()=> {
        let  subscription  = await API.get('subscription', '/subscription/'+ Auth.user.attributes.email);
        if(subscription.data !== null && (subscription.data.isActive  ||  subscription.data.nextBillingDate > new Date())){
           await router.push('/profile')
        }
        if(subscription.data === null){
            setSubscribedFirstTime(true)
        }
        else {
            setSubscribedFirstTime(false)
        }
        setSubscriptionDetails(subscription.data);
        setLoading(false)
    }

    let subscribeUser = async (data) => {
        setPaymentInProgress(true);
        if(isSubscribedFirstTime) {
            let inputData = {
                body : {
                    email : Auth.user.attributes.email,
                    subscriptionId : data.subscriptionID,
                }
                
            }
          
            await API.post('subscription', '/subscription', inputData);
            await router.push('/library')
        }
        else {
            let inputData = {
                body : {
                    subscriptionId : data.subscriptionID,
                }
                
            }
            await API.post('subscription', '/subscription/update/'+ subscriptionDetails.id, inputData);
            await router.push('/library')
        }
		
	}

    return (
        userCheckLoading ? <Loader /> :
          loading ? null : 
            <main className="">
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block content-center align-bottom items-center justify-center bg-gray-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                            <div className="flex flex-col items-center">
                                <div className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">
                                    <div className="flex flex-row justify-center items-center p-2.5 static w-72 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0 mx-8">
                                       {
                                           isSubscribedFirstTime ?
                                           <h2 className="static w-72 h-11 left-16 bottom-2.5 font-sans not-italic leading-10 text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Get 14 Days Free</h2> :
                                           subscriptionDetails.lastPaymentFailed ?  
                                           <h2 className="static w-96 h-20 left-16 bottom-2.5 font-sans not-italic leading-10 text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-xs">Your last subscription transaction failed please subscribe again</h2> :
                                           <h2 className="static w-72 h-11 left-16 bottom-2.5 font-sans not-italic leading-10 text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Subscribe Again</h2>
                                       } 
                                    </div>
                                    {
                                        isSubscribedFirstTime ?
                                            <h4 className="flex static font-sans text-gray-500 font-semibold text-center text-small4" >Your 14 Days Free Trial starts now then only $8.99/Month. Cancel at anytime</h4> 
                                        :
                                            <h4 className="flex static font-sans text-gray-500 font-semibold text-center text-small4" >Only $8.99/Month. Cancel at anytime</h4>
                                    }        
                                    <div className="mt-5">
                                        {
                                           paymentInProgress ? <p>You will be redirected to the new address in few seconds.</p> :
                                           <div>
                                               	<div className="w-40 m-auto"> 
                                                    <PayPalButton
                                                        options={{vault: true}}
                                                        createSubscription={(data, actions) => {
                                                            return actions.subscription.create({
                                                                plan_id: isSubscribedFirstTime ? config.paypalPlanIdWithTrial 
                                                                : config.paypalPlanIdWithoutTrial
                                                            });
                                                        }}
                                                        onApprove={(data, actions) => {
                                                        // Capture the funds from the transaction
                                                            subscribeUser(data)
                                                        }}
                                                        options={{
                                                            clientId: config.paypalClientId,
                                                            vault: true,
                                                            intent: 'subscription'
                                                        }}
                                                        style={{
                                                            shape: 'rect',
                                                            color: 'blue',
                                                            layout: 'horizontal',
                                                            label: 'subscribe'
                                                        }}
                                                    /> 
                                                </div>
                                                <div className="w-40 m-auto"> 
                                                    <button onClick={()=> setCreditCardForm(!showCreditCardForm)} className="w-full flex items-center justify-center border-2 border-gray-400 text-base font-medium rounded text-white bg-purple-600  hover:bg-purple-900  ">
                                                        Card
                                                    </button>
                                                </div>	
                                                {
                                                    showCreditCardForm ? 
                                                    <div  className="mt-5" id="PaymentForm">
                                                    <Card
                                                            number={number}
                                                            name={name}
                                                            expiry={expiry}
                                                            cvc={cvc}
                                                            focused={focused}
                                                        />


                                                        <form onSubmit={handleSubmit(handleCCFROMSubmit)}  className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">
                                                        <h4 className="flex static font-sans text-gray-500 font-semibold text-center text-small1" >Credit Card</h4>

                                                            <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                                                                <input  ref={register({ required: true , minLength: 15, maxLength: 20 })} onChange={handleInputChange} onFocus={handleInputFocus} name="number"  placeholder="Card number" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
                                                                {_.get("number.type", errors) === "required" && (	
                                                                    <p className="text-red-500 text-xs italic">This field is required</p>
                                                                )}
                                                                {_.get("number.type", errors) === "minLength" && (
                                                                    <p className="text-red-500 text-xs italic">Card Number must be greater than 12 and less than 17.</p>
                                                                )}
                                                                {_.get("number.type", errors) === "maxLength" && (
                                                                    <p className="text-red-500 text-xs italic">Card Number must be greater than 12 and less than 17.</p>
                                                                )}
                                                            </div>
                                                            
                                                            <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                                                                <input ref={register({ required: true, pattern: /^[a-zA-Z\-]+$/})} onChange={handleInputChange} onFocus={handleInputFocus} name="name"  placeholder="Name" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
                                                                {_.get("name.type", errors) === "required" && (
                                                                    <p className="text-red-500 text-xs italic">This field is required</p>
                                                                )}
                                                                {_.get("name.type", errors) === "pattern" && (
                                                                    <p className="text-red-500 text-xs italic">Numeric and special characters not allowed. </p>
                                                                )}
                                                            </div>
                                                            
                                                            <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                                                                <input ref={register({ required: true , pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/ })} onChange={handleInputChange} onFocus={handleInputFocus} name="expiry" placeholder="Card expiry(MM/YY)" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
                                                                {_.get("expiry.type", errors) === "required" && (
                                                                    <p className="text-red-500 text-xs italic">This field is required</p>
                                                                )}
                                                                {_.get("expiry.type", errors) === "pattern" && (
                                                                    <p className="text-red-500 text-xs italic">Expiry format is incorrect</p>
                                                                )}
                                                            </div>
                                                           
                                                            <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                                                                <input ref={register({ required: true , pattern: /\d{3,4}/  })} onChange={handleInputChange} onFocus={handleInputFocus} name="cvc" placeholder="Card cvc" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
                                                                {_.get("cvc.type", errors) === "required" && (
                                                                    <p className="text-red-500 text-xs italic">This field is required</p>
                                                                )}
                                                                {_.get("cvc.type", errors) === "pattern" && (
                                                                    <p className="text-red-500 text-xs italic">CVC Number must be greater than 2 and less than 5.</p>
                                                                )}
                                                            </div>
                                                            
                                                            {
                                                                isPaymentButtonLoading ?
                                                                <button disabled className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r bg-gray-300 text-small4 font-semibold text-white  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
                                                                    Subscribe
                                                                </button>
                                                                :
                                                                <button className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
                                                                    Subscribe
                                                                </button>
                                                            }
                                                            
                                                        </form>
                                                    </div>
                                                    : null
                                                }
											
									        </div>  
                                        }   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>   
    )
}

export default index
