import React from 'react'

const ActivitySkeleton = () => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full mb-4 animate-pulse">
                <thead>
                    <tr>
                    <th className="py-2 whitespace-no-wrap text-left text-purple-light text-5xl" colSpan="5"><div className="h-6  bg-white opacity-20 rounded w-32"></div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b-8 border-green-light">
                        <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                            <div className="flex justify-start">
                            <div className="w-3/4 md:w-1/4"><div className="cursor-pointer bg-gray-300 opacity-20 h-40 w-28 flex items-center justify-center mr-4"></div></div>
                            <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                <div className="place-self-center ml-2">
                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2"><div className="h-6  bg-gray-300 opacity-20 w-36"></div></h5>
                                    <div className="h-6  bg-gray-300 opacity-20 w-40"></div>
                                </div>
                            </div>
                            </div>
                        </td>

                        <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                        <div className="float-right pr-0 md:pr-12">
                            <div className="h-6 mb-2 bg-gray-300 opacity-20 w-28"></div>
                            <div className="h-6  bg-gray-300 opacity-20 w-24"></div>
                        </div>
                        </td>
                    </tr>
                    <tr className="bg-white border-b-8 border-green-light">
                        <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                            <div className="flex justify-start">
                            <div className="w-3/4 md:w-1/4"><div className="cursor-pointer bg-gray-300 opacity-20 h-40 w-28 flex items-center justify-center mr-4"></div></div>
                            <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                <div className="place-self-center ml-2">
                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2"><div className="h-6  bg-gray-300 opacity-20 w-36"></div></h5>
                                    <div className="h-6  bg-gray-300 opacity-20 w-40"></div>
                                </div>
                            </div>
                            </div>
                        </td>

                        <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                        <div className="float-right pr-0 md:pr-12">
                            <div className="h-6  bg-gray-300 opacity-20 w-24"></div>
                        </div>
                        </td>
                    </tr>
                    <tr className="bg-white border-b-8 border-green-light">
                        <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                            <div className="flex justify-start">
                            <div className="w-3/4 md:w-1/4"><div className="cursor-pointer bg-gray-300 opacity-20 h-20 w-28 flex items-center justify-center mr-4"></div></div>
                            <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                <div className="place-self-center ml-2">
                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2"><div className="h-6  bg-gray-300 opacity-20 w-36"></div></h5>
                                </div>
                            </div>
                            </div>
                        </td>

                        <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                        <div className="float-right pr-0 md:pr-12">
                            <div className="h-6 mb-2 bg-gray-300 opacity-20 w-28"></div>
                            <div className="h-6  bg-gray-300 opacity-20 w-24"></div>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>      
    )
}

export default ActivitySkeleton
