import { useRouter } from 'next/router'

const SignUpStep1 = () => {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div className="inline-block content-center align-bottom items-center justify-center bg-gray-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
					<div className="modal-close self-center text-center absolute p-1 w-0 h-5 top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-gray-light text-base z-50 order-none flex-grow-0">
						<svg className="fill-current text-gray" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>

					<div className="flex flex-col items-center">
						<form className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">

							<div className="flex flex-row justify-center items-center p-2.5 static w-72 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0 mx-8">
								<h2 className="static w-72 h-11 left-16 bottom-2.5 font-sans not-italic leading-10 text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Get 14 Days Free</h2>
							</div>

							<div className="flex flex-row">
									<div className="flex flex-col content-center static align-center flex-none order-0 flex-grow-0 mb-3">
										<h5 className="flex static font-sans text-blue-900 font-semibold justify-center text-center text-small5 pb-1" >Step 1</h5>
										<svg className="flex w-20" viewBox="0 0 190 3" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1H189V3H1V1Z" fill="#364185" stroke="#364185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
									<div className="flex flex-col content-center static align-center flex-none order-0 flex-grow-0 mb-3">
										<h5 className="flex static font-sans text-gray-400 font-semibold justify-center text-center text-small5 pb-1" >Step 2</h5>
										<svg className="flex w-20" viewBox="0 0 190 3" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1H189V3H1V1Z" stroke="#777676" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
								</div>

							<h4 className="flex static font-sans text-gray-light font-semibold text-center text-small5" >Are you a new customer? Create an account and try iReadify 14 Days for free</h4>

							<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
								<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-light mb-3">First Name</label>
								<input name="first-name" placeholder="Your first name" type="text" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
							</div>
							<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
								<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-light mb-3">Last Name</label>
								<input name="last-name" placeholder="Your last name" type="text" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
							</div>
							<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
								<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-light mb-3">Email</label>
								<input name="email" placeholder="example@email.com" type="email" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
							</div>
							<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
								<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-light mb-3">Password</label>
								<input name="password" placeholder="●●●●●●●●" type="password" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
							</div>
							<a href={"SignUpStep2"} className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
								Continue
							</a>
							{/* <h5 className="flex static font-sans text-gray-light font-light text-center text-xs" >No account? Create and try iReadify for 30 Days, free.</h5> */}
						</form>
					</div>
					<div className="flex flex-row static justify-center space-y-4 mb-2" >
						<svg className="flex w-10/12 h-1 absolute font-sans text-gray-light font-normal justify-items-center text-xs" viewBox="0 0 610 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line opacity="0.5" x1="0.5" y1="0.5" x2="609.5" y2="0.5" stroke="#BDBDBD" />
						</svg>
						<div className="flex flex-row static justify-center space-y-4 mb-2">
							<h5 className="justify-center flex static font-sans text-gray-light font-medium text-center text-small5 m-3 mb-16" >Already have an account? <a href={"/login/Login"} className="flex static font-sans text-blue-900 font-medium text-center text-small5"> Log in</a></h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUpStep1
