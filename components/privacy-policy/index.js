import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import * as queries from "../../api/privacy/queries";
import { isDeleted } from "../../config/bootstarp"

const PrivacyPolicy = () => {

	const [privacy, setPrivacyPolicy] = useState([])
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
		fetchPrivacy()
	}, [])

	let fetchPrivacy = async () => {
		setLoading(true)
		const lists = await API.graphql({
			query: queries.privacyPolicyByOrder,
			authMode: 'API_KEY',
			variables: { 
				isDeleted: isDeleted.no,
				sortDirection: 'ASC',
			},
			
		})
		const data = lists.data.PrivacyPolicyByOrder.items
		setPrivacyPolicy(data)
		console.log(privacy)
		setLoading(false)
	}
	return (
		<div>
			<div className="h-32 py-10 mb-14 bg-privacy-banner bg-auto md:bg-contain bg-no-repeat bg-center">
				<div className="container mx-auto px-6">
					<div className="sm:flex">
						<div className="my-0 md:my-2 sm:w-full sm:px-8 flex flex-col md:flex-row justify-center">
							<h3 className="text-center text-white font-sans font-semibold">
								Privacy policy
		               </h3>
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto px-6 md:px-24 ">
				<div className="sm:flex mb-10">
					<div className="sm:w-full sm:px-8">
						<div className="grid gap-4 md:gap-2.5 grid-cols-1 justify-items-center">
							{
								isLoading ?
									<div>
										<div className="mb-5 m-10">Loading</div>
									</div>
									:
									privacy.map((item) =>
									
										<div className="">
											<h4 className="text-left text-body1 text-gray-light font-sans font-semibold mb-6">{item.title}</h4>
											<p className="text-left text-body2 text-gray-light mb-8 font-serif" dangerouslySetInnerHTML={ { __html: item.content } }></p>
										</div>
									)}
							<p className="text-left text-body2 text-gray-light mb-8 font-serif">Effective as of February 01, 2021</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PrivacyPolicy


