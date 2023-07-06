import React, { useState } from 'react';
import {Button, Input, Textarea} from "@material-tailwind/react";
import FeedItem from '../../components/ArticleComponents/FeedTabs/FeedItem';
import SkeletonItem from '../../components/ArticleComponents/FeedTabs/SkeletonItem';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PlaylistBot from "../../img/playlist_bot.png"

import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { set } from 'lodash';



export default function PlaylistCreation({playlistDescription , playlistTitle, setPlaylistDescription, setPlaylistTitle,sourceIDsPlaylist, setSourceIDsPlaylist, dataPlaylist, setDataPlaylist}){
    const [inputValue, setInputValue] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);  
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [searched, setSearched] = useState(false);
    const [typing, setTyping] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    
    const [editBasicInfo, setEditBasicInfo] = useState(false);
    const {currentUser} = useAuth();


    const getData = (offset, firstTime, hasMore) => {
    
        
		if (!hasMore) {
			return;
		}
		setIsLoading(true);
        if (/* inputValue.length>0 */ true) {
		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/sources/?q=${inputValue}&offset=${offset}&limit=${limit}`
			)
			.then((response) => {
            
				setHasMore(!(response.data.length < limit));
                
				if (firstTime) {
					setData(response.data);
				} else {
					setData([...data, ...response.data]);
				}
				setIsLoading(false);
			})
        }
        else{
            setData([])
            setIsLoading(false);
        }

	};
    const loadMore = () => {
			setOffset(offset + limit);
			getData(offset + limit, false, true);
    }
    const handleSubmit = () => {
        getData(0, true, true);
    }




useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500); // delay of 500ms

    return () => clearTimeout(timer); // this will clear the timer if the user keeps typing before the 500ms has passed
  }, [inputValue]);


  useEffect(() => {
    if (searchQuery) {
      // Call the search API/function here. Your backend code goes here.
      // fetch(`api/search?query=${searchQuery}`)...
      getData(0, true, true);
    }
  }, [searchQuery]);

const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			getData(0, true, true);
		}
	};
    return(
        <div className="px-4 sm:px-20 lg:px-0 lg:grid lg:grid-cols-5 lg:w-[70vw] lg:mt-10 ">
        <div className="col-span-2 flex justify-start  min-w-[300px]">
            <div className=" w-full min-w-[300px] ">
            <div className="flex flex-col ">
            
            <div className="mt-10 lg:mt-0 ">
                <a className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200  ease-in transition"  href={`/`}>
                <KeyboardArrowLeftIcon fontSize="small" className=""/>
                <span className="">Go Back</span>
                </a></div>
                <div className=" flex flex-row w-full items-center">
            <div class="relative w-full min-w-[200px] h-12 mt-10 ">
            
            <p className="text-zinc-700 dark:text-zinc-300 mb-2 ml-1">Title</p>

            <input value={playlistTitle}
            placeholder="Set a title..."
							onChange={(event) => setPlaylistTitle(event.target.value)} className="w-full text-l px-2 h-[50px] bg-white dark:bg-mildDarkMode border border-zinc-400 focus:border-green-400 focus:outline-none focus:ring-0 rounded-lg"/>
						
						 </div>

               {/*  <EditIcon className="items-center opacity-20 ml-5 cursor-pointer" fontSize="small"
                onClick={() => {
                    setEditBasicInfo(true);
                }}/> */}
  
</div>  
<div className="w-full">
<p className="text-zinc-700 dark:text-zinc-300 mb-2 mt-16 ml-1">Description</p>
                <textarea className={`min-h-[120px] rounded-lg bg-white border-zinc-400 dark:bg-mildDarkMode resize-none text-sm w-full text-top focus:border-green-400 focus:outline-none focus:ring-0`} 
                value={playlistDescription}
                /* onClick={ () => setEditBasicInfo(true)} */
                placeholder="Set a description for your playlist..."
                onBlur={() => setEditBasicInfo(false)}
                onChange={(event) => setPlaylistDescription(event.target.value)}
                 >
                
				</textarea>
                </div>
            
                
                </div>
                <div class=" mt-10 border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
                <p className="mt-4 lg:mt-10 mb-6 text-zinc-700 dark:text-zinc-300 ml-1">Curate your knowledge hub</p>
                <div className="w-full grid grid-cols-5 lg:grid-cols-6 ">
				<div class="col-span-5 lg:col-span-6 relative w-full min-w-[200px] h-12">
                    
							<input 
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder=" "
                            onKeyDown= {handleKeyDown}
							className="peer w-full  lg:w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-black dark:focus:border-r-green-400  dark:focus:border-l-green-400 dark:focus:border-b-green-400 focus:border-green-400 pl-8">


                            </input>
                            <label class={`${inputValue.length===0 ? "pl-6": ""}  peer-focus:pl-0 text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-green-400 before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-green-400 after:border-blue-gray-200 peer-focus:after:!border-green-400`}>Search from our database...</label>
                        <div class="grid place-items-center absolute text-blue-gray-500 top-2/4 left-3 -translate-y-2/4 w-5 h-5">
                        <SearchIcon className="text-zinc-400" fontSize="small"/>
                        </div>
                          
							
                           
                        
						 </div>
                       {/*   <Button type="submit"
                         size="sm"
							onClick={(e) => {
								handleSubmit();
							}} className="col-span-1 ml-4 bg-green-400 dark:bg-green-400 dark:text-zinc-300 text-sm w-12 items-center text-center flex justify-center ">
                                <SearchIcon fontSize="small"/></Button> */}
                         </div>
<div className="playlist-search max-h-[80vh] overflow-y-scroll mt-5">
                         {isLoading
								? data.length > 0
									? data
										.map((item, index) => <FeedItem  key={index} item={item} mainFeedInput={inputValue} fromPlaylist={"search"} dataPlaylist={dataPlaylist} setDataPlaylist={setDataPlaylist} sourceIDsPlaylist = {sourceIDsPlaylist} setSourceIDsPlaylist={setSourceIDsPlaylist}/>)
										.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))
									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: data.map((item, index) => <FeedItem key={index + 1000} item={item} fromPlaylist={"search"} dataPlaylist={dataPlaylist} setDataPlaylist={setDataPlaylist}sourceIDsPlaylist = {sourceIDsPlaylist} setSourceIDsPlaylist={setSourceIDsPlaylist} />)}
						</div>
						{hasMore && (
							<div className="w-full flex justify-center">
								{
									<button
										className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold underline"
										onClick={loadMore}
									>
										{'Load more'}
									</button>
								}
							</div>
						)}
                        {data.length ===0 &&
                             <p className="mt-5 mb-5 text-zinc-600 dark:text-zinc-300 flex flex-col"> 
                             <span>         Expand the scope of your knowledge hub by adding new content from the search bar.</span>
                                      <span className="mt-2">
                      If you can't find what you are looking for, you can submit new content from the <a className="text-green-400 underline" href="/">main page</a>.
                      </span>
                                      </p>
                        }
               


<div>
    
</div>

                </div>
            </div>
            
            <div className="col-span-3 grid-row-2 flex justify-start  lg:p-10 drop-shadow-sm">
            
                <div className=" lg:border-l w-full lg:px-10 mx-auto">
                <p className="mt-10 lg:mt-5 ml-2 text-lg font-bold text-zinc-700 dark:text-zinc-300">Knowledge Hub</p>
     <p className="mt-4 ml-2 mb-5 text-md text-zinc-700 dark:text-zinc-300 opacity-80">Add or remove content to change the scope of your chat assistant.</p>  
        


       
                {dataPlaylist.length > 0
									?  dataPlaylist
										.map((item, index) => <FeedItem  key={index} item={item} mainFeedInput={inputValue} fromPlaylist={"playlist"} dataPlaylist={dataPlaylist} setDataPlaylist={setDataPlaylist} />
                                        )				
                                        :
                                       null
                }


</div>
                </div>
             
                

      


        </div>
        
    )

}