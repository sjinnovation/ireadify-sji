import Layout from '../../components/layout/Home-Layout'

const Search = () => {
    return (
      <Layout>
         <div className="bg-green-light pb-30 flex min-h-screen">
         <div className="bg-green-light pb-30 flex ">
            <div className="container mx-auto px-6 md:px-24">
               <div className="sm:flex my-10">
                  <div className="sm:w-full sm:px-8">
                     <div className="py-10 justify-items-center">
                        <h3 className="text-purple-light font-sans font-semibold mb-6 text-center md:px-4">Search result</h3>
                        <p className="text-body2 text-gray-light font-serif mb-6 text-center md:px-4">Search found 4 matches</p>
                        <div className="overflow-x-auto">
                           <table className="w-full">
                              <thead>
                                 <tr>
                                    <th className="pl-12 py-2 whitespace-no-wrap text-left text-gray-light text-body2">Title/Author</th>
                                    <th className="pl-12 md:pl-6 py-2 whitespace-no-wrap text-left text-gray-light text-body2">Min Age</th>
                                    <th className="pl-6 py-2 whitespace-no-wrap text-left text-gray-light text-body2">Max Age</th>
                                    <th className="pl-6 py-2 whitespace-no-wrap text-left text-gray-light text-body2">Length</th>
                                    <th className="pl-6 py-2 whitespace-no-wrap text-left text-green-light text-body2">Rating</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 md:w-1/4"><div className="tbl-img"><img className="" src="/img/books/book1.png" width="118" height="176" alt="Book" /></div></div>
                                        <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                           <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2 mr-2">Cat & Dog</h5>
                                           <p className="text-body2 text-gray-light font-serif leading-5 mr-2">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">7</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">9</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">30min</p></td>
                                    <td className="pl-6 pr-2.5 py-4 whitespace-no-wrap"><img className="" src="/img/icons/heart.png" width="36" height="32" alt="Rating" /></td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 md:w-1/4"><div className="tbl-img"><img className="" src="/img/books/book3.png" width="118" height="176" alt="Book" /></div></div>
                                        <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                            <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Cool Pets for Kids: Cats</h5>
                                            <p className="text-body2 text-gray-light font-serif leading-5">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">7</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">9</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">30min</p></td>
                                    <td className="pl-6 pr-2.5 py-4 whitespace-no-wrap"><img className="" src="/img/icons/filled-heart.png" width="36" height="32" alt="Rating" /></td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 md:w-1/4"><div className="tbl-img"><img className="" src="/img/books/book6.png" width="118" height="176" alt="Book" /></div></div>
                                        <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                            <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Persian Cats</h5>
                                            <p className="text-body2 text-gray-light font-serif leading-5">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">7</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">9</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">30min</p></td>
                                    <td className="pl-6 pr-2.5 py-4 whitespace-no-wrap"><img className="" src="/img/icons/heart.png" width="36" height="32" alt="Rating" /></td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 md:w-1/4"><div className="tbl-img"><img className="" src="/img/books/book7.png" width="118" height="176" alt="Book" /></div></div>
                                        <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                            <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">How to Speak Cat</h5>
                                            <p className="text-body2 text-gray-light font-serif leading-5">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">7</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">9</p></td>
                                    <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">30min</p></td>
                                    <td className="pl-6 pr-2.5 py-4 whitespace-no-wrap"><img className="" src="/img/icons/heart.png" width="36" height="32" alt="Rating" /></td>
                                 </tr>
                              </tbody>
                           </table>
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

export default Search


