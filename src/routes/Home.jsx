import React from 'react';
import Feed from '../components/Landing_page/WelcomeFeed';
import Welcome from '../components/Landing_page/Welcome';
import About from '../components/Landing_page/About';

function Home({ data, isLoading, setData, setIsLoading, search, setSearch, offset, setOffset }) {
	return (
		<div className="container mx-auto w-800">
			<Welcome />
			<Feed
				data={data}
				setData={setData}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				search={search}
				setSearch={setSearch}
				offset={offset}
				setOffset={setOffset}
			/>
			<About />
		</div>
	);
}

export default Home;
