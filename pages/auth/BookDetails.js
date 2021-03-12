import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/layout/Home-Layout'

const bookDetails = {
    "_id": "5e4e2482803ef7134e2d3175",
    "favorite": false,
    "ratings": 4.1,
    "rated": true,
    "myRatings": 4.5,
    "totalRatings": 23,
    "isAudioBook": false,
    "isEBook": true,
    "readTime": "5h 20m",
    "author": "Monique Chedda, MD",
    "name": "Bindiya in India",
    "desc": "Stayed up late finishing this, just had t happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent  t happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HERStayed up  DO YOU BELIEVE HERStayed up  to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER Stayed up late finishing this, just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HERStayed up late finishing this,  just had to know what happened, brilliant final twist! Gripping page-turner with great characters’Sunday Times bestselling author B A PariShe says she’s innocent DO YOU BELIEVE HER",
    "imageUrl": "/img/books/Book5.jpg",
    "type": "Audio-Book",
    "age": "3-5 years",
    "language": "English",
    "isbn": "90213213213213213",
    "publisher": "JK Singh",
    "region": "US East",
}

const recommendedBookData = [
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": false,
        "ratings": 4.1,
        "rated": true,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Monique Cheddas, MD",
        "name": "Bindiya in India",
        "imageUrl": "/img/books/Book5.jpg",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": true,
        "ratings": 3,
        "rated": false,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Xelena Gonzalez",
        "name": "All around us",
        "imageUrl": "/img/books/Book2.jpg",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": true,
        "ratings": 3.1,
        "rated": true,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Carmen Rubin",
        "name": "Ashti meets birdman al",
        "imageUrl": "/img/books/Book3.jpg",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": false,
        "ratings": 4,
        "rated": true,
        "isAudioBook": true,
        "isEBook": true,
        "author": "David  Bowles",
        "name": "They call me Guero",
        "imageUrl": "/img/books/Book4.jpg",
    },
    {
        "_id": "5e4e2482803ef7134e2d3175",
        "favorite": false,
        "ratings": 2.2,
        "rated": false,
        "isAudioBook": true,
        "isEBook": true,
        "author": "Cheryl  Willis Hudson",
        "name": "Brave. Black. First",
        "imageUrl": "/img/books/Book5.jpg",
    },
]

