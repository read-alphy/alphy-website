import './FeedItem.css';
import Twitter from '../../../img/twitter_spaces.png';
import axios from 'axios';
import { useState } from 'react';
import {Button} from "@material-tailwind/react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { set } from 'lodash';

const FeedItem = ({item, setCollapsed, myBookmarks, currentUser,sideFeed,fromPlaylist, dataPlaylist,setDataPlaylist,sourceIDsPlaylist,setSourceIDsPlaylist}) => {
	const source_id = item.source_id;
	
	let formattedDate = ""
	const inputDate = item!==undefined && item.added_ts!==undefined &&  item.added_ts.substring(0, 10)
	const [removed,setRemoved] = useState(false)
	if (inputDate !== undefined && item!==undefined && item.added_ts!==undefined) {
		const parts = inputDate.split("-");
		formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`
	}

	

	let imageUrl;
	if (item.source_type === 'yt') {
		imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`;
	} else if (item.source_type === 'sp') {
		imageUrl = Twitter;
	}

	const removeBookmark =  () => {
		axios.patch(
			`${process.env.REACT_APP_API_URL}/sources/${item.source_type}/${item.source_id}/bookmark?bookmark=${removed===false?false:true}`,
			{},
	{
						headers: {
							'accept': 'application/json',
							'id-token': currentUser.accessToken	,
						}
						}
			
			).then((response) => {
			
				setRemoved(!removed)
			})
	}


	return (
		<div className={`grid border-b-0 w-full md:w-full `}>
			{item.source_type !== "up"
				?
				!myBookmarks ? 
				<a href={fromPlaylist===undefined && `/${item.source_type}/${source_id}`} >
					<div className="flex w-full ">
						<div
							className={`grid ${fromPlaylist==="playlist" ? "grid-cols-4 cursor-default" : "grid-cols-3"} ${fromPlaylist===undefined && "lg:grid-cols-2 sm:hover:scale-10 transform sm:hover:translate-x-2"} flex ${((dataPlaylist!==undefined && dataPlaylist.includes(item) && fromPlaylist==="search") || (sourceIDsPlaylist!==undefined && sourceIDsPlaylist.includes(item.source_id)))&&  "border-4 border-green-400"} flex-row items-center justify-start cursor-pointer w-full h-full  p-2 rounded-md mb-2  transition duration-200 ease-in-out  mr-auto ml-auto`}
							onClick={() => {


								// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

								if(fromPlaylist===undefined){ setCollapsed(true)}
								else{
								
								if(fromPlaylist==="search"){

									if(dataPlaylist.includes(item) || sourceIDsPlaylist.includes(item.source_id)){
										
										const index = dataPlaylist.indexOf(item)
										dataPlaylist.splice(index,1)
										setDataPlaylist([...dataPlaylist])
										const index2 = sourceIDsPlaylist.indexOf(item.source_id)
										sourceIDsPlaylist.splice(index2,1)
										setSourceIDsPlaylist([...sourceIDsPlaylist])

									}
									else{
										setDataPlaylist([...dataPlaylist,item])
										setSourceIDsPlaylist([...sourceIDsPlaylist,item.source_id])
									}
								}
							
								
							}
							}}
							target="_blank"
						>
							<div className={`col-span-1  min-w-[50px] max-w-[300px] mr-3`}>
								<div
									className="flex items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600"
									style={{
										backgroundImage: `url(${imageUrl})`,
										paddingBottom: '50%',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',

									}}
								></div>
							</div>

							<div className={`col-span-2 ${!fromPlaylist && "lg:col-span-1"} justify-start text-xs`} >
							
								
								{(item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true)) || (fromPlaylist==="playlist" && item.source!==undefined && item.source.complete===true)? null : (
									<div className="font-bold text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
								)}
								<div className={`text-sm video-text text-black dark:text-zinc-300 font-normal`} >
							
									{item.title}
									{item.source !==undefined && item.source.title}
									</div>
								<div className="font-light_ text-zinc-500 dark:text-zinc-300 ">
									{item.creator_name}
									{item.source !==undefined && item.source.creator_name}
									</div>

								{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
							</div>

{fromPlaylist==="playlist" &&
							<div className="justify-center items-center flex">
								<RemoveCircleOutlineIcon
								className="cursor-pointer"
								onClick={ () => {
									if(dataPlaylist.includes(item)){
										const index = dataPlaylist.indexOf(item)
										dataPlaylist.splice(index,1)
										setDataPlaylist([...dataPlaylist])

										const index2 = sourceIDsPlaylist.indexOf(item.source_id)
										sourceIDsPlaylist.splice(index2,1)
										setSourceIDsPlaylist([...sourceIDsPlaylist])
									}
								
								}	
								}
								></RemoveCircleOutlineIcon>
							</div>
							}
						</div>
					</div>
				</a>

				:

				<div className="flex w-full ">
						<div
							className={`grid grid-cols-3 lg:grid-cols-2 flex  flex-row items-center justify-start w-full h-full  p-2 rounded-md mb-2 transition duration-200 ease-in-out    mr-auto ml-auto`}
							onClick={() => {


								// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

							setCollapsed(sideFeed!==true && true)
							}}
							target="_blank"
						>
							<a href={`/${item.source_type}/${source_id}`} >
							<div className={`col-span-1 min-w-[100px] min-w-[100px] max-w-[300px] mr-3 cursor-pointer`}>
								<div
									className="flex items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600 max-w-[300px]"
									style={{
										backgroundImage: `url(${imageUrl})`,
										paddingBottom: '50%',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',

									}}
								></div>
							</div>
							</a>

							<div className="col-span-2 lg:col-span-1 text-xs h-full">
								<div className={`flex justify-end mr-5	 mb-5 ${sideFeed==true && "mr-0 mb-0"}`}>

								{removed?
								
								<svg onClick={removeBookmark} className="w-6 text-zinc-600 opacity-50 dark:text-zinc-200 cursor-pointer" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" stroke-linecap="round" stroke-linejoin="round"></path>
								<title className="border-0">Add back</title>
							  </svg>
							  :
								<svg onClick={removeBookmark} className="w-6 text-zinc-600 opacity-50 dark:text-zinc-200 cursor-pointer" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Remove Bookmark" alt="Remove Bookmark">
									<path d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" stroke-linecap="round" stroke-linejoin="round"></path>
									<title className="border-0">Remove bookmark</title>
									</svg>
									}
									</div>
								{item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true || (item.summaries[1] !== undefined || item.summaries[0] !== undefined)) ? null : (
									<div className="font-bold text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
								)}
								<a className="cursor-pointer" href={`/${item.source_type}/${source_id}`} >
								<div className="text-sm video-text text-black dark:bg-mildDarkMode dark:text-zinc-300 font-normal">
							
									{item.title}
									</div>
								<div className="font-light_ text-zinc-500 dark:text-zinc-300 ">{item.creator_name}</div>
								</a>

								{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
							</div>
							
						</div>
						
					</div>


				:

				<a href={`/${item.source_type}/${source_id}`} >
					<div className="flex w-full hover:opacity-70 duration-200 transform ease-in*out">
						<div
							className={`flex ${' '} ${'pointer-events-none'} flex-row items-center justify-start cursor-pointer w-full h-full py-4 rounded-md mb-2 transition duration-200 ease-in-out   sm:hover:scale-105 transform sm:hover:translate-x-2 sm:hover:translate-y-2 mr-auto ml-auto`}
							onClick={() => {


								// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

								setCollapsed(true)
							}}
							target="_blank"
						>

							<div className="text-xs">
								{item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true || (item.summaries[1] !== undefined || item.summaries[0] !== undefined)) ? null : (
									<div className="font-bold text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
								)}
								<div className="text-sm  text-black dark:bg-mildDarkMode dark:text-zinc-300 font-normal underline">{item.title} </div>
								<div className="font-light_ text-zinc-500 dark:text-zinc-300 ">Time added: {formattedDate}</div>

								{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
							</div>
						</div>
					</div>
				</a>


			}
		</div>
	);
};
export default FeedItem;
