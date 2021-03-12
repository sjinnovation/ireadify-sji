import Link from 'next/link'
import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import * as queries from "../../api/aboutUs/queries";
import isDeleted from "../../config/bootstarp"


const About = () => {
	const [aboutss, setAbouts] = useState([])
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
		fetchPrivacy()
	}, [])

	let fetchPrivacy = async () => {
		setLoading(true)
		let conditions = {
			isDeleted: {
				eq: isDeleted.no
			},
		}
		const lists = await API.graphql({
			query: queries.listAbouts,
			authMode: 'API_KEY',
			variables: {
				// ...conditions
			},
		});
		const data = lists.data.listAbouts.items
		setAbouts(data)
		setLoading(false)
	}

	return (
		<div>
			<div className="h-32 md:h-64 py-20 mb-14 bg-about-banner bg-auto md:bg-contain bg-no-repeat bg-center">
				<div className="container mx-auto px-6">
					<div className="sm:flex">
						<div className="my-0 md:my-8 sm:w-full sm:px-8 flex flex-col md:flex-row justify-center">
							<h3 className="text-center text-white font-sans font-semibold">
								Be Curious
		               </h3>
						</div>
					</div>
				</div>
			</div>
			{
				isLoading ?
					<div>
						<div className="mb-5 m-10">...</div>
					</div>
					:
					aboutss.map((item) =>
						item.isDeleted === 0 ?
							<div className="container mx-auto px-6 md:px-6 xl:px-24">
								{item.order % 2 ?
									<div className="sm:flex sm:mt-8 mb-10">
										<div className="mt-16 sm:mt-8 sm:w-full">
											<div className="grid gap-4 md:gap-2.5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
												<div>
													<img src={item.image} width="350" height="300" alt="We Love iReadify" />
												</div>
												<div className="col-span-1 xl:col-span-2 flex flex-wrap content-center">
													<h4 className="text-left text-purple-light font-sans font-semibold mb-6">{item.title}</h4>
													<p className="text-left text-subtitle1 text-gray-light mb-6 font-serif">{item.content}</p>
												</div>
											</div>
										</div>
									</div>
									:
									<div className="sm:flex sm:mt-8 mb-10">
										<div className="mt-16 sm:mt-8 sm:w-full sm:px-8">
											<div className="grid gap-4 md:gap-2.5 grid-cols-1 md:grid-cols-3 justify-items-center">
												<div className="col-span-2 flex flex-wrap content-center">
													<h4 className="text-left text-purple-light font-sans font-semibold mb-6">{item.title}</h4>
													<p className="text-left text-subtitle1 text-gray-light mb-8 font-serif">{item.content}</p>
												</div>
												<div>
													<img src={item.image} width="350" height="300" alt="We Love iReadify" />
												</div>
											</div>
										</div>
									</div>
								}

							</div>
							: null
					)
			}
			<div className="py-4 sm:flex bg-gradient-to-r from-blue-light to-blue-bright">
				<div className="sm:w-full">
					<div className="grid grid-cols-6 gap-1">
						<div className="col-start-1 col-end-7 flex justify-center">
							<h3 className="text-center text-white font-sans font-semibold mb-5">
								Other Facts
		               </h3>
						</div>
					</div>
					<div className="px-6 tb-landscape:px-6 lg:px-52 mb-10 grid gap-1 lg:gap-2.5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
						<div className="mb-16 grid justify-items-center">
							<img className="h-8 w-auto sm:h-10" src="/img/icons/launch.svg" width="50" height="50" alt="Launch" />
							<h5 className="font-semibold text-white mt-1 mb-2 font-sans">Launch</h5>
							<p className="text-center mt-3 text-body2 font-normal font-serif text-white">January 2021</p>
						</div>
						<div className="mb-16 grid justify-items-center">
							<img className="h-8 w-auto sm:h-10" src="/img/icons/subscription.svg" width="50" height="50" alt="Subscription Cost" />
							<h5 className="font-semibold text-white mt-1 mb-2 font-sans">Subscription Cost</h5>
							<p className="text-center mt-3 text-body2 font-normal font-serif text-white">$8.99 monthly</p>
						</div>
						<div className="mb-16 grid justify-items-center">
							<img className="h-8 w-auto sm:h-10" src="/img/icons/viewership.svg" width="50" height="50" alt="Target Viewership" />
							<h5 className="font-semibold text-white mt-1 mb-2 font-sans">Target Viewership</h5>
							<p className="text-center mt-3 text-body2 font-normal font-serif text-white">Birth-14-year old children</p>
						</div>
						<div className="mb-16 grid justify-items-center">
							<img className="h-8 w-auto sm:h-10" src="/img/icons/users.png" width="50" height="50" alt="Market Audience" />
							<h5 className="font-semibold text-white tb:mt-1 mt-6 mb-2 font-sans">Market Audience</h5>
							<p className="text-center tb:mt-3 mt-8 text-body2 font-normal font-serif text-white">Parents, Grandparents, childcare, educators</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center py-4 pb-40 bg-green-light">
				<div className="sm:w-2/3 text-center pt-16 pb-6">
					<h4 className="text-center text-purple-light font-sans font-semibold mb-3">Connect</h4>
					<p className="text-center text-gray-light mb-8 font-serif">Follow iReadify for new titles and a community committed to inspiring children.</p>
					<ul className="list-reset flex justify-center flex-1 items-center">
						<li className="mr-2">
							<Link href="#">
								<a className="whitespace-nowrap text-base font-medium text-gray-light hover:text-gray-900">
									<img className="h-8 w-auto sm:h-10" src="/img/social_icons/ico_facebook.svg" width={50} height={50} alt="Facebook" />
								</a>
							</Link>
						</li>
						<li className="mr-2">
							<Link href="#">
								<a className="whitespace-nowrap text-base font-medium text-gray-light hover:text-gray-900">
									<img className="h-8 w-auto sm:h-10" src="/img/social_icons/ico_instagram.svg" width={50} height={50} alt="Instagram" />
								</a>
							</Link>
						</li>
						<li className="mr-2">
							<Link href="#">
								<a className="whitespace-nowrap text-base font-medium text-gray-light hover:text-gray-900">
									<img className="h-8 w-auto sm:h-10" src="/img/social_icons/ico_twitter.svg" width={50} height={50} alt="Twitter" />
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default About


