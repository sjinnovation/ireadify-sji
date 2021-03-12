import React from 'react'

const SkeletonFilter = () => {
    return (
        <div className="flex flex-wrap justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-5 mx-30 my-30 justify-between h-16 sm:h-12">
                <div className="animate-pulse relative flex mb-4 mx-8 bg-gray-300 opacity-5 h-full w-56"></div>
                <div className="animate-pulse relative flex mb-4 mx-8 bg-gray-300 opacity-5 h-full w-56"></div>
                <div className="animate-pulse relative flex mb-4 mx-8 bg-gray-300 opacity-5 h-full w-56"></div>
                <div className="animate-pulse relative flex mb-4 mx-8 bg-gray-300 opacity-5 h-full w-56"></div>
            </div>
        </div>
    )
}

export default SkeletonFilter