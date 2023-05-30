import React from 'react';
import Feed from '../components/Landing_page/WelcomeFeed';
import Welcome from '../components/Landing_page/Welcome';
import About from '../components/Landing_page/About';
import FeedbackForm from '../components/FeedbackForm';
import { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import WelcomePopup from '../components/Landing_page/WelcomePopup.jsx';


function Home({hasActiveSub,currentUser,credit}) {

	/* const { currentUser } = useAuth(); */
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		localStorage.setItem('search', '');
		setTimeout(() => {
			window.history.replaceState(null, null, window.location.pathname); // clears the anchor from the URL
		}, 0);

		
/* 		console.log(localStorage.getItem('hasSeenWelcomeMessage'))
		
		
		if (currentUser !== null) {
			const hasSeenWelcomeMessage = localStorage.getItem('hasSeenWelcomeMessage');
			
			if (hasSeenWelcomeMessage!=="true") {
				setShowMessage(true);
				localStorage.setItem('hasSeenWelcomeMessage', 'true');
			}
		} */



	}, []);
	return (
		<div className="mx-auto md:w-800 w-full bg-[#fbfbfa] dark:bg-darkMode dark:text-zinc-300">
			<Helmet>
				{/* <title>{`Alphy, the next generation speech-to-meaning agent.`} </title> */}
				<title>Alphy: Unlock the Information in Audiovisual Content </title>
				<meta name="twitter:card" content="summary_large_image"></meta>
				<meta property="og:title" content={`Alphy, the next generation speech-to-meaning agent.`} />
				<meta name="description" content="Transcribe, summarize, and question YouTube videos and Twitter Spaces with the help of AI. Try Alphy for free!" />
				<meta content="Transcribe, summarize, and question YouTube videos and Twitter Spaces with the help of AI. Try Alphy for free!"
					property="og:description" />
				<meta name="twitter:title" content={`Alphy, the next generation speech-to-meaning agent.}`} />
				<meta name="twitter:description" content="Transcribe, summarize, and question YouTube videos and Twitter Spaces with the help of AI. Try Alphy for free!" />
				<meta name="twitter:image" content="https://i.ibb.co/4g2Jtvc/home.png" />
				<meta property="og:url" content="https://alphy.app/" />
				<meta content="https://i.ibb.co/4g2Jtvc/home.png" property="og:image" />
			</Helmet>
			<Welcome hasActiveSub={hasActiveSub} credit={credit} />
			<Feed currentUser={currentUser} />
{/* 			{showMessage &&
				<WelcomePopup showMessage={showMessage} setShowMessage={setShowMessage} />
			} */}
			<About />
			<FeedbackForm />

		</div>
	);
}

export default Home;
