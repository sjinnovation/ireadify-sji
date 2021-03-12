import React from 'react'
import Link from 'next/link'
import { bookType } from '../../config/bootstarp'

const BooksByAuthor = ({ booksByAuthor, noOtherBooksByAuthor, onFavoriteClick, onNullFavoriteClick }) => {
   return (
      <div className="bg-green-light pb-30 flex">
         <div className="container mx-auto px-6">
            <div className="sm:flex my-10">
               <div className="sm:w-full sm:px-8">
                  <div className="justify-items-center">
                     <div className="container mx-auto px-6">
                        <div className="sm:flex">
                           <div className="sm:w-full">
                              <div className="grid grid-cols-6 gap-4">
                                 <div className="col-start-1 col-end-7 flex justify-center">
                                    <h3 className="text-left text-white font-sans font-semibold mb-5 text-center">
                                       <p className="text-6xl font-bold text-blue-800 font-serif mt-2 tracking-wide leading-8">{noOtherBooksByAuthor === true ? "No Books yet by this Author" : booksByAuthor.length > 0 ?  "Books by this Author" : "Book by this Author"}</p>
                                    </h3>
                                 </div>
                              </div>
                              <div className="flex flex-wrap justify-center">
                                 {booksByAuthor.slice(0, 5).map(function (book, index) {
                                    return (
                                       <div key={book.id}>

                                          <div className="flex-col relative mb-8 mx-3 pb-5 grid grid-cols-1 gap-4 duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-110 transition-shadow hover:shadow-xl">
                                             <div className="relative w-48 h-60 mb-20 bg-green-400 shadow-inner">
                                                <Link href={`/book/${book.id}`}>
                                                   <div className="cursor-pointer inner-shadow img-book">
                                                      <img className="bg-gray-900 bg-opacity-10" src={book.image} width="350" height="450" alt="image" />
                                                   </div>
                                                </Link>
                                                <div className="flex absolute justify-between p-2 shadow-inner top-0 w-full h-20 bg-ratings">
                                                {
                                                      book.favorite === null ?
                                                         <div className="flex cursor-pointer" onClick={() => onNullFavoriteClick(book.id)}>
                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                               <path d="M20.8401 5.08155C20.3294 4.57056 19.7229 4.1652 19.0555 3.88864C18.388 3.61207 17.6726 3.46973 16.9501 3.46973C16.2276 3.46973 15.5122 3.61207 14.8448 3.88864C14.1773 4.1652 13.5709 4.57056 13.0601 5.08155L12.0001 6.14155L10.9401 5.08155C9.90843 4.04986 8.50915 3.47026 7.05012 3.47026C5.59109 3.47026 4.19181 4.04986 3.16012 5.08155C2.12843 6.11325 1.54883 7.51252 1.54883 8.97155C1.54883 10.4306 2.12843 11.8299 3.16012 12.8616L4.22012 13.9216L12.0001 21.7016L19.7801 13.9216L20.8401 12.8616C21.3511 12.3508 21.7565 11.7444 22.033 11.0769C22.3096 10.4095 22.4519 9.69404 22.4519 8.97155C22.4519 8.24907 22.3096 7.53366 22.033 6.8662C21.7565 6.19874 21.3511 5.59231 20.8401 5.08155V5.08155Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                         </div> :
                                                      book.favorite.isLiked === true ?
                                                         <div className="flex cursor-pointer" onClick={() => onFavoriteClick(book.id, book.favorite.id, book.favorite.isLiked)}>
                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path d="M20.84 5.08155C20.3292 4.57056 19.7228 4.1652 19.0554 3.88864C18.3879 3.61207 17.6725 3.46973 16.95 3.46973C16.2275 3.46973 15.5121 3.61207 14.8446 3.88864C14.1772 4.1652 13.5708 4.57056 13.06 5.08155L12 6.14155L10.94 5.08155C9.9083 4.04986 8.50903 3.47026 7.05 3.47026C5.59096 3.47026 4.19169 4.04986 3.16 5.08155C2.1283 6.11325 1.54871 7.51252 1.54871 8.97155C1.54871 10.4306 2.1283 11.8299 3.16 12.8616L4.22 13.9216L12 21.7016L19.78 13.9216L20.84 12.8616C21.351 12.3508 21.7563 11.7444 22.0329 11.0769C22.3095 10.4095 22.4518 9.69404 22.4518 8.97155C22.4518 8.24907 22.3095 7.53366 22.0329 6.8662C21.7563 6.19874 21.351 5.59231 20.84 5.08155Z" fill="#DB3B3E" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                         </div>
                                                      :
                                                         <div className="flex cursor-pointer" onClick={() => onFavoriteClick(book.id, book.favorite.id, book.favorite.isLiked)}>
                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path d="M20.8401 5.08155C20.3294 4.57056 19.7229 4.1652 19.0555 3.88864C18.388 3.61207 17.6726 3.46973 16.9501 3.46973C16.2276 3.46973 15.5122 3.61207 14.8448 3.88864C14.1773 4.1652 13.5709 4.57056 13.0601 5.08155L12.0001 6.14155L10.9401 5.08155C9.90843 4.04986 8.50915 3.47026 7.05012 3.47026C5.59109 3.47026 4.19181 4.04986 3.16012 5.08155C2.12843 6.11325 1.54883 7.51252 1.54883 8.97155C1.54883 10.4306 2.12843 11.8299 3.16012 12.8616L4.22012 13.9216L12.0001 21.7016L19.7801 13.9216L20.8401 12.8616C21.3511 12.3508 21.7565 11.7444 22.033 11.0769C22.3096 10.4095 22.4519 9.69404 22.4519 8.97155C22.4519 8.24907 22.3096 7.53366 22.033 6.8662C21.7565 6.19874 21.3511 5.59231 20.8401 5.08155V5.08155Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                         </div>
                                                   }
                                                   <div className="flex justify-center">
                                                   {
                                                            book.averageRating === null ?
                                                               <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                               </svg> :

                                                               <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="#FFD700" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                               </svg>

                                                         }
                                                         {
                                                            book.averageRating === null ? null :
                                                               <span className="ml-1 pb-1 font-semibold text-subtitle1 text-white">{Math.round(book.averageRating * 10) / 10}</span>
                                                         }
                                                   </div>
                                                </div>
                                                <div className="flex justify-center absolute -bottom-12 pt-4 pb-2 shadow-inner w-full bg-play">
                                                   {book.bookType == bookType.AUDIO ?
                                                      <svg className="m-1 " width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M3.5 18V12C3.5 9.61305 4.44821 7.32387 6.13604 5.63604C7.82387 3.94821 10.1131 3 12.5 3C14.8869 3 17.1761 3.94821 18.864 5.63604C20.5518 7.32387 21.5 9.61305 21.5 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                         <path d="M21.5 19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21H18.5C17.9696 21 17.4609 20.7893 17.0858 20.4142C16.7107 20.0391 16.5 19.5304 16.5 19V16C16.5 15.4696 16.7107 14.9609 17.0858 14.5858C17.4609 14.2107 17.9696 14 18.5 14H21.5V19ZM3.5 19C3.5 19.5304 3.71071 20.0391 4.08579 20.4142C4.46086 20.7893 4.96957 21 5.5 21H6.5C7.03043 21 7.53914 20.7893 7.91421 20.4142C8.28929 20.0391 8.5 19.5304 8.5 19V16C8.5 15.4696 8.28929 14.9609 7.91421 14.5858C7.53914 14.2107 7.03043 14 6.5 14H3.5V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                      </svg>
                                                      :
                                                      <svg className="m-1" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M2.5 3H8.5C9.56087 3 10.5783 3.42143 11.3284 4.17157C12.0786 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.1839 19.4413 11.6213 18.8787C11.0587 18.3161 10.2956 18 9.5 18H2.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                         <path d="M22.5 3H16.5C15.4391 3 14.4217 3.42143 13.6716 4.17157C12.9214 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.8161 19.4413 13.3787 18.8787C13.9413 18.3161 14.7044 18 15.5 18H22.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                      </svg>
                                                   }
                                                </div>
                                                <div className="flex flex-col truncate">
                                                   <Link href={`/book/${book.id}`}><a><h5 className="cursor-pointer flex font-sans text-4xl font-semibold text-gray-700">{book.title}</h5></a></Link>
                                                   <Link href={`/author/${book.authorId}`}><a><p className="cursor-pointer flex font-serif text-small1 text-gray-500">{book.authorName}</p></a></Link>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
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
   )
}

export default BooksByAuthor
