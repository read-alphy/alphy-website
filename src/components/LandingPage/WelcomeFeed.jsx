import React, { Fragment, useState, useRef, useCallback } from 'react';
import { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import FeedItem from '../ArticleComponents/FeedTabs/FeedItem';
import axios from 'axios';
import SkeletonItem from '../ArticleComponents/FeedTabs/SkeletonItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { set } from 'lodash';
import Robot from "../../img/cute robot grey.png"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import {
	Button, Popover,
	PopoverHandler,
	PopoverContent,Spinner

} from "@material-tailwind/react";
import { useDropzone } from 'react-dropzone';
import ArchipelagoCard from './ArchipelagoCard';
import ArchipelagoCreationCard from './ArchipelagoCreationCard';
import { Carousel } from '@trendyol-js/react-carousel';



function WelcomeFeed(props) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	/*const const { currentUser } = useAuth(); */
	const currentUser = props.currentUser;
	

	const [inputValue, setInputValue] = useState('');
	const [offsetPersonal, setOffsetPersonal] = useState(0);
	const [hasMorePersonal, setHasMorePersonal] = useState(false);
	const [isLoadingPersonal, setIsLoadingPersonal] = useState(localStorage.getItem("logged in") ==="true" ? false : true);
	const [dataPersonal, setDataPersonal] = useState([]);
	const [global, setGlobal] = useState(localStorage.getItem("logged in") ==="true" ? false : true);
	const [submitted, setSubmitted] = useState(false);
	const [called, setCalled] 	= useState(false);
	const [ready, setReady] = useState(false)
	const [myUploads, setMyUploads] = useState(false)
	const [offsetUploads, setOffsetUploads] = useState(0);
	const [hasMoreUploads, setHasMoreUploads] = useState(false);
	const [dataUploads, setDataUploads] = useState([]);
	const [isLoadingUploads, setIsLoadingUploads] = useState(true);

	const [uploadProgress, setUploadProgress] = useState(0)
	const [uploadDuration, setUploadDuration] = useState("")
	const [uploadTitle, setUploadTitle] = useState("")
	const [file, setFile] = useState(null)
	const [fileUploading, setFileUploading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [myBookmarks, setMyBookmarks] = useState(false)
	const [offsetBookmarks, setOffsetBookmarks] = useState(0);
	const [hasMoreBookmarks, setHasMoreBookmarks] = useState(false);
	const [dataBookmarks, setDataBookmarks] = useState([]);
	const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true);
	const [myWorks, setMyWorks] = useState(localStorage.getItem("logged in") ==="true" ? true : false);
	const [archipelagos, setArchipelagos] = useState(false)
	const [searchQuery, setSearchQuery] = useState("");
	const [searchMemory, setSearchMemory] = useState("")



	

	useEffect(() => {
		const timer = setTimeout(() => {
		  setSearchQuery(search);
		  
		}, 500); // delay of 500ms
	
		return () => clearTimeout(timer); // this will clear the timer if the user keeps typing before the 500ms has passed
	  }, [search]);
	
	
	  useEffect(() => {
		if (searchQuery || (searchQuery === "" && searchMemory !== "")) {

		  handleSearch();
		
		}
		
	 }, [searchQuery]);	

	
	let calledAndEmpty = true

	const handleSearch = () => {
		setSearchMemory(search)
		localStorage.setItem('search', search);
		if (searchInputRef.current.value.length === 0) {
			setSearch('');
		}
		if (global) {
			setOffset(0);
			getData(0, true, true);

		}
		else if (myWorks) {

			setCalled(false)
			setOffsetPersonal(0)
			getDataPersonal(0, true, true);

		}
		else if ( myUploads) {
			setCalled(false)
			setOffsetUploads(0)
			getDataUploads(0, true, true, search);
		}
		else if ( myBookmarks ) {
			setCalled(false)
			setOffsetBookmarks(0)
			getDataBookmarks(0, true, true, search);
		}

		setSubmitted(true)}

	

	const navigate = useNavigate();
	const audioRef = useRef(null);

	const handleFileUpload = (event) => {

		setErrorMessage(false)
		const uploadFile = event.target.value;

		const formData = new FormData();
		formData.append('file', uploadFile)
		setFile(formData)
		const audio = audioRef.current;
		audio.src = URL.createObjectURL(uploadFile);
		audio.onloadedmetadata = () => {
			setUploadDuration(audio.duration);

			setUploadTitle(uploadFile.name)

		};
	}

	const handleFileUploadByDrop = (files) => {
		setErrorMessage(false)

		const file = files[0];
		const allowedExtensions = ['.mp3', '.m4a', '.mpga', '.mpeg', '.wav', '.webm'];
		const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
		if (!allowedExtensions.includes(fileExtension)) {
			setErrorMessage(true)
			return
			// You can display an error message or take other actions here
		  }

		const formData = new FormData();
		formData.append('file', file)
		setFile(formData)
		const audio = audioRef.current;
		audio.src = URL.createObjectURL(file);
		audio.onloadedmetadata = () => {
			setUploadDuration(audio.duration);
			setUploadTitle(file.name)

		};
	}

	const handlePostUpload = () => {
		setFileUploading(true)

		axios
			.post(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/sources/upload`, file,
				{

					headers: {
						'Content-Type': 'multipart/form-data',
						'id-token': currentUser.accessToken
					},
					onUploadProgress: (progressEvent) => {
						const progress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);

						setUploadProgress(progress);

					}
				}
			).then((response) => {
				// Handle the response after successful upload
				const responsed = response.data

				navigate("/up/" + responsed.source_id)
				//page'e navige et
			})
			.catch((error) => {
				
				setErrorMessage(true)
				handleFileUploadClear()
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
		if (called === false) {
		setTimeout(() => {
			setReady(true)
		}, 2000);
		}


	}, [])

	window.addEventListener('beforeunload', () => {
		if (submitted === true) {
			localStorage.setItem('search', search);
		}
		else {
			localStorage.setItem('search', '');
		}
	});
	const temp = 15;
	const limit = temp;
	const searchInputRef = React.useRef(null);

	const navigateFeeds = (state) => {

		if (state == "global") {
			setGlobal(true)
			setMyWorks(false)
			setMyUploads(false)
			setArchipelagos(false)
			setMyBookmarks(false)
			localStorage.setItem("feedTab", "global")
		
			setOffset(0)
			getData(0, true, true);

		}

		else if (state == "my_works") {
			setGlobal(false)
			setMyWorks(true)
			setMyUploads(false)
			setMyBookmarks(false)
			setArchipelagos(false)
			localStorage.setItem("feedTab", "my_works")

			
			
			setOffsetPersonal(0)
			getDataPersonal(0, true, true);
			
		}

		else if (state == "my_uploads") {
			setGlobal(false)
			setMyWorks(false)
			setArchipelagos(false)
			setMyUploads(true)
			setMyBookmarks(false)
			localStorage.setItem("feedTab", "my_uploads")
			
			setOffsetUploads(0)
			getDataUploads(0, true, true);

		}
		else if (state == "my_bookmarks") {
			setGlobal(false)
			setMyWorks(false)
			setMyUploads(false)
			setArchipelagos(false)
			setMyBookmarks(true)
			localStorage.setItem("feedTab", "my_bookmarks")

			setOffsetBookmarks(0)
			getDataBookmarks(0, true, true);

		}

		else if (state == "archipelagos") {
			setGlobal(false)
			setMyWorks(false)
			setMyUploads(false)
			setMyBookmarks(false)
			setArchipelagos(true)
			props.getDataGlobalArchipelagos(0, true, true);
			//localStorage.setItem("feedTab", "archipelagos")

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
		setIsLoadingPersonal(true)
		
		if (!hasMorePersonal) {
			return;
		}
		
		if (currentUser) {
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

						if (response.data.length > 0) {
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


	const getDataBookmarks = (offsetBookmarks, firstTime, hasMoreBookmarks) => {
		if (!hasMoreBookmarks) {
			return;
		}
		setIsLoadingBookmarks(true);
		if (currentUser) {
			setIsLoadingBookmarks(true)
			currentUser.getIdToken().then((idtoken) =>
				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/?q=${search}&offset=${offsetBookmarks}&limit=${limit}&only_my=bookmarks`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {
						setHasMoreBookmarks(!(response.data.length < limit));

						if (response.data.length > 0) {
							calledAndEmpty = false
						}


						if (firstTime) {
							setDataBookmarks(response.data);


						} else {
							setDataBookmarks([...dataBookmarks, ...response.data]);
						}
						setIsLoadingBookmarks(false);
					})).catch((error) => {
						setIsLoadingBookmarks(false);


					});
		};
	};


	const getDataUploads = (offsetUploads, firstTimeUploads, hasMoreUploads) => {
		if (!hasMoreUploads) {
			return;
		}


		setIsLoadingUploads(true);

		localStorage.setItem("search", search)

		if (currentUser) {
			setIsLoadingUploads(true)
			currentUser.getIdToken().then((idtoken) =>

				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/${search.length > 0 ? `?q=${search}&` : "?"}limit=${limit}&offset=${offsetUploads}&only_my=uploads`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {


						setHasMoreUploads(!(response.data.length < limit));


						if (firstTimeUploads) {
							setDataUploads(response.data);


						} else {
							setDataUploads([...dataUploads, ...response.data]);
						}
						setIsLoadingUploads(false);
					}))
		};
	};
	
	
	
	const loadMore = () => {
		if (global) {
			setOffset(offset + limit);
			getData(offset + limit, false, true);
		}
		else if (myWorks) {
			setOffsetPersonal(offsetPersonal + limit);
			getDataPersonal(offsetPersonal + limit, false, true);
		}
		else if (myUploads) {
			setOffsetUploads(offsetUploads + limit);
			getDataUploads(offsetUploads + limit, false, true, search);
		}
		else if (myBookmarks) {
			setOffsetBookmarks(offsetBookmarks + limit);
			getDataBookmarks(offsetBookmarks + limit, false, true, search);
		}


	};

	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the dropped files

		handleFileUploadByDrop(acceptedFiles);
	}, []);
	
	
	if (called === false && search.length===0) {
		if(myWorks){
			if(currentUser){	
			getDataPersonal(0, true, true);
			props.getDataGlobalArchipelagos(0, true, true);
			setCalled(true);

			}
	}
		else{
			getData(0, true, true);
			props.getDataGlobalArchipelagos(0, true, true);
			setCalled(true);
		}
		
		


	}
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


	const handleCreatePlaylist = () => {
		
		navigate("/arc/createArc")
	
	}

	return (
		<div className="main-page-feed-section container xl:max-w-[1000px] 2xl:max-w-[1280px] mx-auto w-full drop-shadow-xl dark:drop-shadow-xl">
			{/* 			<h2 className="text-gray-700 dark:text-zinc-300 pl-3 md:pl-0 text-2xl mx-auto pb-3 font-semibold">
				Explore the videos other users unlocked with Alphy
			</h2> */}



			<div className="text-sm font-light text-center text-gray-500  dark:text-zinc-300 dark:border-gray-700 ">
				<ul className="flex flex-row pt-4 overflow-x-hidden">
					
			
								
					
					<li className={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-3"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("my_works")} className={`inline-block p-2 sm:p-4 py-4  ${myWorks ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-greenColor" : "hover:text-gray-600 hover:border-gray-300 font-light"} ${currentUser == null || dataPersonal.length == 0 ? "" : ""}  rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>My Works</button>
					</li>
					<li className={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-3"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("my_uploads")} className={`relative infline-flex p-2 py-4 sm:p-4  ${myUploads ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-greenColor" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>

							<span> My Uploads </span>
							
						</button>


					</li>
					<li className={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-3"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("my_bookmarks")} className={`inline-block p-2 sm:p-4 py-4  ${myBookmarks ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-greenColor" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Bookmarks</button>
					</li>

					<li className={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-3"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("global")} className={`inline-block p-2 py-4 sm:p-4 ${global ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-greenColor" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Global</button>
					</li>
					
					<li className={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-3"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("archipelagos")} className={`inline-block p-2 py-4 sm:p-4 sm:mr-10 ${archipelagos ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-greenColor" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Arcs</button>
					</li> 



				</ul>
			</div>

			<div className=" bg-zinc-50 dark:bg-darkMode dark:bg-mildDarkMode border-[1px] dark:border-none  rounded-[10px] sm:p-[40px] p-[10px] min-h-[40vh]">
				{myUploads ||archipelagos ? null :
					<form
						className="flex items-center"
						
						onSubmit={(e) => {
							e.preventDefault();

						}}
					>
						<label htmlFor="voice-search" className="sr-only">
							Search
						</label>
						<div className="relative w-full  ">


							<div className="relative w-full min-w-[200px] h-11 ">
								<input
									ref={searchInputRef}
									
									onChange={(e) => {
										setSearch(e.target.value);
									}}
									placeholder="Search our database..."
									className=" peer w-full h-full bg-white dark:bg-darkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] dark:border-darkMode focus:border-blue-000 dark:focus:border-blue-000" />
							

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

				{global &&
					<div className="main-page-feed  w-full">
						<div
							className={`
							grid grid-cols-1 mt-10
							${isLoading
									? 'lg:grid-cols-2 xl:grid-cols-2'
									: data.length === 1
										? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
										: 'lg:grid-cols-3 xl:grid-cols-3'
								}
							gap-4
							`}
						>
							{isLoading
								? data.length > 0
									? data
										.map((item, index) => <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} mainFeedInput={inputValue} />)
										.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))
									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: data.map((item, index) => <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index + 1000} item={item} />)}
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



				{myWorks &&
					<div className="main-page-feed  w-full">
						<div
							className={`
							grid grid-cols-1 mt-10
							${isLoadingPersonal
										? 'lg:grid-cols-2 xl:grid-cols-2'
										: data.length === 1
											? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
										: 'lg:grid-cols-3 xl:grid-cols-3'
								}
							gap-4
							`}
						>


							{currentUser == null && called == true && <div className="flex flex-col  col-span-2 mx-auto items-center"><p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Sign in to see the content you previously submitted.<br></br>Or navigate to <a onClick={() => navigateFeeds("global")} className="underline text-greenColor cursor-pointer">Global</a> to explore Alphy's database.</p><img className="opacity-50 dark:opacity-30" width={400} src={Robot}></img></div>}
							{isLoadingPersonal
								? dataPersonal.length > 0
									?
									dataPersonal.map((item, index) => { <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} /> }).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => {
										<div>

											<Spinner/>

										</div>
									})
								: dataPersonal.map((item, index) => <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index + 1000} item={item} />)}
						</div>
						{called == true && submitted == false && currentUser !== null && ready == true && dataPersonal.length == 0 && myUploads == false ? (
							<div className={`flex flex-col ${calledAndEmpty === false ? "hidden" : ""} col-span-2 mx-auto block items-center`} >

								<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Looks like you haven't submitted any content yet.<br></br>Check <a onClick={() => navigateFeeds("global")} className="underline text-greenColor cursor-pointer">Global</a> to get inspiration from the content other users unlocked with Alphy. {hasMorePersonal ? "If you've submitted content previously, simply refresh the page." : ""}</p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
							</div>
						) : null
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

				{myBookmarks &&
					<div className="main-page-feed  w-full">
						<div
							className={`
							grid grid-cols-1 mt-10
							${isLoadingPersonal
									? 'lg:grid-cols-2 xl:grid-cols-2'
									: data.length === 1
										? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
										: 'lg:grid-cols-3 xl:grid-cols-3'
								}
							gap-4
							`}
						>


							{currentUser == null && called == true && <div className="flex flex-col  col-span-2 mx-auto items-center"><p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2"><a className="underline text-greenColor" href="/u/login">Sign in</a> to see your bookmarks.  </p><img className="opacity-50 dark:opacity-30" width={400} src={Robot}></img></div>}
							{isLoadingBookmarks
								? dataBookmarks.length > 0
									?
									dataBookmarks.map((item, index) => { <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} /> }).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => {
										<div>

											<SkeletonItem key={index} />

										</div>
									})
								: dataBookmarks.map((item, index) => <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index + 1000} item={item} />)}
						</div>
						{called == true && submitted == false && currentUser !== null && ready == true && dataBookmarks.length == 0 && myBookmarks == true ? (
							<div className={`flex flex-col ${calledAndEmpty === false ? "hidden" : ""} col-span-2 mx-auto block items-center`} >

								<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">You haven't bookmarked any content yet.<br></br>Check <a onClick={() => navigateFeeds("global")} className="underline text-greenColor cursor-pointer">Global</a> to find conversations you want to add to your knowledge base. </p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
							</div>
						) : null
						}


						{(hasMoreBookmarks && currentUser !== null) && (
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
					myUploads &&

					<div className="">




						{/* <div className="mt-5 mb-5  ">

							<Popover placement="bottom-start">
								<p className="text-l lg:text-xl text-zinc-700 dark:text-zinc-200 flex flex-col sm:flex-row font-sans">Now you can use Alphy on your audio files, privately.



									<PopoverHandler>
										<div>{' '}<p className="font-sans underline cursor-pointer mt-2 sm:mt-0 sm:ml-2"> Learn more.</p>
											
										</div>

									</PopoverHandler>
								</p>



								<PopoverContent className="dark:bg-darkMode mt-2   border-slate-800 font-sans dark:text-zinc-200 text-zinc-600 max-w-[350px]">
									<div>

										<p className="mb-4">Premium users can transcribe, summarize, and question their own audio files in over 50 languages. </p>
										<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
										<ol>
											<li className="mb-2">1) Choose an audio file and upload to Alphy from below.</li>
											<li className="mb-2">2) Alphy will process your file the same way it does with online content, providing you the transcript, summary, key takeaways, and a chatbot.</li>
											<li className="mb-2">3) Only you will be able to access the end work. Your uploads will not be shown on Alphy's public database and will not be accessible by other parties.</li>
											<li className="mb-2">4) To preserve privacy, all audio files are deleted after the transcription process is complete. </li>
						
										</ol>

									</div>

								</PopoverContent>
							</Popover>
						</div> */}
						





						{dataUploads.length > 0 &&
							<div className={`${file !== null ? "md:mt-20 mt-10" : ""}`}>
								<p className="text-zinc-600 dark:text-zinc-300 font-sans text-xl">Previous Works</p>
								<div className="border-b border-gray-200  flex mt-5 dark:opacity-40 items-center w-2/12 "></div>

								{dataUploads.length > 10 &&
									<form
										className="flex items-center"
										
										onSubmit={(e) => {
											e.preventDefault();

											localStorage.setItem('search', search);
											if (searchInputRef.current.value.length === 0) {
												setSearch('');
											}
											if (global == true) {
												setOffset(0);
												getData(0, true, true);

											}
											else {

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

											<div className="relative w-full min-w-[200px] h-11 ">
												<input
													ref={searchInputRef}

													onChange={(e) => {
														setSearch(e.target.value);
													}}
													placeholder="Search our database..."
													className=" peer w-full h-full bg-white dark:bg-darkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] dark:border-darkMode focus:border-blue-000 dark:focus:border-blue-000" />
												

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
									dataUploads.map((item, index) => { <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} /> }).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => {
										<div>

											<SkeletonItem key={index} />

										</div>
									})
								: dataUploads.map((item, index) => <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index + 1000} item={item} />)}

						</div>
						{(hasMoreUploads && myUploads === true && currentUser !== null) && (
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
{dataUploads.length==0 && 
	<div className="mx-auto items-center justify-center flex flex-col">
	<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">
		Looks like you haven't submitted any content yet. Upgrade to <a className="underline text-greenColor" href="/account">Premium</a> to start using Alphy on your local files.</p> 

	<img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
	</div>}
						

					</div>
				}
{archipelagos && 



	<div className="">
		<div className="lg:ml-10 mt-10">
			<div className="flex flex-row">
		<p className="text-lg text-zinc-700 dark:text-zinc-300">Welcome to Arcs!</p>
		<Popover className="">
		<PopoverHandler>
			<div className="flex flex-row">
		
		<HelpOutlineRoundedIcon fontSize="small" className="ml-2 cursor-pointer pt-1 "/>
		</div>
				
				</PopoverHandler>
				<PopoverContent className=" dark:bg-mildDarkMode dark:border-zinc-700">
					<div className="max-w-[400px] flex flex-col">
						<p className="text-lg text-zinc-700 dark:text-zinc-300 underline"> 
					What is an Arc?
					</p>
				<p className="text-sm text-zinc-500 dark:text-zinc-400 ">An Arc (short for archipelago) is a personalized AI assistant that you can use to connect multiple videos and recordings together. <br/> <br/> 
				Building your is Arc similar to building a playlist. Choose the content you want to put an assistant on and Alphy powers them all with its AI, enabling you to sift through hundreds of hours of audiovisual content from one single search bar.  </p>
				</div>
				</PopoverContent>
		</Popover>
		</div>
		<p className="text-sm text-zinc-500 dark:text-zinc-400">Plug Alphy's AI to hundreds of videos and create your own search engine!</p>	
		
		
		
		</div>
		<div className={` mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`} ></div>

		{currentUser &&
		<div>
	{props.hasActiveSub===true ? 
	<p className="mt-4 text-zinc-700 dark:text-zinc-300 text-lg lg:ml-10">Your Arcs
	<AddCircleIcon className="ml-4 cursor-pointer pb-1" onClick={() => handleCreatePlaylist()}/>
	</p>
	:
	<p className=" mt-4 text-zinc-700 dark:text-zinc-300 text-lg lg:ml-10">Your Arcs
		<Popover placement="right">
		<PopoverHandler>
				
		<AddCircleIcon className="ml-4 cursor-pointer pb-1" onClick={() => handleCreatePlaylist()}/>
				
				</PopoverHandler>
				<PopoverContent>
					<p>
						Go Premium to create an arc.
					</p>
				</PopoverContent>
		</Popover>
		
		</p>
}
		{props.hasActiveSub === true

		?
		
		props.userArchipelagos!== undefined && props.userArchipelagos.length>0 &&
		<div>
		<Carousel 
		show={`${window.innerWidth>1000 ? (window.innerWidth>1280 ? 4.2 : 3.2) : 
			window.innerWidth>600 ? 2.2: 1.2}`} slide={1} transition={0.5}
			infinite={true}
			leftArrow={
				<div className=" mt-24 pr-4 w-8">
				<ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
				</div>} 
			
			rightArrow={
						<div className="mt-24 pl-2 w-8">
					<ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
					</div>} 
					
					>
						
		{props.userArchipelagos.map((item, index) => 
		<div className="flex flex-row">
			
		
		
		<ArchipelagoCard key={index} item={item} index={index} currentUser={currentUser}/>
		</div>
	
	)}
		</Carousel>

		
		</div>

		:

		<div className="lg:ml-10 text-zinc-700 dark:text-zinc-300 mt-20 mb-20">
		<p className="text-zinc-500 dark:text-zinc-400">You need to be on a Premium account to create an arc. Meanwhile, feel free to enjoy our curated lists.</p>
		</div>
}



<div className={` mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`} ></div>
</div>}

		{<div>
		<p className="mt-4 text-zinc-700 dark:text-zinc-300 text-lg lg:ml-10">Global Arcs</p>
					<Carousel 
					show={`${
						window.innerWidth>1000 ? (window.innerWidth>1280 ? 4.2 : 3.2) : 
			window.innerWidth>600 ? 2.2: 1.2
					}`} slide={1} transition={0.5}
						infinite={true}
						leftArrow={
							<div className=" mt-24 pr-4 w-8">
							<ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
							</div>} 
						
						rightArrow={
									<div className="mt-24 pl-2 w-8">
								<ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
								</div>} 
								
								>
					{props.dataGlobalArchipelagos.map((item, index) => 
					
					<ArchipelagoCard key={index} item={item}/>
					)}
					</Carousel>
					</div>
				
		}
			</div>
}

</div>


		</div>
	);
}

export default WelcomeFeed;