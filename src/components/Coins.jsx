import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FeedItem from './Article_components/FeedItem'


function Coins({ coins }) {

    const [searchText, setSearchText] = useState("")

    return (
        <div className='main-page-feed-section'>
            <div className='main-page-feed-table-parent'>
                <div className='search-main-feed'>
                    <input onChange={(e) => setSearchText(e.target.value)} type="text" className='bg-gray-100 dark:bg-gray-600 rounded-md py-1 indent-3 outline-none' placeholder="Search Alphy's database..." />
                </div>

                <table className='main-page-feed'>
                    <thead className='header'>


                        <tr>

                            <th>#</th>

                            <th className='text-left'>Coin</th>

                            <th>Price</th>
                            <th>24h</th>
                        </tr>
                    </thead>
                    <tbody className='main-page-feed-elements'>
                        {coins.filter((value) => {
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
        </div>
    )
}

export default Coins