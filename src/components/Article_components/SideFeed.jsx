import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeedItem from './FeedTabs/FeedItem';
import SkeletonItem from './FeedTabs/SkeletonItem';

function SideFeed({ setCollapsed, source_id }) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);


	const temp = 10;
	const limit = temp;

	const searchInputRef = React.useRef(null);
	const feedRef = React.useRef(null);


	const getData = (offset, firstTime, hasMore, search_input) => {


		if (!hasMore) {
			return;
		}
		setIsLoading(true);

		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/summaries?q=${search_input}&offset=${offset}&limit=${limit}&only_mine=false`
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

	useEffect(() => {
		getData(0, true, true, search);
	}, []);

	const handleSearch = () => {
		getData(0, true, true, search);
	}
	const handleClear = () => {
		setSearch("")

		getData(0, true, true, "");

	}

	const loadMore = () => {
		setOffset(offset + limit);
		getData(offset + limit, false, true, search);


	};

	const handleScroll = (event) => {

		const element = event.target;
		if (element.scrollHeight - element.scrollTop === element.clientHeight) {
			// you're at the bottom of the page
			loadMore();
			// scroll a little bit up to avoid triggering the event again
			element.scrollTop = element.scrollTop - 1;
		}

	};
	return (
		<div className="user-feed-buttons">
			<form
				className="flex items-center h-[10vh] min-h-[50px] transparency max-w-[95%]"
				onSubmit={(e) => {
					e.preventDefault();
					setOffset(0);
					// if input is empty get it from searchInputRef
					if (searchInputRef.current.value.length === 0) {
						setSearch('');
						getData(0, true, true, search);
					} else {
						getData(0, true, true, search);
					}
				}}
			>
				<label htmlFor="simple-search" className="sr-only">
					Search
				</label>
				<div className="relative w-full">
					<input
						value={search}
						ref={searchInputRef}
						type="text"
						onChange={(e) => {
							setSearch(e.target.value);
						}}

						id="simple-search"
						className="ml-2 bg-whiteLike border border-zinc-300 text-zinc-500 text-gray-900 text-sm rounded-l-lg focus:outline-none block w-full pl-4 p-2.5 "
						placeholder={'Search YouTube videos or Twitter spaces...'}

					/>
					{search.length > 0 ? (
						<div
							onClick={handleClear}
							className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 "
						>
							<svg
								width="20"
								onClick={handleClear}
								className="cursor-pointer"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 18L18 6M6 6l12 12"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
						</div>
					) : null}
				</div>
				<button
					onClick={handleSearch}
					type="submit"
					className="pt-2.5 pb-2.5 pr-3 text-sm font-medium border text-whiteLike bg-bordoLike rounded-r-lg border-slate-700 "
				>
					<svg
						className="w-5 h-5 ml-5"
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
				</button>
			</form>
			<div className="signed-in-feed flex">
				{/* <div className="h-[80vh] overflow-y-scroll pl-1 pr-5" onScroll={handleScroll}> */}
				<div className="h-[76vh] overflow-y-scroll pl-1 pr-5">
					<div className="items " ref={feedRef}>
						{isLoading
							? // if data is not empty, show the data then show 10 skeletons
							data.length > 0
								? data
									.map((item, index) =>
										item.source_id === source_id ? (
											<FeedItem
												key={index}
												item={item}
												setCollapsed={setCollapsed}
												poi={true}
											/>
										) : (
											<FeedItem key={index} item={item} setCollapsed={setCollapsed} />
										)
									)
									.concat([...Array(10)].map((item, index) => <SkeletonItem key={index + 500} />))
								: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
							: data.map((item, index) => (
								<FeedItem key={index} item={item} setCollapsed={setCollapsed} />
							))}
					</div>
				</div>
			</div>

			{hasMore && (
				<div className="w-full flex justify-center">
					{
						<p
							className="justify-center flex text-blueLike cursor-pointer font-semibold  h-min-[30px] underline"
							onClick={loadMore}
						>
							{'Load more'}
						</p>
					}
				</div>
			)}
		</div>
	);
}
export default SideFeed;
