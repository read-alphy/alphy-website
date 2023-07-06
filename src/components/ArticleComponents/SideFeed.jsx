import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeedItem from './FeedTabs/FeedItem';
import SkeletonItem from './FeedTabs/SkeletonItem';
import { useAuth } from '../../hooks/useAuth';
import Robot from "../../img/cute robot grey.png"
import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Button,
	Input
} from "@material-tailwind/react";


function SideFeed(props) {

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [navigated, setNavigated] = useState(false);
	const [global, setGlobal] = useState(localStorage.getItem("feedTab") !== null && localStorage.getItem("feedTab") == "global" ? true : false);
	const { currentUser } = useAuth();
	const [firstTimePersonal, setFirstTimePersonal] = useState(true);
	const [called, setCalled] = useState(false);

	const [dataPersonal, setDataPersonal] = useState([]);
	const [isLoadingPersonal, setIsLoadingPersonal] = useState(true);
	const [offsetPersonal, setOffsetPersonal] = useState(0);
	const [hasMorePersonal, setHasMorePersonal] = useState(true);
	const [ready, setReady] = useState(false);
	const [offsetUploads, setOffsetUploads] = useState(0);
	const [hasMoreUploads, setHasMoreUploads] = useState(true);
	const [dataUploads, setDataUploads] = useState([]);
	const [isLoadingUploads, setIsLoadingUploads] = useState(true);
	const [firstTimeUploads, setFirstTimeUploads] = useState(true);
	const [myUploads, setMyUploads] = useState(localStorage.getItem("feedTab") !== null && localStorage.getItem("feedTab") == "my_uploads" ? true : false);
	const [myWorks, setMyWorks] = useState(localStorage.getItem("feedTab") !== null && localStorage.getItem("feedTab") == "my_works" ? true : false);

	const [myBookmarks, setMyBookmarks] = useState(localStorage.getItem("feedTab") !== null && localStorage.getItem("feedTab") == "my_bookmarks" ? true : false);
	const [offsetBookmarks, setOffsetBookmarks] = useState(0);
	const [hasMoreBookmarks, setHasMoreBookmarks] = useState(false);
	const [dataBookmarks, setDataBookmarks] = useState([]);
	const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true);
	const [firstTimeBookmarks, setFirstTimeBookmarks] = useState(true);






	const getDataPersonal = (offsetPersonal, firstTimePersonal, hasMorePersonal, search_input) => {
		if (!hasMorePersonal) {
			return;
		}


		setIsLoadingPersonal(true);
		localStorage.setItem("search", search_input)

		if (currentUser) {
			setIsLoadingPersonal(true)
			currentUser.getIdToken().then((idtoken) =>

				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/${search_input.length > 0 ? `?q=${search_input}&` : "?"}limit=${limit}&offset=${offsetPersonal}&only_my=submits`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {


						setHasMorePersonal(!(response.data.length < limit));

						if (firstTimePersonal) {
							setDataPersonal(response.data);

						} else {
							setDataPersonal([...dataPersonal, ...response.data]);
						}
						setIsLoadingPersonal(false);
					}))
		};
	};
	const getDataBookmarks = (offsetBookmarks, firstTimeBookmarks, hasMoreBookmarks) => {
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




						if (firstTimeBookmarks) {
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
	const getDataUploads = (offsetUploads, firstTimeUploads, hasMoreUploads, search_input) => {
		if (!hasMoreUploads) {
			return;
		}


		setIsLoadingUploads(true);

		localStorage.setItem("search", search_input)

		if (currentUser) {
			setIsLoadingUploads(true)
			currentUser.getIdToken().then((idtoken) =>

				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/${search_input.length > 0 ? `?q=${search_input}&` : "?"}limit=${limit}&offset=${offsetUploads}&only_my=uploads`, {
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


	const navigateFeeds = (state) => {
		

		if (state.target.value == "global") {
			setGlobal(true)
			setMyWorks(false)
			setMyUploads(false)
			setMyBookmarks(false)
			localStorage.setItem("feedTab", "global")
			setOffset(0)
			getData(0, true, true,search);

		}

		else if (state.target.value == "my_works") {
			setGlobal(false)
			setMyWorks(true)
			setMyUploads(false)
			setMyBookmarks(false)
			localStorage.setItem("feedTab", "my_works")
			setOffsetPersonal(0)

			getDataPersonal(0, true, true,search);
		}

		else if (state.target.value == "my_uploads") {
			setGlobal(false)
			setMyWorks(false)
			setMyUploads(true)
			setMyBookmarks(false)
			localStorage.setItem("feedTab", "my_uploads")
			setOffsetUploads(0)
			
			getDataUploads(0, true, true,search);

		}
		else if (state.target.value == "my_bookmarks") {
			setGlobal(false)
			setMyWorks(false)
			setMyUploads(false)
			setMyBookmarks(true)
			localStorage.setItem("feedTab", "my_bookmarks")
			setOffsetBookmarks(0)

			getDataBookmarks(0, true, true,search);

		}



	}
	const temp = 10;
	const limit = temp;

	const searchInputRef = React.useRef(null);
	const feedRef = React.useRef(null);
	const feedRef2 = React.useRef(null);




	const getData = (offset, firstTime, hasMore, search_input) => {

		let query
		localStorage.setItem("search", search_input)

		if (!hasMore) {
			return;
		}
		setIsLoading(true);

		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/sources/${search_input.length > 0 ? `?q=${search_input}&` : "?"}limit=${limit}&offset=${offset}`
			)
			.then((response) => {
				if (response.data.length > 0) setData([...data, ...response.data]);

				setHasMore(!(response.data.length < limit));

				if (firstTime) {
					setData(response.data);
				} else {
					setData([...data, ...response.data]);
				}
				setIsLoading(false);
			})

	};



	const handleSearch = () => {
		
		if(global) {getData(0, true, true, search);}
		else if(myWorks) {getDataPersonal(0, true, true, search);}
		else if(myUploads===true) {getDataUploads(0, true, true, search);}
		else if(myBookmarks===true) {getDataBookmarks(0, true, true, search);}
		
	}
	const handleClear = () => {
		setSearch("")
		localStorage.setItem("search", "")

		if(global){getData(0, true, true, "")}
		else if(myWorks){getDataPersonal(0, true, true, "")}
		else if(myUploads===true){getDataUploads(0, true, true, "")}
		else if(myBookmarks===true){getDataBookmarks(0, true, true, "")}


	}

	const loadMore = () => {

		if (global) {
			setOffset(offset + limit);
			getData(offset + limit, false, true, search);
		}
		else if (myWorks) {

			setOffsetPersonal(offsetPersonal + limit);
			getDataPersonal(offsetPersonal + limit, false, true, search);
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

	const handleScroll = (event) => {

		const { scrollTop, scrollHeight, clientHeight } = feedRef2.current;
		if (scrollTop + clientHeight >= scrollHeight * 0.95) {

			loadMore();
			// scroll a little bit up to avoid triggering the event again

		}
	
	};

	
	useEffect(() => {

		if (called == false) {
			if (localStorage.getItem("search") !== null && localStorage.getItem("search") !== "undefined") {

				if (localStorage.getItem("search").length > 0) {

					if (global) {

						getData(0, true, true, localStorage.getItem("search"));
				
						setSearch(localStorage.getItem("search"))
					}
					else if(myWorks) {

						getDataPersonal(0, true, true, localStorage.getItem("search"));
						setSearch(localStorage.getItem("search"))
					}
					else if(myUploads) {
						
						getDataUploads(0, true, true, localStorage.getItem("search"));
						setSearch(localStorage.getItem("search"))
					}
					else if(myBookmarks) {
						
						getDataBookmarks(0, true, true, localStorage.getItem("search"));
						setSearch(localStorage.getItem("search"))
					}



				}
				else {

					if (global) {
						getData(0, true, true, search);
					}
					else if(myWorks) {
						getDataPersonal(0, true, true, search);
					}
					else if(myUploads) {
						getDataUploads(0, true, true, search);
					}
					else if(myBookmarks) {
						getDataBookmarks(0, true, true, search);
					}

				}
			}
			else {
				
				if (global) {
					getData(0, true, true, search);
				}
				else if(myWorks) {
					getDataPersonal(0, true, true, search);
				}
				else if(myUploads) {
					getDataUploads(0, true, true, search);
				}
				else if(myBookmarks) {
					getDataBookmarks(0, true, true, search);
				}
			}
		}
		setTimeout(() => {
			setReady(true)
		}, 500);
	}, []);

	if (currentUser !== null && called === false && localStorage.getItem("search") !== "undefined") {

		if (localStorage.getItem("search") !== null) {
			if (localStorage.getItem("search").length > 0) {
				if(myWorks){getDataPersonal(0, true, true, localStorage.getItem("search"));}
				else if(myUploads){getDataUploads(0, true, true, localStorage.getItem("search"));}
				else if(myBookmarks){getDataBookmarks(0, true, true, localStorage.getItem("search"));}
				setSearch(localStorage.getItem("search"))
			}
			else {
				if(myWorks){getDataPersonal(0, true, true, search);}
				else if(myUploads){getDataUploads(0, true, true, search);}
				else if(myBookmarks){getDataBookmarks(0, true, true, search);}

			}
		}
		else {
			if(myWorks){getDataPersonal(0, true, true, search);}
			else if(myUploads){getDataUploads(0, true, true, search);}
			else if(myBookmarks){getDataBookmarks(0, true, true, search);}
		}

		setCalled(true);
	}


	return (
		<div id="side-feed" className="dark:bg-mildDarkMode dark:text-zinc-300 bg-zinc-50 md:bg-zinc-100">

			<form
				className="flex items-center h-[10vh] min-h-[50px] pt-5  md:pt-10 max-w-[95%] drop-shadow-sm "
				onSubmit={(e) => {
					e.preventDefault();
					setOffset(0);
					// if input is empty get it from searchInputRef
					if (searchInputRef.current.value.length === 0) {
						setSearch('');
						if (global) { getData(0, true, true, search) }
						else if(myWorks) { getDataPersonal(0, true, true, search) }
						else if(myUploads) { getDataUploads(0, true, true, search) }
						else if(myBookmarks) { getDataBookmarks(0, true, true, search) }
					} else {
						if (global) { getData(0, true, true, search) }
						else if(myWorks) { getDataPersonal(0, true, true, search) }
						else if(myUploads) { getDataUploads(0, true, true, search) }
						else if(myBookmarks) { getDataBookmarks(0, true, true, search) }
					}
				}}
			>
				<label htmlFor="simple-search" className="sr-only">
					Search
				</label>
				<div className="relative w-full mb-10 ">
					<input
						value={search.length === 0 ? localStorage.getItem("search") : search}
						title={search}
						ref={searchInputRef}
						type="text"
						onChange={(e) => {
							setSearch(e.target.value);
							localStorage.setItem("search", e.target.value);
						}}

						id="simple-search"
						className="ml-2 pr-10 bg-zinc-50 dark:bg-darkMode  rounded-full border-whiteLike text-zinc-500  text-gray-900 text-sm focus:outline-none focus:border-slate-50 focus:ring-slate-50 dark:border-darkMode dark:focus:ring-darkMode dark:focus:border-darkMode block w-full pl-4 p-3 "
						placeholder={'Search...'}

					/>

					{search.length > 0 ? (
						<div
							onClick={handleClear}
							className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-10"
						>
							<svg
								width="20"
								onClick={handleClear}
								className="cursor-pointer"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 18L18 6M6 6l12 12"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
						</div>
					) :
						null
					}
					<div
						onClick={handleClear}
						className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 "
					>

						<svg
							width="20"
							onClick={handleSearch}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24 "
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap={'round'}
								strokeLinejoin={'round'}
								strokeWidth={'2'}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>

				</div>
				{/* <button
					onClick={handleSearch}
					type="submit"
					className="p-3 ml-2 mb-10 rounded-r-full   text-sm font-medium  text-gray-400 bg-zinc-50 dark:bg-darkMode rounded-r-full border-whiteLike "
				>
					<svg
						width="22"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24 "
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap={'round'}
							strokeLinejoin={'round'}
							strokeWidth={'2'}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
					<span className="sr-only">Search</span>
				</button> */}
			</form>


			<div className="text-sm font-medium text-gray-500   w-full dark:text-zinc-300 dark:border-gray-700">




				<Menu placement="bottom-start" className="pl-2 dark:bg-mildDarkMode" >
					<MenuHandler>
						<div className="flex-row flex border-b  dark:border-b-zinc-700 w-full md:max-w-[250px] md:3xl:max-w-[330px] dark:bg-mildDarkMode">
							<button className="bg-transparent  w-full lg:max-w-[250px] 3xl:max-w-[330px] flex  mb-5  ml-4" >
								{global && <span className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  ">Global</span>}
								{myWorks && <span className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  ">My Works</span>}
								{myBookmarks && <span className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  ">Bookmarks</span>}
								{myUploads && <span className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  ">My Uploads</span>}


							</button>
							<svg class={`w-6 h-6 mr-2 shrink-0 flex justify-right justify-space-between`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
						</div>
					</MenuHandler>
					<MenuList className=" z-50 -mt-2 w-full lg:min-w-[250px] lg:max-w-[250px] 3xl:max-w-[330px] 3xl:min-w-[330px] bg:zinc-50 dark:bg-mildDarkMode  dark:border-2 dark:border-darkMode ">
						<MenuItem onClick={navigateFeeds} className="font-sans lg:min-w-[220px] lg:max-w-[220px] 3xl:max-w-[305px] 3xl:min-w-[305px] dark:text-zinc-300 text-zinc-600 rounded-lg  hover:border-transparent hover:ring-0 hover:outline-none dark:hover:bg-darkMode text-left hover:text-zinc-400 dark:hover:text-zinc-500 transition duration-200 ease-in-out" value="my_works">
							My Works
						</MenuItem>
						<MenuItem onClick={navigateFeeds} className="font-sans lg:min-w-[220px] lg:max-w-[220px] 3xl:max-w-[305px] 3xl:min-w-[305px] dark:text-zinc-300 text-zinc-600  dark:hover:bg-darkMode hover:border-transparent hover:ring-0 hover:outline-none text-left hover:text-zinc-400 dark:hover:text-zinc-500 transition duration-200 ease-in-out" value="my_uploads">
							My Uploads
						</MenuItem>
						<MenuItem onClick={navigateFeeds} className="font-sans lg:min-w-[220px] lg:max-w-[220px] 3xl:max-w-[305px] 3xl:min-w-[305px] dark:text-zinc-300 text-zinc-600 dark:hover:bg-darkMode hover:border-transparent hover:ring-0 hover:outline-none text-left hover:text-zinc-400 dark:hover:text-zinc-500 transition duration-200 ease-in-out" value="my_bookmarks">
							Bookmarks
						</MenuItem>
						<MenuItem onClick={navigateFeeds} className="font-sans lg:min-w-[220px] lg:max-w-[220px] 3xl:max-w-[305px] 3xl:min-w-[305px] dark:text-zinc-300 text-zinc-600 dark:hover:bg-darkMode hover:border-transparent hover:ring-0 hover:outline-none text-left hover:text-zinc-400 dark:hover:text-zinc-500 transition duration-200 ease-in-out" value="global">
							Global
						</MenuItem>
					</MenuList>
				</Menu>



			</div>


			<div className="flex mt-4">
				{/* <div className="h-[80vh] overflow-y-scroll pl-1 pr-5" onScroll={handleScroll}> */}
				<div className="side-feed h-[68vh] w-full  md:h-[77vh] overflow-y-scroll pl-1 md:pr-5" ref={feedRef2} onScroll={handleScroll}>
					<div className="items " ref={feedRef} >
						{global &&
							(isLoading
								? // if data is not empty, show the data then show 10 skeletons
								data.length > 0
									? data
										.map((item, index) =>
											item.source_id === props.source_id ? (
												<div onClick={props.setCollapsed} className="null">
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks}
														key={index}
														item={item}
														Collapser={props.setCollapsed}

														poi={true}
													/>
												</div>
											) : (
												<div onClick={props.Collapser} className="null">
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} setCollapsed={props.setCollapsed} />
												</div>
											)
										)
										.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: data.map((item, index) => (

									<div onClick={props.Collapser} className="null">

										<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} setCollapsed={props.setCollapsed} />
									</div>
								))
							)}
						{myWorks &&
							(currentUser ? isLoadingPersonal
								? // if dataPersonal is not empty, show the dataPersonal then show 10 skeletons
								dataPersonal.length > 0
									? dataPersonal
										.map((item, index) =>
											item.source_id === props.source_id ? (
												<div onClick={props.setCollapsed} className="null">
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks}
														key={index}
														item={item}
														Collapser={props.setCollapsed}

														poi={true}
													/>
												</div>
											) : (
												<div onClick={props.Collapser} className="null">
													
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} setCollapsed={props.setCollapsed} />
												</div>
											)
										)
										.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: dataPersonal.map((item, index) => (
									<div onClick={props.Collapser} className="null">
										
										<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} setCollapsed={props.setCollapsed} />
									</div>)
								) : <div className="items-center mx-auto ml-5">
								{ready == true && myWorks==true && currentUser==null &&
									<div>
										<p className="  text-zinc-500 dark:text-zinc-200 text-center items-center margin-auto text-l mt-16 mb-5 w-full col-span-2">Sign in to see the content you previously submitted or navigate to <a onClick={() => navigateFeeds("global")} className="underline text-green-400 cursor-pointer mx-auto " value="global">Global</a> to explore Alphy's database.</p>
										<img width={250} className="opacity-30 dark:opacity-30 mx-auto" src={Robot}></img>
									</div>
								}
							</div>)
						}
						{ called == true && myWorks==true && dataPersonal.length == 0 && ready == true && search.length===0 && 	(
							<div className="flex flex-col  mt-5 px-5 col-span-2 mx-auto items-center">

								<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Looks like you haven't submitted any content yet.<br></br>Check <a onClick={() => navigateFeeds("global")} className="underline text-green-400 cursor-pointer" value="global">Global</a> to get inspiration from the content other users unlocked with Alphy. {hasMorePersonal ? "If you've submitted content previously, simply refresh the page." : ""}</p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
							</div>
						)
						}

					

						
						{myBookmarks&&
							(currentUser 
								? 
								isLoadingBookmarks
								? 
								dataBookmarks.length > 0
									? dataBookmarks
										.map((item, index) =>
											item.source_id === props.source_id ? (
												<div onClick={props.setCollapsed} className="null">
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks}
														key={index}
														item={item}
														Collapser={props.setCollapsed}

														poi={true}
													/>
												</div>
											) : (
												<div onClick={props.Collapser} className="null">
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} setCollapsed={props.setCollapsed} />
												</div>
											)
										)
										.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: dataBookmarks.map((item, index) => (
									<div onClick={props.Collapser} className="null">
										<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} setCollapsed={props.setCollapsed} />
									</div>)
								)
								: null
								 )
							}
								
							{
								<div className="items-center mx-auto ml-5">

								
								{ready == true && currentUser===null && myBookmarks==true ? 
									<div>
										<p className="  text-zinc-500 dark:text-zinc-200 text-center items-center margin-auto text-l mt-16 mb-5 w-full col-span-2"><a className="underline text-green-400" href="/u/login">Sign in</a> to see your bookmarks.</p>
										<img width={250} className="opacity-30 dark:opacity-30 mx-auto" src={Robot}></img>
									</div>
									:null
								}
								
						{dataBookmarks.length == 0 && currentUser !== null && search.length===0 && myBookmarks==true ?
							<div className="flex flex-col  mt-5 px-5 col-span-2 mx-auto items-center">

								<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">You haven't bookmarked any content yet.<br></br>Check <a onClick={() => navigateFeeds("global")} className="underline text-green-400 cursor-pointer" value="global">Global</a> to find conversations you want to add to your knowledge base. </p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>	
							</div>
							:null}

							
							</div>
}


						






						<div className="ml-2"
						>

							{myUploads === true &&
								(isLoadingUploads
								? dataUploads.length > 0
									?
									dataUploads.map((item, index) => { <FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index} item={item} /> }).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

									: [...Array(10)].map((item, index) => {
										<div>

											<SkeletonItem key={index} />

										</div>
									})
								: dataUploads.map((item, index) => <FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={myBookmarks} key={index + 1000} item={item} />
								)
								)
								}
						</div>

						{ready == true && myUploads === true && dataUploads.length == 0 && currentUser === null && (
							<div>
								<p className="  text-zinc-500 dark:text-zinc-200 text-center items-center margin-auto text-l mt-16 mb-5 w-full col-span-2"><a className="text-green-400 underline" href="u/login">Sign in</a> to process audio files.</p>
								<img width={250} className="opacity-30 dark:opacity-30 mx-auto" src={Robot}></img>
							</div>
						)
						}

						{ready == true && myUploads === true && dataUploads.length == 0 && currentUser !== null &&
							<div className="flex flex-col  mt-5 px-5 col-span-2 mx-auto items-center">

								<p className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">You haven't uploaded anything yet.<br></br>Go to <a href="/" className="underline text-green-400">main page</a> to start your first upload. </p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
							</div>}

					</div>
				</div>
			</div>


			{/* 
			{hasMore && (
				<div className="w-full flex justify-center">
					{
						<p
							className="justify-center items-center pt-2 	text-center flex cursor-pointer text-zinc-500   "
							onClick={loadMore}
						>
							{'Load more'}
						</p>
					}
				</div>
			)} */}
		</div>
	);
}
export default SideFeed;