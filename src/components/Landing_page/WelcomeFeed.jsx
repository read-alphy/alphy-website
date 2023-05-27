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
	
	let calledAndEmpty = true 


		

	
		
		/* getData(0, true, true); */
		/* 		if (currentUser !== null) {
					getDataPersonal(0, true, true);
				} */




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
		if(isPublic===false){
		setisPublic(true)
		
			getData(0, true, true);

		}

		else{
			setisPublic(false)
			getDataPersonal(0, true, true);
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
				}/summaries?q=${search}&offset=${offset}&limit=${limit}&only_mine=false`
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
					}/summaries?q=${search}&offset=${offset}&limit=${limit}&only_mine=true`, {
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
		setOffset(offset + limit);
		getData(offset + limit, false, true);

		setOffsetPersonal(offset + limit);
		getDataPersonal(offset + limit, false, true);

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
						<button onClick={() => setisPublic(true)} class={`inline-block p-4 mb-1 ${isPublic ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-500`}>Global</button>
					</li> */}
					<li class="mr-2">
						<button onClick={navigateFeeds} class={`inline-block p-4 mb-1 ${!isPublic ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light"} ${currentUser == null || dataPersonal.length == 0 ? "" : ""}  rounded-t-lg  dark:text-zinc-200 dark:border-blue-500`}>My Works</button>
					</li>
					<li class="mr-2">
						<button onClick={navigateFeeds} class={`inline-block p-4 mb-1 ${isPublic ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300 font-light "}   rounded-t-lg  dark:text-zinc-200 dark:border-blue-500`}>Global</button>
					</li>

				</ul>
			</div>

			<div className="main-page-feed-table-parent bg-zinc-50 dark:bg-darkMode dark:bg-mildDarkMode border-[1px] dark:border-none  rounded-[10px] sm:p-[40px] p-[10px] ">
				<form
					className="flex items-center"
					onKeyDown={handleKeyDown}
					onSubmit={(e) => {
						e.preventDefault();
						setOffset(0);
						localStorage.setItem('search', search);
						if (searchInputRef.current.value.length === 0) {
							setSearch('');
						}
						getData(0, true, true);
						setSubmitted(true)
					}}
				>
					<label htmlFor="voice-search" className="sr-only">
						Search
					</label>
					<div className="relative w-full  ">
						<input
							ref={searchInputRef}
							

							type="text"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							id="input-box"
							className="bg-zinc-50 dark:bg-darkMode border border-slate-200   dark:border-none  text-gray-900 dark:text-zinc-200 text-sm rounded-l-full mt-5 sm:mt-0 focus:outline-none focus:ring-slate-200 drop-shadow-sm focus:border-slate-200 dark:focus:border-darkMode dark:focus:ring-darkMode block w-full  py-3"
							placeholder={search.length > 0 ? search : 'Search YouTube videos or Twitter spaces...'}
						/>
					</div>
					<button
						type="submit"
						className="inline-flex items-center mt-5 sm:mt-0  py-3 pl-7 text-sm font-medium text-zinc-500 border border-slate-200 dark:border-none  rounded-r-full drop-shadow-sm dark:bg-darkMode "
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5 mr-10"
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
					</button>
				</form>

				<div className={`buttons flex justify-between mt-2 `}></div>

				{isPublic ?
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
					</div>



					:




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
						{called==true && currentUser!==null && ready==true && dataPersonal.length==0 ? (
							<div className={`flex flex-col ${calledAndEmpty===false?"hidden":""} col-span-2 mx-auto block items-center`} >

								<p  className="text-center text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l mt-5 mb-5 w-full  col-span-2">Looks like you haven't submitted any content yet.<br></br>Check <a onClick={navigateFeeds} className="underline text-green-400 cursor-pointer">Global</a> to get inspiration from the content other users unlocked with Alphy.</p> <img className="opacity-50 dark:opacity-70" width={400} src={Robot}></img>
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
			</div>



		</div>
	);
}

export default Feed;
