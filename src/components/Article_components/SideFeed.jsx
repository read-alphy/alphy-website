import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeedItem from './FeedTabs/FeedItem';
import SkeletonItem from './FeedTabs/SkeletonItem';

function SideFeed({ data, isLoading, setData, setIsLoading, search, setSearch, offset, setOffset, setCollapsed }) {
	const temp = 10;
	const limit = temp;

	const searchInputRef = React.useRef(null);
	/* 
		useEffect(() => {
			console.log('side feed rendered');
		}, []); */

	const getData = (offset, search) => {
		setIsLoading(true);
		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/summaries?q=${search}&offset=${offset}&limit=${limit + 1}`,
			)
			.then((response) => {
				setData(response.data);
				setIsLoading(false);
			});
	};

	const nextPage = () => {
		setOffset(offset + limit);
		getData(offset + limit, search);
	};

	const prevPage = () => {
		setOffset(offset - limit);
		getData(offset - limit, search);
	};

	return (
		<div className="user-feed-buttons mt-10 mb-5">

			<div className="signed-in-feed pt-2 mr-6">
				<div>

					<form
						className="flex items-center mb-5"
						onSubmit={(e) => {
							e.preventDefault();
							setOffset(0);
							// if input is empty get it from searchInputRef
							if (searchInputRef.current.value.length === 0) {
								setSearch('');
								getData(0, '');
							} else {
								getData(0, search);
							}
						}}
					>
						<label htmlFor="simple-search" className="sr-only">
							Search
						</label>
						<div className="relative w-full">
							<input
								ref={searchInputRef}
								type="text"
								onChange={(e) => {
									setSearch(e.target.value);
								}}
								id="simple-search"
								className="ml-2 bg-whiteLike border border-bordoLike text-bordoLike text-gray-900 text-sm rounded-l-lg  focus:ring-slate-500 focus:border-slate-500 block w-full pl-4 p-2.5 "
								placeholder={search ? search : 'Search YouTube videos or Twitter spaces...'}
							/>

						</div>
						<button
							type="submit"
							className="pt-2.5 pb-2.5 pr-3 text-sm font-medium border text-whiteLike bg-lightblueLike rounded-r-lg border-slate-700 hover:bg-blueLike focus:ring-1 focus:outline-none focus:ring-slate-300"
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
				</div>
				<table>
					<tbody>
						{isLoading
							? Array.from(Array(temp), (_, index) => index + 1).map((index) => (
								<SkeletonItem key={index} />
							))
							: data.map((item, index) => (
								<FeedItem setCollapsed={setCollapsed} key={index} item={item} />
							))}
					</tbody>
				</table>
			</div>
			<div className="grid grid-cols-2">
				{offset > 0 && (
					<button
						className="col-span-1 justify-self-start text-blueLike font-semibold underline mt-5 ml-5"
						onClick={prevPage}
					>
						{'Prev'}
					</button>
				)}
				{data.length > limit && (
					<button
						className="col-span-2 justify-self-end text-blueLike font-semibold  underline mt-5 mr-5"
						onClick={nextPage}
					>
						{'Next'}
					</button>
				)}
			</div>
		</div>
	);
}
export default SideFeed;