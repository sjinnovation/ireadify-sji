import React from 'react'

const Skeleton = () => {
    return (
        <div>
            <div className="overflow-x-auto animate-pulse">
                <table className="w-full">
                    <tbody>
                        <tr className="bg-white border-b-8 border-green-light">
                            <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                <div className="flex justify-start">
                                    <div className="w-3/4 md:w-1/4">
                                       <div className="tbl-img">
                                            <div className="cursor-pointer bg-gray-300 opacity-20 h-40 w-28 flex items-center justify-center mr-4"></div>
                                       </div>
                                    </div>
                                    <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                        <div className="place-self-center ml-2 md:ml-12 lg:ml-7 sm:ml-2 xl:ml-2">
                                            <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">
                                                <div className="h-6  bg-gray-300 opacity-20 w-40">
                                                    </div>
                                            </h5>
                                            <div className="h-6  bg-gray-300 opacity-20 w-28"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><div className="h-6  bg-gray-300 opacity-20 w-12"></div></td>
                            <td className="pl-6 py-4 whitespace-no-wrap"> <div className="h-6  bg-gray-300 opacity-20 w-28"></div></td>
                            <td className="pl-6 cursor-pointer pr-2.5 py-4 whitespace-no-wrap"> <div className="h-6  bg-gray-300 opacity-20 w-12"></div></td>
                        </tr>
                        <tr className="bg-white border-b-8 border-green-light">
                            <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                <div className="flex justify-start">
                                    <div className="w-3/4 md:w-1/4">
                                       <div className="tbl-img">
                                            <div className="cursor-pointer bg-gray-300 opacity-20 h-40 w-28 flex items-center justify-center mr-4"></div>
                                       </div>
                                    </div>
                                    <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                        <div className="place-self-center ml-2 md:ml-12 lg:ml-7 sm:ml-2 xl:ml-2">
                                            <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">
                                                <div className="h-6  bg-gray-300 opacity-20 w-40">
                                                    </div>
                                            </h5>
                                            <div className="h-6  bg-gray-300 opacity-20 w-28"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><div className="h-6  bg-gray-300 opacity-20 w-12"></div></td>
                            <td className="pl-6 py-4 whitespace-no-wrap"> <div className="h-6  bg-gray-300 opacity-20 w-28"></div></td>
                            <td className="pl-6 cursor-pointer pr-2.5 py-4 whitespace-no-wrap"> <div className="h-6  bg-gray-300 opacity-20 w-12"></div></td>
                        </tr>
                        <tr className="bg-white border-b-8 border-green-light">
                            <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                <div className="flex justify-start">
                                    <div className="w-3/4 md:w-1/4">
                                       <div className="tbl-img">
                                            <div className="cursor-pointer bg-gray-300 opacity-20 h-40 w-28 flex items-center justify-center mr-4"></div>
                                       </div>
                                    </div>
                                    <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                        <div className="place-self-center ml-2 md:ml-12 lg:ml-7 sm:ml-2 xl:ml-2">
                                            <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">
                                                <div className="h-6  bg-gray-300 opacity-20 w-40">
                                                    </div>
                                            </h5>
                                            <div className="h-6  bg-gray-300 opacity-20 w-28"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><div className="h-6  bg-gray-300 opacity-20 w-12"></div></td>
                            <td className="pl-6 py-4 whitespace-no-wrap"> <div className="h-6  bg-gray-300 opacity-20 w-28"></div></td>
                            <td className="pl-6 cursor-pointer pr-2.5 py-4 whitespace-no-wrap"> <div className="h-6  bg-gray-300 opacity-20 w-12"></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Skeleton
