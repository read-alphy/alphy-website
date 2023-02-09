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

	const getData = (offset) => {
		setIsLoading(true);
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
		<div className="main-page-feed-section">
			<h2 className="text-bordoLike text-2xl mx-auto pb-10 font-semibold">Browse Alphy's database</h2>
			<div className="main-page-feed-table-parent bg-slate-50 border-[1px] border-[#0b090a] rounded-[10px] sm:p-[40px] p-[10px]">
				<form
					class="flex items-center"
					onSubmit={(e) => {
						e.preventDefault();
						setOffset(0);
						getData(offset);
					}}
				>
					<label for="voice-search" class="sr-only">
						Search
					</label>
					<div class="relative w-full">
						<input
							type="text"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							id="voice-search"
							className="bg-slate-100 border border-bordoLike text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5"
							placeholder={search.length > 0 ? search : 'Search YouTube videos or Twitter spaces...'}
						/>
					</div>
					<button
						type="submit"
						class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-whiteLike bg-orangeLike rounded-lg border border-bordoLike hover:bg-purpleLike focus:ring-4 focus:outline-none focus:ring-blue-300"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5 -ml-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</button>
				</form>

				<div className={`buttons flex justify-between mt-2`}>
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
				<table className="main-page-feed w-full">
					<thead className="header h-0" />
					<tbody
						className={`
            grid grid-cols-1 mt-10
            ${
				isLoading
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
							<tr>
								<td>No results found</td>
							</tr>
						) : (
							data
								.slice(0, limit)
								.map((item, index) => <FeedItem index={index} item={item} key={index} />)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Feed;
