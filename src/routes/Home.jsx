import React from 'react';
import WelcomeFeed from '../components/Landing_page/WelcomeFeed';
import Welcome from '../components/Landing_page/Welcome';
import CuratedCarousel from '../components/Landing_page/CuratedCarousel';
import About from '../components/Landing_page/About';
import FeedbackForm from '../components/FeedbackForm';
import { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import WelcomePopup from '../components/Landing_page/WelcomePopup.jsx';
import axios from 'axios';



function Home({hasActiveSub,currentUser,credit,userArchipelagos}) {
	const urlParams = new URLSearchParams(window.location.search);
	const [dataGlobalArchipelagos , setDataGlobalArchipelagos] = useState([])
	const [isLoadingGlobalArchipelagos, setIsLoadingGlobalArchipelagos] = useState(true);
	const resetPassword = (urlParams.get('mode')=="resetPassword");
	const limit = 20
	

	/* const { currentUser } = useAuth(); */
	

	useEffect(() => {
		if(resetPassword){
			const url = window.location.href;
			const [baseUrl, queryString] = url.split('?');
			window.location.href = (`${baseUrl}u/resetpassword/?${queryString}`);
		}


		localStorage.setItem('search', '');
		setTimeout(() => {
			window.history.replaceState(null, null, window.location.pathname); // clears the anchor from the URL
		}, 0);


	}, []);

	const getDataGlobalArchipelagos = (offsetGlobalArchipelagos, firstTime, hasMoreGlobalArchipelagos) => {
		if(!hasMoreGlobalArchipelagos){
			return;
		}
		setIsLoadingGlobalArchipelagos(true);
		axios.get(`${process.env.REACT_APP_API_URL}/playlists/?user_id=dUfMZPwN8fcxoBtoYeBuR5ENiBD3&limit=${limit}&offset=${offsetGlobalArchipelagos}`)
		.then((response) => {

			if(firstTime){
				setDataGlobalArchipelagos(response.data);
			}
			else{
				setDataGlobalArchipelagos([...dataGlobalArchipelagos, ...response.data]);
			}
			setIsLoadingGlobalArchipelagos(false);
			setTimeout(() => {
				const elements = document.querySelectorAll(".styles-module_item-provider__YgMwz")
				if(elements){
					elements.forEach(element => {
						element.classList.add('cursor-default');
					});
			}
				}, 500);

		})
		.catch((error) => {
			setIsLoadingGlobalArchipelagos(false);
		}
		)
	}


	return (
		<div className="mx-auto md:w-800 w-full bg-[#fafafa] dark:bg-darkMode dark:text-zinc-300">
			<Helmet>
				{/* <title>{`Alphy, the next generation speech-to-meaning agent.`} </title> */}
				<title>Alphy: Unlock the Information in Audiovisual Content </title>
				<meta name="twitter:card" content="summary_large_image"></meta>
				<meta property="og:title" content={`Alphy: Unlock the Information in Audiovisual Content.`} />
				<meta name="description" content="Transcribe, summarize, and question audiovisual content with the help of AI. Try Alphy for free!" />
				<meta content="Transcribe, summarize, and question audiovisual content with the help of AI. Try Alphy for free!" 
					property="og:description" />
				<meta property="og:title" content={`Alphy: Unlock the Information in Audiovisual Content.`} />
				<meta name="twitter:description" content="Transcribe, summarize, and question audiovisual content with the help of AI. Try Alphy for free!" />
				<meta name="twitter:image" content="../../public/homepage.png" />
				<meta property="og:url" content="https://alphy.app/" />
				<meta content="../../public/homepage.png" property="og:image" />
			</Helmet>
			<Welcome hasActiveSub={hasActiveSub} credit={credit} />
		{/* 	{dataGlobalArchipelagos.length>0 &&
			<CuratedCarousel dataGlobalArchipelagos={dataGlobalArchipelagos}/>
		} */}
			<WelcomeFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}/>
								{/* 			{showMessage &&
												<WelcomePopup showMessage={showMessage} setShowMessage={setShowMessage} />
											} */}
			<About />
			

			<FeedbackForm />

		</div>
	);
}

export default Home;
