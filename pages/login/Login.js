const Login = () => {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-light opacity-75"></div>
				</div>
				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div className="inline-block content-center align-bottom items-center justify-center bg-gray-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
					<div className="modal-close self-center text-center absolute p-1 w-0 h-5 top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-gray-500 text-base z-50 order-none flex-grow-0">
						<svg className="fill-current text-gray" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>

					<div className="flex flex-col items-center">
						<form className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">

							<div className="flex flex-row justify-center items-center p-2.5 static w-60 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0 mx-8">
								<h4 className="static left-16 bottom-2.5 font-sans text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Log in</h4>
							</div>

							<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
								<label htmlFor="" className="flex static font-san font-normal text-center w-20 h-4 left-0 -top-0 text-small1 text-gray-500 mb-3">Email/Username</label>
								<input name="email" placeholder="Enter your Email or Username" type="email" className="border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-small4" />
							</div>
							<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
								<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small1 text-gray-500 mb-3">Password</label>
								<span className="absolute inset-y-0 right-0 flex items-center pr-2">
									<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
										<svg width="18" height="20" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 17.3281C13.4183 17.3281 17 13.7464 17 9.32812C17 4.90985 13.4183 1.32812 9 1.32812C4.58172 1.32812 1 4.90985 1 9.32812C1 13.7464 4.58172 17.3281 9 17.3281Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M18.9999 19.328L14.6499 14.978" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</button>
								</span>
								<input name="password" placeholder="●●●●●●●●" type="password" className="border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-small4" />
							</div>
							<div className="flex flex-row static justify-center space-y-2 mb-1 mt-6">
								<a href={"ForgotPassword"} className="flex static font-sans text-blue-900 font-normal text-center text-small4">Forgot your password?</a>
							</div>
							<div className="rounded w-full my-4 inline-flex justify-center">
								<a href={"/"} className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-brigh text-base font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-sm font-sans">
									Log in
							</a>
							</div>
						</form>
					</div>

					<div className="flex flex-row static justify-center space-y-4" >
						<svg className="flex w-8/12 h-1 static text-gray-500 font-normal justify-center items-center text-xs" viewBox="0 0 610 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line opacity="0.5" x1="0.5" y1="0.5" x2="609.5" y2="0.5" stroke="#BDBDBD" />
						</svg>
					</div>

					<div className="flex flex-row static justify-center" >
						<div className="flex flex-row static justify-center">
							<a className="justify-center flex static font-serif text-gray-500 font-thin text-center text-small4 m-5" >No account? Create and try iReadify for 30 Days, free: </a>
						</div>
					</div>
					<div className="flex flex-row static justify-center mb-10 mt-2 w-full ">
						<a href={"/register/SignUpStep1"} className="flex items-center justify-center px-3 py-3 bg-gradient-to-r border-purple-light border-2 font-medium rounded-sm text-red-500 bg-transparent hover:from-purple-light hover:to-blue-bright hover:text-gray-600 sm:ml-3 sm:w-auto sm:text-sm font-sans">
							Get 14 Days Free
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
