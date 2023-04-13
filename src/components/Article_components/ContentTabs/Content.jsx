import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ContentTab from './ContentTab';
import KeyTakeAways from './KeyTakeAways';
import QuestionAnswering from '../QuestionAnswering';
import srtParser2 from 'srt-parser-2';
import { Tab, Tabs } from 'react-bootstrap';
import Twitter from '../../../img/twitter_spaces.png';
import Loading from '../../Loading';

export default function Content(props) {
	const [loading, setLoading] = useState(false);

	const [isLoading, setIsLoading] = useState(props.data?.length === 0);
	const data = props.data;

	const [activeTab, setActiveTab] = useState('tab1');
	const [autoplay, setAutoplay] = useState(0);
	const [timestamp, setTimestamp] = useState();
	const [dataLoaded, setDataLoaded] = useState(false);

	let summaryArray = '';
	const handleClick = (event) => {
		setAutoplay(1);
		let formattedTimestamp = event.target.textContent;
		const [hours, minutes, seconds] = formattedTimestamp.split(':');

		setTimestamp(hours * 3600 + minutes * 60 + seconds * 1);
	};

	let transcript = [];

	async function transcriptParser() {
		summaryArray = data.summary.split('\n');
		var parser = new srtParser2();
		var srt_array = parser.fromSrt(data.transcript);

		let nothing = '';
		let count = 0;

		transcript.push('00:00:00');

		for (let i = 0; i < srt_array.length; i++) {
			count = count + 1;
			nothing = nothing + ' ' + srt_array[i].text;
			if (
				count > 6 &&
				srt_array[i].text.substring(srt_array[i].text.length - 1, srt_array[i].text.length) === '.'
			) {
				transcript.push(nothing);
				transcript.push(srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4));
				//timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
				count = 0;
				nothing = '';
			}
		}
	}

	transcriptParser();

	return (
		<div className={`container grow mx-auto md:px-10 xl:px-20 pb-20 overflow-x-hidden`}>
			<div>
				<div className="grid grid-cols-3">
					<h1 className="col-span-2 mt-10 text-xl text-left lg:col-span-3 lg:mt-20 lg:text-3xl text-blueLike font-bold">
						{data.title}
					</h1>
					<h2 className="col-span-2 mt-5 text-l text-left lg:col-span-3 lg:mt-5 lg:text-xl text-blueLike font-light">
						{data.creator_name}
					</h2>


					<div className="flex flex-col items-center mt-5 cursor-pointer lg:hidden">
						{data.source_type === 'yt' ? (
							<a href={`https://www.youtube.com/watch?v=${data.source_id}`}>
								<img src="/youtubeicon.png" width={80} />
								<p className="-mt-3 font-semibold">Click to Watch</p>
							</a>
						) : (
							<a className="mt-7" href={`https://twitter.com/i/
              
              
              /${data.source_id}`}>
								<img src={Twitter} width={100} />
								<p className="mt-3 font-semibold text-zinc-500">Click to Listen</p>
							</a>
						)}
					</div>
				</div>


				<div className="flex flex-col xl:flex-row mt-16 mb-10 items-center">
					<div className="hidden lg:flex justify-center items-center xl:w-1/2 w-2/3 h-[300px] h-inherit mx-auto pb-10 xl:pb-0">
						{data.source_type === 'sp' ? (

							<div className="block w-2/3 ">
								<a href={`https://twitter.com/i/spaces/${data.source_id}`}>
									{' '}
									<img className=" cursor-pointer " src={Twitter}></img>
								</a>
								<a
									href={`https://twitter.com/i/spaces/${data.source_id}`}
									className="text-l text-zinc-600 mt-3 cursor-pointer"
								>
									Listen to "{data.title}"{' '}
								</a>
							</div>
						) : (
							<iframe
								id="player"
								title="My YouTube Video "
								src={`https://www.youtube.com/embed/${data.source_id}?autoplay=${autoplay}&start=${timestamp}`}
								width="100%"
								height="100%"
								frameBorder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							></iframe>
						)}
					</div>
					<div className="w-full md:w-3/4 2xl:w-1/2 mx-auto">
						{data ? data.key_takeaways ? <KeyTakeAways key_takeaways={data.key_takeaways} /> : null : null}
					</div>{' '}
				</div>


				{isLoading ? (
					<Loading />
				) : (
					data.is_complete && (
						<QuestionAnswering
							source_id={data.source_id}
							key_qa={data.key_qa}
							data={data}
							transcript={transcript}
						/>
					)
				)}


				{data.is_complete ? (
					<div className="lg:ml-10 mt-14 lg:mt-0 w-full">
						<div className="summary-and-transcript-buttons text-xl w-full 	text-zinc-600 ">
							<button
								className={
									activeTab === 'tab1' ? 'content-active-button border-r-1 w-1/2' : 'border-r-1 w-1/2'
								}
								onClick={() => setActiveTab('tab1')}
							>
								Summary
							</button>
							<button
								className={activeTab === 'tab2' ? 'content-active-button w-1/2' : 'w-1/2'}
								onClick={() => setActiveTab('tab2')}
							>
								Transcript
							</button>
						</div>
						<div className="main-content lg:ml-10 text-zinc-600">
							<Tabs>
								<Tab eventKey="transcript" title="">
									{activeTab === 'tab1' && (
										<div className="text-lg font-normal mb-4 max-w-screen-md">
											{isLoading ? (
												<Loading />
											) : summaryArray.length === 0 ? (
												<tr className="border-b-0">
													<td>No results found</td>
												</tr>
											) : (
												summaryArray.map((item, index) => {
													return (
														<p className="mb-6" key={index}>


															<p dangerouslySetInnerHTML={{ __html: item }} />


														</p>
													);
												})
											)}
										</div>
									)}
									{activeTab === 'tab2' && (
										<div className="text-lg font-normal mb-4 max-w-screen-md">
											{isLoading ? (
												<Loading />
											) : (
												transcript.map((item, index) => {
													/* transcriptParser(); */

													if (index % 2 === 0 && index < transcript.length - 1) {
														return (
															<a
																onClick={handleClick}
																className={`${data.source_type === 'yt'
																	? 'lg:cursor-pointer lg:pointer-events-auto'
																	: ''
																	} pointer-events-none lg:pointer-events-auto lg:text-blue-900 lg:font-bold underline`}
																key={index}
															>
																<br></br>
																{item}{' '}
															</a>
														);
													} else if (index % 2 === 1 && index < transcript.length - 1) {
														return (
															<div key={index}>
																<br></br>
																{item}
															</div>
														);
													}
												})
											)}
										</div>
									)}
								</Tab>
							</Tabs>
						</div>
					</div>
				) : (
					<p className="text-xl text-zinc-600 font-normal max-w-screen-md mx-auto p-3 lg:p-20">
						Alphy is doing it's best to process this video, it will be ready in a few minutes. In the
						meantime, you can check out other videos.
					</p>
				)}
			</div>
		</div>
	);
}
