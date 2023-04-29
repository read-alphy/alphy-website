import React, { useEffect, useState, useRef } from 'react';
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
import working from './working.svg';
import { useWindowSize } from '../../../hooks/useWindowSize';


export default function Content(props) {
	const [loading, setLoading] = useState(false);
	const windowSize = useWindowSize();
	const [isLoading, setIsLoading] = useState(props.data?.length === 0);
	const data = props.data;
	const ref = useRef(null);

	const [activeTab, setActiveTab] = useState('tab1');
	const [autoplay, setAutoplay] = useState(0);
	const [timestamp, setTimestamp] = useState();
	const [showButton, setShowButton] = useState(false);

	let summaryArray = '';
	const handleClick = () => {
		ref.current.scrollIntoView({ behavior: 'smooth' });
	};

	const checkScrollPosition = () => {
		const windowHeight = ref.current.clientHeight;
		console.log(windowHeight)
		const scrollPosition = ref.current.scrollTop;

		if (scrollPosition >= 3 * windowHeight) {
			setShowButton(true);
		} else {
			setShowButton(false);
		}
	};

	useEffect(() => {
		const scrollableDiv = ref.current;
		scrollableDiv.addEventListener("scroll", checkScrollPosition);

		return () => {
			scrollableDiv.removeEventListener("scroll", checkScrollPosition);
		};
	}, []);

	// for question answering
	const timestampChanger = (event) => {
		setAutoplay(1);
		let formattedTimestamp = event.target.textContent;
		const [hours, minutes, seconds] = formattedTimestamp.split(':');
		setTimestamp(hours * 3600 + minutes * 60 + seconds.substring(0, 2) * 1)

		/* 
				setTimestamp(hours[0] === "0" ? hours[1] * 3600 : hours * 3600
		
					+ minutes[0] === "0" ? minutes[1] * 60 : minutes * 60
		
						+ seconds[0] === "0" ? seconds[1] * 1 : seconds.substring(0, 2) * 1) */

	}
	const handleClickTimestamp = (event) => {
		setAutoplay(1);
		let formattedTimestamp = event.target.textContent;
		const [hours, minutes, seconds] = formattedTimestamp.split(':');

		setTimestamp(hours * 3600 + minutes * 60 + seconds * 1);
	};

	let transcript = [];

	async function transcriptParser() {

		if (data.summary !== null) {
			summaryArray = data.summary.split('\n');

			var parser = new srtParser2();

			var srt_array = parser.fromSrt(data.transcript);



			let nothing = '';
			let count = 0;

			transcript.push('00:00:00');


			for (let i = 0; i < srt_array.length; i++) {
				count = count + 1;
				nothing = nothing + '' + srt_array[i].text;
				if (
					(count > 6 || count >= srt_array.length) &&
					srt_array[i].text.substring(srt_array[i].text.length - 1, srt_array[i].text.length) === '.'
				) {
					transcript.push(nothing);
					transcript.push(srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4));
					//timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
					count = 0;
					nothing = '';
				}
				// in case missing punctuation, push it anyway
				else if (count > 12) {
					transcript.push(nothing);
					transcript.push(srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4));
					//timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
					count = 0;
					nothing = '';

				}

			}
		}
		else {

			var parser = new srtParser2();

			var srt_array = parser.fromSrt(data.transcript);


			let nothing = '';
			let count = 0;

			transcript.push('00:00:00');


			for (let i = 0; i < srt_array.length; i++) {
				count = count + 1;
				nothing = nothing + ' ' + srt_array[i].text;
				if (
					(count > 6 || count >= srt_array.length) &&
					srt_array[i].text.substring(srt_array[i].text.length - 1, srt_array[i].text.length) === '.'
				) {
					transcript.push(nothing);
					transcript.push(srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4));
					//timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
					count = 0;
					nothing = '';
				}

				else if (count > 12) {
					transcript.push(nothing);
					transcript.push(srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4));
					//timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
					count = 0;
					nothing = '';

				}


			}

		}
		/* transcript_array = data.transcript_chunked.split("\n") */



	}

	transcriptParser();


	return (
		<div ref={ref} className={`container grow mx-auto md:px-10 overflow-x-hidden`}>

			<div>
				<div className="grid grid-cols-3 max-h-[90vh]">
					<div className="col-span-2">
						<h1 className="col-span-2 mt-10 text-xl text-left lg:col-span-3 lg:mt-10 lg:text-3xl text-blueLike font-bold">
							{data.title}
						</h1>
						<h2 className="col-span-2 mt-5 text-l text-left lg:col-span-3 lg:mt-5 lg:text-xl text-blueLike font-light">
							{data.creator_name}
						</h2>
						<p className="w-full mt-5 border border-zinc-100"></p>
					</div>

					<div className="flex flex-col mt-5 ml-2 items-center cursor-pointer lg:hidden ">
						{data.source_type === 'yt' ? (
							<a target="_blank" href={`https://www.youtube.com/watch?v=${data.source_id}`}>
								<img className="ml-1" src="/youtubeicon.png" width={100} />
								<p className="-mt-3  text-center items-center text-sm font-medium">Click to Watch</p>
							</a>
						) : (
							<a className="mt-7" target="_blank" href={`https://twitter.com/i/${data.source_id}`}>
								<img src={Twitter} width={100} />
								<p className="mt-3 text-sm font-medium text-center items-center ">Click to Listen</p>
							</a>
						)}

					</div>

				</div>



				<div className="flex flex-col xl:flex-row mt-16">
					<div className="grid grid-cols-2 w-full">
						{/* <div className={`hidden lg:flex justify-center items-center ${data.transcript ? "xl:w-1/2 w-2/3 h-[300px]" : "w-full h-[500px]"}  h-inherit mx-auto pb-10 xl:pb-0`}> */}
						<div className={`col-span-2 hidden lg:flex justify-center items-center w-full h-[400px]  h-inherit mx-auto pb-10 xl:pb-0`}>
							{data.source_type === 'sp' ? (

								<div className="block w-2/3 ">
									<a target="_blank" href={`https://twitter.com/i/spaces/${data.source_id}`}>
										{' '}
										<img className=" cursor-pointer " src={Twitter}></img>
									</a>
									<a target="_blank"
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

						<div className="col-span-2 md:mt-10">
							{isLoading ? (
								<Loading />
							) : (
								data.key_qa && (
									<QuestionAnswering
										source_id={data.source_id}
										source_type={data.source_type}
										key_qa={data.key_qa}
										data={data}
										transcript={transcript}
										timestampChanger={timestampChanger}
									/>
								)
							)}
						</div>
					</div>
					<div className="w-full md:w-3/4 2xl:w-1/2 mx-auto">


						{data.is_complete || data.transcript ? (
							<div className="lg:ml-10 mt-14 lg:mt-0 w-full bg-[#f7g4g1] drop-shadow-xxl rounded-lg p-5 border-radius-4 border border-zinc-300">

								<div class="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
									<ul class="flex flex-wrap border-b border-gray-200 md:w-[400px] w-full mx-auto	">
										<li className={`w-1/3 md:w-4/12 ${activeTab == "tab3" ? "text-blueLike border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab3")} class={`text-l inline-block p-4 pt-6    rounded-t-lg  dark:text-blue-500 dark:border-blue-500`}>Key Takeaways</button>
										</li>
										<li className={` w-1/3 md:w-4/12 ${activeTab == "tab1" ? "text-blueLike border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab1")} class={`text-l inline-block p-4 pt-6 rounded-t-lg  dark:text-blue-500 dark:border-blue-500`}>Summary</button>
										</li>
										<li className={` w-1/3 md:w-4/12 ${activeTab == "tab2" ? "text-blueLike border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab2")} class={`text-l inline-block p-4 pt-6 rounded-t-lg  dark:text-blue-500 dark:border-blue-500`}>Transcript</button>
										</li>
										{/* 										<li className={` w-1/3 md:w-3/12 ${activeTab == "tab4" ? "text-blueLike border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab4")} class={`text-l inline-block p-4 rounded-t-lg  dark:text-blue-500 dark:border-blue-500`}>Ask questions</button>
										</li> */}

									</ul>
								</div>
								{/* 
						<div className="summary-and-transcript-buttons text-xl w-full space-between gap-4	text-zinc-600 ">
							<button
								className={
									activeTab === 'tab1' ? 'content-active-button border-r-1 ' : 'border-r-1 '
								}
								onClick={() => setActiveTab('tab1')}
							>
								Summary
							</button>
							<button
								className={activeTab === 'tab2' ? 'content-active-button ' : ''}
								onClick={() => setActiveTab('tab2')}
							>
								Transcript
							</button>
						</div> */}
								<div className="main-content text-zinc-600">

									<Tabs>
										<Tab eventKey="transcript" title="">
											{/* {activeTab === "tab3" && (data ? data.key_takeaways ? <KeyTakeAways key_takeaways={data.key_takeaways} /> : null : null)} */}
											{activeTab === "tab3" && (data ? data.key_takeaways ? data.key_takeaways.map((item, index) => {
												return (

													<p className="pb-2">{index + 1}) {item}</p>)
											}) : null : null)}
											{/* 											{activeTab === "tab4" && (isLoading ? (
												<Loading />
											) : (
												data.key_qa && (
													<QuestionAnswering
														source_id={data.source_id}
														source_type={data.source_type}
														key_qa={data.key_qa}
														data={data}
														transcript={transcript}
														timestampChanger={timestampChanger}
													/>
												)
											))} */}

											{activeTab === 'tab1' && (
												<div className="text-l font-normal mb-4 max-w-screen-md overflow-auto max-h-[80vh]">
													{isLoading ? (
														<Loading />
													) : summaryArray.length === 0 ? (
														<tr className="border-b-0">
															<td>Still waiting for the summary! Meanwhile, check the transcript.</td>
														</tr>
													) : (
														summaryArray.map((item, index) => {
															return (
																<p className="mb-6 text-md" key={index}>


																	<p dangerouslySetInnerHTML={{ __html: item }} />


																</p>
															);
														})
													)}
												</div>
											)}
											{activeTab === 'tab2' && (
												<div className="text-l font-normal max-w-screen-md overflow-auto max-h-[80vh] ">
													{isLoading ? (
														<Loading />
													) : (
														transcript.map((item, index) => {
															/* transcriptParser(); */

															if (index % 2 === 0 && index < transcript.length - 1) {
																return (
																	window.innerWidth > 999 && data.source_type === "yt" ?
																		<a
																			onClick={handleClickTimestamp}
																			className={`${data.source_type === 'yt'
																				? 'lg:cursor-pointer lg:pointer-events-auto'
																				: ''
																				} lg:pointer-events-auto lg:text-slate-900 lg:font-bold underline`}
																			key={index}
																		>
																			<br></br>
																			<p className="text-md ">{item}{' '}</p>
																		</a> :
																		<a

																			target="_blank" href={`https://youtu.be/${data.source_id}?t=${Math.floor(parseInt(item.split(':')[0] * 3600) + parseInt(item.split(':')[1] * 60) + parseInt(item.split(':')[2]))}`}


																			className={`${data.source_type === 'yt'
																				? 'lg:cursor-pointer lg:pointer-events-auto'
																				: ''
																				}  lg:pointer-events-auto lg:text-slate-900 font-bold underline`}
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
							<div className="flex flex-col">
								<p className="text-xl text-zinc-600 font-bold max-w-screen-md mx-auto p-3 lg:p-20">

									Alphy is doing its best to process this video, it will be ready in a few minutes. In the
									meantime, you can check out other videos.
									<img className="opacity-30 mx-auto" src={working} alt="My SVG" />
								</p>

							</div>
						)}
					</div>{' '}
				</div>

				{/* 
				{isLoading ? (
					<Loading />
				) : (
					data.key_qa && (
						<QuestionAnswering
							source_id={data.source_id}
							source_type={data.source_type}
							key_qa={data.key_qa}
							data={data}
							transcript={transcript}
							timestampChanger={timestampChanger}
						/>
					)
				)} */}

				{/* 	<div id="bottom-banner" tabindex="-1" class="fixed bottom-0   h-[100px] z-50 w-1/6 right-0 ">

					{showButton && (
						<button onClick={handleClick} data-dismiss-target="#bottom-banner" type="button" class="right-0 bottom-0 pl-5 sm:ml-10 md:ml-20 mt-10 text-gray-600 ">
							<svg
								className="right-0 "
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								width="40px"
							>
								<path
									clipRule="evenodd"
									d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
									fillRule="evenodd"
								></path>
							</svg>{' '}

						</button>)}

				</div>
 */}
			</div>



		</div>
	);
}
