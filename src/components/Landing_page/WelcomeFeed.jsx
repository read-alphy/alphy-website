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

import {
	Button, Popover,
	PopoverHandler,
	PopoverContent,

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
	const [isLoadingPersonal, setIsLoadingPersonal] = useState(true);
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

	const [dataGlobalArchipelagos , setDataGlobalArchipelagos] = useState([])
	const [isLoadingGlobalArchipelagos, setIsLoadingGlobalArchipelagos] = useState(true);





	
	let calledAndEmpty = true

	

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
	const temp = 10;
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
			getDataGlobalArchipelagos(0, true, true);
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

	const getDataGlobalArchipelagos = (offsetGlobalArchipelagos, firstTime, hasMoreGlobalArchipelagos) => {
		if(!hasMoreGlobalArchipelagos){
			return;
		}
		setIsLoadingGlobalArchipelagos(true);
		axios.get(`${process.env.REACT_APP_API_URL}/playlists/?limit=${limit}&offset=${offsetGlobalArchipelagos}`)
		.then((response) => {

			if(firstTime){
				setDataGlobalArchipelagos(response.data);
			}
			else{
				setDataGlobalArchipelagos([...dataGlobalArchipelagos, ...response.data]);
			}
			setIsLoadingGlobalArchipelagos(false);
			setTimeout(() => {
				const elements = document.querySelectorAll(".styles-module_item-provider__YgMwz")
				if(elements){
					elements.forEach(element => {
						element.classList.add('cursor-default');
					});
			}
				}, 500);

		})
		.catch((error) => {
			setIsLoadingGlobalArchipelagos(false);
		}
		)
	}

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
		
		setTimeout(() => {
			if(myWorks){		
			getDataPersonal(0, true, true);
		}
		else{
			getData(0, true, true);
		}
		
		}, 1000);
		getDataGlobalArchipelagos(0, true, true);
		setCalled(true);

	}
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


	const handleCreatePlaylist = () => {
		if(props.hasActiveSub===true){
		navigate("/archipelago/createArchipelago")
		}
		else{
			setErrorMessage(true)
		}
	}

	return (
		<div className="main-page-feed-section container xl:max-w-[1280px] mx-auto w-full drop-shadow-2xl dark:drop-shadow-xl">
			{/* 			<h2 className="text-gray-700 dark:text-zinc-300 pl-3 md:pl-0 text-2xl mx-auto pb-3 font-semibold">
				Explore the videos other users unlocked with Alphy
			</h2> */}



			<div class="text-sm font-light text-center text-gray-500  dark:text-zinc-300 dark:border-gray-700 ">
				<ul class="flex flex-row pt-4 overflow-x-hidden">
					
			
								
					
					<li class={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-2"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("my_works")} class={`inline-block p-1 sm:p-4 py-4  ${myWorks ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-green-400" : "hover:text-gray-600 hover:border-gray-300 font-light"} ${currentUser == null || dataPersonal.length == 0 ? "" : ""}  rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>My Works</button>
					</li>
					<li class={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-2"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("my_uploads")} class={`relative infline-flex p-1 py-4 sm:p-4  ${myUploads ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-green-400" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>

							<span> My Uploads </span>
							
						</button>


					</li>
					<li class={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-2"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("my_bookmarks")} class={`inline-block p-1 sm:p-4 py-4  ${myBookmarks ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-green-400" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Bookmarks</button>
					</li>

					<li class={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-2"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("global")} class={`inline-block p-1 py-4 sm:p-4 ${global ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-green-400" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Global</button>
					</li>
					<li class={`${window.innerWidth>400 && "pr-4", window.innerWidth<400 && window.innerWidth>380 && "pr-2"} lg:w-[120px]`} >
						<button onClick={() => navigateFeeds("archipelagos")} class={`inline-block p-1 py-4 sm:p-4 ${archipelagos ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-light border-green-400" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-000`}>Arcs</button>
						{/* <div class="absolute inline-flex items-center justify-center w-10 h-6 text-xs font-semibold text-white bg-green-400 rounded-full -top-2 -right-3">New!</div> */}
					</li>



				</ul>
			</div>

			<div className=" bg-zinc-50 dark:bg-darkMode dark:bg-mildDarkMode border-[1px] dark:border-none  rounded-[10px] sm:p-[40px] p-[10px] min-h-[40vh]">
				{myUploads ||archipelagos ? null :
					<form
						className="flex items-center"
						
						onSubmit={(e) => {
							e.preventDefault();

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

							setSubmitted(true)
						}}
					>
						<label htmlFor="voice-search" className="sr-only">
							Search
						</label>
						<div className="relative w-full  ">


							<div class="relative w-full min-w-[200px] h-11 ">
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
										: 'lg:grid-cols-2 xl:grid-cols-2'
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
										: 'lg:grid-cols-2 xl:grid-cols-2'
								}
							gap-4
							`}
						>


							{currentUser == null && called == true && <div className="flex flex-col  col-span-2 mx-auto items-center"><p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Sign in to see the content you previously submitted.<br></br>Or navigate to <a onClick={() => navigateFeeds("global")} className="underline text-green-400 cursor-pointer">Global</a> to explore Alphy's database.</p><img className="opacity-50 dark:opacity-30" width={400} src={Robot}></img></div>}
							{isLoadingPersonal
								? dataPersonal.length > 0
									?
									dataPersonal.map((item, index) => { <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} /> }).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => {
										<div>

											<SkeletonItem key={index} />

										</div>
									})
								: dataPersonal.map((item, index) => <FeedItem currentUser={currentUser} myBookmarks={myBookmarks} key={index + 1000} item={item} />)}
						</div>
						{called == true && submitted == false && currentUser !== null && ready == true && dataPersonal.length == 0 && myUploads == false ? (
							<div className={`flex flex-col ${calledAndEmpty === false ? "hidden" : ""} col-span-2 mx-auto block items-center`} >

								<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Looks like you haven't submitted any content yet.<br></br>Check <a onClick={() => navigateFeeds("global")} className="underline text-green-400 cursor-pointer">Global</a> to get inspiration from the content other users unlocked with Alphy. {hasMorePersonal ? "If you've submitted content previously, simply refresh the page." : ""}</p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
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

				{ myBookmarks &&
					<div className="main-page-feed  w-full">
						<div
							className={`
							grid grid-cols-1 mt-10
							${isLoadingPersonal
									? 'lg:grid-cols-2 xl:grid-cols-2'
									: data.length === 1
										? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
										: 'lg:grid-cols-2 xl:grid-cols-2'
								}
							gap-4
							`}
						>


							{currentUser == null && called == true && <div className="flex flex-col  col-span-2 mx-auto items-center"><p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2"><a className="underline text-green-400" href="/u/login">Sign in</a> to see your bookmarks.  </p><img className="opacity-50 dark:opacity-30" width={400} src={Robot}></img></div>}
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

								<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">You haven't bookmarked any content yet.<br></br>Check <a onClick={() => navigateFeeds("global")} className="underline text-green-400 cursor-pointer">Global</a> to find conversations you want to add to your knowledge base. </p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
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




						<div className="mt-5 mb-5  ">

							<Popover placement="bottom-start">
								<p className="text-l lg:text-xl text-zinc-700 dark:text-zinc-200 flex flex-col sm:flex-row font-sans">Now you can use Alphy on your audio files, privately.



									<PopoverHandler>
										<div>{' '}<p className="font-sans underline cursor-pointer mt-2 sm:mt-0 sm:ml-2"> Learn more.</p>
											{/* <svg className="w-5 h-5 ml-1 pt-1 cursor-pointer dark:text-zinc-300 text-gray-400 hover:dark:text-zinc-300 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg> */}
										</div>

									</PopoverHandler>
								</p>



								<PopoverContent className="dark:bg-darkMode mt-2   border-slate-800 font-sans dark:text-zinc-200 text-zinc-600 max-w-[350px]">
									<div>

										<p className="mb-4">Premium users can transcribe, summarize, and question their own audio files in over 50 languages. </p>
										<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
										<ol>
											<li className="mb-2">1) Choose an audio file and upload to Alphy from below.</li>
											<li className="mb-2">2) Alphy will process your file the same way it does with online content, providing you the transcript, summary, key takeaways, and a chatbot.</li>
											<li className="mb-2">3) Only you will be able to access the end work. Your uploads will not be shown on Alphy's public database and will not be accessible by other parties.</li>
											<li className="mb-2">4) To preserve privacy, all audio files are deleted after the transcription process is complete. </li>
						
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
									<div  class="flex items-center justify-center w-full">
										<label {...getRootProps()}  for="dropzone-file" class={`flex flex-col items-center justify-center w-full h-60 border-2 border-zinc-00 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-mildDarkMode hover:opacity-80 dark:border-gray-600 dark:hover:border-gray-700 dark:hover:bg-zinc-800 transition duration-200 ease-in `} >
											<div   class={`flex flex-col items-center justify-center pt-5 pb-6 min-w-[200px] ${isDragActive ? "" : ""}`} >
												{!isDragActive ?
													<div className="items-center justify-center flex flex-col">
														{!errorMessage ? 
														<div className="items-center justify-center flex flex-col">
														<svg aria-hidden="true" class="w-10 h-10 mb-3 text-zinc-600 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
														
														<p class="mb-2 text-sm text-zinc-700 dark:text-zinc-200"><span className="font-semibold">Click to upload an audio file</span> or drag and drop.</p>
														<p class="text-xs text-zinc-600 dark:text-zinc-200"> We accept MP3, M4A, MPGA, MPEG, WAV, or WEBM</p>
														</div>
														:
														<div className="items-center justify-center flex flex-col">
														<p class="mb-2 text-sm text-red-500"><span className="">Please make sure you submit one of the following file types!</span></p>
														<p class="text-xs text-zinc-600 dark:text-zinc-200"> We accept MP3, M4A, MPGA, MPEG, WAV, or WEBM</p>
														</div>
													}

													</div> :

													<div className="items-center justify-center flex flex-col items-center">
															<svg className="w-10 h-10 mb-3 text-zinc-600 dark:text-zinc-200 items-center flex" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
														<p class="mb-2 text-sm text-zinc-600 dark:text-zinc-200 font-sans">
													
															<strong>Drop your file here. </strong></p>
													</div>
												}
											</div>

											<input {...getInputProps()} className="" class="hidden" accept=".mp3,.wav,.mpeg,.m4a,.webm,.mpga" />
											<input  onChange={handleFileUpload} type="file" class="hidden" accept=".mp3,.wav,.mpeg,.m4a,.webm,.mpga" />


											<audio className="hidden" ref={audioRef} controls />
										</label>
									</div>

									:
									<div>
										<div className="flex flex-col  col-span-2 mx-auto items-center"><p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-10 mb-5 w-full  col-span-2">You need to go <a className="text-green-400 underline" href="/plans">premium</a> to upload personal files.</p></div>
									</div>


							)
							:
							<div className="rounded-xl dark:border-darkMode bg-white dark:bg-darkMode p-10 drop-shadow-sm dark:drop-shadow-sm font-semibold ">
								<p className={`flex flex-row font-sans text-zinc-700 dark:text-zinc-200  ${uploadProgress > 0 ? "italic" : "underline"} `}>  {uploadProgress > 0 && uploadProgress !== 100 ? "Sending to Alphy..." : "Process another file instead"}
									<svg onClick={handleFileUploadClear} className={`${uploadProgress > 0 && !errorMessage ? "opacity-40 pointer-events-none" : " cursor-pointer "} ml-2`} width="20px" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<title className="font-bold">Clear</title>
										<path clipRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" fillRule="evenodd"></path>
									</svg>
								</p>
								<div className="lg:flex lg:flex-row lg:grid lg:grid-cols-5">

									<p className="lg:col-span-2 flex  items-center font-sans text-zinc-700 dark:text-zinc-200 mt-8 lg:mt-0 "> {uploadTitle}</p>
									{/* 					<p className="text-sm text-zinc-600 dark:text-zinc-300 "> 
			
						Duration: {Math.floor(uploadDuration/60)}.{Math.floor(uploadDuration%60)} minutes

						</p> */}
									{/*  */}
									<div className="lg:col-span-2 mt-2 ">
										<div className="lg:grid lg:grid-cols-3">
											<div className="lg:col-span-3 hidden lg:flex  lg:justify-center lg:mt-2 ">
												{/* <Progress className={`${uploadProgress===0 ? "hidden" : "w-5/6"}`} color="green"  size="lg" value={uploadProgress} label={uploadProgress} /> */}

												<div class={`${uploadProgress === 0 && "hidden"} w-5/6 bg-gray-200 rounded-full h-3 dark:bg-gray-700 mt-2`} >
													<div class={`bg-green-400 h-3 rounded-full `} style={{ width: uploadProgress + "%" }}></div>
												</div>

												{/*  */}					{fileUploading === false && <p className="text-sm  text-zinc-700 dark:text-zinc-200 italic font-sans w-full flex justify-center lg:mt-2">Click continue to process the file...</p>}
												{/* <Progress className={`${uploadProgress>0 && "hidden"}`}color="gray" size="lg" value={100} label={0} /> */}
											</div>
											{/* 	<div className="sm:col-span-1 text-sm flex justify-center font-sans  text-zinc-700 dark:text-zinc-200">
					{Math.floor(uploadDuration/60)}.{Math.floor(uploadDuration%60)} minutes
						</div> */}
										</div>
									</div>

									<div className="col-span-1 flex flex-col lg:flex-row lg:items-center lg:justify-center  lg:margin-auto">

										{fileUploading === 0 && <p className="text-sm  text-zinc-700 dark:text-zinc-200 italic font-sans my-4 lg:hidden">Click continue to process the file...</p>}
										<div class={`${uploadProgress === 0 && "hidden"} my-4 lg:hidden w-5/6 bg-gray-200 rounded-full h-3 dark:bg-gray-700`} >
											<div class={`bg-green-400 h-3 rounded-full w-[${uploadProgress}%]`} style={{ width: uploadProgress + "%" }}></div>
										</div>
										{/* <Progress className={`${uploadProgress===0 ? "hidden" : "w-5/6"} lg:hidden my-4`} color="green"  size="lg" value={uploadProgress} label={uploadProgress} />
 */}
										{fileUploading ? <p className=" text-zinc-600 dark:text-zinc-300 text-sm font-sans italic my-4"><p className={`text-sm font-sans ${errorMessage ? "text-red-400 dark:text-400" : "text-zinc-600 dark:text-zinc-300"}`}>{uploadProgress !== 100 ? `Uploading... ${uploadProgress}% ` : errorMessage ? "There was an error. Please try again." : `Complete!`}</p> </p> : <div className="flex flex-row"> {/* <p className="lg:hidden">You are about to process this file.</p> */}<Button onClick={handlePostUpload} className="bg-green-400 lg:ml-10 normal-case max-w-[100px] my-4">Continue</Button></div>}

									</div>




								</div>

							</div>
						}





						{dataUploads.length > 0 &&
							<div className={`${file !== null ? "md:mt-20 mt-10" : ""}`}>
								<p className="text-zinc-600 dark:text-zinc-300 font-sans text-xl">Previous Works</p>
								<div class="border-b border-gray-200  flex mt-5 dark:opacity-40 items-center w-2/12 "></div>

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

											<div class="relative w-full min-w-[200px] h-11 ">
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

					</div>
				}
{archipelagos && 



	<div className="">
		{currentUser &&
		<div>
	{props.hasActiveSub===true ? 
	<p className="ml-8 mt-4 text-zinc-700 dark:text-zinc-300 text-lg lg:ml-10">Your Arcs
	<AddCircleIcon className="ml-4 cursor-pointer pb-1" onClick={() => handleCreatePlaylist()}/>
	</p>
	:
	<p className="mt-4 text-zinc-700 dark:text-zinc-300 text-lg lg:ml-10">Your Arcs
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
		<p>You need to be on a Premium account to create an arc. Meanwhile, feel free to enjoy our curated lists.</p>
		</div>
}



<div class={` mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`} ></div>
</div>}

		{<div>
		<p className="ml-8 mt-4 text-zinc-700 dark:text-zinc-300 text-lg lg:ml-10">Global Archipelagos</p>
					<Carousel 
					show={`${
						window.innerWidth>1000 ? (window.innerWidth>1280 ? 4.2 : 3.2) : 
			window.innerWidth>600 ? 2.2: 1.2
					}`} slide={3} transition={0.5}
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
					{dataGlobalArchipelagos.map((item, index) => 
					
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