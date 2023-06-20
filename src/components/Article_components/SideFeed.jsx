import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeedItem from './FeedTabs/FeedItem';
import SkeletonItem from './FeedTabs/SkeletonItem';
import {useAuth} from '../../hooks/useAuth';
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
	const [isPublic, setisPublic] = useState(localStorage.getItem("feedTab")!==null && localStorage.getItem("feedTab")=="true" ? true :  false);
	const {currentUser} = useAuth();
	const[firstTimePersonal, setFirstTimePersonal] = useState(true);
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
	const [myUploads, setMyUploads] = useState(false);

	
	
	const getDataPersonal = (offsetPersonal, firstTimePersonal, hasMorePersonal,search_input) => {
		if (!hasMorePersonal) {
			return;
		}
		

		setIsLoadingPersonal(true);
		localStorage.setItem("search",search_input)
		
		if (currentUser) {
			setIsLoadingPersonal(true)
			currentUser.getIdToken().then((idtoken) =>

				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/${search_input.length>0?`?q=${search_input}&`:"?"}limit=${limit}&offset=${offsetPersonal}&only_my=submits`, {
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

	const getDataUploads = (offsetUploads, firstTimeUploads, hasMoreUploads,search_input) => {
		if (!hasMoreUploads) {
			return;
		}
		

		setIsLoadingUploads(true);

		localStorage.setItem("search",search_input)
		
		if (currentUser) {
			setIsLoadingUploads(true)
			currentUser.getIdToken().then((idtoken) =>

				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/${search_input.length>0?`?q=${search_input}&`:"?"}limit=${limit}&offset=${offsetUploads}&only_my=uploads`, {
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

	const navigateFeeds = (event) => {
		
		localStorage.setItem("search","")
		localStorage.setItem("feedTab",`${!isPublic}`)
	
		

		if(event.target.value==1){
			setisPublic(true)
			setMyUploads(false)
				getData(0, true, true,search);
	
			}
	
			else if(event.target.value==2){
				setMyUploads(false)
				setisPublic(false)
				getDataPersonal(0, true, true,search);
			}

			else if(event.target.value==3){
				setisPublic(false)
				setMyUploads(true)
				getDataUploads(0, true, true,search);

			}
		
		
		

	}
	const temp = 10;
	const limit = temp;

	const searchInputRef = React.useRef(null);
	const feedRef = React.useRef(null);
	const feedRef2 = React.useRef(null);




	const getData = (offset, firstTime, hasMore, search_input) => {
				
		let query
		localStorage.setItem("search",search_input)

		if (!hasMore) {
			return;
		}
		setIsLoading(true);

		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
			}/sources/${search_input.length>0?`?q=${search_input}&`:"?"}limit=${limit}&offset=${offset}`
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
		getData(0, true, true, search);
	}
	const handleClear = () => {
		setSearch("")
		localStorage.setItem("search", "")

		getData(0, true, true, "");


	}

	const loadMore = () => {
		
		if(isPublic===true){
			setOffset(offset + limit);
			getData(offset + limit, false, true, search);
		}
		else if (isPublic===false && myUploads===false){
			
			setOffsetPersonal(offsetPersonal + limit);
			getDataPersonal(offsetPersonal + limit, false, true, search);
		}
		else if (isPublic===false && myUploads===true){
			
			setOffsetUploads(offsetUploads + limit);
			getDataUploads(offsetUploads + limit, false, true, search);
		}


	};

	const handleScroll = (event) => {
		
		const { scrollTop, scrollHeight, clientHeight } = feedRef2.current;
		if (scrollTop + clientHeight >= scrollHeight*0.95) {
			
			loadMore();
			// scroll a little bit up to avoid triggering the event again
			
		}
/* 		const element = event.target;
		if (element.scrollHeight - element.scrollTop === element.clientHeight) {
			// you're at the bottom of the page
			console.log("oi")
			loadMore();
			// scroll a little bit up to avoid triggering the event again
			element.scrollTop = element.scrollTop - 1;
			element.scrollTop = element.scrollTop - 1;
		}
 */
	};
	useEffect(() => {

	if(called==false){
		if(localStorage.getItem("search")!==null && localStorage.getItem("search")!=="undefined"){

					if(localStorage.getItem("search").length>0){

						if(isPublic==true){

								getData(0, true, true, localStorage.getItem("search"));
								setSearch(localStorage.getItem("search"))
							}
						else{
							
							getDataPersonal(0, true, true, localStorage.getItem("search"));
							setSearch(localStorage.getItem("search"))
						}

					
					}
					else{
						
						if(isPublic==true){
						getData(0, true, true, search);
					}
					else{
						getDataPersonal(0, true, true, search);
					}
					}
	}
		else{
			getData(0, true, true, search);
		}
	}
		setTimeout(() => {
			setReady(true)
		},500);
	}, []);

if(currentUser!==null && called===false && localStorage.getItem("search")!=="undefined"){
	
		if(localStorage.getItem("search")!==null){
			if(localStorage.getItem("search").length>0){
					getDataPersonal(0, true, true,localStorage.getItem("search"));
					setSearch(localStorage.getItem("search"))
					}
			else{
				getDataPersonal(0, true, true, search);
					}
				}
				else{
					getDataPersonal(0, true, true, search);
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
						if(isPublic){getData(0, true, true, search)}
						else{getDataPersonal(0, true, true, search)}
					} else {
						
						if(isPublic){getData(0, true, true, search)}
						else{getDataPersonal(0, true, true, search)}
					}
				}}
			>
				<label htmlFor="simple-search" className="sr-only">
					Search
				</label>
				<div className="relative w-full mb-10 ">
					<input
						value={search.length===0 ? localStorage.getItem("search") : search}
						title={search}
						ref={searchInputRef}
						type="text"
						onChange={(e) => {
							setSearch(e.target.value);
						}}

						id="simple-search"
						className="ml-2 pr-10 bg-zinc-50 dark:bg-darkMode  rounded-full border-whiteLike text-zinc-500  text-gray-900 text-sm focus:outline-none focus:border-slate-50 focus:ring-slate-50 dark:border-darkMode dark:focus:ring-darkMode dark:focus:border-darkMode block w-full pl-4 p-3 "
						placeholder={'Search...'}

					/>
					
					{search.length > 0  ? (
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
						
		

	
		<Menu placement="bottom-start" className="pl-2" >
		<MenuHandler>
			<div className="flex-row flex dark:bg-transparent border-b  dark:border-b-zinc-700 w-full md:max-w-[250px] md:3xl:max-w-[330px]">
        <button className=" bg-transparent  w-full lg:max-w-[250px] 3xl:max-w-[330px] flex  mb-5  ml-4" >
			{isPublic && <span className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  ">Global</span>}
			{!isPublic && !myUploads && <span className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  ">My Works</span>}
			{!isPublic && myUploads && <span className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  ">My Uploads</span>}
			
		
		</button>
		<svg  class={`w-6 h-6 mr-2 shrink-0 flex justify-right justify-space-between`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		</div>
      </MenuHandler>
	  <MenuList className=" z-50 -mt-2 w-full lg:max-w-[250px] 3xl:max-w-[330px] bg:zinc-50 dark:bg-darkMode dark:border-2 dark:border-darkMode border-0">
		<MenuItem onClick={navigateFeeds} className="font-sans dark:text-zinc-300 text-zinc-600 rounded-lg  hover:border-transparent hover:ring-0 hover:outline-none dark:hover:bg-darkMode text-left hover:text-zinc-400 dark:hover:text-zinc-500 transition duration-200 ease-in-out"  value="2">
			My Works
		</MenuItem>
		<MenuItem onClick={navigateFeeds} className="font-sans dark:text-zinc-300 text-zinc-600  dark:hover:bg-darkMode hover:border-transparent hover:ring-0 hover:outline-none text-left hover:text-zinc-400 dark:hover:text-zinc-500 transition duration-200 ease-in-out" value="3">
			My Uploads
		</MenuItem>
		<MenuItem onClick={navigateFeeds} className="font-sans dark:text-zinc-300 text-zinc-600 dark:hover:bg-darkMode hover:border-transparent hover:ring-0 hover:outline-none text-left hover:text-zinc-400 dark:hover:text-zinc-500 transition duration-200 ease-in-out" value="1">
			Global
		</MenuItem>
		</MenuList>
		</Menu>
	


			</div>


			<div className="signed-in-feed flex mt-4">
				{/* <div className="h-[80vh] overflow-y-scroll pl-1 pr-5" onScroll={handleScroll}> */}
				<div className="h-[68vh] w-full  md:h-[77vh] overflow-y-scroll pl-1 md:pr-5" ref={feedRef2} onScroll={handleScroll}>
					<div className="items " ref={feedRef} >
						{isPublic &&
							(isLoading
							? // if data is not empty, show the data then show 10 skeletons
							data.length > 0
								? data
									.map((item, index) =>
										item.source_id === props.source_id ? (
											<div onClick={props.setCollapsed} className="null">
												<FeedItem
													key={index}
													item={item}
													Collapser={props.setCollapsed}

													poi={true}
												/>
											</div>
										) : (
											<div onClick={props.Collapser} className="null">
												<FeedItem key={index} item={item} setCollapsed={props.setCollapsed} />
											</div>
										)
									)
									.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))

								: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
							: data.map((item, index) => (
								
								<div onClick={props.Collapser} className="null">
									
									<FeedItem key={index} item={item} setCollapsed={props.setCollapsed} />
								</div>
							))
							)}
						{!isPublic && !myUploads &&
											(currentUser ?  isLoadingPersonal
												? // if dataPersonal is not empty, show the dataPersonal then show 10 skeletons
												dataPersonal.length > 0
													? dataPersonal
														.map((item, index) =>
															item.source_id === props.source_id ? (
																<div onClick={props.setCollapsed} className="null">
																	<FeedItem
																		key={index}
																		item={item}
																		Collapser={props.setCollapsed}
					
																		poi={true}
																	/>
																</div>
															) : (
																<div onClick={props.Collapser} className="null">
																	<FeedItem key={index} item={item} setCollapsed={props.setCollapsed} />
																</div>
															)
														)
														.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))
					
													: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
												: dataPersonal.map((item, index) => (
													<div onClick={props.Collapser} className="null">
														<FeedItem key={index} item={item} setCollapsed={props.setCollapsed} />
													</div>)
												): <div className="items-center mx-auto ml-5">
													{ready==true && isPublic==false &&
													<div>
													<p  className="  text-zinc-500 dark:text-zinc-200 text-center items-center margin-auto text-l mt-16 mb-5 w-full col-span-2">Sign in to see the content you previously submitted or navigate to <a onClick={navigateFeeds} className="underline text-green-400 cursor-pointer mx-auto ">Global</a> to explore Alphy's database.</p>
													<img width={250} className="opacity-30 dark:opacity-30 mx-auto" src={Robot}></img>
													</div>
													}
													</div>)
										}
												{isPublic==false && called==true &&dataPersonal.length==0 && ready==true &&(
											<div className="flex flex-col  mt-5 px-5 col-span-2 mx-auto items-center">
												
												<p  className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Looks like you haven't submitted any content yet.<br></br>Check <a onClick={navigateFeeds} className="underline text-green-400 cursor-pointer">Global</a> to get inspiration from the content other users unlocked with Alphy. {hasMorePersonal ? "If you've submitted content previously, simply refresh the page." : ""}</p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
											</div>
								)
							}
		
	<div className="ml-2"
							>
								
						{myUploads===true && 
						isLoadingUploads
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

				{ready==true && myUploads===true && dataUploads.length==0 && currentUser===null &&(
													<div>
													<p  className="  text-zinc-500 dark:text-zinc-200 text-center items-center margin-auto text-l mt-16 mb-5 w-full col-span-2"><a className="text-green-400 underline" href="u/login">Sign in</a> to process audio files.</p>
													<img width={250} className="opacity-30 dark:opacity-30 mx-auto" src={Robot}></img>
													</div>
				)
													}

													{	ready==true && myUploads===true && dataUploads.length==0 && currentUser!==null &&
													<div className="flex flex-col  mt-5 px-5 col-span-2 mx-auto items-center">
												
												<p  className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Looks like you haven't submitted any content yet.<br></br>Check <a onClick={navigateFeeds} className="underline text-green-400 cursor-pointer">Global</a> to get inspiration from the content other users unlocked with Alphy. {hasMorePersonal ? "If you've submitted content previously, simply refresh the page." : ""}</p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
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