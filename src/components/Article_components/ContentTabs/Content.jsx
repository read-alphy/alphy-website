import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ContentTab from './ContentTab';
import KeyTakeAways from './KeyTakeAways';

export default function Content(props) {
	const data = props.data;
	const location = useLocation();
	const [activeTab, setActiveTab] = useState('tab1');

	return (
		<div className={`container  mx-auto md:px-10 lg:px-20 `}>
			<h1 className="mt-10 text-xl text-left lg:mt-20 lg:text-3xl text-mainText">{data.title}</h1>
			<div className="grid grid-cols-2 gap-8 mt-16">
				{data ? data.key_takeaways ? <KeyTakeAways key_takeaways={data.key_takeaways} /> : null : null}
				<div className="hidden col-span-2 lg:col-span-1 lg:block">
					<iframe
						title="My YouTube Video"
						className="w-full lg:w-120 h-80"
						src={`https://www.youtube.com/embed/${data.source_id}`}
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</div>
			</div>
			<div className="mt-14 lg:mt-0 summary-and-transcript">
				<div className="summary-and-transcript-buttons">
					<button
						className={activeTab === 'tab1' ? 'content-active-button ' : ''}
						onClick={() => setActiveTab('tab1')}
					>
						Summary
					</button>
					<button
						className={activeTab === 'tab2' ? 'content-active-button' : ''}
						onClick={() => setActiveTab('tab2')}
					>
						Transcript
					</button>
				</div>
				<div className="main-content">
					{activeTab === 'tab1' && <ContentTab data={data.summary} />}
					{activeTab === 'tab2' && <ContentTab data={data.transcript} />}
				</div>
			</div>
		</div>
	);
}
