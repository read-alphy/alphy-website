import React from 'react';
import Feed from '../components/Landing_page/WelcomeFeed';
import Welcome from '../components/Landing_page/Welcome';
import About from '../components/Landing_page/About';
import FeedbackForm from '../components/FeedbackForm';
import { useEffect } from 'react';

function Home({}) {
	useEffect(() => {
		setTimeout(() => {
			window.history.replaceState(null, null, window.location.pathname); // clears the anchor from the URL
		}, 0);
	}, []);
	return (
		<div className="mx-auto w-800">
			<Welcome />
			<Feed />
			<About />
			<FeedbackForm />
		</div>
	);
}

export default Home;
