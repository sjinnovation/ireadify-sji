import Image from 'next/image';
import React, { useState } from 'react'
import Layout from '../../components/layout/Home-Layout'
import Link from 'next/link'
import Vimeo from '@u-wave/react-vimeo';

const Spotlight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
   setIsOpen(!isOpen);
  }
  const spotlightList = [
      {
         "_id": "1",
         "name": "Lee Merrill Byrd",
         "imageUrl": "/img/spotlight/spot1.png",
         "duration": "09:05",
         "author": "Monique Chedda, MD"
      },
      {
         "_id": "2",
         "name": "Lee Merrill Byrd",
         "imageUrl": "/img/spotlight/spot2.png",
         "duration": "07:25",
         "author": "Monique Chedda, MD"
      },
      {
         "_id": "3",
         "name": "Lee Merrill Byrd",
         "imageUrl": "/img/spotlight/spot3.png",
         "duration": "08:09",
         "author": "Monique Chedda, MD"
      },
      {
         "_id": "4",
         "name": "Lee Merrill Byrd",
         "imageUrl": "/img/spotlight/spot4.png",
         "duration": "09:05",
         "author": "Monique Chedda, MD"
      },
      {
         "_id": "5",
         "name": "Lee Merrill Byrd",
         "imageUrl": "/img/spotlight/spot5.png",
         "duration": "09:05",
         "author": "Monique Chedda, MD"
      },
      {
         "_id": "6",
         "name": "Lee Merrill Byrd",
         "imageUrl": "/img/spotlight/spot6.png",
         "duration": "09:05",
         "author": "Monique Chedda, MD"
      },
  ]
  return (
      <Layout>
         <div className="bg-green-light pb-10 flex min-h-screen">
            <div className="container mx-auto px-6 md:px-24">
               <div className="sm:flex">
                  <div className="sm:w-full sm:px-8">
                     <h3 className="text-purple-light font-sans font-semibold ml-6 my-6 text-center tb:text-center tb-landscape:text-center md:text-left">Videos</h3>
                     <div className="flex flex-wrap justify-center">
                        {spotlightList.map(function (spotlight, index) {
                        return (
                        <div>
                           <div className="flex-col relative mb-10 mx-3 pb-5 grid grid-cols-1 gap-2 duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-110 transition-shadow hover:shadow-xl">
                              <div className="cursor-pointer relative w-72 md:w-56 lg:w-72 h-56 mb-2 bg-green-light shadow-inner">
                                 <div className="inner-shadow cursor-pointer">
                                    <div className="h-52 bg-contain bg-no-repeat bg-center flex justify-center" style={{backgroundImage: "url(" + spotlight.imageUrl + ")"}}>
                                       <div className="flex flex-wrap content-center shadow-inner">
                                          <img className="" src="/img/icons/play.svg" width="75" height="75" alt="img" onClick={togglePopup}/>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex absolute justify-between p-2 shadow-inner top-0 w-full h-8">
                                    <div className="flex">
                                       <div className="w-16 h-7 flex justify-center mr-2 bg-gray-900 bg-opacity-10 block px-2 py-1 rounded-full ml-1">
                                          <span className="font-semibold text-subtitle2 text-white">{spotlight.duration}</span>
                                       </div>
                                    </div>
                                 </div>
                                 
                                 <div className="flex flex-col truncate">
                                    <h5 className="flex font-sans text-4xl font-semibold text-gray-700">{spotlight.name}</h5>
                                    <p className="flex font-serif text-small1 text-gray-500">{spotlight.author}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        )
                        })}
                     </div>
                     <div className="w-full justify-center flex">
                        <Link href="#">
                        <a className="rounded w-full my-2 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-darkest hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-small4 font-sans">More</a></Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {isOpen && 
         <div className="fixed z-10 inset-0 overflow-y-auto" onClick={togglePopup}>
            <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
               <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
               </div>
               <span className="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
               <div className="inline-block align-middle text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                  <div className="flex justify-center h-full">
                     <Vimeo className="px-6 md:px-0" video="503871052" autoplay/>
                     {/*<iframe className="tb:h-72 px-6 md:px-0" src="https://player.vimeo.com/video/495825032" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>*/}
                  </div>
               </div>
            </div>
         </div>
         }
      </Layout>
    )
}

export default Spotlight


