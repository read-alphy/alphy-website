import moment from 'moment'
import { useEffect, useState } from 'react'
import './SideFeedItem.css'

const SkeletonItem = () => {
    return (
        <div className="flex flex-row items-center justify-start cursor-pointer w-full h-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md mb-2 transition duration-200 ease-in-out hover:shadow-md  hover:scale-105 transform hover:translate-x-2 hover:translate-y-2 mr-auto ml-auto">
          <div className="w-1/2 min-w-150 mr-3 ">
            <div className="flex items-center justify-center h-0 rounded-md bg-gray-600 animate"
            style={{paddingBottom: '50%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
            </div>
          </div>
          <div className="text-xs max-w-250">
            <div className="text-sm video-text text-mainText bg-gray-600 mb-1 h-5 w-40 br-1 animate"></div>
            <div className="text-sm video-text text-mainText bg-gray-600 mb-2 h-5 w-32 br-1 animate"></div>
            <div className="bg-gray-600 h-3 w-15 br-1 animate"></div>
            <div className="bg-gray-600 h-2 w-16 br-1 animate"></div>
          </div>
        </div>
      )
}

export default SkeletonItem