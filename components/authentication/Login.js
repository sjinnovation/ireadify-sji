import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/auth';
import { Auth, API } from 'aws-amplify';
import { useRouter } from 'next/router'
import _ from "lodash/fp";

const Login = () => {

	const { changeLoginFormStatus, changeSignUpFormStatus, changeForgotPasswordFormStatus, setUserDetails } = useContext(AuthContext)
	const { register, handleSubmit, watch, errors, reset } = useForm();
	const [serverError, setServerError] = useState(false)
	const [formStatus, setFormStatus] = useState("SignIn")
	const [isLoading, setLoading] = useState(false)
	const [ userConfirmed, setUserConfrimed] = useState(true)
	const [passwordType, setPasswordType] = useState("password")
	const [showPassword, setShowPassword] = useState(false)
	const [userName, setUserName] = useState("")
	const router = useRouter()

	const { redirect } = router.query

	const onToggleShowPassword = () => {
		setPasswordType(passwordType == "password" ? "Text" : "password")
		passwordType == "password" ? setShowPassword(true) : setShowPassword(false)
	}


	const onSubmit = async ({ username, password }) => {
		try {
			let userNameLowerCase = username.toLowerCase()
			setUserName(userNameLowerCase);
			setLoading(true)
			let user = await Auth.signIn({
				username: userNameLowerCase,
				password,
			});
			let  subscription  = await API.get('subscription', '/subscription/'+ Auth.user.attributes.email);
			if(subscription.data === null || (!subscription.data.isActive  && subscription.data.nextBillingDate < new Date().toISOString())){
			    router.push('/subscription')
			    reset()
				changeLoginFormStatus()
				setLoading(false)
			}
			else {
				setServerError(false)
				reset()
				changeLoginFormStatus()
				setLoading(false)
				if(redirect){
					await router.push('/' + redirect)
				}
				else{
					await router.push('/library')
				}
				setUserDetails(user)
			}
			
		} catch (error) {
			setLoading(false)
			if(error.name === "UserNotConfirmedException")
			{
				setUserConfrimed(false)
			}
			else {
				setServerError(error.message)
			}
		}
	};

	const onResend = async () => {
		try {
			await Auth.resendSignUp(userName);
			reset()
			setServerError(false)
			setUserConfrimed(true)
			setFormStatus('confirmRegister')
			

		} catch (error) {
			setLoading(false)
			setServerError(error.message)
		}
	};

	const onConfrim = async ({ code }) => {
		try {
			setLoading(true)
			await Auth.confirmSignUp(userName, code);
			reset()
			setServerError(false)
			setFormStatus('SignIn')
			setLoading(false)

		} catch (error) {
			console.log(error.message)
			setLoading(false)
			setServerError(error.message)
		}
	};

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div className="inline-block content-center align-bottom items-center justify-center bg-gray-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
					<div className="modal-close self-center text-center absolute p-1 w-0 h-5 top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-gray-500 text-base z-50 order-none flex-grow-0">
						<svg onClick={changeLoginFormStatus} className="fill-current text-gray" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex flex-row justify-center items-center p-2.5 static w-60 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0 mx-8">
							<h4 className="static left-16 bottom-2.5 font-sans text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Log in</h4>
						</div>
						{serverError && <p className="text-red-600">{serverError}</p>}
						{!userConfirmed && <p className="text-red-600 text-xs">Your email is not confirmed yet. Please click <span onClick={onResend} className="text-blue-500 cursor-pointer">here</span> to receive code.</p>}
					   {formStatus === "SignIn" ?
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">
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
									<input ref={register({ required: true })} name="password" placeholder="●●●●●●●●" type={passwordType} className="border-2 rounded-md w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-small2" />
									{errors.password && <p className="text-red-500 text-xs italic">This field is required</p>}
								</div>
							</div>
							<div className="cursor-pointer flex flex-row w-full static justify-center space-y-2 mt-6">
								<a onClick={changeForgotPasswordFormStatus} className="flex static font-sans text-blue-900 font-normal text-center text-small4">Forgot your password?</a>
							</div>
							<div className="rounded w-full my-2 inline-flex justify-center">
								{
									isLoading ?
										<button disabled className="rounded w-full my-2 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r bg-gray-300 text-base font-semibold text-white focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-sm font-sans">
											Log in
											</button>
										:
										<button className="rounded w-full my-2 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-base font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-sm font-sans">
											Log in
											</button>

								}
							</div>
						</form>
						:
						<form onSubmit={handleSubmit(onConfrim)} className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 mx-2.5">
							<p className="text-red-600 text-xs">Verify your email with code and login again.</p>
							<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
								<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">Verification</label>
								<input ref={register({ required: true })} name="code" placeholder="code" type="text" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
								{_.get("code.type", errors) === "required" && (
									<p className="text-red-500 text-xs italic">This field is required</p>
								)}
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
						</form>}
					</div>

					<div className="flex flex-row static justify-center" >
						<svg className="flex w-8/12 h-1 static text-gray-500 font-normal justify-center items-center text-xs" viewBox="0 0 610 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line opacity="0.5" x1="0.5" y1="0.5" x2="609.5" y2="0.5" stroke="#BDBDBD" />
						</svg>
					</div>

					<div className="flex flex-row static justify-center" >
						<div className="flex flex-row static justify-center">
							<a className="justify-center flex static font-serif text-gray-500 font-thin text-center text-small4 m-5" >No account? Create and try iReadify for 14 Days, free: </a>
						</div>
					</div>
					<div className="flex flex-row static justify-center mb-10 mt-2 w-full cursor-pointer">
						<a onClick={changeSignUpFormStatus} className="flex items-center justify-center px-3 py-3 bg-gradient-to-r border-purple-bright border-2 font-medium rounded-sm text-purple-bright bg-transparent hover:from-purple-light hover:to-blue-bright hover:text-white hover:border-transparent sm:w-auto sm:text-sm font-sans">
							Get 14 Days Free
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
