import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import Layout from '../../components/layout/Home-Layout'

const Blog = ({ initialblogList }) => {
	const [blogList, setBlogList] = useState(initialblogList);
	const [page, setPage] = useState(1);
	const fetchNewBlogList = async (page) => {
		//const req = await fetch('https://.../posts&page=${page}');
		//const newBlogList = await req.json();
		const newBlogList = [
			{
				"_id": "1",
				"name": "iReadify Company Profile",
				"imageUrl": "/img/blog/profile.png",
				"date": "20.10.2020",
				"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
			},
			{
				"_id": "2",
				"name": "iReadify Press Release",
				"imageUrl": "/img/blog/press.png",
				"date": "10.11.2020",
				"description": "Experience the magic in books with diverse representation. iReadify has a growing collection of children’s books that both kids and the entire family will love."
			},
			{
				"_id": "3",
				"name": "iReadify Company Profile",
				"imageUrl": "/img/blog/company-profile.png",
				"date": "20.09.2020",
				"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
			},
		]
		return setBlogList(newBlogList);
	};
	function handleClick(value) {
		setPage(value)
		fetchNewBlogList(value);
	}
	return (
		<Layout>
			<div className="h-64 py-20 bg-about-banner bg-auto md:bg-contain bg-no-repeat bg-center">
				<div className="container mx-auto px-6">
					<div className="sm:flex">
						<div className="sm:w-full sm:px-8 flex flex-col justify-center">
							<h3 className="text-center text-white font-sans font-semibold mb-2">
								iReadify Blog
			               </h3>
							<h5 className="text-center text-white font-sans font-semibold mb-2">
								Learning Together
			               </h5>
			               <h5 className="text-center text-white font-sans font-semibold mb-2">
								ideas, tips and so much more
			               </h5>
						</div>
					</div>
				</div>
			</div>
			<div className="pb-4">
				<div className="container mx-auto px-6 md:px-24">
					<div className="sm:flex">
						<div className="sm:w-full sm:px-8">
							<div className="grid gap-4 md:gap-2.5 grid-cols-1 justify-items-center">
								<div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 pt-8">
									{blogList.map(function (blog, index) {
										return (
											<article className="flex flex-col my-4" key={blog._id}>
												<Link href={`/blog/${blog._id}`}>
													<a className="hover:opacity-75">
														<img src={blog.imageUrl} width="435" height="306" alt="iReadify Company Profile" />
														<div className="bg-white flex flex-col justify-start py-6">
															<p className="pb-3 text-subtitle1 text-gray-500 font-serif">{blog.date}</p>
															<h5 className="text-5xl font-semibold text-gray-700 pb-3 font-sans">{blog.name}</h5>
															<p className="text-subtitle1 text-gray-500 font-serif">{blog.description}</p>
														</div>
													</a>
												</Link>
											</article>
										)
									})}
								</div>
								<div className="flex flex-col items-center my-12">
									<div className="flex text-gray-700">
										<div className="h-8 w-8 mr-1 flex justify-center items-center  cursor-pointer" onClick={() => handleClick(page - 1)}>
											<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-left w-8 h-8">
												<polyline points="15 18 9 12 15 6"></polyline>
											</svg>
										</div>
										<div className="flex h-8 font-medium ">
											<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent" onClick={() => handleClick(1)}>1</div>
											<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">...</div>
											<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent bg-purple-400 text-white" onClick={() => handleClick(5)}>5</div>
											<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent" onClick={() => handleClick(6)}>6</div>
											<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent" onClick={() => handleClick(7)}>7</div>
											<div className="w-8 h-8 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-orange-600" onClick={() => handleClick(2)}>2</div>
										</div>
										<div className="h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer" onClick={() => handleClick(page + 1)}>
											<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-right w-8 h-8">
												<polyline points="9 18 15 12 9 6"></polyline>
											</svg>
										</div>
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

export async function getStaticProps() {
	//const res = await fetch('https://.../posts&page=1')
	//const initialblogList = await res.json()
	const initialblogList = [
		{
			"_id": "1",
			"name": "iReadify Company Profile",
			"imageUrl": "/img/blog/profile.png",
			"date": "20.10.2020",
			"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
		},
		{
			"_id": "2",
			"name": "iReadify Press Release",
			"imageUrl": "/img/blog/press.png",
			"date": "10.11.2020",
			"description": "Experience the magic in books with diverse representation. iReadify has a growing collection of children’s books that both kids and the entire family will love."
		},
		{
			"_id": "3",
			"name": "iReadify Company Profile",
			"imageUrl": "/img/blog/company-profile.png",
			"date": "20.09.2020",
			"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
		},
		{
			"_id": "4",
			"name": "iReadify Company Profile",
			"imageUrl": "/img/blog/child.png",
			"date": "20.10.2020",
			"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
		},
		{
			"_id": "5",
			"name": "iReadify Press Release",
			"imageUrl": "/img/blog/press.png",
			"date": "10.11.2020",
			"description": "Experience the magic in books with diverse representation. iReadify has a growing collection of children’s books that both kids and the entire family will love."
		},
		{
			"_id": "6",
			"name": "iReadify Company Profile",
			"imageUrl": "/img/blog/company-profile.png",
			"date": "20.09.2020",
			"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
		},
		{
			"_id": "7",
			"name": "iReadify Company Profile",
			"imageUrl": "/img/blog/profile.png",
			"date": "20.10.2020",
			"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
		},
		{
			"_id": "8",
			"name": "iReadify Press Release",
			"imageUrl": "/img/blog/press.png",
			"date": "10.11.2020",
			"description": "Experience the magic in books with diverse representation. iReadify has a growing collection of children’s books that both kids and the entire family will love."
		},
		{
			"_id": "9",
			"name": "iReadify Company Profile",
			"imageUrl": "/img/blog/company-profile.png",
			"date": "20.09.2020",
			"description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
		},
	]
	return {
		props: {
			initialblogList
		},
	}
}
export default Blog


