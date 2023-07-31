import React, { Fragment, useState, useRef, useCallback } from 'react';
import { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import FeedItem from '../../components/ArticleComponents/FeedTabs/FeedItem';
import axios from 'axios';
import SkeletonItem from '../../components/ArticleComponents/FeedTabs/SkeletonItem';
import CuratedCarouselItem from '../../components/Landing_page/CuratedCarouselItem';







function HubArcFeed(props) {
	
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	/*const const { currentUser } = useAuth(); */
	const currentUser = props.currentUser;
	
	

	const [inputValue, setInputValue] = useState('');

	const [submitted, setSubmitted] = useState(false);
	const [called, setCalled] 	= useState(false);
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

	 
	 function searchKeyword(array) {
		return array.filter(item =>
			item.name.toLowerCase().includes(search.toLowerCase())
		);
	}
	const handleSearch = () => {
		setSearchMemory(search)
		localStorage.setItem('search', search);
		if (searchInputRef.current.value.length === 0) {
			setSearch('');
		}
			setOffset(0);
			getData(0, true, true);


		setSubmitted(true)}

	




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

	
	
	const loadMore = () => {
		
			setOffset(offset + limit);
			getData(offset + limit, false, true);
	



	};

	
	
	
	if (called === false && search.length===0) {

		
			getData(0, true, true);
			
			setCalled(true);
	
		
		


	}
	




	return (
		<div className="main-page-feed-section   w-full mt-20 mx-auto md:pl-20 md:ml-10  flex flex-row">

		<div className=" p-[10px] pl-5 xl:min-w-[1200px]  xl:max-w-[1200px]">
			Learn from the best online sources with AI.
					{/* <form
						className="flex items-center pt-4"
						
						onSubmit={(e) => {
							e.preventDefault();

						}}
					>
						<label htmlFor="voice-search" className="sr-only">
							Search
						</label>
						<div className="relative  ">


							<div class="relative h-11 ">
								<input
									ref={searchInputRef}
									
									onChange={(e) => {
										setSearch(e.target.value);
									}}
									placeholder="Start searching..."
									className=" pl-10 peer md:min-w-[300px] xl:min-w-[500px] h-full border-zinc-500 bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] dark:border-zinc-800 focus:border-blue-000 dark:focus:border-blue-000" />
								<div
						
						className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3 "
					>

						<svg
							width="20"
							
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


						</div>

					
					</form> */}
				

								<div className={`buttons flex justify-between mt-2 `}></div>

				
					<div className="main-page-feed  w-full">
						<div
							className={`flex flex-row overflow-hidden`}
						>
							{props.dataGlobalArchipelagos.length > 0
									&& searchKeyword(props.dataGlobalArchipelagos)
										.map((item, index) =>
										<div className="mx-5 my-5">
										 <CuratedCarouselItem currentUser={currentUser} key={index} item={item} forFeed={true}/>
										 </div>
										 
										 )}
						</div>
						{/* {hasMore && (
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
						)} */}
					</div>



			

				</div>


		</div>
	);
}

export default HubArcFeed;