import React, { useEffect, useState, useRef } from 'react';
import QuestionAnswering from '../QuestionAnswering';
import srtParser2 from 'srt-parser-2';
import { Tab, Tabs } from 'react-bootstrap';
import Twitter from '../../../img/twitter_spaces.png';
import Loading from '../../Loading';
import working from './working.svg';
import working_darktheme from './working_darktheme.svg';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { saveAs } from 'file-saver'; // library to save file as blob
import Download from '../../../img/download.gif';
import DownloadStatic from '../../../img/download_static.png';
import ReactMarkdown from "react-markdown";
import { Popover } from 'flowbite';


export default function Content(props) {
	
	const [loading, setLoading] = useState(false);
	const windowSize = useWindowSize();
	const [isLoading, setIsLoading] = useState(props.data.transcript === undefined);
	const data = props.data;
	const transcript_raw = props.data.transcript;
	const theme = localStorage.getItem("theme")
	
	const ref = useRef(null);
	let transcript = [];

	const [activeTab, setActiveTab] = useState('tab1');
	const [autoplay, setAutoplay] = useState(0);
	const [timestamp, setTimestamp] = useState();
	const [showButton, setShowButton] = useState(false);
	const [downloading, setDownloading] = useState(false);

	let summaryArray = '';


	const checkScrollPosition = () => {
		const windowHeight = ref.current.clientHeight;

		const scrollPosition = ref.current.scrollTop;

		if (scrollPosition >= 3 * windowHeight) {
			setShowButton(true);
		} else {
			setShowButton(false);
		}
	};


/* 
 	const $targetEl = document.getElementById('popoverHover');

    // set the element that trigger the popover using hover or click
    const $triggerEl = document.getElementById('popoverButton');

    // options with default values
    const options = {
        placement: 'left',
        triggerType: 'hover',
        offset: 5,

    };

    const popover = new Popover($targetEl, $triggerEl, options);
 */

	useEffect(() => {
		
		if(transcript.length===0 && data.transcript!==null){
			transcriptParser();

		}
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

	

	async function transcriptParser() {

		if (data.summary !== undefined || data.summary !== null) {
			summaryArray = data.summary.split('\n');
			

			var parser = new srtParser2();

			var srt_array = parser.fromSrt(transcript_raw);



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
				// in case missing punctuation, push it anyway
				else if (count > 12) {
					transcript.push(nothing);
					transcript.push(srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4));
					//timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
					count = 0;
					nothing = '';

				}
				else if (i === srt_array.length - 1) {

					transcript.push(nothing);
					count = 0;
					nothing = '';
				}


			}
		}
		else {

			var parser = new srtParser2();

			var srt_array = parser.fromSrt(transcript_raw);


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
				else if (i === srt_array.length - 1) {
					transcript.push(nothing);
				}


			}

		}
		/* transcript_array = data.transcript_chunked.split("\n") */



	}


	const handleDownload = (selection) => {
		
		setDownloading(true)
	/* 	popover.toggle() */
		
		
		// create .srt file
		setTimeout(() => {


			if (activeTab === "tab2") {
				if (selection==1){
				const blob = new Blob([data.transcript], { type: 'text/srt' });

				// save file as blob
				saveAs(blob, `${data.title}_${data.creator_name}_subtitles.srt`);
			
			}
			else if(selection==2){
				let text = ""
				let stop = false
				for (let i = 0; i < transcript.length; i++){
					text = text + transcript[i] + '\n\n'
					if(i===transcript.length-1){
						stop = true
					}
					
				}
				if (stop === true){
				const blob = new Blob([text], { type: 'text/txt' });
				saveAs(blob, `${data.title}_${data.creator_name}_transcript.txt`);
				
				}
			}

				setTimeout(() => {
					setDownloading(false)
				}, 2000)
			}


/* 			else if (activeTab === "tab1") {
				const blob = new Blob([data.summary], { type: 'text/plain' });

				// save file as blob
				saveAs(blob, `${data.title}_${data.creator_name}_summary.txt`);
				setTimeout(() => {
					setDownloading(false)
				}, 1600)
			}
 */
		}, 3000)


	};

	transcriptParser();

	return (
		<div ref={ref} className={`md:max-w-[90vw] scroll-smooth pb-10 lg:px-10 xl:px-20 3xl:px-40  mt-5 md:mt-0 grow mx-auto overflow-x-hidden`}>

			<div>
				<div className="grid grid-cols-3 max-h-[90vh]">
					<div className="col-span-2">
						<h1 className="col-span-2 mt-10 text-xl text-left lg:col-span-3 lg:mt-0 lg:text-3xl text-blueLike dark:bg-darkMode dark:text-zinc-300 font-bold">
							{data.title}
						</h1>
						<h2 className="col-span-2 mt-5 text-l text-left lg:col-span-3 lg:mt-5 lg:text-xl text-blueLike dark:bg-darkMode dark:text-zinc-300 font-light">
							{data.creator_name}
						</h2>
						<p className="w-full mt-5 border border-zinc-100 dark:border-zinc-700"></p>
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
					{data.source_type === 'sp' &&
					<div className="flex hidden flex-col ml-2 items-center  lg:block ">
					<a className="mx-auto flex items-center flex-col cursor-pointer" target="_blank" href={`https://twitter.com/i/${data.source_id}`}>
								<img src={Twitter} width={120} />
								<p className="mt-3 text-sm font-light text-center items-center cursor-pointer">Click to Listen</p>
							</a>
					</div>
}

				</div>



				<div className="flex flex-col xl:flex-row mt-16">
				{transcript.length>0 &&
					<div className={`grid grid-cols-2 w-full md:min-w-[500px]`}>
						{/* <div className={`hidden lg:flex justify-center items-center ${data.transcript ? "xl:w-1/2 w-2/3 h-[300px]" : "w-full h-[500px]"}  h-inherit mx-auto pb-10 xl:pb-0`}> */}
						
						<div className={`col-span-2 hidden ${data.source_type==="sp"?"":"xl:flex"}  justify-center items-center w-[95%] h-[400px]  h-inherit mx-auto pb-10 xl:pb-0`}>
							{data.source_type === 'sp' ? (
/* 
								<div className={`block ${transcript.length>0 || data.is_complete===true ? "w-full" : "w-1/3"} items-center text-center mx-auto`}>
						
									<a target="_blank"
										href={`https://twitter.com/i/spaces/${data.source_id}`}
										className="text-l text-zinc-600 text-center dark:text-zinc-200 pt-2 cursor-pointer"
									>
										<img src={Twitter} width={100} />
										Listen to "{data.title}"{' '}
									</a>
								</div> */
								null
							) : (
								transcript.length>0 ||data.is_complete===true ?
								<iframe
									id="player"
									title="My YouTube Video "
									src={`https://www.youtube.com/embed/${data.source_id}?autoplay=${autoplay}&start=${timestamp}`}
									width="100%"
									height="100%"
									frameBorder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								></iframe>
								:null


							)}

						</div>
						{/* <Loading /> */}
						<div className={`col-span-2 ${data.source_type=="yt" && "md:mt-10"} drop-shadow-sm`}>
							{isLoading ? (null


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
					}
					{transcript.length>0 &&
					
					<div className={`${isLoading ? "hidden" : ""} w-full lg:w-1/2 3xl:w-1/2 mx-auto mt-10 md:mt-0 ${window.innerWidth >1280 && window.innerWidth<1420 ? "": ""}`} >
						{transcript.length>0 ? (
							<div className={` mt-14 xl:mt-0 w-full bg-[#f7g4g1] 3xl:min-w-[500px]  ${window.innerWidth >1280 && window.innerWidth<1420 ? window.innerWidth >1280 && window.innerWidth<1340 ? "ml-2": "ml-6" : "xl:ml-10"} rounded-lg p-5 border border-zinc-100 drop-shadow-sm dark:border-zinc-700`} >

								<div className="text-sm font-medium text-center text-gray-500 dark:text-zinc-300 dark:border-gray-700 ">
									<ul className="flex flex-wrap border-b border-gray-200 xl:w-[400px] w-full mx-auto	">
										<li className={`w-1/3 md:w-4/12 ${activeTab == "tab3" ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab3")} className={`text-l inline-block p-4 pt-6 rounded-t-lg dark:text-zinc-200 dark:border-blue-500`}>Key Takeaways</button>
										</li>
										<li className={` w-1/3 md:w-4/12 ${activeTab == "tab1" ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab1")} className={`text-l inline-block p-4 pt-6 rounded-t-lg dark:text-zinc-200 dark:border-blue-500`}>Summary</button>
										</li>
										<li className={` w-1/3 md:w-4/12 ${activeTab == "tab2" ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-normal border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab2")} className={`text-l inline-block p-4 pt-6 rounded-t-lg dark:text-zinc-200 dark:border-blue-500`}>Transcript</button>
										</li>
										{/* 										<li className={` w-1/3 md:w-3/12 ${activeTab == "tab4" ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab4")} className={`text-l inline-block p-4 rounded-t-lg  dark:text-zinc-200 dark:border-blue-500`}>Ask questions</button>
										</li> */}

									</ul>
								</div>
								
								<div className="main-content mt-2 text-zinc-600 dark:text-zinc-200">

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
												
												<div className="content-area text-l font-normal mb-4 max-w-screen-md overflow-auto max-h-[80vh]">
													{/* <button className="flex ml-auto justify-end flex-row justify-end mb-2 mr-8 opacity-60 font-semibold text-black" onClick={handleDownload}><p className="pr-2">Download</p> {downloading ? <img src={Download}></img> : <img title="Download summary" src={DownloadStatic}></img>}</button> */}


													{isLoading ? (
														<Loading />
													) : summaryArray.length === 0 ? (
														<tr className="border-b-0">
															<td>Still waiting for the summary! Meanwhile, check the transcript.</td>
														</tr>
													) : (
														summaryArray.map((item, index) => {
															return (
																<div className="mb-4 text-zinc-700 dark:text-zinc-200" key={index}>
																	<div className="summary-text">
																	<ReactMarkdown>
																		{item}
																	</ReactMarkdown>
																	</div>

																	


																</div>
															);
														})
													)}
												</div>
											)}
											{activeTab === 'tab2' && (
												<div className="content-area text-l font-normal max-w-screen-md overflow-auto max-h-[80vh] ">

													{isLoading ? (
														<Loading />
													) : (
														transcript.map((item, index) => {
														

															if (index % 2 === 0 && index < transcript.length) {
																return (
																	window.innerWidth > 999 && data.source_type === "yt" ?
																		<div className="flex flex-row dark:text-zinc-300">
																			<a
																				onClick={handleClickTimestamp}
																				className={`${data.source_type === 'yt'
																					? 'lg:cursor-pointer lg:pointer-events-auto'
																					: ''
																					} lg:pointer-events-auto lg:text-slate-900 lg:font-bold underline dark:text-zinc-300`}
																				key={index}
																			>
																				<br></br>


																				<p className="text-md ">{item}{' '}</p>

																			</a>
																		
																			
																{/* 			<div className={`${index !==0 || props.hasActiveSub === false ? "hidden" : ""} flex ml-auto justify-end flex-row justify-end`} >
																						<button id="popoverButton" data-popover-target = "popoverHover" data-popover-trigger="hover" className=" mr-8 opacity-80 pt-4">{downloading ? <img src={Download}></img> : <img title="Download transcript" src={DownloadStatic}></img>}</button>
																				<div data-popover id="popoverHover" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 ">
																							
																							<div onClick={() => handleDownload(1)} className="px-3 cursor-pointer py-2 hover:bg-zinc-100 hover:rounded-t-lg dark:hover:bg-zinc-200 dark:hover:text-zinc-500">
																								<p className="">Download as Plain Subtitle (.srt)</p>
																							</div>
																							
																							<div onClick={() => handleDownload(2)} className="px-3 cursor-pointer py-2 hover:bg-zinc-100 hover:rounded-b-lg dark:hover:bg-zinc-200 dark:hover:text-zinc-500">
																							<p>Download Formatted Transcript (.txt)</p>	
																							</div>
																			</div>
																			</div> 
																		  */}

																		</div> :
																		<div className="flex flex-row">
																			<a

																				target="_blank" href={data.source_type === "yt" ? `https://youtu.be/${data.source_id}?t=${Math.floor(parseInt(item.split(':')[0] * 3600) + parseInt(item.split(':')[1] * 60) + parseInt(item.split(':')[2]))}` : `https://twitter.com/i/spaces/${data.source_id}`}


																				className={`${data.source_type === 'yt'
																					? 'lg:cursor-pointer lg:pointer-events-auto'
																					: ''
																					}  lg:pointer-events-auto lg:text-slate-900 dark:text-zinc-300 font-bold underline`}
																				key={index}
																			>
																				<br></br>

																				{item}{' '}
																				

																			</a>
																{/* 			{index === 0 && <button className="flex ml-auto justify-end flex-row justify-end  mr-4 opacity-80 pt-4" onClick={handleDownload}>{downloading ? <img src={Download}></img> : <img title="Download transcript" src={DownloadStatic}></img>}</button>} */}
																		</div>

																);
															} else if (index % 2 === 1 && index < transcript.length) {
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
							<div>
								
							</div>
						)}
					</div>}{' '}
				</div>

			</div>

			{transcript.length===0 ?

				<div className="flex flex-col mb-20 mt-20 ">
								<p className="text-xl text-zinc-500 dark:text-zinc-200 font-light max-w-screen-md mx-auto p-3 text-center">
								
									Alphy is doing its best to process this video, it will be ready in a few minutes. In the
									meantime, you can check out other videos.
									 
									 <img className={`opacity-70 dark:opacity-90 mx-auto `} src={working} alt="My SVG" /> 
									 
								</p>

				</div>: null
							}

		</div>
	);
}
