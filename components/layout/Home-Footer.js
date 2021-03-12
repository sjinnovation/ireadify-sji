import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';


const Footer = () => {
	const pathname = useRouter().pathname;
	const visibility = pathname === "/collaborate" ||  pathname === "/privacy-policy"  ||  pathname === "/terms-and-conditions" || pathname === "/faq" ||  pathname === "/press" ||  pathname === "/contact" ||  pathname === "/blog" ||  pathname === "/blog/[id]" ? "none" : "";
    const topFooterVisibility = pathname !== "/faq" ? "none" : "";
	const { changeSignUpFormStatus, user, changeLoginFormStatus } = useContext(AuthContext) 
    
    return (
		<footer className="footer bg-purple-deep relative pt-1">
			{ user ? 
			<div className="max-w-screen-2xl mx-auto md:px-14 px-4">
				<div className="w-auto sm:w-auto text-center justify-center items-center py-2">
					<p className="mt-2 text-small3 text-white font-normal mb-2 text-opacity-50 font-serif">
						© Copyright iReadify. All rights reserved.
				    </p>
			    </div>
			</div>
			:
			<div className="max-w-screen-2xl mx-auto md:px-4">
				<div className="container mx-auto px-6 flex flex-col items-center"  style={{display: visibility}}>
					<div className="-mt-24 px-6 py-8 w-full tb:w-full md:w-4/5 flex flex-wrap rounded bg-gradient-to-r from-blue-light to-blue-bright">
				      <div className="w-full flex flex-col items-center mb-7">
				      	<h4 className="text-left text-white font-semibold font-sans">Get Inspired! Feel the Magic</h4>
				      </div>
				      <div className="w-full tb:w-full md:w-3/4">
				      	<h5 className="text-left text-white font-sans font-semibold mb-2.5">Unlimited Access For Only $8.99/Month</h5>
				      	<p className="text-left text-white mb-2.5 font-serif">No commitments. Cancel at any time!</p>
				      </div>
				      <div className="w-full tb:w-full md:w-1/4 flex items-center">
				      	<a onClick={changeSignUpFormStatus} className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-5 py-4 border border-transparent rounded shadow-sm text-button font-semibold font-sans text-white bg-gradient-to-r from-purple-bright to-purple-bright hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100"
						>GET 14 DAYS TRIAL</a>
				      </div>
				    </div>
			    </div>
			    <div className="container mx-auto px-6 flex flex-col items-center" style={{display: topFooterVisibility}}>
					<div className="-mt-24 px-6 py-8 w-full  md:w-4/5 lg:w-4/5 flex flex-wrap rounded bg-gradient-to-r from-blue-light to-blue-bright">
				      <div className="w-full flex flex-col items-center my-2">
				      	<h4 className="text-left text-white font-semibold font-sans mb-6">Can’t find your answer?</h4>
				      	<h5 className="text-left text-white font-sans font-semibold mb-6">Contact us and we’ll get back to you as soon as we can.</h5>
				      	<Link href={"/contact"}><a className="whitespace-nowrap inline-flex items-center justify-center px-5 py-4 border border-transparent rounded shadow-sm text-button font-semibold font-sans text-white bg-gradient-to-r from-purple-light to-purple-light hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100"
						>Contact us</a></Link>
				      </div>
				    </div>
			    </div>
			    <div className="container mx-auto px-6">
			        <div className="sm:flex sm:mt-8 tb:mx-10 md:mx-60">
			            <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row md:justify-between">
			                <div className="md:mr-1.5 flex flex-col place-self-center md:place-self-start w-20 md:w-auto">
			                    <h5 className="font-semibold text-white mb-2 font-sans">iReadify</h5>
			                    <span className="mt-1"><Link href={"/about"}><a className="text-link font-normal font-serif text-white  text-md hover:text-white-500">About US</a></Link></span>
			                    <span className="mt-1"><Link href={"/contact"}><a className="text-link font-normal font-serif text-white  text-md hover:text-white-500">Join US</a></Link></span>
			                    <span className="mt-1"><button onClick={changeLoginFormStatus} className="text-link font-normal font-serif text-white  text-md hover:text-white-500">Log-In</button></span>
			                </div>
			                <div className="md:mr-1.5 flex flex-col place-self-center md:place-self-start w-20 md:w-auto">
			                    <h5 className="font-semibold text-white mt-4 md:mt-0 mb-2 font-sans">Information</h5>
			                    <span className="mt-1"><Link href={"/collaborate"}><a className="text-link font-normal font-serif text-white text-md hover:text-white-500">Collaboration</a></Link></span>
			                    <span className="mt-1"><Link href={"/press"}><a className="text-link font-normal font-serif text-white  text-md hover:text-white-500">Press</a></Link></span>
			                    <span className="mt-1"><Link href={"/blog"}><a className="text-link font-normal font-serif text-white text-md hover:text-white-500">Blog</a></Link></span>
			                </div>
			                <div className="md:mr-1.5 flex flex-col place-self-center md:place-self-start w-20 md:w-auto">
			                    <h5 className="font-semibold text-white mt-4 md:mt-0 mb-2 font-sans">Help</h5>
			                    <span className="mt-1"><Link href={"/faq"}><a className="text-link font-normal font-serif text-white  text-md hover:text-white-500">FAQ</a></Link></span>
			                    <span className="mt-1"><Link href={"/contact"}><a className="text-link font-normal font-serif text-white  text-md hover:text-white-500">Contact</a></Link></span>
			                </div>
			            </div>
			        </div>
			    </div>
			    <div className="container mx-auto px-6">
			        <div className="mt-0 flex flex-col items-center">
			            <div className="sm:w-2/3 text-center py-6">
			                <ul className="list-reset flex justify-center flex-1 items-center">
								<li className="mr-2">
									<Link href="https://www.facebook.com/iReadify"><a target="_blank" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
						               <img className="" src="/img/social_icons/ico_fb.svg" width={24} height={24} alt="Facebook" />
						            </a></Link>
								</li>
								<li className="mr-2">
									<Link href="https://www.instagram.com/ireadifyllc/"><a target="_blank" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
						            	<img className="" src="/img/social_icons/ico_ins.svg" width={24} height={24} alt="Instagram" />
						            </a></Link>
								</li>
								<li className="mr-2">
									<Link href="https://twitter.com/ireadify"><a target="_blank" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
						            	<img className="" src="/img/social_icons/ico_tw.svg" width={24} height={24} alt="Twitter" />
						            </a></Link>
								</li>
							</ul>
			                <p className="mt-2 text-small1 text-white font-normal mb-2 text-opacity-50 font-serif">
			                    © Copyright iReadify. All rights reserved.
			                </p>
			                <p className="text-small1 text-white font-normal mb-2 text-opacity-70 font-serif">
			                    <Link href="/terms-and-conditions"><a>Terms & Conditions</a></Link> | <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
			                </p>
			            </div>
			        </div>
			    </div>
			</div>
			}
		</footer>
	)
}

export default Footer
