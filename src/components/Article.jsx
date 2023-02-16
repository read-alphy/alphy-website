import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from './Article_components/SideFeed';
// import ArticleCreator from "./Article_components/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Content from './Article_components/ContentTabs/Content';

import { signOut } from "supertokens-auth-react/recipe/passwordless";
import SuperTokens from "supertokens-react-native";
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

	const windlowLocationArticle = useLocation().pathname.includes("/article")
	/* 	const windowSize = useWindowSize();
	useEffect(() => {
			if (windowSize.width > 768) {
				// setCollapsed(false);
	
			}
		}, []); */

	let sessionContext = useSessionContext();
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
			await SuperTokens.signOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		const source_id = location.pathname.split('/')[2];
		const url = `${process.env.REACT_APP_API_URL}/summaries/youtube/${source_id}`;
		fetchData(url);
	}, [location.pathname, navigate]);

	// use effect every render
	useEffect(() => {

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
		<div className="article max-[92vh] ">
			<div className="flex flex-row article-body ">
				<div className={`user-feed flex ${collapsed ? '' : ' mr-5'}`}>

					<div className={`w-[400px] overflow-x-hidden hidden lg:block`}>
						<div className="bg-zinc-50 mr-5">
							<div className="user-feed bg-zinc-100">{sideFeed}</div>
						</div>
					</div>

				</div>
				{!collapsed ? ( // hamburger menu for mobile devices

					<div className="fixed top-0 z-50 transition origin-top-right transform md:hidden mb-auto pt-[2px]">
						<div className="rounded-lg rounded-t-none shadow-lg bg-whiteLike">
							<div className="h-screen px-4 overflow-y-auto">
								<div className="flex items-center justify-end p-4 ">

								</div>
								<div className="grid grid-row">
									<div className="grid grid-cols-2">
										<p className=" ml-5 text-xl font-bold text-blueLike pb-10">ALPHY</p>

										<button
											className={`mb-10 w-1/12 justify-self-end mr-5 ${collapsed ? "hidden" : "block"}`}


											onClick={() => setCollapsed(true)}
										>
											{/* cross svg */}
											<svg
												className="w-5 h-5"
												fill="bg-blueLike"
												stroke="currentColor"
												viewBox="0 0 24 24 "
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap={'round'}
													strokeLinejoin={'round'}
													strokeWidth={'2'}
													d="M6 18L18 6M6 6l12 12"
												></path>
											</svg>
										</button>
									</div>
									<div className="w-1/3 ml-5 mb-5">
										<a href="/#feedback" type="button" className={`text-blueLike font-semibold `} onClick={() => setCollapsed(true)}>Give us feedback!</a>
									</div>
									<div className="w-1/3 ml-5 mb-5">
										<Link className="text-l font-semibold text-blueLike" to="/" onClick={() => setCollapsed(true)}>
											Home
										</Link>
									</div>
									{sessionContext.userId.length !== 0 ? (
										<div className="w-1/3 ml-5 mb-5">
											<Link className="text-l font-semibold text-blueLike" onClick={handleSignOut}>
												Log Out
											</Link>
										</div>
									) : (
										<div className="w-1/3 ml-5 mb-5">
											<Link className="text-l font-semibold text-blueLike" to="/auth " onClick={() => setCollapsed(true)}>
												Sign In
											</Link>
										</div>
									)}
								</div>
								<div className={`mt-4 ${windlowLocationArticle ? ('block') : ('block')}`}>
									<div className="">{sideFeed}</div>
								</div>
							</div>
						</div>
					</div>

				) : (
					<></>
				)}


				<div className="scrolling px-4 mx-auto h-[92vh]  ">
					{isLoading || data.length ? <Loading /> : <Content data={data} />}
				</div>
			</div>
		</div>
	);
}

export default Article;
