import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { graphqlOperation, API } from 'aws-amplify';
import { createContactUs } from '../../api/contactUs/mutations'
import { isDeleted } from '../../config/bootstarp'
import Link from 'next/link'
import Layout from '../../components/layout/Home-Layout'
import * as mutations from "../../src/graphql/mutations";
import _ from "lodash/fp";


const Contact = () => {

	const [success, setSuccess] = useState(false)
	const [buttonLoading, setButtonLoading] = useState(false)

	const { register, errors, handleSubmit, reset } = useForm();

	const onSubmit = async (data) => {
		try {
			setButtonLoading(true)
			setSuccess(false)

			const inputData = {
				name: data.name,
				email: data.email,
				message: data.message,
				isDeleted: isDeleted.no,
			}

			try {

				const send = await API.graphql({
					query: mutations.createContactAdmin,
					variables: { input: inputData },
					authMode: 'API_KEY'
				});

			} catch (error) {
			}

			setSuccess(true)
			reset();
			setButtonLoading(false)
			setTimeout(() => {
				setSuccess(false)
			  }, 9000)
		} catch (error) {
		}
	}

	return (
		<Layout>
			<div className="mb-20">
				<div className="h-32 md:h-64 py-20 mb-14 bg-contact-banner bg-auto md:bg-contain bg-no-repeat bg-center">
					<div className="container mx-auto px-6">
						<div className="sm:flex">
							<div className="my-0 md:my-8 sm:w-full sm:px-8 flex flex-col md:flex-row justify-center">
								<h3 className="text-center text-white font-sans font-semibold">
									Contact Us
			               </h3>
							</div>
						</div>
					</div>
				</div>
				<div className="container mx-auto px-6 xl:px-24 ">
					<div className="sm:flex sm:mt-8 mb-10">
						<div className="mt-16 sm:mt-8 sm:w-full">
							<div className="grid gap-4 md:gap-2.5 grid-cols-1 md:grid-cols-2 justify-items-center">
								<div className="md:mr-1.5 md:mt-32 flex flex-col">
									<h4 className="text-left text-purple-light font-sans font-semibold mb-2">Email us</h4>
									<span className="mt-2">
										<Link href="mailto:support@ireadify.com">
											<a className="text-link font-normal font-serif text-purple-light  text-md">Help & Support</a></Link>
									</span>
									<span className="mt-2">
										<Link href="mailto:press@ireadify.com">
											<a className="text-link font-normal font-serif text-purple-light  text-md">Press Inquiries</a></Link>
									</span>
									<span className="mt-2">
										<Link href="mailto:Partners@ireadify.com">
											<a className="text-link font-normal font-serif text-purple-light  text-md">Publisher Inquiries</a></Link>
									</span>
									<span className="mt-2">
										<Link href="mailto:Sales@ireadify.com">
											<a className="text-link font-normal font-serif text-purple-light  text-md">Sales Inquiries</a></Link>
									</span>
								</div>
								<div className="flex flex-wrap content-center bg-green-light px-8 py-16 w-full">
									<div className="flex flex-col items-center w-full">
										<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
											<h4 className="text-left text-purple-light font-sans font-semibold mb-2">Contact Us</h4>
											<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
												<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Name</label>
												<input ref={register({ required: true, maxLength: 30, minLength: 3, pattern: /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/, validate: (value) => { return !!value.trim() } })} name="name" placeholder="John Doe" type="text" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
												{_.get("name.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
												)}
												{_.get("name.type", errors) === "maxLength" && (
													<p className="text-red-500 text-xs italic">Name must be greater than 2 and less than 21.</p>
												)}
												{_.get("name.type", errors) === "minLength" && (
													<p className="text-red-500 text-xs italic">Name must be greater than 2 and less than 21.</p>
												)}
												{_.get("name.type", errors) === "pattern" && (
													<p className="text-red-500 text-xs italic">This name is not valid</p>
												)}
											</div>
											<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
												<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Email</label>
												<input ref={register({ required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ })} name="email" placeholder="example@email.com" type="email" className="appearance-none border-2 rounded w-full py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
												{_.get("email.type", errors) === "required" && (
													<p className="text-red-500 text-xs italic">This field is required</p>
												)}
												{_.get("email.type", errors) === "pattern" && (
													<p className="text-red-500 text-xs italic">This input is not valid E-mail!</p>
												)}
											</div>
											<div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0">
												<label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small2 text-gray-light mb-3">Message</label>
												<textarea ref={register({ required: true, minLength: 10, validate: (value) => { return !!value.trim() } })} name="message" placeholder="Hi there... write your message here" rows={5} cols={5} className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700  font-sans text-small2" />
												{_.get("message.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
												)}
												{_.get("message.type", errors) === "minLength" && (
													<p className="text-red-500 text-xs italic">Message must be minimum 10 words</p>
												)}
											</div>
											<div className="px-4 py-3 bg-green-light text-right mt-4 sm:px-6">
												{
													buttonLoading ?
														<button disabled type="submit" className="rounded w-full my-8 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-darkest hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-small4 font-sans">
															Sending...
                                    					</button>
														: <button type="submit" className="rounded w-full my-8 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-darkest hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-small4 font-sans">
															Submit
                                    					</button>
												}
												{
													success ?
														<p className="text-green-500 text-sm italic text-left">Your message was sent successfully, Thank you for submitting your message, we will contact you shortly</p>
														: null
												}
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Contact


