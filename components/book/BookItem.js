import React, { useContext } from 'react';
import { bookType } from '../../config/bootstarp'
import { AnalyticsContext } from '../../context/analytics';
import Link from 'next/link'
import Rating from 'react-rating';

const BookItem = ({ bookDetails, checkBookType, changeAudioPlayerStatus, totalRatingsForBook, averageRating }) => {

   const { trackData, setTrackDataDetails, saveTrackDetails } = useContext(AnalyticsContext)

   function timeConvert(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + 'h ' + rminutes + 'm';
   }

   let playAudio = async () => {
      changeAudioPlayerStatus()
      let startTime = new Date()
      let trackDetails = {
         ...trackData,
         startTime: startTime
      }
      localStorage.setItem('startTime', startTime);
      localStorage.setItem('trackedData', JSON.stringify(trackData));
      await setTrackDataDetails(trackDetails, true)

   }

   const Rated = () =>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

   const NotRated = () =>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.001 1.33789L14.091 7.59789L21.001 8.60789L16.001 13.4779L17.181 20.3579L11.001 17.1079L4.82098 20.3579L6.00098 13.4779L1.00098 8.60789L7.91098 7.59789L11.001 1.33789Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>;


   return (
      <div>
         <div className="md:h-px py-2 md:py-16 bg-book-details bg-cover bg-no-repeat bg-center">
            <div className="container mx-auto px-6">
               <div className="sm:flex sm:mt-8 ">
                  <div className="sm:w-full sm:px-8 flex flex-col md:flex-row justify-center md:justify-between">
                     <div className="mt-0 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                        <div className="mx-0 tb:mx-4 md:ml-16 md:mr-32 grid justify-items-center">
                           <div className="h-96 w-64 px-4 md:px-0 sm:shadow-sm md:shadow-xl flex justify-center mb-4 md:mb-10">
                              <img className="shadow-inner rounded align-middle border-none" src={bookDetails.image} width={250} height={385} alt="image" />
                           </div>
                           <div className="flex justify-center mb-4 md:mb-0">
                              {
                                 checkBookType === bookType.AUDIO ?
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
                                 checkBookType === bookType.EPUB ?
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
                              <Link href={`/author/${bookDetails.authorId}`}>
                                 <p className="cursor-pointer text-small2 font-medium text-white font-serif">{bookDetails.authorName}</p>
                              </Link>
                              <p className="text-8xl font-bold text-white font-serif mt-2">{bookDetails.title}</p>
                              {
                                 totalRatingsForBook >= 1 ?
                                    <div>
                                       <div className="flex-row inline-flex items-center mt-4">
                                             <Rating
                                                emptySymbol={<NotRated />}
                                                fullSymbol={<Rated />}
                                                initialRating={averageRating}
                                                fractions={2}
                                                readonly
                                             />
                                          <p className="text-small6 font-light text-white font-serif ml-1"> {Math.round(averageRating * 10) / 10} {averageRating === 1 ? "star" : "stars"}</p>
                                       </div>
                                       <div>
                                          <p className="text-small6 font-light text-white font-serif mt-1">Based on {totalRatingsForBook} {totalRatingsForBook === 1 ? "rating" : "ratings"}</p>
                                       </div>
                                    </div>
                                    :
                                    <div>
                                       <p className="text-small6 font-light text-white font-serif mt-1">No Ratings Yet</p>
                                    </div>
                              }
                              {
                                 bookDetails.rating ?
                                    <div className="flex-col inline-flex items-center mt-10">
                                       <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M11.001 1.33789L14.091 7.59789L21.001 8.60789L16.001 13.4779L17.181 20.3579L11.001 17.1079L4.82098 20.3579L6.00098 13.4779L1.00098 8.60789L7.91098 7.59789L11.001 1.33789Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       <p className="text-small6 font-light text-white font-serif mt-2">{bookDetails.rating.myRating}</p>
                                    </div>
                                    : <div className="flex-col inline-flex items-center mt-10">
                                       <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M11.001 1.33789L14.091 7.59789L21.001 8.60789L16.001 13.4779L17.181 20.3579L11.001 17.1079L4.82098 20.3579L6.00098 13.4779L1.00098 8.60789L7.91098 7.59789L11.001 1.33789Z" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       <p className="text-small6 font-light text-white font-serif mt-2"></p>
                                    </div>
                              }
                              <div className="flex-col inline-flex ml-10 items-center">
                                 {
                                    checkBookType === bookType.AUDIO ?
                                       <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.00098 18.3379V12.3379C3.00098 9.95094 3.94919 7.66176 5.63702 5.97393C7.32484 4.2861 9.61403 3.33789 12.001 3.33789C14.3879 3.33789 16.6771 4.2861 18.3649 5.97393C20.0528 7.66176 21.001 9.95094 21.001 12.3379V18.3379" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M21.001 19.3379C21.001 19.8683 20.7903 20.377 20.4152 20.7521C20.0401 21.1272 19.5314 21.3379 19.001 21.3379H18.001C17.4705 21.3379 16.9618 21.1272 16.5868 20.7521C16.2117 20.377 16.001 19.8683 16.001 19.3379V16.3379C16.001 15.8075 16.2117 15.2988 16.5868 14.9237C16.9618 14.5486 17.4705 14.3379 18.001 14.3379H21.001V19.3379ZM3.00098 19.3379C3.00098 19.8683 3.21169 20.377 3.58676 20.7521C3.96184 21.1272 4.47054 21.3379 5.00098 21.3379H6.00098C6.53141 21.3379 7.04012 21.1272 7.41519 20.7521C7.79026 20.377 8.00098 19.8683 8.00098 19.3379V16.3379C8.00098 15.8075 7.79026 15.2988 7.41519 14.9237C7.04012 14.5486 6.53141 14.3379 6.00098 14.3379H3.00098V19.3379Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       :
                                       <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2.5 3H8.5C9.56087 3 10.5783 3.42143 11.3284 4.17157C12.0786 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.1839 19.4413 11.6213 18.8787C11.0587 18.3161 10.2956 18 9.5 18H2.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M22.5 3H16.5C15.4391 3 14.4217 3.42143 13.6716 4.17157C12.9214 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.8161 19.4413 13.3787 18.8787C13.9413 18.3161 14.7044 18 15.5 18H22.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                 }
                                 <p className="text-small6 font-light text-white font-serif mt-2">{timeConvert(bookDetails.duration)}</p>
                              </div>
                              <div onClick={playAudio} className="cursor-pointer justify-start flex my-4 md:my-10">
                                 <a className="rounded inline-flex justify-center shadow-sm px-14 py-3.5 bg-gradient-to-r from-purple-bright to-purple-bright hover:from-purple-light hover:to-blue-bright focus:outline-none sm:text-small2 text-small2 font-bold text-white font-serif">
                                    Listen
                                 </a>
                              </div>
                              <div className="flex-col inline-flex">
                                 <p className="text-small2 font-light text-white font-serif mb-4">Type: </p>
                                 <p className="text-small2 font-light text-white font-serif">Child age: </p>
                              </div>
                              <div className="flex-col inline-flex">
                                 <p className="text-small2 ml-10 font-semibold text-white font-serif mb-4">{checkBookType === bookType.AUDIO ? "Audiobook" : "Ebook"}</p>
                                 <p className="text-small2 ml-10 font-semibold text-white font-serif">{bookDetails.age.name}</p>
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
                                       <p className="text-small1 font-light text-black font-serif mt-4 tracking-wide leading-8">{bookDetails.description}</p>
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
                                                      <p className="text-small2 font-light text-gray-600 font-serif tracking-wide leading-8">{bookDetails.languages.name}</p>
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
                                                {
                                                   checkBookType === bookType.AUDIO ?
                                                   <tr>
                                                      <td className="pb-2 pr-4 whitespace-no-wrap">
                                                         <p className="text-small2 font-semibold font-light text-black font-serif tracking-wide leading-8">Narrator</p>
                                                      </td>
                                                      <td className="pb-2 whitespace-no-wrap">
                                                         <p className="text-small2 font-light text-gray-600 font-serif tracking-wide leading-8">{bookDetails.narrator}</p>
                                                      </td>
                                                    </tr>
                                                   
                                                   : null
                                                }
                                               
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BookItem
