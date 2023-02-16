import React, { useState } from 'react';
import { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import FeedItem from '../Article_components/FeedTabs/FeedItem';
import axios from 'axios';
import SkeletonItem from '../Article_components/FeedTabs/SkeletonItem';
import { useNavigate } from 'react-router-dom';

function Feed({ data, isLoading, setData, setIsLoading, search, setSearch, offset, setOffset }) {
	const temp = 10;
	const limit = temp;
	const searchInputRef = React.useRef(null);

	const getData = (offset) => {
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
		getData(offset + limit);
	};

	const prevPage = () => {
		setOffset(offset - limit);
		getData(offset - limit);
	};

	return (
		<div className="main-page-feed-section container mx-auto w-800">
			<h2 className="text-gray-700 pl-3 md:pl-0 text-2xl mx-auto pb-3 font-semibold">Summaries you may like, while you wait...</h2>
			<p className="text-gray-500 text-l mx-auto pb-10 "></p>
			<div className="main-page-feed-table-parent bg-zinc-50 border-[1px]  rounded-[10px] sm:p-[40px] p-[10px] ">
				<form
					className="flex items-center"
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
							className="bg-zinc-50 border border-[#6B728E] text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full sm: mt-10 pl-5 p-2.5"
							placeholder={search.length > 0 ? search : 'Search YouTube videos or Twitter spaces...'}
						/>
					</div>
					<button
						type="submit"
						className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-whiteLike bg-lightblueLike rounded-lg border border-bordoLike hover:bg-blueLike focus:ring-4 focus:outline-none focus:ring-blue-300 sm: mt-10"
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

				<div className={`buttons flex justify-between mt-2`}></div>
				<table className="main-page-feed w-full">
					<thead className="header h-0" />
					<tbody
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
						{isLoading ? (
							Array.from(Array(temp), (_, index) => index + 1).map((index) => (
								<SkeletonItem key={index} />
							))
						) : data.length === 0 ? (
							<tr className="border-b-0">
								<td>No results found</td>
							</tr>
						) : (
							data
								.slice(0, limit)
								.map((item, index) => <FeedItem index={index} item={item} key={index} />)
						)}
					</tbody>
				</table>
				<div className="grid grid-cols-2">
					{offset > 0 && (
						<button
							className="col-span-1 justify-self-start text-blueLike font-semibold mt-10 underline"
							onClick={prevPage}
						>
							{'Prev'}
						</button>
					)}
					{data.length > limit && (
						<button
							className="col-span-2 justify-self-end text-blueLike font-semibold  mt-10 underline"
							onClick={nextPage}
						>
							{'Next'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Feed;
