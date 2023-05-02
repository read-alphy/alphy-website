import React from 'react';
import Feed from '../components/Landing_page/WelcomeFeed';
import Welcome from '../components/Landing_page/Welcome';
import About from '../components/Landing_page/About';
import FeedbackForm from '../components/FeedbackForm';
import { useEffect } from 'react';
import PricingTable from '../components/Landing_page/PricingTable';


function Home({ }) {
	useEffect(() => {
		setTimeout(() => {
			window.history.replaceState(null, null, window.location.pathname); // clears the anchor from the URL
		}, 0);
	}, []);
	return (
		<div className="mx-auto md:w-800 w-full">
			<Welcome />
			<Feed />
			{/*<PricingTable /> */}
			{/* <Pricing /> */}
			<About />
			<FeedbackForm />

		</div>
	);
}

export default Home;
