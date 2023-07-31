import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import FeedItem from './FeedTabs/FeedItem';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import InventoryIcon from '@mui/icons-material/Inventory';

function SideFeed(props) {

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	
	
	const { currentUser } = useAuth();
	const [firstTimePersonal, setFirstTimePersonal] = useState(true);
	const [called, setCalled] = useState(false);


	const [offsetPersonal, setOffsetPersonal] = useState(0);

	
	const [offsetUploads, setOffsetUploads] = useState(0);


	
	const [offsetBookmarks, setOffsetBookmarks] = useState(0);
	
	const [searchQuery, setSearchQuery] = useState("");
	const [searchMemory, setSearchMemory] = useState("");

	const [showSearch, setShowSearch] = useState(false);
	const carouselRef = useRef(null);

	useEffect(() => {
		const timer = setTimeout(() => {
		  setSearchQuery(search);
		}, 500); // delay of 500ms
	
		return () => clearTimeout(timer); // this will clear the timer if the user keeps typing before the 500ms has passed
	  }, [search]);
	
	
	  useEffect(() => {
		if (searchQuery || (searchQuery === "" && searchMemory !== "")) {
		  // Call the search API/function here. Your backend code goes here.
		  // fetch(`api/search?query=${searchQuery}`)...
		  handleSearch();
		}
	 }, [searchQuery]);							



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
		setSearchMemory(search)
		
		getData(0, true, true, search)
		
		
	}
	const handleClear = () => {
		setSearch("")
		localStorage.setItem("search", "")

		getData(0, true, true, "")
	


	}

	const loadMore = () => {

		
			setOffset(offset + limit);
			getData(offset + limit, false, true, search);
		


	};

	

	
	useEffect(() => {

		if (called == false) {
			if (localStorage.getItem("search") !== null && localStorage.getItem("search") !== "undefined") {

				if (localStorage.getItem("search").length > 0) {
					getData(0, true, true, localStorage.getItem("search"));
				}
				else {

					
						getData(0, true, true, search);
					
				}
			}
			else {
				
				
					getData(0, true, true, search);
			}
		}

	}, []);


	

	useEffect(() => {
        const handleScroll = () => {
          if (carouselRef.current) {
            const container = carouselRef.current;
            const isScrollEnd = container.scrollLeft + container.clientWidth === container.scrollWidth;
    

    
          }
        };
    
        // Attach scroll event listener
        if (carouselRef.current) {
          carouselRef.current.addEventListener('scroll', handleScroll);
        }

        // Clean up the event listener on component unmount
        return () => {
          if (carouselRef.current) {
            carouselRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);

	return (
		<div id="side-feed" className="dark:bg-mildDarkMode dark:text-zinc-300 bg-zinc-50 lg:bg-zinc-100 ">
				<div className="lg:hidden">
					<Navbar collapsed={props.collapsed} setCollapsed={props.setCollapsed}/>
				</div>
		<div className="pt-10 md:pl-5">
			{/* <a className="px-5 py-3 flex flex-row text-zinc-500 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out " href={`/hub`}>
				
				<HomeIcon className="mr-3"/>
				<p>
				Main Hub
				</p></a> */}
			<div className="flex flex-col w-full justify-start px-5">
				<button className="text-zinc-500 dark:text-zinc-300 flex flex-row py-3 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out">
				<AddIcon className="mr-3"/>
					<p>Submit</p>
				</button>
				<button className="text-zinc-500 dark:text-zinc-300 flex flex-row py-3 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out">
				<ChatIcon className="mr-3 mt-1" fontSize="small"/>
					<p className="">Create an Arc</p>
					
				</button>

				<button className="text-zinc-500 dark:text-zinc-300 flex flex-row py-3 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out">
				<InventoryIcon className="mr-3 mt-1" fontSize="small"/>
					<p className="">My Work</p>
					
				</button>

				<button className="text-zinc-500 dark:text-zinc-300 flex flex-row py-3 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out">
				<BookmarksIcon className="mr-3 mt-1" fontSize="small"/>
					<p className="">My Bookmarks</p>
					
				</button>

			</div>

		<button onClick={()=>setShowSearch(!showSearch)} className="px-5 py-3 flex flex-row text-zinc-500 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out" href="/hub">
		
		<SearchIcon className="mr-3"/>
		<p>
		Search
		</p></button>
	
</div>


			<form
				className={`flex items-center h-[10vh] min-h-[40px]  max-w-[95%] drop-shadow-sm ${
					showSearch ? "visibleDropdown" : "hiddenDropdown"}`}
				onSubmit={(e) => {
					e.preventDefault();
					setOffset(0);
					// if input is empty get it from searchInputRef
					if (searchInputRef.current.value.length === 0) {
						setSearch('')
					}
						getData(0, true, true, search) 

				}}
			>
				<label htmlFor="simple-search" className="sr-only">
					Start searching
				</label>
				<div className="relative w-full mb-5 ">
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
						className={` ${!showSearch && "pointer-events-none"} ml-2 pr-10 border-zinc-200 lg:bg-zinc-50 dark:bg-darkMode dark:Text-white rounded-lg focus:border-zinc-300 dark:focus:border-zinc-600 lg:border-whiteLike text-zinc-500  text-sm focus:outline-none focus:border-slate-50 focus:ring-slate-50 dark:border-darkMode dark:focus:ring-darkMode dark:focus:border-darkMode block w-full pl-4 p-3`}
						placeholder={`Start searching our database...`}

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
			
			</form>
			{showSearch &&
							(isLoading
								? // if data is not empty, show the data then show 10 skeletons
								data.length > 0
									? data
										.map((item, index) =>
											item.source_id === props.source_id ? (
												<div onClick={props.setCollapsed} className="null">
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={false}
														key={index}
														item={item}
														Collapser={props.setCollapsed}

														poi={true}
													/>
												</div>
											) : (
												<div onClick={props.Collapser} className="null">
													<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={false} key={index} item={item} setCollapsed={props.setCollapsed} />
												</div>
											)
										)
										.concat([...Array(10)].map((item, index) => {/* <SkeletonItem key={index + 500} /> */}))

									: [...Array(10)].map((item, index) => {/* <SkeletonItem key={index} /> */})
								: data.map((item, index) => (

									<div onClick={props.Collapser} className="null">

										<FeedItem sideFeed={true} currentUser={currentUser} myBookmarks={false} key={index} item={item} setCollapsed={props.setCollapsed} />
									</div>
								))
							)}

			
		</div>
	);
}
export default SideFeed;