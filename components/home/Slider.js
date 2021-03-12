import Link from 'next/link'
import Image from 'next/image'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import s3config from '../../config/s3config'

const Slider = () => {
	const { changeSignUpFormStatus } = useContext(AuthContext) 
    return (
    	<div className="md:h-px py-2 md:py-16 mb-14 bg-banner bg-auto md:bg-contain bg-no-repeat bg-center">
		    <div className="container mx-auto px-6">
		        <div className="sm:flex sm:mt-8 ">
		           	<div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
			            <div className="sm:w-full md:w-3/4 lg:w-3/4 md:mt-20">
			                <h3 className="text-left text-white font-sans font-semibold mb-11">
			                  Feel the magic in every book. Let your Imagination take you everywhere.
			                </h3>
			                <p className="text-left text-white mb-3 font-serif">
			                  Unlimited Reading 24/7
			                </p>
			                <a onClick={changeSignUpFormStatus} className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-5 py-4 border border-transparent rounded shadow-sm text-button font-semibold font-sans text-purple-bright bg-white hover:bg-white mb-10">
			                	GET 14 DAYS FREE</a>
			            </div>
			            <div className="sm:w-full md:w-3/4 lg:w-3/4">
			               <img src="/img/banner/group-device.png" width="600" height="400" alt="iReadify devices" />
			            </div>
		            </div>
		       </div>
		    </div>
		</div>     
    )
}

export default Slider


