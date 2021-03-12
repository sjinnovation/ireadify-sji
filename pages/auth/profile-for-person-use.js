import Layout from '../../components/layout/Home-Layout'

const ProfileForPersonUse = () => {
   return (
      <Layout>
         <div className="bg-green-light pb-30 flex min-h-screen">
            <div className="container mx-auto px-6 md:px-24">
               <div className="sm:flex my-10">
                  <div className="sm:w-full sm:px-8">
                     <div className="py-10 justify-items-center">
                        <h3 className="text-purple-light font-sans font-semibold mb-10 text-center md:px-4">Profile</h3>
                        <div className="overflow-x-auto">
                           <table className="w-full">
                              <thead>
                                 <tr>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Email</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <p className="text-body2 text-gray-light font-serif leading-5">example@email.com</p>
                                    </td>
                                    <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                 </tr>
                                 <tr>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Last visit to account</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <p className="text-body2 text-gray-light font-serif leading-5">20.09.2020</p>
                                    </td>
                                    <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                 </tr>
                                 <tr>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">History</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <p className="text-body2 text-gray-light font-serif leading-5">From 20.09.2019 to 20.09.2020</p>
                                    </td>
                                    <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                 </tr>
                                 <tr>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Password</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                    <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <button className="text-subtitle1 font-sans font-semibold text-purple-light focus:outline-none flex items-center float-right">
                                          <img src="/img/icons/edit.png" width={24} height={24} alt="Edit password" />
                                          <span className="ml-2 mr-0 md:mx-4">Edit password</span>
                                       </button>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Account status</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">Free Trial</p>
                                       <p className="text-body2 text-gray-light font-serif leading-5">Your subscription will expire 11/4/2020</p>
                                    </td>
                                    <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300"><button className="text-subtitle1 font-sans font-semibold text-purple-light focus:outline-none float-right">Cancel subscription</button></td>
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

export default ProfileForPersonUse


