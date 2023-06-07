import React, { useState } from 'react';
import { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import FeedItem from '../Article_components/FeedTabs/FeedItem';
import axios from 'axios';
import SkeletonItem from '../Article_components/FeedTabs/SkeletonItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { set } from 'lodash';
import Robot from "../../img/cute robot grey.png"
import { Button, Input} from "@material-tailwind/react";
import { Howl } from 'howler';	
import { useRef } from 'react';

function Feed(props) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	/*const const { currentUser } = useAuth(); */
	const currentUser=props.currentUser;
	
	const [inputValue, setInputValue] = useState('');
	const [offsetPersonal, setOffsetPersonal] = useState(0);
	const [hasMorePersonal, setHasMorePersonal] = useState(true);
	const [isLoadingPersonal, setIsLoadingPersonal] = useState(true);
	const [dataPersonal, setDataPersonal] = useState([]);
	const [isPublic, setisPublic] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [called, setCalled] = useState(false);
	const [ready, setReady] = useState(false)
	const [myUploads, setMyUploads] = useState(false)
	
	let calledAndEmpty = true 




	

const handleFileUpload = (event) => {
const file = event.target.files[0];
const reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.onload = handleFileRead;
};
const handleFileRead = (event) => {
const buffer = event.target.result;
const signature = new Uint8Array(buffer).subarray(0, 4);
// Perform file type detection based on the signature
detectFileType(signature);
};
				
const detectFileType = (signature) => {
// Mapping of file signatures to file types
const signatureMapping = {
	".mp3": [0x49, 0x44, 0x33, 0x4], // ID3 tag
	".mp31": [0xFF, 0xFB,0x90,0x64], // MPEG-1 Layer 3 (MP3) audio frame sync
	".mp32": [0xFF, 0xF3], // MPEG-2 audio frame sync
	".mp33": [0xFF, 0xF2], // MPEG-2.5 audio frame sync
	".mpeg": [0x00, 0x00, 0x01, 0xBA], // MPEG Program Stream
	".mpga": [0xFF, 0xFB], // MPEG-1 Layer 3 (MP3) (same as .mp3 as .mpga is essentially the same format)
	".wav": [0x52, 0x49, 0x46, 0x46],
	".webm": [0x1A, 0x45, 0xDF, 0xA3], // WebM
	".m4a": [0x4D, 0x34, 0x41, 0x20], // M4A
  };
  
  
  

// Iterate through the signature mapping
for (const fileType in signatureMapping) {
	const fileSignature = signatureMapping[fileType];
	
	console.log(signature,fileSignature)
	if (arraysMatch(signature, fileSignature)) {
	// File type matched
	console.log("Detected file type:", fileType);
	return;
	}
}

// File type not matched
console.log("Unknown file type");
};

const arraysMatch = (arr1, arr2) => {
return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
};


useEffect(() => {
	setTimeout(() => {
		setReady(true)
	},2000);

	
} ,[])

	window.addEventListener('beforeunload', () => {
		if (submitted===true){
			localStorage.setItem('search', search);
	}
	else{
		localStorage.setItem('search', '');
	}
	  });
	const temp = 10;
	const limit = temp;
	const searchInputRef = React.useRef(null);

	const navigateFeeds = (state) => {
		setMyUploads(false)
		if(isPublic===false && state==2){
		setisPublic(true)
		setOffset(0)
		getData(0, true, true);

		}

		else if(isPublic===true && state==1){
			setOffsetPersonal(0)
			setMyUploads(false)
			setisPublic(false)
			getDataPersonal(0, true, true);
		}
	
		else if (state==3){
			setOffset(0)
			setMyUploads(true)
			setOffsetPersonal(0)
			setisPublic(false)
			
			
		}
	
		
		
	}

	const getData = (offset, firstTime, hasMore) => {
		if (!hasMore) {
			return;
		}
		setIsLoading(true);

		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/sources/?q=${search}&offset=${offset}&limit=${limit}&only_mine=false`
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

	};

	const getDataPersonal = (offset, firstTime, hasMorePersonal) => {
		if (!hasMorePersonal) {
			return;
		}
		setIsLoadingPersonal(true);
		if (currentUser) {
			setIsLoadingPersonal(true)
			currentUser.getIdToken().then((idtoken) =>
				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/?q=${search}&offset=${offset}&limit=${limit}&only_mine=true`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {
						setHasMorePersonal(!(response.data.length < limit));
						
						if(response.data.length>0){
						calledAndEmpty = false
					}
						

						if (firstTime) {
							setDataPersonal(response.data);
							

						} else {
							setDataPersonal([...dataPersonal, ...response.data]);
						}
						setIsLoadingPersonal(false);
					})).catch((error) => {
						setIsLoadingPersonal(false);
						
						
					});
		};
	};

	const loadMore = () => {
		if(isPublic){
		setOffset(offset + limit);
		getData(offset + limit, false, true);
	}
	else if (isPublic===false && myUploads===false){
		setOffsetPersonal(offsetPersonal + limit);
		getDataPersonal(offsetPersonal + limit, false, true);
	}	
	else if(isPublic==true && myUploads==true)
	{
		
	}
	

	};

	
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			;
		}
	};

