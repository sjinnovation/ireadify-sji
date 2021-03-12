import Image from 'next/image';
import Link from 'next/link'
import Layout from '../../components/layout/Home-Layout'

const ProfileForPupilUse = () => {
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
                                    <td className="sm:w-full md:w-80 pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Username</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <p className="text-body2 text-gray-light font-serif leading-5">Sakura</p>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="sm:w-full md:w-80 pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Last visit to account</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <p className="text-body2 text-gray-light font-serif leading-5">20.09.2020</p>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="sm:w-full md:w-80 pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">History</h5>
                                    </td>
                                    <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                       <p className="text-body2 text-gray-light font-serif leading-5">From 20.09.2019 to 20.09.2020</p>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <p className="py-10 text-center text-subtitle1 text-gray-light font-serif">
                              Click
                              <Link href={"/contact"}>
                              <a className="text-purple-bright"> here </a></Link>to contact Support.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>   
    )
}

export default ProfileForPupilUse


