import Link from 'next/link';
import React, { useState } from 'react';
import Layout from '../../components/layout/Home-Layout';

const Collaborate = () => {
	const [selectedOption , setSelectedOption ] = useState("Blogger");
    function onValueChanged (value) {
        setSelectedOption(value)
    }
    return (
    	<Layout>
		   <div className="h-32 md:h-64 py-20 mb-14 bg-about-banner bg-auto md:bg-contain bg-no-repeat bg-center">
		      <div className="container mx-auto px-6">
		         <div className="sm:flex">
		            <div className="my-0 md:my-8 sm:w-full sm:px-8 flex flex-col md:flex-row justify-center">
		               <h3 className="text-center text-white font-sans font-semibold">
		                  Let&apos;s Collaborate
		               </h3>
		            </div>
		         </div>
		      </div>
		   </div>
		   <div className="container mx-auto px-6 mb-12 flex flex-col items-center">
		      <div className="-mt-20 md:-mt-28 px-4 md:px-32 pt-24 pb-10 w-full  md:w-4/5 lg:w-4/5 flex flex-wrap rounded bg-green-light">
		         <div className="w-full flex flex-col items-center">
		            <p className="text-left text-gray-light text-small2 mb-2 font-serif xl:px-4">
		               If your organization aligns with our mission, let’s work together. To get started, simply fill out the following form.
		            </p>
		            <p className="text-left text-gray-light text-small2 mb-8 font-serif xl:px-4">
		               If we are able to move forward with a collaboration, someone from our team will reach out to you within two week.
		            </p>
		            <div className="flex flex-wrap content-center w-full xl:px-12">
		               <div className="flex flex-col items-center w-full">
		                  <form className="w-full">
		                     <div className="md:flex">
		                        <div className="w-full md:w-1/2 md:mr-5">
		                           <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
		                              <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3">First Name</label>
		                              <input name="first_name" placeholder="John" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 font-sans text-small2" />
		                           </div>
		                        </div>
		                        <div className="w-full md:w-1/2">
		                           <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
		                              <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Last Name</label>
		                              <input name="last_name" placeholder="Doe" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
		                           </div>
		                        </div>
		                     </div>
		                     <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
		                        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Email</label>
		                        <input name="email" placeholder="example@email.com" type="email" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
		                     </div>
		                     <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
		                        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Company Name</label>
		                        <input name="company_name" placeholder="Companyname" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
		                     </div>
		                      <div className="flex flex-col static text-left mt-5 w-full h-auto flex-none order-0 flex-grow-0 p-0 my-0">
						        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Who are you?</label>
		                        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3" style={{ cursor: "pointer" }} onClick={() => onValueChanged("Blogger")}><input type="radio" value="Blogger" name="designation" checked={selectedOption === "Blogger"} className="mt-0.5 mr-1.5"/><span> Blogger</span></label>
						        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3" style={{ cursor: "pointer" }} onClick={() => onValueChanged("Editor")}><input type="radio" value="Editor" name="designation" checked={selectedOption === "Editor"} className="mt-0.5 mr-1.5"/><span> Editor</span></label>
						        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3" style={{ cursor: "pointer" }} onClick={() => onValueChanged("Content Creator")}><input type="radio" value="Content Creator" name="designation" checked={selectedOption === "Content Creator"} className="mt-0.5 mr-1.5"/> <span> Content Creator</span></label>
						        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3" style={{ cursor: "pointer" }} onClick={() => onValueChanged("Influencer")}><input type="radio" value="Influencer" name="designation" checked={selectedOption === "Influencer"} className="mt-0.5 mr-1.5"/><span> Influencer</span></label>
						        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3" style={{ cursor: "pointer" }} onClick={() => onValueChanged("Other")}><input type="radio" value="Other" name="designation" checked={selectedOption === "Other"} className="mt-0.5 mr-1.5"/><span> Other</span></label>
						      </div>
		                     <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
		                        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Your Website URL?</label>
		                        <input name="website" placeholder="Website" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
		                     </div>
		                     <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
		                        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-auto left-0 -top-0 text-small2 text-gray-light mb-3">Your Social Media Handles?</label>
		                        <textarea name="social-media" placeholder="Hi there... write your message here" rows={5} cols={5} className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
		                     </div>
		                     <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
		                        <label htmlFor="" className="flex static font-sans text-gray-light font-normal text-left w-full h-auto left-0 -top-0 text-small2 text-gray-light mb-3">Why do you want to collaborate with iReadify?</label>
		                        <textarea name="message" placeholder="Hi there... write your message here" rows={5} cols={5} className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
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
		</Layout>
    )
}

export default Collaborate


