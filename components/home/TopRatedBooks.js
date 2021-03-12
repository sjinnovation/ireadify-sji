import Image from 'next/image';
import Link from 'next/link'

const topRatedBooks = [
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": false,
        "ratings": 4.1,
        "rated": true,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Monique , MD",
        "name": "Bindiya in India",
        "imageUrl":"/img/top-rated-books/book1.png",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": true,
        "ratings": 3,
        "rated": false,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Monique , MD",
        "name": "All around us",
        "imageUrl":"/img/top-rated-books/book2.png",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": true,
        "ratings": 3.1,
        "rated": true,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Monique , MD",
        "name": "Ashti meets birdman al",
        "imageUrl":"/img/top-rated-books/book3.png",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": false,
        "ratings": 2.2,
        "rated": false,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Monique , MD",
        "name": "Brave. Black. First",
        "imageUrl":"/img/top-rated-books/book4.png",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": false,
        "ratings": 4,
        "rated": true,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Monique , MD",
        "name": "They call me Guero",
        "imageUrl":"/img/top-rated-books/book5.png",
    },
]

const TopRatedBooks = () => {
    return (   
    	<div className="container mx-auto px-6 md:px-24">
		    <div className="sm:flex sm:mt-8 ">
			    <div className="mt-4 md:mt-8 sm:w-full">
			         <div className="grid grid-cols-6 gap-4">
			            <div className="col-start-1 col-end-7 flex justify-center">
			               <h3 className="text-center md:text-left text-white font-sans font-semibold mb-5">
			                  <span className="text-purple-light">Magical </span> <span className="text-blue-bright">Stories </span><span className="text-purple-light">Await!</span>
			               </h3>
			            </div>
			         </div>
			        <div className="flex flex-wrap justify-center">
	                    {topRatedBooks.map(function (book, index) {
		                    return (
			                    <Link href="#"><a>
			                        <div className="flex-col relative mb-8 mx-3 pb-5 grid grid-cols-1 gap-4 duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-110 transition-shadow hover:shadow-xl">
			                            <div className="relative w-48 h-36 mb-2 bg-green-400 shadow-inner section-top-rated-book">
			                                <div className="inner-shadow img-top-rated-book">
			                                  	<img className="bg-gray-900 bg-opacity-10" src={book.imageUrl} width="350" height="450" alt="image" />
			                                </div>
			                                <div className="flex justify-center absolute -bottom-12 pt-4 pb-2 shadow-inner w-full bg-play">
			                                    <svg className="m-1 " width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				                                    <path d="M3.5 18V12C3.5 9.61305 4.44821 7.32387 6.13604 5.63604C7.82387 3.94821 10.1131 3 12.5 3C14.8869 3 17.1761 3.94821 18.864 5.63604C20.5518 7.32387 21.5 9.61305 21.5 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				                                    <path d="M21.5 19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21H18.5C17.9696 21 17.4609 20.7893 17.0858 20.4142C16.7107 20.0391 16.5 19.5304 16.5 19V16C16.5 15.4696 16.7107 14.9609 17.0858 14.5858C17.4609 14.2107 17.9696 14 18.5 14H21.5V19ZM3.5 19C3.5 19.5304 3.71071 20.0391 4.08579 20.4142C4.46086 20.7893 4.96957 21 5.5 21H6.5C7.03043 21 7.53914 20.7893 7.91421 20.4142C8.28929 20.0391 8.5 19.5304 8.5 19V16C8.5 15.4696 8.28929 14.9609 7.91421 14.5858C7.53914 14.2107 7.03043 14 6.5 14H3.5V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			                                    </svg>
			                                    <svg className="m-1" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				                                    <path d="M2.5 3H8.5C9.56087 3 10.5783 3.42143 11.3284 4.17157C12.0786 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.1839 19.4413 11.6213 18.8787C11.0587 18.3161 10.2956 18 9.5 18H2.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				                                    <path d="M22.5 3H16.5C15.4391 3 14.4217 3.42143 13.6716 4.17157C12.9214 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.8161 19.4413 13.3787 18.8787C13.9413 18.3161 14.7044 18 15.5 18H22.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			                                    </svg>
			                                </div>
			                            </div>
			                        </div>
			                    </a></Link>
		                    )
	                    })}
	                </div>
			    </div>
		    </div>
		</div>
    )
}

export default TopRatedBooks
