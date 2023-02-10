import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from './Article_components/SideFeed';
// import ArticleCreator from "./Article_components/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Content from './Article_components/ContentTabs/Content';
import ArrowLeft from '../img/arrow-left.svg';
import ArrowRight from '../img/arrow-right.svg';
import { signOut } from 'supertokens-auth-react/recipe/session';
import axios from 'axios';
import Loading from './Loading';
import { useWindowSize } from '../hooks/useWindowSize';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

function Article({
	feedData,
	collapsed,
	setCollapsed,
	setFeedData,
	setFeedLoading,
	feedLoading,
	search,
	setSearch,
	offset,
	setOffset,
}) {
	const location = useLocation();
	const navigate = useNavigate();
	const windowSize = useWindowSize();

	useEffect(() => {
		if (windowSize.width > 768) {
			// setCollapsed(false);
			console.log('article rendered');
		}
	}, []);

	const sessionContext = useSessionContext();
	const [isLoading, setIsLoading] = useState(feedData?.length === 0);
	const [data, setData] = useState([]);

	const fetchData = async (url) => {
		try {
			setIsLoading(true);
			const response = await axios.get(url);
			setData(response.data);
		} catch (error) {
			console.error(`Error fetching data: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};
	const handleSignOut = async () => {
		try {
			await signOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		const source_id = location.pathname.split('/')[2];
		const url = `${process.env.REACT_APP_API_URL}/summaries/${source_id}`;
		fetchData(url);
	}, [location.pathname, navigate]);

	// use effect every render
	useEffect(() => {
		console.log('article component rendered');
	}, []);

	const sideFeed = useMemo(
		() => (
			<SideFeed
				data={feedData}
				setData={setFeedData}
				isLoading={feedLoading}
				setIsLoading={setFeedLoading}
				search={search}
				setSearch={setSearch}
				offset={offset}
				setOffset={setOffset}
				setCollapsed={setCollapsed}
			/>
		),
		[feedData, setFeedData, feedLoading, setFeedLoading, search, setSearch, offset, setOffset, collapsed],
	);

	return (
		<div className="article max-[92vh]">
			<div className="flex flex-row article-body">
				<div className={`user-feed flex ${collapsed ? 'collapsed' : ' mr-5'}`}>
					{!collapsed ? ( // side feed for desktop
						<div className={`w-[400px] overflow-x-hidden hidden lg:block`}>
							<div className="bg-zinc-50 mr-5">
								<div className="user-feed bg-gradient-to-r from-gray-300 to-gray-200">{sideFeed}</div>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
				{!collapsed ? ( // hamburger menu for mobile devices
					<div className="fixed top-0 z-50 transition origin-top-right transform md:hidden mb-auto pt-[2px]">
						<div className="rounded-lg rounded-t-none shadow-lg bg-whiteLike">
							<div className="h-screen px-4 overflow-y-auto">
								<div className="flex items-center justify-end p-4 ">
									<div className="cursor-pointer" onClick={() => setCollapsed(true)}>
										<i className="text-2xl text-blueLike ri-close-line"></i>
									</div>
								</div>
								<div className="grid grid-row">
									<p className="ml-5 text-xl font-bold text-blueLike pb-10">ALPHY</p>
									<Link className="ml-5 text-l font-semibold text-blueLike pb-5" to="/">
										Home
									</Link>
									{sessionContext.userId ? (
										<button
											onClick={handleSignOut}
											className="ml-5 text-l font-semibold text-blueLike"
										>
											Log Out
										</button>
									) : (
										<Link className="ml-5 text-l font-semibold text-blueLike" to="/auth">
											Sign In
										</Link>
									)}
								</div>
								<div className="mt-4">
									<div className="">{sideFeed}</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}

				{collapsed && (
					<button
						className="hidden top-20 lg:block "
						onClick={() => {
							setCollapsed(!collapsed);
						}}
					>
						<img
							src={collapsed ? ArrowRight : ArrowLeft}
							alt={`toggle ${collapsed ? 'right' : 'left'} arrow`}
							className={`arrow-${collapsed ? 'right' : 'left'}`}
						/>
					</button>
				)}
				<div className="px-4 mx-auto h-[92vh] overflow-y-scroll">
					{isLoading || data.length ? <Loading /> : <Content data={data} />}
				</div>
			</div>
		</div>
	);
}

export default Article;
