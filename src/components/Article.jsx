import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from './Article_components/SideFeed';
// import ArticleCreator from "./Article_components/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Content from './Article_components/ContentTabs/Content';

import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import Twitter from '..//img/twitter_spaces.png';

import axios from 'axios';
import Loading from './Loading';
import { useWindowSize } from '../hooks/useWindowSize';
import { Helmet } from "react-helmet";
function Article({ source_type, collapsed, setCollapsed, hasActiveSub}) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id


	if (location.pathname.split('/')[2].split("&q=")[0] !== undefined) {
		source_id = location.pathname.split('/')[2].split("&q=")[0]
	}
	else {
		source_id = location.pathname.split('/')[2];
	}



	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async (url) => {
		try {
			setIsLoading(true);
			const response = await axios.get(url).then(
				(response) => {
					if(response.data!==null && response.data!==undefined){
					setData(response.data);
				}
				}

			).catch((error) => {
				navigate('/404')
			});

		} catch (error) {
			if (error.response?.status === 404) {
				setIsLoading(false);
				navigate('/404');
			}
			console.error(`Error fetching data: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};


	// if windows size is less than 768px then collapse the navbar
	const { width } = useWindowSize();
	useEffect(() => {
		if (width < 768) {
			setCollapsed(true);
		}
	}, [width]);

	useEffect(() => {
		const url = `${process.env.REACT_APP_API_URL}/sources/${source_type}/${source_id}`;

		fetchData(url);
	}, [location.pathname, navigate]);



	return (
		<div className="article dark:bg-darkMode dark:text-zinc-300">
			<Helmet>
				<title>{data.title!==undefined ? `${data.title}` : "Alphy"} </title>
				<meta name="twitter:card" content="summary_large_image"></meta>
				<meta property="og:title" content={data.title!==undefined ? `Alphy - ${data.title}` : "Alphy"} />
				<meta name="twitter:title" content={data.title!==undefined ? `Alphy - ${data.title}` : "Alphy"} />

				<meta property="og:description" content={data.title!==undefined ? `Ask questions to ${data.title}` : "Ask questions to the content"}
				/>
				<meta name="description" content={data.title!== undefined? `Read the summary and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"} />
				{data.source_type!==undefined ? (data.source_type === "yt" ? <meta name="twitter:image" content={`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`} /> : <meta name="twitter:image" content={Twitter} />): <meta name="twitter:image" content={`https://i.ibb.co/4g2Jtvc/home.png`} /> }
				{data.source_type!== undefined ? (data.source_type === "yt" ? <meta property="og:image" content={`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`} /> : <meta property="og:image" content={Twitter} />) : <meta property="og:image" content={`https://i.ibb.co/4g2Jtvc/home.png`} />}
				<meta name="twitter:description" content={data.title!== undefined ? `Read the summary and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"}
				/>
				<meta property="og:url" content={location.href} />
			</Helmet>  
			<div
				className={`w-screenbg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>
			<div className="flex flex-row article-body">
 				<div className={`user-feed flex hidden lg:block mr-5 bg-zinc-100 w-[250px] min-w-[250px] 3xl:w-[330px] 3xl:min-w-[330px]`}><SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>
{/*  			<div className={`user-feed flex mr-5 hidden lg:block bg-zinc-100 dark:bg-mildDarkMode  md:w-[40px] md:min-w-[40px]`}>
				<div className="mt-10">
					<button onClick={() => setCollapsed(!collapsed)}>
							<svg className={`${collapsed ? "": "rotate-180"}`} width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</button>
				</div>
								
 </div> */}
				<div
					className={`fixed top-0 z-50 transition origin-top-right transform md:hidden mt-[14vh] w-full shadow-lg bg-zinc-100 ${collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed'
						}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="h-screen"><SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "overflow-hidden"} px-3 md:px-0  mx-auto max-h-[92vh] ${collapsed ? 'hidden' : 'blur-sm sm:blur-none md:max-h-[80vh] max-h-[90vh] overflow-hidden'
						}}`}
				>
					{isLoading || data.length ? <Loading /> : <Content data={data} hasActiveSub={hasActiveSub} />}
				</div>
			</div>
		</div>
	);
}

export default Article;