if(called===false){
	setTimeout(() => {
		getDataPersonal(0, true, true);
		
		setCalled(true);
	}, 1000);
		
}


	return (
		<div className="main-page-feed-section container xl:max-w-[1280px] mx-auto w-full drop-shadow-2xl">
{/* 			<h2 className="text-gray-700 dark:text-zinc-300 pl-3 md:pl-0 text-2xl mx-auto pb-3 font-semibold">
				Explore the videos other users unlocked with Alphy
			</h2> */}

			<div class="text-sm font-medium text-center text-gray-500  dark:text-zinc-300 dark:border-gray-700">
				<ul class="flex ml-6 flex-wrap -mb-px">
{/* 					<li class="mr-2">
						<button onClick={() => setisPublic(true)} class={`inline-block p-4 mb-1 ${isPublic ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Global</button>
					</li> */}
					<li class="mr-2">
						<button onClick={() => navigateFeeds(1)} class={`inline-block p-4 mb-1 ${!isPublic && myUploads===false ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light"} ${currentUser == null || dataPersonal.length == 0 ? "" : ""}  rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>My Works</button>
					</li>
					<li class="mr-2">
						<button onClick={() => navigateFeeds(2)} class={`inline-block p-4 mb-1 ${isPublic ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Global</button>
					</li>
					<li class="mr-2">
						<button onClick={() => navigateFeeds(3)} class={`inline-block p-4 mb-1 ${!isPublic && myUploads==true ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>My Uploads</button>
					</li>

				</ul>
			</div>

			<div className=" bg-zinc-50 dark:bg-darkMode dark:bg-mildDarkMode border-[1px] dark:border-none  rounded-[10px] sm:p-[40px] p-[10px] ">
				<form
					className="flex items-center"
					onKeyDown={handleKeyDown}
					onSubmit={(e) => {
						e.preventDefault();
						
						localStorage.setItem('search', search);
						if (searchInputRef.current.value.length === 0) {
							setSearch('');
						}
					if(isPublic==true){
						setOffset(0);
						getData(0, true, true);
						
					}
					else{
						
						setCalled(false)
						setOffsetPersonal(0)
						getDataPersonal(0, true, true);
				
					}
						setSubmitted(true)
					}}
				>
					<label htmlFor="voice-search" className="sr-only">
						Search
					</label>
					<div className="relative w-full  ">
{/* 						<input
							ref={searchInputRef}
							

							type="text"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							id="input-box"
							className="bg-zinc-50 dark:bg-darkMode border border-slate-200   dark:border-none  text-gray-900 dark:text-zinc-200 text-sm rounded-l-full mt-5 sm:mt-0 focus:outline-none focus:ring-slate-200 drop-shadow-sm focus:border-slate-200 dark:focus:border-darkMode dark:focus:ring-darkMode block w-full  py-3"
							placeholder={search.length > 0 ? search : 'Search YouTube videos or Twitter spaces...'}
						/> */}
						<div class="relative w-full min-w-[200px] h-11 ">
							<input 
							ref={searchInputRef}
							
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							placeholder="Search our database..."
							className=" peer w-full h-full bg-white dark:bg-darkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] dark:border-darkMode focus:border-blue-000 dark:focus:border-blue-000"/>
							{/* <label class="text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-000 before:border-green-400 peer-focus:before:!border-blue-000 after:border-green-400 peer-focus:after:!border-blue-000">Search our database...</label> */}
							
						 </div>

						
					</div>

					<Button type="submit"
							 className="bg-zinc-700 text-[15px] ml-2 lg:ml-4 ">
						
					
						<svg
							aria-hidden="true"
							className="w-5 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
						</Button>
				</form>

				<div className={`buttons flex justify-between mt-2 `}></div>

				{isPublic &&
					<div className="main-page-feed  w-full">
						<div
							className={`
							grid grid-cols-1 mt-10
							${isLoading
									? 'lg:grid-cols-2 xl:grid-cols-2'
									: data.length === 1
										? 'lg:grid-cols-1 xl:grid-cols-1'
										: 'lg:grid-cols-2 xl:grid-cols-2'
								}
							gap-4
							`}
						>
							{isLoading
								? data.length > 0
									? data
										.map((item, index) => <FeedItem key={index} item={item} mainFeedInput={inputValue}/>)
										.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))
									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: data.map((item, index) => <FeedItem key={index + 1000} item={item} />)}
						</div>
						{hasMore && (
							<div className="w-full flex justify-center">
								{
									<button
										className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold  mt-10 underline"
										onClick={loadMore}
									>
										{'Load more'}
									</button>
								}
							</div>
						)}
					</div>}



					{!isPublic && myUploads==false &&
					<div className="main-page-feed  w-full">
						<div
							className={`
							grid grid-cols-1 mt-10
							${isLoadingPersonal
									? 'lg:grid-cols-2 xl:grid-cols-2'
									: data.length === 1
										? 'lg:grid-cols-1 xl:grid-cols-1'
										: 'lg:grid-cols-2 xl:grid-cols-2'
								}
							gap-4
							`}
						>
							
							
							{currentUser == null && called==true &&  <div className="flex flex-col  col-span-2 mx-auto items-center"><p  className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Sign in to see the content you previously submitted.<br></br>Or navigate to <a onClick={navigateFeeds} className="underline text-green-400 cursor-pointer">Global</a> to explore Alphy's database.</p><img className="opacity-50 dark:opacity-30" width={400} src={Robot}></img></div>}
							{isLoadingPersonal
								? dataPersonal.length > 0
									? 
										dataPersonal.map((item, index) => { <FeedItem key={index} item={item} /> }).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

											: [...Array(10)].map((item, index) => {
										<div>

											<SkeletonItem key={index} /> 
												
											</div>
									})
								: dataPersonal.map((item, index) => <FeedItem key={index + 1000} item={item} />)}
						</div>
						{called==true &&submitted==false&& currentUser!==null && ready==true && dataPersonal.length==0 && myUploads==false ? (
							<div className={`flex flex-col ${calledAndEmpty===false?"hidden":""} col-span-2 mx-auto block items-center`} >

								<p  className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Looks like you haven't submitted any content yet.<br></br>Check <a onClick={navigateFeeds} className="underline text-green-400 cursor-pointer">Global</a> to get inspiration from the content other users unlocked with Alphy. {hasMorePersonal ? "If you've submitted content previously, simply refresh the page." : ""}</p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
								</div>
						):null
						}


						{(hasMorePersonal && currentUser !== null) && (
							<div className="w-full flex justify-center">
								{
									<button
										className="justify-center flex text-blueLike  dark:text-zinc-300 font-semibold  mt-10 underline"
										onClick={loadMore}
									>
										{'Load more'}
									</button>
								}
							</div>
						
						)
						
						}
						
	
					</div>}

					{
						isPublic==false && myUploads==true &&

						<div>
	
						<div class="flex items-center justify-center w-full">
							<label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
								<div class="flex flex-col items-center justify-center pt-5 pb-6">
									<svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
									<p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload an audio recording</span> or drag and drop</p>
									<p class="text-xs text-gray-500 dark:text-gray-400">MP3,M4A,</p>
								</div>
								<input onChange = {handleFileUpload} id="dropzone-file" type="file" class="hidden" accept=".mp3,.wav,.mpeg,.m4a,.webm,.mpga" />
							</label>
						</div> 

						</div>
					}
					
			</div>



		</div>
	);
}

export default Feed;