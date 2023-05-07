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
function Article({ source_type, collapsed, setCollapsed }) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id


	if (location.pathname.split('/')[2].split("&q=")[0] !== undefined) {
		source_id = location.pathname.split('/')[2].split("&q=")[0]
	}
	else {
		source_id = location.pathname.split('/')[2];
	}


	const Collapser = () => {
		setCollapsed(!collapsed);
	};

	const handleScroll = (target) => {
		setCollapsed(true);
		navigate('/');
		setTimeout(() => {
			const feedback = document.getElementById(target);
			feedback.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 100);
	};

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async (url) => {
		try {
			setIsLoading(true);
			const response = await axios.get(url).then(
				(response) => {

					setData(response.data);
				}

			).catch((error) => {
				navigate('/404')
			});


			//changing page details
			const pageTitle = document.getElementById('page-title');
			if (pageTitle) {
				pageTitle.innerHTML = response.data.title ? response.data.title : 'Alphy';
			}
			/* 			const metaTagImage = document.querySelector('meta[property="og:image"]');
						if (metaTagImage) {
							if (data.source_type === "yt") {
								metaTagImage.setAttribute('content', `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`);
							}
							else if (data.source_type === "sp") {
								metaTagImage.setAttribute('content', { Twitter });
							}
						} */

			/* 			const metaTagDescription = document.querySelector('meta[property="og:description"]');
						if (metaTagDescription) {
							metaTagDescription.setAttribute('content', `Start asking real questions to ${response.data.title}.`);
						} */

			const metaTagTitleTwitter = document.querySelector('meta[name=twitter:title"]');
			if (metaTagTitleTwitter) {
				metaTagTitleTwitter.setAttribute('content', data.title ? `Alphy | ${response.data.title}` : "Alphy");
			}

			const metaTagImagTwitter = document.querySelector('meta[name="twitter:image"]');
			if (metaTagImagTwitter) {
				metaTagImagTwitter.setAttribute('content', `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`);
			}

			/* 		const metaTagDescriptionTwitter = document.querySelector('meta[name="twitter:description"]');
					if (metaTagDescriptionTwitter) {
						metaTagDescriptionTwitter.setAttribute(
							'content',
							`Start asking real questions to ${response.data.title}.`,
						);
					} */

			/* 			const metaTagTitle = document.querySelector('meta[property="og:title"]');
						if (metaTagTitle) {
							metaTagTitle.setAttribute('content', data.title ? `Alphy | ${response.data.title}` : 'Alphy');
						} */
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
	const handleSignOut = async () => {
		try {
			await signOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
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
		const url = `${process.env.REACT_APP_API_URL}/summaries/${source_type}/${source_id}`;

		fetchData(url);
	}, [location.pathname, navigate]);



	return (
		<div className="article ">
			<Helmet>
				<title>{data.title ? `Alphy - ${data.title}` : "Alphy"} </title>
				<meta property="og:title" content={data.title ? `Alphy - ${data.title}` : "Alphy"} />
				<meta name="twitter:title" content={data.title ? `Alphy - ${data.title}` : "Alphy"} />

				<meta property="og:description" content={data.title ? `Ask questions to ${data.title}` : "Ask questions to the content"}
				/>
				<meta name="description" content={data.title ? `Transcribe, summarize, and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"} />
				{data.source_type === "yt" ? <meta name="twitter:image" content={`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`} /> : <meta name="twitter:image" content={Twitter} />}
				{data.source_type === "yt" ? <meta property="og:image" content={`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`} /> : <meta property="og:image" content={Twitter} />}
				<meta name="twitter:description" content={data.title ? `Transcribe, summarize, and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"}
				/>
				<meta property="og:url" content={location.href} />
			</Helmet>
			<div
				className={`w-screen bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>
			<div className="flex flex-row article-body">
				<div className={`user-feed flex hidden lg:block mr-5 bg-zinc-100 md:w-[330px] md:min-w-[330px]`}><SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>
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
					{isLoading || data.length ? <Loading /> : <Content data={data} />}
				</div>
			</div>
		</div>
	);
}

export default Article;
