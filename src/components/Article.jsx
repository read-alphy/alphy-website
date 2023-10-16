import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeedReworked from './ArticleComponents/SideFeedReworked';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Content from './ArticleComponents/ContentTabs/Content';
import MicIcon from '@mui/icons-material/Mic';

import {Button} from "@material-tailwind/react";

import Twitter from '..//img/twitter_spaces.png';

import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import Loading from './Loading';
import { useWindowSize } from '../hooks/useWindowSize';
import { Helmet } from "react-helmet";
import { API_URL } from '../constants';



function Article({ source_type, collapsed, setCollapsed, tier,setContentName,userArchipelagos,currentUser}) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id
	const [windowSizeChecked,setWindowSizeChecked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [actionsHub, setActionsHub] = useState(false);
	const [bookmarkChecked, setBookmarkChecked] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isPublic, setIsPublic] = useState(false);

	const [called, setCalled] = useState(false);
	const [authorizationError, setAuthorizationError] = useState(false)


	


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
				console.log("error1",error,constantFetch)
				if(constantFetch===false){
				navigate('/404')
				}
			});

		} catch (error) {
			if (error.response?.status === 404) {
				setIsLoading(false);
				console.log("error2",error)
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
		
		axios.get(`${API_URL}/sources/${source_type}/${source_id}/bookmark`,
					
					{
						headers: {
							'id-token': idToken,
						},
					}

					)
					.then(
						(response) => {
							
							if(response.data){
								
							setBookmarkChecked(true)
								setIsBookmarked(response.data.is_bookmark)
							}
						})

					}
					)
					}
					
					catch (error) {
						console.log(error)
						setBookmarkChecked(true)
					}
					}


	const fetchDataUpload = async (url, constantFetch) => {
		setAuthorizationError(false)
	localStorage.setItem("isVisibleUpload", false)
	const idToken = currentUser ? currentUser.accessToken : "123"

		try {
			if(constantFetch===false){
			setIsLoading(true);
		}
			
			const response = await axios.get(url,
				{
					headers: {
						'id-token': idToken	,
					}
					}
				).then(
				(response) => {
					
					
					if(response.data!==null && response.data!==undefined){
					setData(response.data);
					localStorage.setItem("isVisibleUpload", response.data.is_visible)

					setContentName(response.data.title)
				}
				}

			).catch((error) => {
				if(error.response.data.detail === "Source is inaccessible"){
					setAuthorizationError(true)
				}
				 
			});

		} catch (error) {
			if (error.response?.status === 404) {
				setIsLoading(false);
				console.log("error3",error)
				/* navigate('/404'); */
			}
			console.error(`Error fetching data: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};

	// if windows size is less than 768px then collapse the navbar
	const { width } = useWindowSize();


	const url = `${API_URL}/sources/${source_type}/${source_id}`;
/* 	const url_bookmark= `${API_URL}/sources/${source_type}/${source_id}/bookmark`
 */	




	useEffect(() => {
		if(called===false && data.complete!==true){


			
			
			if (source_type==="up" && data.length===0){
				setCalled(true)
				
				fetchDataUpload(url,false);
						
			}
			if (source_type!=="up" && data.length===0){
				setCalled(true)
				fetchData(url,false);
		
			}

		}

		
		if (currentUser!==null && bookmarkChecked===false){
			setTimeout(() => {
				checkBookmark()
			}, 1000);
		}
	},[data,currentUser] )




	

	useEffect(() => {
		let interval;		
		const intervalFetch =() => {

					if (data!==null && data.complete!==true && called===true){
						
						
							if (source_type==="up" && data.complete!==true && currentUser!==null){
									fetchDataUpload(url,true);
								}
								else if (source_type!=="up" && data.complete!==true){
									fetchData(url,true);
								}

							}

							else{
								return
							}

		}
				interval = setInterval(intervalFetch, 5000);
			
				return () => {
				// Clean up the interval when the component unmounts
				clearInterval(interval);
				};
			}, []);

			const handleVisibility = () => {
				const targetVisibility = !isVisible
				localStorage.setItem("isVisibleUpload", isVisible)
				
				try{
					axios.patch(`${API_URL}/sources/${data.source_type}/${data.source_id}/visibility?visibility=${targetVisibility}`, null, {
						headers: {
							'accept' : 'application/json',
							'id-token': currentUser.accessToken,
						},
					}
					).then((response) => {
						
						localStorage.setItem("isVisibleUpload", targetVisibility)
						setIsVisible(targetVisibility)
						setIsPublic(targetVisibility)
						console.log(response)
					}
					)
	
				}
				catch(error) {
					console.log("arcChat error",error)
					if( axios.isCancel(error)){
						console.log('Request cancelled');
					}
					}
			}
	

	return (
		<div className="article dark:bg-darkMode dark:text-zinc-300">
	
			<Helmet>
				{/* <title>{data.title!==undefined ? `${data.title}` : "Alphy"} </title>
				<meta property="og:title" content={data.title!==undefined ? `Alphy - ${data.title}` : "Alphy"} />
				<meta name="twitter:title" content={data.title!==undefined ? `Alphy - ${data.title}` : "Alphy"} />

				<meta property="og:description" content={data.title!==undefined ? `Ask questions to ${data.title}` : "Ask questions to the content"}
				/>
				<meta name="description" content={data.title!== undefined? `Read the summary and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"} />
	
				<meta name="twitter:description" content={data.title!== undefined ? `Read the summary and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"}
				/>
				<meta property="og:url" content={location.href} /> */}
			</Helmet>  
			
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>
			
			<div className="flex flex-row ">
				
				 	{<div className={`hidden sm:flex `}>
			
				<SideFeedReworked collapsed={collapsed} setCollapsed={setCollapsed} source_id={source_id} actionsHub={actionsHub} setActionsHub={setActionsHub} tier={tier}/></div>} 
				
				<div
					className={`fixed top-0 z-50 transition origin-top-right transform sm:hidden w-full shadow-lg bg-zinc-100 ${collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-zinc-50'
						}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="h-screen"><SideFeedReworked collapsed={collapsed} setCollapsed={setCollapsed} source_id={source_id} actionsHub={actionsHub} setActionsHub={setActionsHub} tier={tier} /></div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "scrolling"} px-3 md:px-0  mx-auto  h-full sm:max-h-[100vh] w-full ${collapsed ? 'hidden' : ' max-h-[100vh]'
						}}`}
				>
					{isLoading || data.length ? <Loading /> : 
					
					authorizationError ? 
					<div className="flex-col flex mx-10 mx-auto mt-20 md:mt-40">
						<div className="text-xl max-w-[600px] text-zinc-700 dark:text-zinc-300 ">
						The page you're trying to reach is either doesn't exist or you don't have permission to access it.
						</div>
						<Link to="/" className="underline mt-6 text-zinc-700 max-w-[150px]">Go Back</Link>
					</div>

					:
					
					<Content data={data} tier={tier} isVisible={isVisible} isPublic={isPublic} handleVisibility={handleVisibility} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} userArchipelagos={userArchipelagos} actionsHub={actionsHub}/>
					
					
					
					} 
					

				</div>
			</div>
			
		</div>
	);
}

export default Article;
