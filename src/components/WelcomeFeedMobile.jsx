import React, { useState } from 'react'
import FeedItem from './Article_components/FeedItem'
import FeedMobileCard from './Article_components/FeedMobileCard'
import searchLogo from "../img/search.svg"

function FeedMobile({ data }) {

    const [searchText, setSearchText] = useState("")

    return (
        <div className='text-mainText'>
            <p className='mb-6 text-3xl font-semibold text-center'>Browse Our Database</p>

            <div className='px-4'>
                <div className='relative flex mb-4 space-x-2'>

                    <input onChange={(e) => setSearchText(e.target.value)} type="text" className='w-full py-2 pl-2 rounded-md outline-none bg-main dark:bg-gray-600 indent-3' placeholder="Search Alphy's database..." />

                    <div className='absolute flex items-center justify-center pl-2 mt-1.5 border-l right-2'>
                        <i className="text-xl ri-send-plane-fill"></i>
                    </div>


                </div>

                {data
                    .filter((value) => {
                        if (searchText === "") {
                            return value
                        } else if (value.title.toLowerCase().includes(searchText.toLowerCase())) {
                            return value
                        } else {
                            return null
                        }
                    })
                    .map((item, index) => (
                        <div className='mb-4'>
                            <FeedMobileCard key={index} item={item} index={index} />

                        </div>
                    ))}

            </div>
        </div>
    )
}

export default FeedMobile