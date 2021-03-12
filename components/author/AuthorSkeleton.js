import React from 'react'

const AuthorSkeleton = () => {
    return (
        <div className="md:h-px py-2 md:py-16 bg-book-details bg-cover bg-no-repeat bg-center">
            <div className="container mx-auto px-6">
                <div className="sm:flex sm:mt-8 ">
                    <div className="animate-pulse sm:w-full sm:px-8 flex flex-col md:flex-row justify-start">
                        <div className="mmt-0 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center md:justify-items-start">
                            <div className="mx-0 md:mr-40">
                                <div className="relative h-auto w-64 px-4 py-10 md:p-0 sm:shadow-sm md:shadow-xl flex justify-center mb-0 md:mb-10 md:mt-2 img-author">
                                    <div className="shadow-inner rounded align-middle border-none bg-white opacity-20 h-80 w-64"></div>
                                </div>
                            </div>
                            <div className="mb-10 md:mb-0 col-span-1 md:col-span-1 lg:col-span-2">
                                <div className="h-6  bg-white opacity-20 rounded w-32"></div>
                                <div className="h-10  bg-white opacity-20 rounded w-44 mt-2"></div>

                                <div className="cursor-pointer justify-start flex flex-col md:my-10 mt-10">
                                    <div className="rounded shadow-sm cursor-pointer   bg-white opacity-20 h-12 w-full mt-1 flex items-center justify-center "></div>
                                    <div className="rounded shadow-sm cursor-pointer   bg-white opacity-20 h-12 w-full mt-1 flex items-center justify-center "></div>
                                    <div className="rounded shadow-sm cursor-pointer   bg-white opacity-20 h-12 w-full mt-1 flex items-center justify-center "></div>
                                    <div className="rounded shadow-sm cursor-pointer   bg-white opacity-20 h-12 w-full mt-1 flex items-center justify-center "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorSkeleton
