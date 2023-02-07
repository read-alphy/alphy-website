import React, { useState } from 'react';
import MainFeed from './FeedTabs/MainFeed';

function SideFeed(props) {
	const data = props.data;
	const isLoading = props.isLoading;

	return (
		<div className="user-feed-buttons mt-10">
			<div>
				<MainFeed data={data} isLoading={isLoading} />
			</div>
		</div>
	);
}

export default SideFeed;