const BookDetails = () => {
    return (
        <Layout>
           <div className="md:h-px py-2 md:py-16 bg-book-details bg-cover bg-no-repeat bg-center">
              <div className="container mx-auto px-6">
                 <div className="sm:flex sm:mt-8 ">
                    <div className="sm:w-full sm:px-8 flex flex-col md:flex-row justify-center md:justify-between">
                       <div className="mt-0 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                          <div className="mx-0 tb:mx-4 md:ml-16 md:mr-32 grid justify-items-center">
                             <div className="h-96 w-64 px-4 md:px-0 sm:shadow-sm md:shadow-xl flex justify-center mb-4 md:mb-10">
                                <img className="shadow-inner rounded align-middle border-none" src="/img/books/Book5.jpg" width={250} height={385} alt="image" />
                             </div>
                             <div className="flex justify-center mb-4 md:mb-0">
                                {
                                bookDetails.isAudioBook ?
                                <div className="rounded-full h-14 w-14 flex items-center justify-center bg-white mr-4">
                                   <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.50098 27.8379V18.8379C4.50098 15.2575 5.92329 11.8237 8.45503 9.29195C10.9868 6.76021 14.4206 5.33789 18.001 5.33789C21.5814 5.33789 25.0152 6.76021 27.5469 9.29195C30.0787 11.8237 31.501 15.2575 31.501 18.8379V27.8379" stroke="#DB3B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M31.501 29.3379C31.501 30.1335 31.1849 30.8966 30.6223 31.4592C30.0597 32.0218 29.2966 32.3379 28.501 32.3379H27.001C26.2053 32.3379 25.4423 32.0218 24.8797 31.4592C24.317 30.8966 24.001 30.1335 24.001 29.3379V24.8379C24.001 24.0422 24.317 23.2792 24.8797 22.7166C25.4423 22.154 26.2053 21.8379 27.001 21.8379H31.501V29.3379ZM4.50098 29.3379C4.50098 30.1335 4.81705 30.8966 5.37966 31.4592C5.94227 32.0218 6.70533 32.3379 7.50098 32.3379H9.00098C9.79663 32.3379 10.5597 32.0218 11.1223 31.4592C11.6849 30.8966 12.001 30.1335 12.001 29.3379V24.8379C12.001 24.0422 11.6849 23.2792 11.1223 22.7166C10.5597 22.154 9.79663 21.8379 9.00098 21.8379H4.50098V29.3379Z" stroke="#DB3B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                                </div>
                                :
                                <div className="rounded-full h-14 w-14 flex items-center justify-center bg-gray-100 bg-opacity-30 mr-4">
                                   <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.50098 27.8379V18.8379C4.50098 15.2575 5.92329 11.8237 8.45503 9.29195C10.9868 6.76021 14.4206 5.33789 18.001 5.33789C21.5814 5.33789 25.0152 6.76021 27.5469 9.29195C30.0787 11.8237 31.501 15.2575 31.501 18.8379V27.8379" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M31.501 29.3379C31.501 30.1335 31.1849 30.8966 30.6223 31.4592C30.0597 32.0218 29.2966 32.3379 28.501 32.3379H27.001C26.2053 32.3379 25.4423 32.0218 24.8797 31.4592C24.317 30.8966 24.001 30.1335 24.001 29.3379V24.8379C24.001 24.0422 24.317 23.2792 24.8797 22.7166C25.4423 22.154 26.2053 21.8379 27.001 21.8379H31.501V29.3379ZM4.50098 29.3379C4.50098 30.1335 4.81705 30.8966 5.37966 31.4592C5.94227 32.0218 6.70533 32.3379 7.50098 32.3379H9.00098C9.79663 32.3379 10.5597 32.0218 11.1223 31.4592C11.6849 30.8966 12.001 30.1335 12.001 29.3379V24.8379C12.001 24.0422 11.6849 23.2792 11.1223 22.7166C10.5597 22.154 9.79663 21.8379 9.00098 21.8379H4.50098V29.3379Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                                </div>
                                }
                                {
                                bookDetails.isEBook ?
                                <div className="rounded-full h-14 w-14 flex items-center justify-center bg-white mr-4">
                                   <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g opacity="0.8">
                                         <path d="M3.00098 5.33789H12.001C13.5923 5.33789 15.1184 5.97003 16.2436 7.09525C17.3688 8.22047 18.001 9.74659 18.001 11.3379V32.3379C18.001 31.1444 17.5269 29.9998 16.683 29.1559C15.839 28.312 14.6945 27.8379 13.501 27.8379H3.00098V5.33789Z" stroke="#DB3B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                         <path d="M33.001 5.33789H24.001C22.4097 5.33789 20.8836 5.97003 19.7583 7.09525C18.6331 8.22047 18.001 9.74659 18.001 11.3379V32.3379C18.001 31.1444 18.4751 29.9998 19.319 29.1559C20.1629 28.312 21.3075 27.8379 22.501 27.8379H33.001V5.33789Z" stroke="#DB3B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </g>
                                   </svg>
                                </div>
                                :
                                <div className="rounded-full h-14 w-14 flex items-center justify-center bg-gray-100 bg-opacity-30 ">
                                   <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g opacity="0.8">
                                         <path d="M3.00098 5.33789H12.001C13.5923 5.33789 15.1184 5.97003 16.2436 7.09525C17.3688 8.22047 18.001 9.74659 18.001 11.3379V32.3379C18.001 31.1444 17.5269 29.9998 16.683 29.1559C15.839 28.312 14.6945 27.8379 13.501 27.8379H3.00098V5.33789Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                         <path d="M33.001 5.33789H24.001C22.4097 5.33789 20.8836 5.97003 19.7583 7.09525C18.6331 8.22047 18.001 9.74659 18.001 11.3379V32.3379C18.001 31.1444 18.4751 29.9998 19.319 29.1559C20.1629 28.312 21.3075 27.8379 22.501 27.8379H33.001V5.33789Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </g>
                                   </svg>
                                </div>
                                }
                             </div>
                          </div>
                          <div className="mb-10 md:mb-0 flex justify-center">
                            <div>
                                 <p className="text-small2 font-medium text-white font-serif">{bookDetails.author}</p>
                                 <p className="text-8xl font-bold text-white font-serif mt-2">{bookDetails.name}</p>
                                 <div className="flex-row inline-flex items-center mt-4">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       <path d="M5.82 21.02L12 17.77V2L8.91 8.26L2 9.27L7 14.14L5.82 21.02Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11.001 1.33789L14.091 7.59789L21.001 8.60789L16.001 13.4779L17.181 20.3579L11.001 17.1079L4.82098 20.3579L6.00098 13.4779L1.00098 8.60789L7.91098 7.59789L11.001 1.33789Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-small6 font-light text-white font-serif ml-1">{bookDetails.ratings} stars</p>
                                 </div>
                                 <div>
                                    <p className="text-small6 font-light text-white font-serif mt-1">Based on {bookDetails.totalRatings} ratings</p>
                                 </div>
                                 <div className="flex-col inline-flex items-center mt-10">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11.001 1.33789L14.091 7.59789L21.001 8.60789L16.001 13.4779L17.181 20.3579L11.001 17.1079L4.82098 20.3579L6.00098 13.4779L1.00098 8.60789L7.91098 7.59789L11.001 1.33789Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-small6 font-light text-white font-serif mt-2">{bookDetails.myRatings}</p>
                                 </div>
                                 <div className="flex-col inline-flex ml-10 items-center">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M3.00098 18.3379V12.3379C3.00098 9.95094 3.94919 7.66176 5.63702 5.97393C7.32484 4.2861 9.61403 3.33789 12.001 3.33789C14.3879 3.33789 16.6771 4.2861 18.3649 5.97393C20.0528 7.66176 21.001 9.95094 21.001 12.3379V18.3379" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       <path d="M21.001 19.3379C21.001 19.8683 20.7903 20.377 20.4152 20.7521C20.0401 21.1272 19.5314 21.3379 19.001 21.3379H18.001C17.4705 21.3379 16.9618 21.1272 16.5868 20.7521C16.2117 20.377 16.001 19.8683 16.001 19.3379V16.3379C16.001 15.8075 16.2117 15.2988 16.5868 14.9237C16.9618 14.5486 17.4705 14.3379 18.001 14.3379H21.001V19.3379ZM3.00098 19.3379C3.00098 19.8683 3.21169 20.377 3.58676 20.7521C3.96184 21.1272 4.47054 21.3379 5.00098 21.3379H6.00098C6.53141 21.3379 7.04012 21.1272 7.41519 20.7521C7.79026 20.377 8.00098 19.8683 8.00098 19.3379V16.3379C8.00098 15.8075 7.79026 15.2988 7.41519 14.9237C7.04012 14.5486 6.53141 14.3379 6.00098 14.3379H3.00098V19.3379Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-small6 font-light text-white font-serif mt-2">{bookDetails.readTime}</p>
                                 </div>
                                 <div className="cursor-pointer justify-start flex my-4 md:my-10">
                                    <a className="rounded inline-flex justify-center shadow-sm px-14 py-3.5 bg-gradient-to-r from-purple-bright to-purple-bright hover:from-purple-light hover:to-blue-bright focus:outline-none sm:text-small2 text-small2 font-bold text-white font-serif">
                                    Listen
                                    </a>
                                 </div>
                                 <div className="flex-col inline-flex">
                                    <p className="text-small2 font-light text-white font-serif mb-4">Type: </p>
                                    <p className="text-small2 font-light text-white font-serif">Child age: </p>
                                 </div>
                                 <div className="flex-col inline-flex">
                                    <p className="text-small2 ml-10 font-semibold text-white font-serif mb-4">{bookDetails.type}</p>
                                    <p className="text-small2 ml-10 font-semibold text-white font-serif">{bookDetails.age}</p>
                                 </div>
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           <div className="bg-green-light pb-30 flex">
              <div className="container mx-auto px-6">
                 <div className="sm:flex my-10">
                    <div className="sm:w-full lg:px-8">
                       <div className="justify-items-center">
                          <div className="container mx-auto px-6">
                             <div className="sm:flex mt-4 lg:mt-8">
                                <div className="sm:w-full lg:px-8">
                                   <div className="grid gap-4 md:gap-2.5 grid-cols-1 justify-items-center">
                                      <div className="">
                                         <p className="text-6xl font-bold text-black font-serif tracking-wide leading-8">Description</p>
                                         <p className="text-small1 font-light text-black font-serif mt-4 tracking-wide leading-8">{bookDetails.desc}</p>
                                         <div className="overflow-x-auto mt-6 mb-10">
                                            <table className="w-full md:w-2/5 ">
                                               <thead>
                                                  <tr></tr>
                                               </thead>
                                               <tbody>
                                                  <tr>
                                                     <td className="pb-2 pr-4 whitespace-no-wrap">
                                                        <p className="text-small2 font-semibold font-light text-black font-serif tracking-wide leading-8">Language</p>
                                                     </td>
                                                     <td className="pb-2 whitespace-no-wrap">
                                                        <p className="text-small2 font-light text-gray-600 font-serif tracking-wide leading-8">{bookDetails.language}</p>
                                                     </td>
                                                  </tr>
                                                  <tr>
                                                     <td className="pb-2 pr-4 whitespace-no-wrap">
                                                        <p className="text-small2 font-semibold font-light text-black font-serif tracking-wide leading-8">Region</p>
                                                     </td>
                                                     <td className="pb-2 whitespace-no-wrap">
                                                        <p className="text-small2 font-light text-gray-600 font-serif tracking-wide leading-8">{bookDetails.region}</p>
                                                     </td>
                                                  </tr>
                                                  <tr>
                                                     <td className="pb-2 pr-4 whitespace-no-wrap">
                                                        <p className="text-small2 font-semibold font-light text-black font-serif tracking-wide leading-8">Publisher</p>
                                                     </td>
                                                     <td className="pb-2 whitespace-no-wrap">
                                                        <p className="text-small2 font-light text-gray-600 font-serif tracking-wide leading-8">{bookDetails.publisher}</p>
                                                     </td>
                                                  </tr>
                                                  <tr>
                                                     <td className="pb-2 pr-4 whitespace-no-wrap">
                                                        <p className="text-small2 font-semibold font-light text-black font-serif tracking-wide leading-8">ISBN</p>
                                                     </td>
                                                     <td className="pb-2 whitespace-no-wrap">
                                                        <p className="text-small2 font-light text-gray-600 font-serif tracking-wide leading-8">{bookDetails.isbn}</p>
                                                     </td>
                                                  </tr>
                                               </tbody>
                                            </table>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="container mx-auto px-6">
                             <div className="sm:flex">
                                <div className="sm:w-full">
                                   <div className="grid grid-cols-6 gap-4">
                                      <div className="col-start-1 col-end-7 flex justify-center">
                                         <h3 className="text-left text-white font-sans font-semibold mb-5 text-center">
                                            <p className="text-6xl font-bold text-blue-800 font-serif mt-2 tracking-wide leading-8">Recommendations</p>
                                         </h3>
                                      </div>
                                   </div>
                                   <div className="flex flex-wrap justify-center">
                                        {recommendedBookData.map(function (book, index) {
                                            return (
                                                <Link href="/auth/BookDetails"><a>
                                                    <div className="flex-col relative mb-8 mx-3 pb-5 grid grid-cols-1 gap-4 duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-110 transition-shadow hover:shadow-xl">
                                                        <div className="relative w-48 h-60 mb-20 bg-green-400 shadow-inner">

                                                            <div className="inner-shadow img-book">
                                                                <img className="bg-gray-900 bg-opacity-10" src={book.imageUrl} width="350" height="450" alt="image" />
                                                            </div>

                                                            <div className="flex absolute justify-between p-2 shadow-inner top-0 w-full h-20 bg-ratings">
                                                                {book.favorite ?
                                                                    <div className="flex">
                                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M20.84 5.08155C20.3292 4.57056 19.7228 4.1652 19.0554 3.88864C18.3879 3.61207 17.6725 3.46973 16.95 3.46973C16.2275 3.46973 15.5121 3.61207 14.8446 3.88864C14.1772 4.1652 13.5708 4.57056 13.06 5.08155L12 6.14155L10.94 5.08155C9.9083 4.04986 8.50903 3.47026 7.05 3.47026C5.59096 3.47026 4.19169 4.04986 3.16 5.08155C2.1283 6.11325 1.54871 7.51252 1.54871 8.97155C1.54871 10.4306 2.1283 11.8299 3.16 12.8616L4.22 13.9216L12 21.7016L19.78 13.9216L20.84 12.8616C21.351 12.3508 21.7563 11.7444 22.0329 11.0769C22.3095 10.4095 22.4518 9.69404 22.4518 8.97155C22.4518 8.24907 22.3095 7.53366 22.0329 6.8662C21.7563 6.19874 21.351 5.59231 20.84 5.08155Z" fill="#DB3B3E" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                    </div> :
                                                                    <div className="flex">
                                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M20.8401 5.08155C20.3294 4.57056 19.7229 4.1652 19.0555 3.88864C18.388 3.61207 17.6726 3.46973 16.9501 3.46973C16.2276 3.46973 15.5122 3.61207 14.8448 3.88864C14.1773 4.1652 13.5709 4.57056 13.0601 5.08155L12.0001 6.14155L10.9401 5.08155C9.90843 4.04986 8.50915 3.47026 7.05012 3.47026C5.59109 3.47026 4.19181 4.04986 3.16012 5.08155C2.12843 6.11325 1.54883 7.51252 1.54883 8.97155C1.54883 10.4306 2.12843 11.8299 3.16012 12.8616L4.22012 13.9216L12.0001 21.7016L19.7801 13.9216L20.8401 12.8616C21.3511 12.3508 21.7565 11.7444 22.033 11.0769C22.3096 10.4095 22.4519 9.69404 22.4519 8.97155C22.4519 8.24907 22.3096 7.53366 22.033 6.8662C21.7565 6.19874 21.3511 5.59231 20.8401 5.08155V5.08155Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>

                                                                    </div>

                                                                }
                                                                <div className="flex justify-center">
                                                                    {book.rated ?
                                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="#FFD700" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        :
                                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>}
                                                                    <span className="ml-1 font-semibold text-subtitle1 text-white">{book.ratings}</span>
                                                                </div>
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

                                                            <div className="flex flex-col truncate">
                                                                <h5 className="flex font-sans text-4xl font-semibold text-gray-700">{book.name}</h5>
                                                                <p className="flex font-serif text-small1 text-gray-500">{book.author}</p>
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
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </Layout>
    )
}

export default BookDetails