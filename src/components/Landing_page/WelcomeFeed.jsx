import React, { useState } from 'react';
import { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import FeedItem from '../Article_components/FeedTabs/FeedItem';
import axios from 'axios';
import SkeletonItem from '../Article_components/FeedTabs/SkeletonItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Feed() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const { currentUser } = useAuth();
	const [offsetPersonal, setOffsetPersonal] = useState(0);
	const [hasMorePersonal, setHasMorePersonal] = useState(true);
	const [isLoadingPersonal, setIsLoadingPersonal] = useState(true);
	const [dataPersonal, setDataPersonal] = useState([]);
	const [isPublic, setisPublic] = useState(true);

	useEffect(() => {
		getData(0, true, true);
		getDataPersonal(0, true, true);

	}, []);

	const temp = 10;
	const limit = temp;
	const searchInputRef = React.useRef(null);

	const navigateFeeds = () => {
		setisPublic(!isPublic)
	}

	const getData = (offset, firstTime, hasMore) => {
		if (!hasMore) {
			return;
		}
		setIsLoading(true);
		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/summaries?q=${search}&offset=${offset}&limit=${limit}&only_mine=false`,
			)
			.then((response) => {
				setHasMore(!(response.data.length < limit));

				if (firstTime) {
					setData(response.data);
				} else {
					setData([...data, ...response.data]);
				}
				setIsLoading(false);
			});
	};

	const getDataPersonal = (offset, firstTime, hasMorePersonal) => {
		if (!hasMorePersonal) {
			return;
		}
		setIsLoadingPersonal(true);
		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/summaries?q=${search}&offset=${offset}&limit=${limit}&only_mine=true`,
			)
			.then((response) => {
				setHasMorePersonal(!(response.data.length < limit));



				if (firstTime) {
					setDataPersonal(response.data);

				} else {
					setDataPersonal([...data, ...response.data]);
				}
				setIsLoadingPersonal(false);
			});
	};

	const loadMore = () => {
		setOffset(offset + limit);
		getData(offset + limit, false, true);

		setOffsetPersonal(offset + limit);
		getDataPersonal(offset + limit, false, true);

	};

	return (
		<div className="main-page-feed-section container mx-auto w-full drop-shadow-2xl">
			<h2 className="text-gray-700 pl-3 md:pl-0 text-2xl mx-auto pb-3 font-semibold">
				Explore the videos other users unlocked with Alphy
			</h2>

			<div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
				<ul class="flex flex-wrap -mb-px">
					<li class="mr-2">
						<button onClick={navigateFeeds} class={`inline-block p-4 ${isPublic ? "text-blueLike border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}   rounded-t-lg  dark:text-blue-500 dark:border-blue-500`}>Global</button>
					</li>
					<li class="mr-2">
						<button onClick={navigateFeeds} class={`inline-block p-4 ${!isPublic ? "text-blueLike border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}   rounded-t-lg  dark:text-blue-500 dark:border-blue-500`}>My Works</button>
					</li>

				</ul>
			</div>

			<div className="main-page-feed-table-parent bg-zinc-50 border-[1px]  rounded-[10px] sm:p-[40px] p-[10px] ">
				<form
					className="flex items-center"
					onSubmit={(e) => {
						e.preventDefault();
						setOffset(0);
						if (searchInputRef.current.value.length === 0) {
							setSearch('');
						}
						getData(0, true, true);
					}}
				>
					<label htmlFor="voice-search" className="sr-only">
						Search
					</label>
					<div className="relative w-full">
						<input
							ref={searchInputRef}
							type="text"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							id="voice-search"
							className="bg-zinc-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 block w-full sm: mt-10 pl-5 p-2.5"
							placeholder={search.length > 0 ? search : 'Search YouTube videos or Twitter spaces...'}
						/>
					</div>
					<button
						type="submit"
						className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-whiteLike bg-lightblueLike rounded-lg border border-bordoLike hover:bg-blueLike sm: mt-10"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5 -ml-1"
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
										.map((item, index) => <FeedItem key={index} item={item} />)
										.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))
									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: data.map((item, index) => <FeedItem key={index + 1000} item={item} />)}
						</div>
						{hasMore && (
							<div className="w-full flex justify-center">
								{
									<button
										className="justify-center flex text-blueLike font-semibold  mt-10 underline"
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
							${isLoading
									? 'lg:grid-cols-2 xl:grid-cols-2'
									: data.length === 1
										? 'lg:grid-cols-1 xl:grid-cols-1'
										: 'lg:grid-cols-2 xl:grid-cols-2'
								}
							gap-4
							`}
						>
							{isLoadingPersonal
								? dataPersonal.length > 0
									? dataPersonal
										.map((item, index) => {

											<FeedItem key={index} item={item} />
										}).concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />)) : [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: dataPersonal.map((item, index) => <FeedItem key={index + 1000} item={item} />)}
						</div>
						{hasMore && (
							<div className="w-full flex justify-center">
								{
									<button
										className="justify-center flex text-blueLike font-semibold  mt-10 underline"
										onClick={loadMore}
									>
										{'Load more'}
									</button>
								}
							</div>
						)}
					</div>}
			</div>



		</div>
	);
}

export default Feed;
