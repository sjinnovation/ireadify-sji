import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/auth';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router'
import _ from "lodash/fp";
import Rating from 'react-rating';
import { createRating } from '../../api/ratings/mutations'

const Ratings = ({ bookItemId, changeRatingsPopUpStatus }) => {

	const router = useRouter()
	const { redirect } = router.query
	const [myRate, setMyRate] = useState()
	const [currentBookId, setBookId] = useState(bookItemId)

	let cancelRatings = () => {
		changeRatingsPopUpStatus()
	}

	let rateBook = async (rate) => {
		const email = Auth.user.attributes.email
		const inputData = {
			isRated: true,
			bookId: currentBookId,
			email: email,
			myRating: rate,
		}
		await API.graphql(graphqlOperation(createRating, { input: inputData }))
		changeRatingsPopUpStatus()
		window.location.reload();
	}


	const Rated = () =>
		<svg className="cursor-pointer m-3 text-yellow-300" width="24" height="25" viewBox="0 0 24 25" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
			<path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>;

	const NotRated = () =>
		<svg className="cursor-pointer m-3 text-gray-300" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>;

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div className="inline-block content-center align-bottom items-center justify-center bg-gray-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

					<div className="flex flex-col items-center">
						<div className="flex flex-row justify-center items-center p-2.5 static w-60 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0 mx-8">
							<h4 className="font-sans text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Ratings</h4>
						</div>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex flex-row justify-center items-center p-2.5 static w-60 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0">
							<h2 className="font-sans text-center font-semibold items-center tracking-tight flex-none text-gray-600 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle2">Rate this book based on your experience</h2>
						</div>
					</div>

					<div className="flex justify-center flex-row p-1 pb-4">
						<Rating
							emptySymbol={<NotRated />}
							fullSymbol={<Rated />}
							onChange={(rate) => setMyRate(rate)}
						/>
					</div>

					<div onClick={() => rateBook(myRate)} className="cursor-pointer justify-center items-center flex">
						<a className="rounded inline-flex justify-center shadow-sm px-6 py-3 bg-gradient-to-r from-purple-bright to-purple-bright hover:from-purple-light hover:to-blue-bright focus:outline-none sm:text-small2 text-small2 font-bold text-white font-serif">
							Submit
                                 </a>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex flex-row justify-center items-center static flex-none order-0 flex-grow-0 my-0">
							<h3 onClick={cancelRatings} className="cursor-pointer font-sans underline italic text-center items-center tracking-tight flex-none text-gray-400 order-0 flex-grow-0 my-2.5 mx-0 text-xs">Maybe later</h3>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Ratings
