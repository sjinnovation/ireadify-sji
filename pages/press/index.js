import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/layout/Home-Layout'


const Press = () => {
    return (
    	<Layout>
		   <div className="h-32 md:h-64 pt-8 pb-20 md:py-20 mb-14 bg-about-banner bg-auto md:bg-contain bg-no-repeat bg-center">
		      <div className="container mx-auto px-6">
		         <div className="sm:flex">
		            <div className="my-0 md:my-8 sm:w-full sm:px-8 flex flex-col md:flex-row justify-center">
		               <h3 className="text-center text-white font-sans font-semibold">
		                  Press
		               </h3>
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto px-6 flex flex-col items-center">
				<div className="-mt-24 md:-mt-28 px-4 md:px-32 pt-24 pb-12 w-full  md:w-4/5 lg:w-4/5 flex flex-wrap rounded bg-green-light">
					<div className="w-full flex flex-col items-center">
						<h4 className="text-center text-purple-light text-6xl font-sans font-semibold mb-3">Get in touch with us:</h4>
						<p className="text-center text-gray-light text-body2 mb-8 font-serif md:px-8">
							If you're a member of the media and want to learn more about iReadify, reach out to us <Link href={"mailto:press@ireadify.com"}><a className="text-purple-400">press@ireadify.com</a></Link> or <Link href={"/contact"}><a className="text-purple-400">contact us</a></Link>.
		            </p>
						<h6 className="text-center text-gray-light text-4xl mb-8 font-sans font-semibold">Press inquiry only!</h6>
						<div className="flex flex-wrap content-center w-full lg:px-12">
							<div className="flex flex-col items-center w-full">
								<form className="w-full">
									<div className="md:flex">
										<div className="w-full md:w-1/2 md:mr-5">
											<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
												<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-auto h-4 left-0 -top-0 text-small2 text-gray-light mb-3">First Name</label>
												<input name="first_name" placeholder="John" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
											</div>
										</div>
										<div className="w-full md:w-1/2">
											<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
												<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-auto h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Last Name</label>
												<input name="last_name" placeholder="Doe" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
											</div>
										</div>
									</div>
									<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
										<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-auto h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Email</label>
										<input name="email" placeholder="example@email.com" type="email" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
									</div>
									<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
										<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-auto h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Company</label>
										<input name="company_name" placeholder="Companyname" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
									</div>
									<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
										<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-auto h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Subject</label>
										<input name="sunject" placeholder="Subject" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
									</div>
									<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
										<label htmlFor="" className="flex static font-sans text-gray-light font-normal text-center w-auto h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Message</label>
										<textarea name="messgae" placeholder="Hi there... write your message here" rows={5} cols={5} className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
									</div>
									<div className="w-full my-4 inline-flex justify-center">
										<a href="#" className="rounded w-full my-8 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-darkest hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-small4 font-sans">
											Send
		                        </a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center py-4">
				<div className="sm:w-2/3 text-center pt-6 pb-6">
					<ul className="list-reset flex justify-center flex-1 items-center">
						<li className="mr-2">
							<Link href="#">
								<a className="whitespace-nowrap text-base font-medium text-gray-light hover:text-gray-900">
									<img className="h-8 w-auto sm:h-10" src="/img/social_icons/icon_fb.svg" width={45} height={45} alt="Facebook" />
								</a>
							</Link>
						</li>
						<li className="mr-2">
							<Link href="#">
								<a className="whitespace-nowrap text-base font-medium text-gray-light hover:text-gray-900">
									<img className="h-8 w-auto sm:h-10" src="/img/social_icons/icon_ins.svg" width={45} height={45} alt="Instagram" />
								</a>
							</Link>
						</li>
						<li className="mr-2">
							<Link href="#">
								<a className="whitespace-nowrap text-base font-medium text-gray-light hover:text-gray-900">
									<img className="h-8 w-auto sm:h-10" src="/img/social_icons/icon_tw.svg" width={45} height={45} alt="Twitter" />
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</Layout>
	)
}

export default Press


