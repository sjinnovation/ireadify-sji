import React from 'react'

const BookSkeleton = () => {
    return (
        <div className="md:h-px py-2 md:py-16 bg-book-details bg-cover bg-no-repeat bg-center">
            <div className="container mx-auto px-6">
                <div className="sm:flex sm:mt-8 ">
                    <div className="animate-pulse sm:w-full sm:px-8 flex flex-col md:flex-row justify-center md:justify-between">
                        <div className="mt-0 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                            <div className="mx-0 tb:mx-4 md:ml-16 md:mr-32 grid justify-items-center">
                                <div className="h-96 w-64 px-4 md:px-0 sm:shadow-sm md:shadow-xl flex justify-center mb-4 md:mb-10">
                                    <div className="shadow-inner rounded align-middle border-none bg-white opacity-20 h-96 w-64"></div> 
                                </div>
                                <div className="flex justify-center mb-4 md:mb-0">
                                    <div className="rounded-full  bg-white opacity-20 h-14 w-14 flex items-center justify-center mr-4"></div>
                                    <div className="rounded-full  bg-white opacity-20 h-14 w-14 flex items-center justify-center mr-4"></div>
                                </div>
                            </div>
                            <div className="mb-10 md:mb-0 flex justify-center">
                                <div>
                                    <div className="h-6  bg-white opacity-20 rounded w-32"></div>
                                    <div className="h-10  bg-white opacity-20 rounded w-44 mt-2"></div>
                                    <div className="cursor-pointer flex-row inline-flex items-center mt-4">
                                        <div className="h-6  bg-white opacity-20 rounded w-36"></div>
                                    </div>  
                                    <div>
                                        <div className="h-6  bg-white opacity-20 rounded w-32"></div>
                                    </div>
                                    
                                    <div className="cursor-pointer flex-col inline-flex items-center mt-10">
                                        <div className="cursor-pointer rounded-full  bg-white opacity-20 h-14 w-14 flex items-center justify-center"></div>
                                    </div>
                                    <div className="cursor-pointer flex-col inline-flex ml-5 items-center">
                                        <div className=" cursor-pointer rounded-full  bg-white opacity-20 h-14 w-14 flex items-center justify-center "></div>
                                    </div>
                                    
                                    <div className="cursor-pointer justify-start flex my-4 md:my-10">
                                        <div className="rounded shadow-sm cursor-pointer   bg-white opacity-20 h-12 w-40 flex items-center justify-center "></div>
                                    </div>

                                    <div className="cursor-pointer justify-start flex md:my-10">
                                        <div className="rounded shadow-sm cursor-pointer   bg-white opacity-20 h-12 w-48 flex items-center justify-center "></div>
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

export default BookSkeleton
