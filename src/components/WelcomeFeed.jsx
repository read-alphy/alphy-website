import React, { useState } from 'react'
import FeedItem from './Article_components/FeedItem'

function Feed({ data }) {

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
                        <th>Title</th>
                        <th>Source</th>
                        <th className='text-left'>Creator Name</th>
                        <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody className='main-page-feed-elements'>
                        {data
                        .filter((value) => {
                            if (searchText === "") {
                                return value
                            } else if (value.title.toLowerCase().includes(searchText.toLowerCase())) {
                                return value
                            }else{
                                return null
                            }})
                        .map((item, index) => (
                            <FeedItem key={index} item={item} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Feed