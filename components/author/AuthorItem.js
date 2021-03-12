const AuthorItem = ({authorDetails}) => {
   return (
      <div className="py-2 md:py-16 bg-book-details bg-cover bg-no-repeat bg-center">
         <div className="container mx-auto px-6">
            <div className="sm:w-full sm:px-8 flex flex-col md:flex-row justify-start">
                  <div className="mt-0 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center md:justify-items-start">
                     <div className="mx-0 md:mr-40">
                        <div className="relative h-auto w-64 px-4 py-10 md:p-0 sm:shadow-sm md:shadow-xl flex justify-center mb-0 md:mb-10 md:mt-2 img-author">
                           <img className="" src={authorDetails.image} width={250} height={385} alt="image" />
                           {/* <div className="cursor-pointer flex absolute rounded-full bg-white h-20 w-20 items-center justify-center bottom-16 md:bottom-10 -right-4 md:-right-8 pl-1">
                              <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M2.75098 2.33301L32.001 21.9997L2.75098 41.6663V2.33301Z" stroke="#364185" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </div> */}
                        </div>
                     </div>
                     <div className="mb-10 md:mb-0 col-span-1 md:col-span-1 lg:col-span-2">
                        <p className="text-8xl font-bold text-white font-serif mb-2">{authorDetails.name}</p>
                        <p className="text-small2 font-medium text-white font-serif mb-4">{authorDetails.books.items.length} Books</p>
                        <p className="text-small2 font-medium text-white font-serif">{authorDetails.description}</p>
                     </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AuthorItem
