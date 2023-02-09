import axios from 'axios';
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeedItem from './FeedTabs/FeedItem';
import SkeletonItem from './FeedTabs/SkeletonItem';

function SideFeed({ data, isLoading, setData, setIsLoading, search, setSearch, offset, setOffset }) {
	const temp = 10;
	const limit = temp;

	const getData = (offset) => {
		setIsLoading(true);
		console.log('search', search);
		axios
			.get(
				`${
					process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/summaries?q=${search}&offset=${offset}&limit=${limit + 1}`,
			)
			.then((response) => {
				setData(response.data);
				setIsLoading(false);
			});
	};

	const nextPage = () => {
		setOffset(offset + limit);
		getData(offset + limit);
	};

	const prevPage = () => {
		setOffset(offset - limit);
		getData(offset - limit);
	};

	return (
		<div className="user-feed-buttons mt-10">
			<div className="signed-in-feed pt-2 mr-6">
				<div>
					<div>
						<h1 className="ml-2 mb-10 text-left text-blueLike font-semibold text-xl">
							Search by content or creator
						</h1>
					</div>
					<form
						className="flex items-center mb-5"
						onSubmit={(e) => {
							e.preventDefault();
							setOffset(0);
							getData(offset);
						}}
					>
						<label for="simple-search" class="sr-only">
							Search
						</label>
						<div class="relative w-full">
							<input
								type="text"
								onChange={(e) => {
									setSearch(e.target.value);
									console.log('search');
									console.log(search);
								}}
								id="simple-search"
								className="ml-2 bg-whiteLike border border-bordoLike text-bordoLike text-gray-900 text-sm rounded-l-lg rounded-r-s focus:ring-slate-500 focus:border-slate-500 block w-full pl-4 p-2.5 "
								placeholder={search ? search : 'Search YouTube videos or Twitter spaces...'}
							/>
						</div>
						<button
							type="submit"
							class="pt-2.5 pb-2.5 pr-3 text-sm font-medium border text-whiteLike bg-orangeLike rounded-r-lg border-slate-700 hover:bg-slate-800 focus:ring-1 focus:outline-none focus:ring-slate-300"
						>
							<svg
								className="w-5 h-5 ml-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24 "
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
							<span className="sr-only">Search</span>
						</button>
					</form>
				</div>
				<div className={`side-feed-page-buttons flex justify-between mt-2`}>
					{offset > 0 && (
						<button className="bg-orangeLike text-whiteLike rounded-lg px-4 py-2" onClick={prevPage}>
							{'Prev Page'}
						</button>
					)}
					{data.length > limit && (
						<button className="bg-orangeLike text-whiteLike rounded-lg px-4 py-2" onClick={nextPage}>
							{'Next Page'}
						</button>
					)}
				</div>
				<div className="signed-in-feed-elements">
					{isLoading
						? Array.from(Array(temp), (_, index) => index + 1).map((index) => <SkeletonItem key={index} />)
						: data.map((item, index) => <FeedItem key={index} item={item} />)}
				</div>
			</div>
		</div>
	);
}
export default SideFeed;
