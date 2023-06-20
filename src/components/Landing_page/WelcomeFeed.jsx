import React, { Fragment, useState, useRef } from 'react';
import { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import FeedItem from '../Article_components/FeedTabs/FeedItem';
import axios from 'axios';
import SkeletonItem from '../Article_components/FeedTabs/SkeletonItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { set } from 'lodash';
import Robot from "../../img/cute robot grey.png"
import SeriousRobot from "../../img/serious_robot.png"
import { Button,  Popover,
	PopoverHandler,
	PopoverContent,

Progress} from "@material-tailwind/react";



function WelcomeFeed(props) {
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
	const [offsetUploads, setOffsetUploads] = useState(0);
	const [hasMoreUploads, setHasMoreUploads] = useState(true);
	const [dataUploads, setDataUploads] = useState([]);
	const [isLoadingUploads, setIsLoadingUploads] = useState(true);
	const [firstTimeUploads, setFirstTimeUploads] = useState(true);
	const [hasTier3, setHasTier3] = useState(true)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [uploadDuration, setUploadDuration] = useState("")
	const [uploadTitle, setUploadTitle] = useState("")
	const [file, setFile] = useState(null)
	const [fileUploading, setFileUploading] = useState(false)
	
	let calledAndEmpty = true 

	const navigate = useNavigate();
	const audioRef = useRef(null);

const handleFileUpload = (event) => {
	if(currentUser===null){
		
	}
	var file = event.target.files[0];
	
	const formData = new FormData();
    formData.append('file', file)
	setFile(formData)
	const audio = audioRef.current;
	audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      setUploadDuration(audio.duration);
	  setUploadTitle(event.target.files[0].name)
	  
    };
}

const handlePostUpload = () => {
	setFileUploading(true)
	
	axios
	.post(
		`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/sources/upload`,file,
		{
		
		headers: {
			'Content-Type': 'multipart/form-data',
			'id-token':currentUser.accessToken},
			onUploadProgress: (progressEvent) => {
				const progress = Math.round(
				  (progressEvent.loaded * 100) / progressEvent.total
				);
				
				setUploadProgress(progress);
				
		}
	}
	) .then((response) => {
        // Handle the response after successful upload
        const responsed = response.data
		
	navigate("/up/"+responsed.source_id)
		//page'e navige et
      })
	  .catch((error) => {
        // Handle any errors that occur during upload
        console.error(error);
      });
};

const handleFileUploadClear = () => {
	setFile(null)
	setUploadProgress(0)
	setUploadDuration("")
	setUploadTitle("")
	setFileUploading(false)
}


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
		
		if(state==2){
		setisPublic(true)
		setOffset(0)
		getData(0, true, true);

		}

		else if(state==1){
			setOffsetPersonal(0)
			setMyUploads(false)
			setisPublic(false)
			getDataPersonal(0, true, true);
		}
	
		else if (state==3){
			setOffsetUploads(0)
			setMyUploads(true)
			setOffsetUploads(0)
			setisPublic(false)
			getDataUploads(0, true, true);
			console.log(dataUploads)
			
			
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
				}/sources/?q=${search}&offset=${offset}&limit=${limit}`
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
					}/sources/?q=${search}&offset=${offset}&limit=${limit}&only_my=submits`, {
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
	const getDataUploads = (offsetUploads, firstTimeUploads, hasMoreUploads) => {
		if (!hasMoreUploads) {
			return;
		}
		

		setIsLoadingUploads(true);

		localStorage.setItem("search",search)
		
		if (currentUser) {
			setIsLoadingUploads(true)
			currentUser.getIdToken().then((idtoken) =>

				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/${search.length>0?`?q=${search}&`:"?"}limit=${limit}&offset=${offsetUploads}&only_my=uploads`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {
						
						
						setHasMoreUploads(!(response.data.length < limit));


						if ( firstTimeUploads) {
							setDataUploads(response.data);						


						} else {
							setDataUploads([...dataUploads, ...response.data]);
						}
						setIsLoadingUploads(false);
					}))
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
		setOffsetUploads(offsetUploads + limit);
		getDataUploads(offsetUploads + limit, false, true,search);
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
		<div className="main-page-feed-section container xl:max-w-[1280px] mx-auto w-full drop-shadow-2xl ">
{/* 			<h2 className="text-gray-700 dark:text-zinc-300 pl-3 md:pl-0 text-2xl mx-auto pb-3 font-semibold">
				Explore the videos other users unlocked with Alphy
			</h2> */}
							
	

			<div class="text-sm font-medium text-center text-gray-500  dark:text-zinc-300 dark:border-gray-700 ">
				<ul class="flex ml-6 flex-wrap -mb-px">
{/* 					<li class="mr-2">
						<button onClick={() => setisPublic(true)} class={`inline-block p-4 mb-1 ${isPublic ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Global</button>
					</li> */}
					<li class="mr-2">
						<button onClick={() => navigateFeeds(1)} class={`inline-block p-4 mb-1 ${!isPublic && myUploads===false ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light"} ${currentUser == null || dataPersonal.length == 0 ? "" : ""}  rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>My Works</button>
					</li>
					<li class="mr-2">
							<button onClick={() => navigateFeeds(3)} class={`relative infline-flex p-4 mb-1 ${!isPublic && myUploads==true ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>
  
  <span> My Uploads </span>
  <div class="absolute inline-flex items-center justify-center w-10 h-6 text-xs font-semibold text-white bg-green-400 rounded-full -top-2 -right-3">New!</div>
</button>
							
							
					</li>
					<li class="mr-2">
						<button onClick={() => navigateFeeds(2)} class={`inline-block p-4 mb-1 ${isPublic ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Global</button>
					</li>
					
					
					

				</ul>
			</div>

			<div className=" bg-zinc-50 dark:bg-darkMode dark:bg-mildDarkMode border-[1px] dark:border-none  rounded-[10px] sm:p-[40px] p-[10px] min-h-[40vh]">
			{isPublic ===false && myUploads == true ? null :
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
					else if (isPublic===false && myUploads===false){
						
						setCalled(false)
						setOffsetPersonal(0)
						getDataPersonal(0, true, true);
				
					}
					else if (isPublic==false && myUploads==true){
						setCalled(false)
						setOffsetUploads(0)
						getDataUploads(0, true, true,search);
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
}

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
						hasTier3 && isPublic==false && myUploads==true &&

						<div className="">
							
							


							<div className="mt-5 mb-5  ">
								
							<Popover placement="bottom-start">
								<p className="text-l lg:text-xl text-zinc-700 dark:text-zinc-200 flex flex-row font-sans">Now you can use Alphy on your audio files, privately. 
								
								

								<PopoverHandler>
			<div>{' '}<p className="font-sans underline cursor-pointer ml-2"> Learn more.</p>
								{/* <svg className="w-5 h-5 ml-1 pt-1 cursor-pointer dark:text-zinc-300 text-gray-400 hover:dark:text-zinc-300 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg> */}
								</div>
								
								</PopoverHandler>
								</p>
								
								
								
								<PopoverContent className="dark:bg-darkMode mt-2  border-0 dark:border-2 dark:border-zinc-800 font-sans dark:text-zinc-200 text-zinc-600 max-w-[400px]">
									<div>
							
							<p className="mb-4">Premium users can transcribe, summarize, and question their own audio files in over 50 languages. </p>
							<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
										<ol>
										<li className="mb-2">1) Choose an audio file and upload to Alphy from below.</li>
										<li className="mb-2">2) Alphy will process your file the same way it does with online content, providing you the transcript, summary, key takeaways, and a chatbot.</li>
										<li className="mb-2">3) Only you will be able to access the end work. Your uploads will not be shown on Alphy's public database.</li>
										<li className="mb-2">4) To preserve privacy, all audio files are deleted after the transcription is complete.</li>
										</ol>

									</div>

								</PopoverContent>
								</Popover>
								 </div>
								 <div class="border-b border-gray-200  flex mt-5 mb-5  dark:opacity-40 items-center  "></div>
						{file === null ? 

						(
							props.hasActiveSub === true
							 ?
							<div class="flex items-center justify-center w-full">
							<label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-mildDarkMode hover:bg-zinc-100 dark:border-gray-600 dark:hover:border-gray-700 dark:hover:bg-zinc-800 transition duration-200 ease-in">
								<div class="flex flex-col items-center justify-center pt-5 pb-6">
									<svg aria-hidden="true" class="w-10 h-10 mb-3 text-zinc-600 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
									<p class="mb-2 text-sm text-zinc-600 dark:text-zinc-200 font-sans">Click to upload an audio file</p>
									<p class="text-xs text-zinc-600 dark:text-zinc-200">MP3, M4A, MPGA, MPEG, WAV, OR WEBM</p>
								</div>
								<input onChange = {handleFileUpload} id="dropzone-file" type="file" class="hidden" accept=".mp3,.wav,.mpeg,.m4a,.webm,.mpga" />
								<audio className="hidden" ref={audioRef} controls />
							</label>
						</div>
						
						:
						<div>
							<div className="flex flex-col  col-span-2 mx-auto items-center"><p  className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-10 mb-5 w-full  col-span-2">You need to go <a className="text-green-400 underline" href="/plans">premium</a> to upload personal files.</p></div>
							</div>
						
						
						)
						:
						<div>
							<p className={`flex flex-row font-sans text-zinc-700 dark:text-zinc-200 ${uploadProgress>0 ? "opacity-40 pointer-events-none":""}`}> Clear queue
							<svg onClick={handleFileUploadClear} className="ml-2 cursor-pointer" width="20px" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
											<title className="font-bold">Clear</title>
											<path clipRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" fillRule="evenodd"></path>
									</svg>
									</p>
						<div className="lg:flex lg:flex-row lg:grid lg:grid-cols-5">
							
					<p className="lg:col-span-2 flex  items-center font-sans text-zinc-700 dark:text-zinc-200 mt-8 lg:mt-0"> {uploadTitle}</p>
{/* 					<p className="text-sm text-zinc-600 dark:text-zinc-300 "> 
			
						Duration: {Math.floor(uploadDuration/60)}.{Math.floor(uploadDuration%60)} minutes

						</p> */}
					{/*  */}
					<div className="lg:col-span-2 mt-2 ">
						<div className="lg:grid lg:grid-cols-3">
							<div className="lg:col-span-3 hidden lg:flex  lg:justify-center lg:mt-2">
					{/* <Progress className={`${uploadProgress===0 ? "hidden" : "w-5/6"}`} color="green"  size="lg" value={uploadProgress} label={uploadProgress} /> */}
					
<div class={`${uploadProgress===0 &&"hidden"} w-5/6 bg-gray-200 rounded-full h-3 dark:bg-gray-700 mt-2`} >
  <div class={`bg-green-400 h-3 rounded-full `} style={{width:uploadProgress +"%"}}></div>
</div>

{/*  */}					{fileUploading===false && <p className="text-sm  text-zinc-700 dark:text-zinc-200 italic font-sans w-full flex justify-center lg:mt-2">Waiting for approval...</p>}
					{/* <Progress className={`${uploadProgress>0 && "hidden"}`}color="gray" size="lg" value={100} label={0} /> */}
					</div>
				{/* 	<div className="sm:col-span-1 text-sm flex justify-center font-sans  text-zinc-700 dark:text-zinc-200">
					{Math.floor(uploadDuration/60)}.{Math.floor(uploadDuration%60)} minutes
						</div> */}
					</div>
					</div>

<div className="col-span-1 flex flex-col lg:flex-row lg:items-center lg:justify-center  lg:margin-auto">

{fileUploading===0 && <p className="text-sm  text-zinc-700 dark:text-zinc-200 italic font-sans my-4 lg:hidden">Waiting for approval...</p>} 
<div class={`${uploadProgress===0 &&"hidden"} my-4 lg:hidden w-5/6 bg-gray-200 rounded-full h-3 dark:bg-gray-700`} >
  <div class={`bg-green-400 h-3 rounded-full w-[${uploadProgress}%]`} style={{width:uploadProgress +"%"}}></div>
</div>
{/* <Progress className={`${uploadProgress===0 ? "hidden" : "w-5/6"} lg:hidden my-4`} color="green"  size="lg" value={uploadProgress} label={uploadProgress} />
 */}
{fileUploading ? <p className=" text-zinc-600 dark:text-zinc-300 text-sm font-sans italic my-4"><p className="text-sm font-sans text-zinc-600 dark:text-zinc-300">{uploadProgress!==100 ? `Uploading... ${uploadProgress}% `  : "Complete!"}</p> </p>:<div className="flex flex-row"> {/* <p className="lg:hidden">You are about to process this file.</p> */}<Button onClick={handlePostUpload} className="bg-green-400 lg:ml-10 normal-case max-w-[100px] my-4">Continue</Button></div>}
					
					</div>



					
					</div>
						
						</div>
}
						

	
								 
						
{dataUploads.length>0 && 
<div className={ `${file!==null ? "md:mt-20 mt-10":""}`}>
	<p className="text-zinc-600 dark:text-zinc-300 font-sans text-xl">Previous Works</p>
	<div class="border-b border-gray-200  flex mt-5 dark:opacity-40 items-center w-2/12 "></div>

	{dataUploads.length > 10 && 
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
				}
</div>}
						{/* temporary */}
						<div
							>
								
						{isLoadingUploads
								? dataUploads.length > 0
									? 
										dataUploads.map((item, index) => { <FeedItem key={index} item={item} /> }).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

											: [...Array(10)].map((item, index) => {
										<div>

											<SkeletonItem key={index} /> 
												
											</div>
									})
								: dataUploads.map((item, index) => <FeedItem key={index + 1000} item={item} />)}
										
											</div>
											{(hasMoreUploads && myUploads===true && currentUser !== null) && (
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

						</div>
					}
					
			</div>



		</div>
	);
}

export default WelcomeFeed;