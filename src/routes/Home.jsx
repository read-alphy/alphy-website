import React from 'react';
import Feed from '../components/Landing_page/WelcomeFeed';
import Welcome from '../components/Landing_page/Welcome';
import About from '../components/Landing_page/About';

function Home({ data, isLoading, setData, setIsLoading }) {
	return (
		<div className="container mx-auto w-800">
			<Welcome />
			<Feed data={data} isLoading={isLoading} setData={setData} setIsLoading={setIsLoading} />
			<About />
		</div>
	);
}

export default Home;
