import Image from 'next/image';
import Layout from '../../components/layout/Home-Layout'

const Activity = () => {
    return (
      <Layout>
         <div className="bg-green-light pb-30 flex min-h-screen">
            <div className="container mx-auto px-6 md:px-24">
               <div className="sm:flex my-10">
                  <div className="sm:w-full sm:px-8">
                     <div className="py-10 justify-items-center">
                        <h3 className="text-purple-light font-sans font-semibold mb-6 text-center md:px-4">Activity</h3>
                        <div className="flex justify-center mb-6">
                           <div className="px-4">
                              <h4 className="text-purple-light font-sans font-semibold mb-2 text-center">2</h4>
                              <p className="text-body2 text-gray-light font-serif">Books Read</p>
                           </div>
                           <div className="px-4">
                              <h4 className="text-purple-light font-sans font-semibold mb-2 text-center">1</h4>
                              <p className="text-body2 text-gray-light font-serif">Hours Read</p>
                           </div>
                           <div className="px-4">
                              <h4 className="text-purple-light font-sans font-semibold mb-2 text-center">4</h4>
                              <p className="text-body2 text-gray-light font-serif">Videos Watched</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center">
                           <div className="col-start-1 col-end-7 md:col-start-2 md:col-span-4 flex justify-center content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left cursor-pointer" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#BDBDBD" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                 <path stroke="none" d="M0 0h24v24H0z" />
                                 <polyline points="15 6 9 12 15 18" />
                              </svg>
                              <h4 className="text-5xl md:text-6xl text-gray-light font-sans font-semibold text-center py-2 md:py-0 px-1 md:px-4">November 9-15, 2020</h4>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right cursor-pointer" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#BDBDBD" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                 <path stroke="none" d="M0 0h24v24H0z" />
                                 <polyline points="9 6 15 12 9 18" />
                              </svg>
                           </div>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="w-full mb-4">
                              <thead>
                                 <tr>
                                    <th className="py-2 whitespace-no-wrap text-left text-purple-light text-5xl" colSpan="5">Nov 14, 2020</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book1.png" width="118" height="176" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                           <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Brave. Black. First</h5>
                                             <p className="text-body2 text-gray-light font-serif leading-5">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-12">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">4 mins</p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Time Read</p>
                                    </div>
                                    </td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book3.png" width="118" height="176" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                             <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Ashti</h5>
                                             <p className="text-body2 text-gray-light font-serif leading-5">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    
                                    <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-16">   
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2"></p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Browsed</p>
                                    </div>
                                    </td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book8.png" width="118" height="85" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                             <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Lee Merrill Byrd</h5>
                                             <p className="text-body2 text-gray-light font-serif leading-5"></p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    
                                    <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-12">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">40 seconds</p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Watch Time</p>
                                    </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table className="w-full mb-4">
                              <thead>
                                 <tr>
                                    <th className="py-2 whitespace-no-wrap text-left text-purple-light text-5xl" colSpan="5">Nov 12, 2020</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book9.png" width="118" height="85" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                             <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Name of video</h5>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="ml-2 pl-22 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-12">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">2 mins</p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Watch Time</p>
                                    </div>
                                    </td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book8.png" width="118" height="85" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                             <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Lee Merrill Byrd</h5>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="ml-2 pl-22 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-12">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">40 seconds</p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Watch Time</p>
                                    </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table className="w-full mb-4">
                              <thead>
                                 <tr>
                                    <th className="py-2 whitespace-no-wrap text-left text-purple-light text-5xl" colSpan="5">Nov 9, 2020</th>
                                  </tr>
                              </thead>
                              <tbody>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book4.png" width="118" height="176" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                             <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Bindiya in India</h5>
                                             <p className="text-body2 text-gray-light font-serif leading-5">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="ml-2 pl-22 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-12">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">4 mins</p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Time Read</p>
                                    </div>
                                    </td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book2.png" width="118" height="176" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                             <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Under Water</h5>
                                             <p className="text-body2 text-gray-light font-serif leading-5">Cheryl Willis Hudson</p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="ml-2 pl-22 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-16">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2"></p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Browsed</p>
                                    </div>
                                    </td>
                                 </tr>
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                      <div className="flex justify-start">
                                        <div className="w-3/4 small:w-5/12 md:w-1/4"><img className="" src="/img/books/book8.png" width="118" height="85" alt="Book" /></div>
                                        <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                          <div className="place-self-center ml-2">
                                             <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">Lee Merrill Byrd</h5>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="ml-2 pl-22 pr-2.5 py-4 whitespace-no-wrap">
                                    <div className="float-right pr-0 md:pr-12">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">40 seconds</p>
                                       <p className="text-body2 text-gray-lightest font-serif leading-5">Watch Time</p>
                                    </div>
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
      </Layout>
    )
}

export default Activity


