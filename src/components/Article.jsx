import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from './ArticleComponents/SideFeed';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Content from './ArticleComponents/ContentTabs/Content';



import Twitter from '..//img/twitter_spaces.png';

import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import Loading from './Loading';
import { useWindowSize } from '../hooks/useWindowSize';
import { Helmet } from "react-helmet";



function Article({ source_type, collapsed, setCollapsed, hasActiveSub,setContentName,userArchipelagos}) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id
	const {currentUser} = useAuth();
	const [windowSizeChecked,setWindowSizeChecked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [called, setCalled] = useState(false);
	
	


	useEffect(() => {
		if(!windowSizeChecked){
			if(window.innerWidth<768){
			setCollapsed(true)
			}
			setWindowSizeChecked(true)
	}
})


	


	if (location.pathname.split('/')[2].split("&q=")[0] !== undefined) {
		source_id = location.pathname.split('/')[2].split("&q=")[0]
	}
	else {
		source_id = location.pathname.split('/')[2];
	}

	
	

	

	const metaTag = document.querySelector('meta[name="twitter:title"]');
	if (metaTag) {
		metaTag.setAttribute('content', data.title);
	}
	const fetchData = async (url,constantFetch) => {
		
		
		try {
			if(!constantFetch){
			setIsLoading(true);
		}
			
			const response = await axios.get(url
				).then(
				(response) => {
					
					if(response.data!==null && response.data!==undefined){
					setData(response.data);
					setContentName(response.data.title)
					
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
	
	
	const checkBookmark = async () => {
		try {
		await currentUser.getIdToken() 
		.then((idToken) => {
		
		axios.get(`${process.env.REACT_APP_API_URL}/sources/${source_type}/${source_id}/bookmark`,
					
					{
						headers: {
							'id-token': idToken,
						},
					}

					)
					.then(
						(response) => {
							
							if(response.data){
								
							
								setIsBookmarked(response.data.is_bookmark)
							}
						})

					}
					)
					}
					
					catch (error) {
						console.log(error)
					}
					}


	const fetchDataUpload = async (url, constantFetch) => {
	
	
		try {
			if(constantFetch===false){
			setIsLoading(true);
		}
			
			const response = await axios.get(url,
				{
					headers: {
						'id-token': currentUser.accessToken	,
					}
					}
				).then(
				(response) => {
					
					
					if(response.data!==null && response.data!==undefined){
					setData(response.data);
					setContentName(response.data.title)
				}
				}

			).catch((error) => {
				console.log(error)	
				 
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
/* 		if (width < 768) {
			setCollapsed(true);
		}
		 */
	}, [width]);


	const url = `${process.env.REACT_APP_API_URL}/sources/${source_type}/${source_id}`;
/* 	const url_bookmark= `${process.env.REACT_APP_API_URL}/sources/${source_type}/${source_id}/bookmark`
 */	
if(called===false){
	if (source_type==="up" && data.length===0 && currentUser!==null){
		setCalled(true)
		fetchDataUpload(url,false);
				
	}
	if (source_type!=="up" && data.length===0 && currentUser!==null){
		setCalled(true)
		fetchData(url,false);

	}
	else if (source_type!=="up" && data.length===0 && currentUser===null){
		setCalled(true)
		fetchData(url,false);
	}
}




			useEffect(() => {
				let interval;
		
			
				
	const intervalFetch =() => {
	if (data!==undefined && data.complete!==true){
		
				if (source_type==="up" && data.length===0 && currentUser!==null){
					setCalled(true)
					fetchDataUpload(url,true);
							
				}
				if (source_type!=="up" && data.length===0 && currentUser!==null){
					setCalled(true)
					fetchData(url,true);
				
				}
				else if (source_type!=="up" && data.length===0 && currentUser===null){
					setCalled(true)
						fetchData(url,true);
				}
			}

		}
				interval = setInterval(intervalFetch, 5000);
			
				return () => {
				  // Clean up the interval when the component unmounts
				  clearInterval(interval);
				};
			  }, []);
			

	useEffect(() => {
		if (currentUser!==null){
			setTimeout(() => {
				checkBookmark()
			}, 1000);
		}
	}, )

	const handleCollapse = () => {
		setCollapsed(!collapsed)
		
	}

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
				{/* {data.source_type!==undefined ? (data.source_type === "yt" ? <meta name="twitter:image" content={`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`} /> : <meta name="twitter:image" content={Twitter} />): <meta name="twitter:image" content={`homepage.png`} /> }
				{data.source_type!== undefined ? (data.source_type === "yt" ? <meta property="og:image" content={`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`} /> : <meta property="og:image" content={Twitter} />) : <meta property="og:image" content={`homepage.png`} />} */}
			
				<meta name="twitter:description" content={data.title!== undefined ? `Read the summary and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"}
				/>
				<meta property="og:url" content={location.href} />
			</Helmet>  
			
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>
			
			<div className="flex flex-row ">
				{collapsed==true && 
			<div className="flex w-full  hidden lg:flex lg:h-[92vh] overflow-hidden bg-zinc-100 dark:bg-mildDarkMode min-w-[32px] max-w-[32px]">
			<div className={`hidden md:flex `}>
				<button onClick={handleCollapse }>

		
			<svg className={` ${!collapsed && "rotate-180"} opacity-30 dark:opacity-80 `}  width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		

			</button			>
			</div> 

			</div>
			}
			{collapsed=== false && <div className={`flex hidden lg:block mr-5 bg-zinc-100 w-[250px] min-w-[250px] 3xl:w-[330px] 3xl:min-w-[330px] `}>
				
				<SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>}
				
				<div
					className={`fixed top-0 z-50 transition origin-top-right transform lg:hidden mt-[14vh] w-full shadow-lg bg-zinc-100 ${collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-zinc-50'
						}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="h-screen"><SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "scrolling"} px-3 md:px-0  mx-auto max-h-[92vh] ${collapsed ? 'hidden' : 'blur-sm sm:blur-none md:max-h-[90vh] max-h-[90vh] overflow-hidden'
						}}`}
				>
					{isLoading || data.length ? <Loading /> : <Content data={data} hasActiveSub={hasActiveSub} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} userArchipelagos={userArchipelagos}/>} 
					

				</div>
			</div>
			
		</div>
	);
}

export default Article;
