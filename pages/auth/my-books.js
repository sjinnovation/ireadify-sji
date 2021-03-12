import React, { useEffect, useState, useContext } from 'react'
import { graphqlOperation, API, Auth, container } from 'aws-amplify';
import Layout from '../../components/layout/Home-Layout';
import { AuthContext } from '../../context/auth';
import { updateFavoriteBook } from '../../src/graphql/mutations'
import { listFavoriteBooks } from '../../src/graphql/queries'
import { useRouter } from 'next/router'
import { isDeleted, bookType, region, userRole } from "../../config/bootstarp"
import _ from 'lodash';
import Link from 'next/link'
import Skeleton from '../library/skeletonBooks';
import RemoveFavorite from '../library/removeFavorite';

const MyBooks = () => {

   const [isOpen, setIsOpen] = useState("favorites");
   function toggleTab(value) {
      setIsOpen(value)
   }
   const router = useRouter()
   const { keyword } = router.query

   const [books, setBooks] = useState()
   const [userCheckLoading, setUserCheckLoading] = useState(true);
   const [isBookLoading, setBookLoading] = useState(true);
   const [noBooks, setNoBooks] = useState(false)
   const [favBook, setFavBook] = useState([])
   const [keywordValue, setKeyWordValue] = useState({})
   const [markingFavorite, setMarkingFavorite] = useState(false)

   const { setUserDetails } = useContext(AuthContext)

   useEffect(() => {
      const checkUser = async () => {
         try {
            const user = await Auth.currentAuthenticatedUser()
            setUserDetails(user)

            let groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups && groups.includes(userRole.admin)) {
               router.push('/admin/author')
            }
            else {
               setUserCheckLoading(false)
               fetchBook(null)
            }

         } catch (error) {
            await router.push('/')
            // console.log(error)
         }
      }
      checkUser()
   }, [keyword])


   let fetchBook = async () => {
      setBookLoading(true)
      setNoBooks(false)

      const email = Auth.user.attributes.email

      const conditions = {
         filter: { isLiked: { eq: true }, email: { eq: email } }
      }

      let allFavoriteBooks = await API.graphql(graphqlOperation(listFavoriteBooks, {
         isDeleted: isDeleted.no,
         sortDirection: 'DESC',
         ...conditions
      }))

      var allFavBooks = allFavoriteBooks.data.listFavoriteBooks.items;

      setBooks(allFavBooks)
      if (allFavoriteBooks.data.listFavoriteBooks.items.length < 1) {
         setNoBooks(true)
      }
      setBookLoading(false)
      setMarkingFavorite(false)
   }

   let onFavoriteClick = async (id, bookId) => {
      setMarkingFavorite(true)
      const inputData = {
         id: id,
         isLiked: false
      }
      await API.graphql(graphqlOperation(updateFavoriteBook, { input: inputData }))
      let newBook = books;
      newBook.forEach(element => {
         if (element.id == bookId) {
            element.favorite.isLiked = likeValue;
         }
      })
      setBooks(newBook);
      fetchBook(false)
   }

   const recentBookList = [
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
         "favorite": false,
         "ratings": 2.2,
         "rated": false,
         "isAudioBook": true,
         "isEBook": true,
         "author": "Cheryl  Willis Hudson",
         "name": "Brave. Black. First",
         "imageUrl": "/img/books/book2.jpg",
      },
   ]

   return (
      userCheckLoading ? null :
         <Layout>
            <div className="bg-green-light pb-30 flex min-h-screen">
               <div className="container mx-auto px-6 md:px-20">
                  <div className="sm:flex my-10">
                     <div className="sm:w-full sm:px-8">
                        <div className="justify-items-center">
                           <div data-controller="tabs" data-tabs-active-tab="-mb-px border-l border-t border-r rounded-t">
                              <ul className="list-reset flex border-b-2">
                                 <li className={isOpen === "favorites" ? "mr-1 border-b-4 border-purple-light text-purple-light" : "mr-1 text-gray-light"} data-tabs-target="tab" data-action="" onClick={() => toggleTab("favorites")}>
                                    <span className="text-subtitle1 font-sans font-semibold inline-block py-2 px-4 cursor-pointer">Favorites</span>
                                 </li>
                                 <li className={isOpen === "recent" ? "mr-1 border-b-4 border-purple-light text-purple-light" : "mr-1 text-gray-light"} data-tabs-target="tab" data-action="" onClick={() => toggleTab("recent")}>
                                    <span className="text-subtitle1 font-sans font-semibold inline-block py-2 px-4 cursor-pointer">Recent</span>
                                 </li>
                              </ul>
                              <div style={{ display: isOpen === "favorites" ? "block" : "none" }} className="pt-8 pb-4" data-tabs-target="panel">
                                 {
                                    isBookLoading ? <Skeleton /> :
                                    markingFavorite === true ?  <RemoveFavorite /> :
                                       <div className="flex flex-wrap justify-center md:justify-start">
                                          {
                                             noBooks ?
                                                <div className="flex flex-col justify-center content-center">
                                                   <div><p className="text-lg text-center">No Books</p></div>
                                                </div>

                                                :
                                                books.map((item) => {
                                                   return (
                                                      <Link href={`/book/${item.id}`}>
                                                      <div key={item.id} className="flex-col relative mb-8 mx-3 pb-5 grid grid-cols-1 gap-4 duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-110 transition-shadow hover:shadow-xl">
                                                         <div className="relative w-48 h-60 mb-20 bg-green-400 shadow-inner">
                                                            <div className="inner-shadow img-book">
                                                               <img className="bg-gray-900 bg-opacity-10" src={item.books.image} alt={item.books.title} />
                                                            </div>
                                                            <div className="flex absolute justify-between p-2 shadow-inner top-0 w-full h-20 bg-ratings">
                                                               {
                                                                  item.isLiked === true ?
                                                                        <div className="flex cursor-pointer" onClick={() => onFavoriteClick(item.id, item.bookId)}>
                                                                           <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                              <path d="M20.84 5.08155C20.3292 4.57056 19.7228 4.1652 19.0554 3.88864C18.3879 3.61207 17.6725 3.46973 16.95 3.46973C16.2275 3.46973 15.5121 3.61207 14.8446 3.88864C14.1772 4.1652 13.5708 4.57056 13.06 5.08155L12 6.14155L10.94 5.08155C9.9083 4.04986 8.50903 3.47026 7.05 3.47026C5.59096 3.47026 4.19169 4.04986 3.16 5.08155C2.1283 6.11325 1.54871 7.51252 1.54871 8.97155C1.54871 10.4306 2.1283 11.8299 3.16 12.8616L4.22 13.9216L12 21.7016L19.78 13.9216L20.84 12.8616C21.351 12.3508 21.7563 11.7444 22.0329 11.0769C22.3095 10.4095 22.4518 9.69404 22.4518 8.97155C22.4518 8.24907 22.3095 7.53366 22.0329 6.8662C21.7563 6.19874 21.351 5.59231 20.84 5.08155Z" fill="#DB3B3E" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                        </div>
                                                                     :
                                                                        <div className="flex cursor-pointer">
                                                                           <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                              <path d="M20.8401 5.08155C20.3294 4.57056 19.7229 4.1652 19.0555 3.88864C18.388 3.61207 17.6726 3.46973 16.9501 3.46973C16.2276 3.46973 15.5122 3.61207 14.8448 3.88864C14.1773 4.1652 13.5709 4.57056 13.0601 5.08155L12.0001 6.14155L10.9401 5.08155C9.90843 4.04986 8.50915 3.47026 7.05012 3.47026C5.59109 3.47026 4.19181 4.04986 3.16012 5.08155C2.12843 6.11325 1.54883 7.51252 1.54883 8.97155C1.54883 10.4306 2.12843 11.8299 3.16012 12.8616L4.22012 13.9216L12.0001 21.7016L19.7801 13.9216L20.8401 12.8616C21.3511 12.3508 21.7565 11.7444 22.033 11.0769C22.3096 10.4095 22.4519 9.69404 22.4519 8.97155C22.4519 8.24907 22.3096 7.53366 22.033 6.8662C21.7565 6.19874 21.3511 5.59231 20.8401 5.08155V5.08155Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                        </div>
                                                               }
                                                               <div className="flex justify-center">
                                                                  {item.rated ?
                                                                     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="#FFD700" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                     </svg>
                                                                     :
                                                                     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                     </svg>
                                                                  }
                                                                  {/* <span className="ml-1 font-semibold text-subtitle1 text-white">{book.ratings}</span> */}
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
                                                               <h5 className="flex font-sans text-4xl font-semibold text-gray-700">{item.books.title}</h5>
                                                               <p className="flex font-serif text-small1 text-gray-500">{item.books.authorName}</p>
                                                            </div>
                                                         </div>
                                                      </div>
                                                      </Link>
                                                   )
                                                })}
                                       </div>
                                 }
                              </div>
                              <div style={{ display: isOpen === "recent" ? "block" : "none" }} className="pt-8 pb-4" data-tabs-target="panel">
                                 <div className="flex flex-wrap justify-center md:justify-start">
                                    {recentBookList.map(function (book, index) {
                                       return (
                                          <Link href="/book/BookDetails">
                                             <a>
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
                                                            </div>
                                                            :
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
                                                               </svg>
                                                            }
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
                                             </a>
                                          </Link>
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
         </Layout>
   )
}

export default MyBooks


