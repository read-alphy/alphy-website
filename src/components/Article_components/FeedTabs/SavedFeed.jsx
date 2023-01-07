import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FeedItem from '../FeedItem'

function SavedFeed({ coins }) {


    const [searchText, setSearchText] = useState("")

    return (
        <div className='feed rounded-div my-10 py-4'>
            <div className='flex justify-end my-3'>
                <input onChange={(e) => setSearchText(e.target.value)} type="text" className='bg-gray-100 dark:bg-gray-600 rounded-md py-1 indent-3 outline-none' placeholder='Search' />
            </div>
            <table className='w-full border-collapse text-center'>
                <thead className='text-white'>
                </thead>
                <tbody className='dark:text-white'>
                    {coins.coins.filter((value) => {
                        if (searchText === "") {
                            return value
                        } else if (value.name.toLowerCase().includes(searchText.toLowerCase())) {
                            return value
                        }
                    }).map((coin) => (
                        <FeedItem key={coin.id} coin={coin} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SavedFeed