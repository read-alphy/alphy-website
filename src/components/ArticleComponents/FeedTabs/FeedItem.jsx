import './FeedItem.css';
import Twitter from '../../../img/twitter_spaces.png';
import axios from 'axios';
import { useState } from 'react';
import {Button} from "@material-tailwind/react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ReplayIcon from '@mui/icons-material/Replay';
import { set } from 'lodash';

const FeedItem = ({item,index, setCollapsed, myBookmarks, currentUser,sideFeed,fromArchipelago, dataArchipelago,setDataArchipelago,sourceIDsArchipelago,setSourceIDsArchipelago,forDetail}) => {
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
				<a href={(fromArchipelago===undefined || forDetail===true) && `/${item.source_type}/${source_id}`} >
					<div className="flex w-full ">
						<div
							className={`grid ${fromArchipelago==="archipelago" && forDetail!==true ? "grid-cols-4 cursor-default" : "grid-cols-3"} ${fromArchipelago===undefined && "lg:grid-cols-2 sm:hover:scale-10 transform sm:hover:translate-x-2"} flex ${((dataArchipelago!==undefined && dataArchipelago.includes(item) && fromArchipelago==="search") || (sourceIDsArchipelago!==undefined && sourceIDsArchipelago.includes(item.source_id)))&&  "border-4 border-green-400"} flex-row items-center justify-start cursor-pointer w-full h-full  p-2 rounded-md mb-2  transition duration-200 ease-in-out  mr-auto ml-auto`}
							onClick={() => {


								// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

								if(fromArchipelago===undefined){ setCollapsed(true)}
								else{
								
								if(fromArchipelago==="search"){

									if(dataArchipelago.includes(item) || sourceIDsArchipelago.includes(item.source_id)){
										
										const index = dataArchipelago.indexOf(item)
										dataArchipelago.splice(index,1)
										setDataArchipelago([...dataArchipelago])
										const index2 = sourceIDsArchipelago.indexOf(item.source_id)
										sourceIDsArchipelago.splice(index2,1)
										setSourceIDsArchipelago([...sourceIDsArchipelago])

									}
									else{
										setDataArchipelago([...dataArchipelago,item])
										setSourceIDsArchipelago([...sourceIDsArchipelago,item.source_id])
									}
								}
							
								
							}
							}}
							target="_blank"
						>
							<div className={`col-span-1  min-w-[100px] max-w-[300px] mr-3 `}>
								{forDetail===true ? 
								<div className="flex flex-row">
								<div className="text-center items-center flex justify-center mr-4 text-zinc-700 dark:text-zinc-400">
									{index+1}
								</div>
								<div
									className="flex w-full items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600"
									style={{
										backgroundImage: `url(${imageUrl})`,
										paddingBottom: '50%',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',

									}}
									
								></div>
								</div>
								:
							
								<div
									className="flex w-full items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600"
									style={{
										backgroundImage: `url(${imageUrl})`,
										paddingBottom: '50%',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',

									}}
									
								></div>
								}
							</div>

							<div className={`col-span-2 ${!fromArchipelago  && "lg:col-span-1"} ml-10 ${window.innerWidth>400 && window.innerWidth<500 &&"ml-5"} xs:ml-6 sm:ml-0 justify-start text-xs`} >
							
								
								{(item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true)) || (fromArchipelago==="archipelago" && item.source!==undefined && item.source.complete===true)? null : (
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

{fromArchipelago==="archipelago" && forDetail!==true &&
							<div className="justify-center items-center flex">
								<RemoveCircleOutlineIcon
								className="cursor-pointer"
								onClick={ () => {
									if(dataArchipelago.includes(item)){
										const index = dataArchipelago.indexOf(item)
										dataArchipelago.splice(index,1)
										setDataArchipelago([...dataArchipelago])

										const index2 = sourceIDsArchipelago.indexOf(item.source_id)
										sourceIDsArchipelago.splice(index2,1)
										setSourceIDsArchipelago([...sourceIDsArchipelago])
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
								<ReplayIcon onClick={removeBookmark} className="cursor-pointer"/>
								
							  :
							  <BookmarkRemoveIcon onClick={removeBookmark} className="cursor-pointer"/>
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
