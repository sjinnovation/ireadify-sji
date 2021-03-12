import { graphqlOperation, API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import * as queries from "../../api/faq/queries";
import isDeleted from "../../config/bootstarp"
import _ from 'lodash';


const Faq = () => {

	const [open, setOpen] = useState(1);
	const [faq, setFaq] = useState([])
	const [isLoading, setLoading] = useState(false)

	const onOpenChanged = (value) => {
		setOpen(value)
	}

	useEffect(() => {
		fetchFaq()
	}, [])

	let fetchFaq = async () => {
		setLoading(true)
		const faqs = await API.graphql({
			query: queries.listFaqs,
			authMode: 'API_KEY',
			variables: {
				limit: 4,
			},
		});
		const data = faqs.data.listFaqs.items
		setFaq(data)
		setLoading(false)
	}

	return (
		<div className="py-4 pb-40 bg-green-light">
			<div className="container mx-auto px-6 md:px-12 lg:px-24 section-faq">
				<div className="sm:flex sm:mt-8 ">
					<div className="mt-4 sm:w-full">
						<div className="grid grid-cols-1 gap-4">
							<div className="">
								<h3 className="text-center text-white font-sans font-semibold mb-5">
									<span className="text-purple-light">Questions</span>
								</h3>
								<p className="text-center text-subtitle1 text-gray-light mb-5 font-serif">
									You can find answers to our most frequently asked questions here.
		                  </p>
								{ isLoading ?
									<div>
										<div className="mb-5 m-10">
										<div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
										<div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
										<div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
										<div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
										</div>
									</div>
									:
									faq.map((item) =>
										<div key={item.id}>
											<div className="tab w-full overflow-hidden bg-white rounded mb-5 shadow-md">
											<input className="absolute opacity-0" id={`tab-single-${item.id}`} type="radio" name="tabs2" checked={open === item.id ? true : false} onChange={() => onOpenChanged(item.id)} />
												<label className="block p-5 leading-normal cursor-pointer text-6xl text-gray-light font-sans font-semibold"  htmlFor={`tab-single-${item.id}`}>{item.question}</label>
												<div className="tab-content overflow-hidden leading-normal">
													<p className="py-5 px-5 md:pr-9 md:pl-16 text-subtitle1 text-gray-light font-serif">{item.answer}</p>
												</div>
											</div>
										</div>
									)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Faq
