
//import usestate
import React, { useState } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading';


export default function QuestionAnswering(source_id) {

    let displayLoading = "none"
    const [data, setData] = useState("");
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(data?.length === 0);

    const fetchData = async () => {
        try {
            displayLoading = "block"
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/summaries/${source_id}`);
            setData(response.data);
        } catch (error) {
            displayLoading = "none"
            console.error(`Error fetching data: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-blueLike border-blueLike border rounded-2xl p-5">

            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="text" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" autocomplete="off" required />
                <button onClick={fetchData} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ask the video</button>
            </div>


            {isLoading || data.length ? <div
                className="loading"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20vh',
                    display: displayLoading
                }}
            >
                <ReactLoading type="spinningBubbles" className="text-whiteLike" />
            </div> :
                <div className="text-whiteLike pt-10 pb-10">

                    {data}
                    <br></br>
                    <br></br>
                    {data}
                </div>}
        </div>
    )
}