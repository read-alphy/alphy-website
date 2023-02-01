import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import SideFeedItem from './SideFeedItem';

function MainFeed(props) {
    const data = props.data
    const onClick = props.onClick
    const navigate = props.navigate
    const [searchText, setSearchText] = useState("")

    return (


        <div className="signed-in-feed ">
            <Tabs>
                <Tab title="" className=''>
 <form className="flex items-center w-11/12">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">

                    <input onChange={(e) => setSearchText(e.target.value)} type="text" id="simple-search" class="bg-gray-50 border border-slate-700 text-gray-900 text-sm rounded-l-lg rounded-r-s focus:ring-slate-500 focus:border-slate-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Search" required />
                </div>
                <button type="submit" class="p-2.5 text-sm font-medium border text-white bg-darker rounded-r-lg border-slate-700 hover:bg-slate-800 focus:ring-1 focus:outline-none focus:ring-slate-300 dark:bg-darker dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span class="sr-only">Search</span>
                </button>
                
                            {data
                                .filter((value) => {
                                if (searchText === "") {
                                    return value
                                } else if (value.title.toLowerCase().includes(searchText.toLowerCase())) {
                                    return value
                                }else{
                                    return null
                                }})
                                .map((item,index) => (
                                <SideFeedItem key={index} index={index} item={item} onClick={onClick} navigate={navigate}/>
                            ))}
                     
                </Tab>
            </Tabs>
        </div>
    )
}

export default MainFeed