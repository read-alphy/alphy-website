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



function Home({hasActiveSub,currentUser,credit,userArchipelagos,dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos}) {
	const urlParams = new URLSearchParams(window.location.search);

	const resetPassword = (urlParams.get('mode')=="resetPassword");


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
				<meta name="twitter:image" content="https://i.ibb.co/RBH2C63/homepage.png" />
				<meta property="og:url" content="https://alphy.app/" />
				<meta content="https://i.ibb.co/RBH2C63/homepage.png" property="og:image" />
			</Helmet>
			<Welcome hasActiveSub={hasActiveSub} credit={credit} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos}/>
			{dataGlobalArchipelagos.length>0 &&
			<CuratedCarousel dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos}/>
		}
												{/* <div class=" w-full h-full container xl:max-w-[1000px] 2xl:max-w-[1280px] border-b border-gray-300 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div> */}

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
