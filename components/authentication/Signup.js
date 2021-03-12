import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/auth';
import { Auth, API } from 'aws-amplify';
import _ from "lodash/fp";
import { useRouter } from 'next/router'
import { PayPalButton } from "react-paypal-button-v2";
import config from '../../config/secret'
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
	formatCreditCardNumber,
	formatCVC,
	formatExpirationDate,
} from "./utils";
import ConfrimCodeForm from './ConfrimCodeForm';
const Signup = () => {

	const { changeSignUpFormStatus, changeLoginFormStatus, setUserDetails } = useContext(AuthContext)
	const { register, handleSubmit, watch, errors, reset, clearErrors } = useForm();
	watch("expiry")
	const [formStatus, setFormStatus] = useState("SignUp")
	const [paymentInProgress, setPaymentInProgress] = useState(false)
	const [serverError, setServerError] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isPaymentButtonLoading, setPaymentButtonLoading] = useState(false)
	const [userName, setUserName] = useState("")
	const [userPassword, setPassowrd] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [passwordType, setPasswordType] = useState("password")
	const [emailSuccessMessage, setEmailSuccessMessage] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [showCreditCardForm, setCreditCardForm] = useState(false)
	const [number, setCCNumber] = useState("")
	const [name, setCCName] = useState("")
	const [expiry, setCCExpiry] = useState("")
	const [cvc, setCCCvc] = useState("")
	const [focused, setCCFocused] = useState("")


	const router = useRouter()

	let handleInputFocus = ({ target }) => {
		setCCFocused(target.name)

	};

	let handleInputChange = ({ target }) => {
		if (target.name === "number") {
			target.value = formatCreditCardNumber(target.value);
			setCCNumber(target.value)
		} else if (target.name === "expiry") {
			target.value = formatExpirationDate(target.value);
			setCCExpiry(target.value)
			if (/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(target.value)) {
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
			console.log(data)

			setPaymentButtonLoading(true)

			let inputData = {
				body: {
					number: data.number.replaceAll(' ', ''),
					expiryDate: data.expiry.replace('/', ''),
					cvc: data.cvc,
					firstName,
					lastName,
					istrailPeriod: true,
					email: userName
				}
			}
			var user = await Auth.signIn({
				username: userName,
				password: userPassword
			});
			await API.post('subscription', '/authorize/subscribe', inputData);
			changeSignUpFormStatus()
			setPaymentButtonLoading(false)
			await router.push('/library')
			setUserDetails(user)

		} catch (error) {
			setPaymentButtonLoading(false)
			alert(error.response.data.errors)
		}

	};

	const onToggleShowPassword = () => {
		setPasswordType(passwordType == "password" ? "Text" : "password")
		passwordType == "password" ? setShowPassword(true) : setShowPassword(false)
	}


	const onSubmit = async ({ username, password, first_name, last_name }) => {
		try {
			let userNameLowerCase = username.toLowerCase();
			console.log(userNameLowerCase)
			setLoading(true)
			const { userData } = await Auth.signUp({
				username: userNameLowerCase,
				password,
				attributes: {
					'custom:first_name': first_name,
					'custom:last_name': last_name,
					'custom:created_at': new Date(),
					'custom:last_login': new Date()
				}
			});
			setServerError(false)
			reset()
			setUserName(userNameLowerCase);
			setPassowrd(password);
			setFirstName(first_name);
			setLastName(last_name)
			setEmailSuccessMessage("Verification code sent to registered email")
			setFormStatus("confirmRegister")
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setServerError(error.message)
			setEmailSuccessMessage(error.message)
		}
	};

	const onConfrimCode = async (code) => {
		try {
			setLoading(true)
			await Auth.confirmSignUp(userName, code);
			reset()
			setServerError(false)
			setFormStatus("payment")
			setLoading(false)

		} catch (error) {
			setLoading(false)
			setServerError(error.message)
		}
	};

	let subscribeUser = async (data) => {
		setPaymentInProgress(true)
		let inputData = {
			body: {
				email: userName,
				subscriptionId: data.subscriptionID,
			}

		}
		var user = await Auth.signIn({
			username: userName,
			password: userPassword
		});
		await API.post('subscription', '/subscription', inputData);
		changeSignUpFormStatus()
		setPaymentInProgress(false)
		await router.push('/library')
		setUserDetails(user)

	}


	watch("username");
	return (
		<>

			<div className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<div className="fixed inset-0 transition-opacity" aria-hidden="true">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

					<div className="inline-block content-center align-bottom items-center justify-center bg-gray-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
						<div onClick={changeSignUpFormStatus} className="modal-close self-center text-center absolute p-1 w-0 h-5 top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-gray-500 text-base z-50 order-none flex-grow-0">
							<svg className="fill-current text-gray" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
								<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
							</svg>
						</div>

						<div className="flex flex-col items-center">
							<div className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">
								<div className="flex flex-row justify-center items-center p-2.5 static w-72 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0 mx-8">
									<h2 className="static w-72 h-11 left-16 bottom-2.5 font-sans not-italic leading-10 text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Get 14 Days Free</h2>
								</div>
								{formStatus === "payment" ?
									<div className="flex flex-row ">
										<div className="flex flex-col content-center static align-center flex-none order-0 flex-grow-0 mb-3">
											<h5 className="flex static font-sans text-gray-400 font-semibold justify-center text-center text-small5 pb-1" >Step 1</h5>
											<svg className="flex w-20" viewBox="0 0 190 3" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M1 1H189V3H1V1Z" stroke="#777676" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
										<div className="flex flex-col content-center static align-center flex-none order-0 flex-grow-0 mb-3">
											<h5 className="flex static font-sans text-blue-900 font-semibold justify-center text-center text-small5 pb-1" >Step 2</h5>
											<svg className="flex w-20" viewBox="0 0 190 3" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M1 1H189V3H1V1Z" fill="#364185" stroke="#364185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
									</div>
									:
									<div className="flex flex-row">
										<div className="flex flex-col content-center static align-center flex-none order-0 flex-grow-0 mb-3">
											<h5 className="flex static font-sans text-blue-900 font-semibold justify-center text-center text-small5 pb-1" >Step 1</h5>
											<svg className="flex w-20" viewBox="0 0 190 3" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M1 1H189V3H1V1Z" fill="#364185" stroke="#364185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
										<div className="flex flex-col content-center static align-center flex-none order-0 flex-grow-0 mb-3">
											<h5 className="flex static font-sans text-gray-400 font-semibold justify-center text-center text-small5 pb-1" >Step 2</h5>
											<svg className="flex w-20" viewBox="0 0 190 3" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M1 1H189V3H1V1Z" stroke="#777676" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
									</div>
								}
								{formStatus === "payment" ?
									<h4 className="flex static font-sans text-gray-500 font-semibold text-center text-small4" >Your 14 Days Free Trial starts now then only $8.99/Month. Cancel at anytime</h4>
									:
									<h4 className="flex static font-sans text-gray-500 font-semibold text-center text-small4" >Are you a new customer? Create an account and try iReadify 14 Days for free</h4>
								}
								{serverError && <p className="text-red-600">{serverError}</p>}
								{formStatus === "SignUp" ?
									<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 mx-2.5">
										<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
											<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">First Name</label>
											<input ref={register({ required: true, maxLength: 50, minLength: 3, pattern: /^[a-zA-Z\-]+$/, validate: (value) => { return !!value.trim() } })} name="first_name" placeholder="Your first name" type="text" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
											{_.get("first_name.type", errors) === "required" && (
												<p className="text-red-500 text-xs italic">Please fill out this field.</p>
											)}
											{_.get("first_name.type", errors) === "maxLength" && (
												<p className="text-red-500 text-xs italic">First Name length must be greater than 2 and less than 51.</p>
											)}
											{_.get("first_name.type", errors) === "minLength" && (
												<p className="text-red-500 text-xs italic">First Name length must be greater than 2 and less than 51.</p>
											)}
											{_.get("first_name.type", errors) === "pattern" && (
												<p className="text-red-500 text-xs italic">Numeric and special characters not allowed. </p>
											)}
										</div>
										<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
											<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">Last Name</label>
											<input ref={register({ required: true, maxLength: 50, minLength: 3, pattern: /^[a-zA-Z\-]+$/, validate: (value) => { return !!value.trim() } })} name="last_name" placeholder="Your last name" type="text" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
											{_.get("last_name.type", errors) === "required" && (
												<p className="text-red-500 text-xs italic">Please fill out this field.</p>
											)}
											{_.get("last_name.type", errors) === "maxLength" && (
												<p className="text-red-500 text-xs italic">Last Name length must be greater than 2 and less than 51.</p>
											)}
											{_.get("last_name.type", errors) === "minLength" && (
												<p className="text-red-500 text-xs italic">Last Name length must be greater than 2 and less than 51.</p>
											)}
											{_.get("last_name.type", errors) === "pattern" && (
												<p className="text-red-500 text-xs italic">Numeric and special characters not allowed. </p>
											)}
										</div>
										<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
											<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">Email</label>
											<input ref={register({ required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ })} name="username" placeholder="example@email.com" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
											{_.get("username.type", errors) === "required" && (
												<p className="text-red-500 text-xs italic">This field is required</p>
											)}
											{_.get("username.type", errors) === "pattern" && (
												<p className="text-red-500 text-xs italic">This input is not valid E-mail!</p>
											)}
										</div>
										<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
											<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">Password</label>
											<div className="mt-1 relative rounded-md shadow-sm cursor-pointer">
												<div onClick={onToggleShowPassword} className="absolute inset-y-0 right-0 pr-3 mt-1 flex items-center cursor-pointer">
													{
														showPassword
															?
															<svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
																<g clipPath="url(#clip0)">
																	<path d="M1.05664 12.4529C1.05664 12.4529 5.05664 4.45288 12.0566 4.45288C19.0566 4.45288 23.0566 12.4529 23.0566 12.4529C23.0566 12.4529 19.0566 20.4529 12.0566 20.4529C5.05664 20.4529 1.05664 12.4529 1.05664 12.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																	<path d="M12.0566 15.4529C13.7135 15.4529 15.0566 14.1097 15.0566 12.4529C15.0566 10.796 13.7135 9.45288 12.0566 9.45288C10.3998 9.45288 9.05664 10.796 9.05664 12.4529C9.05664 14.1097 10.3998 15.4529 12.0566 15.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																	<line x1="20.3427" y1="4.3641" x2="3.34268" y2="20.3641" stroke="#BDBDBD" />
																</g>
																<defs>
																	<clipPath id="clip0">
																		<rect width="24" height="24" fill="white" transform="translate(0.0566406 0.452881)" />
																	</clipPath>
																</defs>
															</svg>
															:
															<svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<g clipPath="url(#clip0)">
																	<path d="M1.92856 12C1.92856 12 5.92856 4 12.9286 4C19.9286 4 23.9286 12 23.9286 12C23.9286 12 19.9286 20 12.9286 20C5.92856 20 1.92856 12 1.92856 12Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																	<path d="M12.9286 15C14.5854 15 15.9286 13.6569 15.9286 12C15.9286 10.3431 14.5854 9 12.9286 9C11.2717 9 9.92856 10.3431 9.92856 12C9.92856 13.6569 11.2717 15 12.9286 15Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																</g>
																<defs>
																	<clipPath id="clip0">
																		<rect width="24" height="24" fill="white" transform="translate(0.928558)" />
																	</clipPath>
																</defs>
															</svg>

													}
												</div>
												<input ref={register({ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,25})/ })} name="password" placeholder="●●●●●●●●" type={passwordType} className="border-2 rounded-md w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-small2" />
												{_.get("password.type", errors) === "required" && (
													<p className="text-red-500 text-xs italic">This field is required</p>
												)}
												{_.get("password.type", errors) === "pattern" && (
													<p className="text-red-500 text-xs italic">Password must contain atleast 1 capital letter, 1 small letter, 1 special character, 1 digit and length between 8-25</p>
												)}
											</div>
										</div>
										{
											isLoading ?
												<button disabled className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r bg-gray-300 text-small4 font-semibold text-white  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
													Continue
											</button>
												:
												<button className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
													Continue
											</button>

										}

										{/* <h5 className="flex static font-sans text-gray-500 font-light text-center text-xs" >No account? Create and try iReadify for 30 Days, free.</h5> */}
									</form>
									:
									formStatus === "payment" ?
										<div className="mt-5">
											{
												paymentInProgress ?
													<p>You will be redirected to the new address in few seconds.</p>
													:
													<div>
														<div className="w-40 m-auto">
															<PayPalButton
																options={{ vault: true }}
																createSubscription={(data, actions) => {
																	return actions.subscription.create({
																		plan_id: config.paypalPlanIdWithTrial
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
															<button onClick={() => setCreditCardForm(!showCreditCardForm)} className="w-full flex items-center justify-center border-2 border-gray-400 text-base font-medium rounded text-white bg-purple-600  hover:bg-purple-900  ">
																Card
												</button>
														</div>
														{
															showCreditCardForm ?
																<div className="mt-5" id="PaymentForm">
																	<Card
																		number={number}
																		name={name}
																		expiry={expiry}
																		cvc={cvc}
																		focused={focused}
																	/>


																	<form onSubmit={handleSubmit(handleCCFROMSubmit)} className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">
																		<h4 className="flex static font-sans text-gray-500 font-semibold text-center text-small1" >Credit Card</h4>
																		<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
																			<input ref={register({ required: true, minLength: 15, maxLength: 20 })} onChange={handleInputChange} onFocus={handleInputFocus} name="number" placeholder="Card number" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
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
																			<input ref={register({ required: true, pattern: /^[a-zA-Z\-]+$/ })} onChange={handleInputChange} onFocus={handleInputFocus} name="name" placeholder="Name" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
																			{_.get("name.type", errors) === "required" && (
																				<p className="text-red-500 text-xs italic">This field is required</p>
																			)}
																			{_.get("name.type", errors) === "pattern" && (
																				<p className="text-red-500 text-xs italic">Numeric and special characters not allowed. </p>
																			)}
																		</div>

																		<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
																			<input ref={register({ required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/ })} onChange={handleInputChange} onFocus={handleInputFocus} name="expiry" placeholder="Card expiry(MM/YY)" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
																			{_.get("expiry.type", errors) === "required" && (
																				<p className="text-red-500 text-xs italic">This field is required</p>
																			)}
																			{_.get("expiry.type", errors) === "pattern" && (
																				<p className="text-red-500 text-xs italic">Expiry format is incorrect</p>
																			)}
																		</div>


																		<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
																			<input ref={register({ required: true, pattern: /\d{3,4}/ })} onChange={handleInputChange} onFocus={handleInputFocus} name="cvc" placeholder="Card cvc" type="tel" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
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
										:
										<ConfrimCodeForm onConfrimCode={onConfrimCode} emailSuccessMessage={emailSuccessMessage} />
								}
							</div>

						</div>
						{
							formStatus === "payment" ? null :
								<div className="flex flex-row static justify-center space-y-4 mb-2" >
									<svg className="flex w-10/12 h-1 absolute font-sans text-gray-500 font-normal justify-items-center text-xs" viewBox="0 0 610 1" fill="none" xmlns="http://www.w3.org/2000/svg">
										<line opacity="0.5" x1="0.5" y1="0.5" x2="609.5" y2="0.5" stroke="#BDBDBD" />
									</svg>
									<div className="flex flex-row static justify-center space-y-4 mb-2">
										<h5 className="justify-center flex static font-sans text-gray-500 font-medium text-center text-small4 m-3 mb-16" >Already have an account?<a onClick={changeLoginFormStatus} className="flex static font-sans text-blue-900 font-medium text-center text-small4 pl-1 cursor-pointer">Log in</a></h5>
									</div>
								</div>
						}


					</div>
				</div>
			</div>
		</>
	)
}

export default Signup
