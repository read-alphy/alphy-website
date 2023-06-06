//import usestate
import React, { useState, useEffect } from 'react';
import srtParser2 from 'srt-parser-2';
import axios from 'axios';
import ReactLoading from 'react-loading';
import toast, { Toaster } from 'react-hot-toast';
import { useRef } from 'react';
import './QA.css';
import TypeIt from 'typeit-react';
import { useAuth } from '../../hooks/useAuth';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useLocation } from 'react-router-dom';
import { Button, Spinner} from "@material-tailwind/react";
import Working from "./ContentTabs/working.svg"


export default function QuestionAnswering(props) {
	// console.log(props.props, props.key_qa)
	const windowSize = useWindowSize();
	const QARef = useRef(null);
	const location = useLocation();
	const buttonRef = useRef(null);
	const [collapseIndex, setCollapseIndex] = useState(-1);

	const [answerData, setAnswerData] = useState('');
	const [isLoadingInside, setIsLoadingInside] = useState(false);
	const [answer, setAnswer] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [showBaseQA, setShowBaseQA] = useState(false);
	const [baseSources, setBaseSources] = useState(false);
	const [baseQuestion, setBaseQuestion] = useState('');
	const [isCleared, setIsCleared] = useState(true);
	const [showUserQA, setShowUserQA] = useState(false);
	const [inputError, setinputError] = useState(false);
	const [errorText, setErrorText] = useState('');
	const { currentUser } = useAuth();
	const [clicked, setClicked] = useState(false);
	

	function updateVariable(event) {

		props.timestampChanger(event)

	}


	useEffect(() => {

		setTimeout(() => {
			if (location.pathname.split('/')[2].split("&q=")[1] !== undefined && clicked === false) {

				const my_question = location.pathname.split('/')[2].split("&q=")[1]
				runAnswererFromUrl(my_question)



				setTimeout(() => {
					const element = document.querySelector("#q_and_a");
					if (element) {
						QARef.current = element;
						element.scrollIntoView({ behavior: "smooth" });

					}

				}, 300);

			}

		}, 1000);


	}, [])

	function runAnswererFromUrl(my_question) {

		if (my_question) {
			const decodedText = decodeURIComponent(my_question);



			if (props.key_qa[decodedText]) {

				const keys = Object.keys(props.key_qa);
				const index = keys.indexOf(decodedText);
				
				setCollapseIndex(index)
				//setCollapseIndex(index)
				//setIsCleared(false);
				//setShowBaseQA(true);
				setBaseQuestion(decodedText)
				//setInputValue(decodedText)
				setClicked(true)

			}

			else {
				setInputValue(decodedText);
				setClicked(true);
				setTimeout(() => {
					if (buttonRef.current) {
						buttonRef.current.click();

					}
				}, 1000);
			}

		}
	}

	const handleClear = () => {
		setIsCleared(true);
		setShowBaseQA(false);
		setShowUserQA(false);
		setInputValue('');
		setAnswerData('');
		setinputError(false);
	};

	const handleBaseQA = (event) => {
		setIsCleared(false);
		setShowBaseQA(true);
		setInputValue(event.target.textContent);
		setBaseQuestion(event.target.textContent);
		QARef.current.scrollIntoView({ behavior: 'smooth' });
	};


	const handleBaseQAaccordion= (event, index,item) => {

		
			if(collapseIndex===index){
				setCollapseIndex(-1)
				return
			}
			else{
				setCollapseIndex(index)
			}
	
		// setIsCleared(false);
		/* setShowBaseQA(true); */
		// setInputValue(event.target.textContent);
		setBaseQuestion(item);
		QARef.current.scrollIntoView({ behavior: 'smooth' });
	};
	const handleOptionClear = () => {
		setShowBaseQA(false);
		setInputValue('');
	};
	

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			fetchData();
		}
	};

	const handleClick = () => {
		if (showBaseQA) {
			/*  setInputValue(''); */
		}
	};
	const handleShareLink = () => {
		const encodedText = encodeURIComponent(baseQuestion ? baseQuestion :inputValue);
		
		const url = `${window.location.origin}${location.pathname.split('&q=')[0]}&q=${encodedText}`;
		navigator.clipboard.writeText(url);
		toast.success('Link copied to clipboard!');
	};
	const handleCopyToClipboard = () => {
		let question
		if(baseQuestion){
			 question = baseQuestion
		}
		else{
			question = inputValue
		}
		const myHtml = document.getElementById("answer-area");
		const plainText = `${question} \n\n ${myHtml.innerText}`
		navigator.clipboard.writeText(plainText);
		toast.success('Answer copied to clipboard!');
	};
	const fetchData = () => {
		toast.dismiss();





		setShowBaseQA(false);
		setShowUserQA(true);
		setinputError(false);


		if (inputValue.length > 200) {
			setinputError(true);
			setErrorText('Your question is too long, please keep it under 200 characters.');
			setInputValue('');
			return;
		} else if (inputValue.length === 0) {
			setinputError(true);

			setErrorText('Please enter a question.');
			setInputValue('');
			return;
		} else {
			if (currentUser) {
				try {
					setIsLoadingInside(true);
					
					setAnswer(false);
					setAnswerData('');
					

					axios
						.post(
							`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/sources/${props.data.source_type}/${props.data.source_id
							}/question`,
							inputValue,
						)
						.then((response) => {
							
							setAnswerData(response.data);
							setIsLoadingInside(false);
						});
				} catch (error) {
					console.error(`Error fetching data: ${error}`);
					
					setIsLoadingInside(false);
				}
			} else {
				/*                 toast('You need to sign in to ask questions.', {
									icon: '❗',
									style: {
										background: "#F9F8F8"
									}
			    
								}); */
				setErrorText('You need to sign in to ask questions.');
				setInputValue('');
				setIsCleared(true);
				setinputError(true);
			}
		}
	};


	return (
		/* <div className="bg-whiteLike drop-shadow-2xl border mt-5   rounded-2xl p-5 pb-20 mb-20  mx-auto" ref={QARef}> */
		<div id="q_and_a" className={`question-answering  md:min-h-[600px] border-b overflow-auto mx-auto pt-10 pl-5 pr-5 pb-5 border border-zinc-100 dark:border-zinc-700   rounded-xl`} ref={QARef}>
			
			
			<p className="mb-4 font-light text-l text-zinc-500 dark:text-zinc-200">Chat with the content. In any language you want.</p>
			
			<div className="Md:pl-10 md:pr-10 ">

				<Toaster position="bottom-center" />


				{/* <p className="text-zinc-600 dark:text-zinc-200  pb-7">Navigate the content by asking real questions and getting AI-generated acccurate answers. </p> */}
				<div className="flex items-center pl-1 pr-1">
					{/*                     <select className=" p-5 rounded-lg w-3/6 mx-auto bg-zinc-100 z-10 inline-flex items-center py-4 px-4 text-md font-medium text-center text-zinc-500 placeholder:text-zinc-90  border border-zinc-200 dark:border-zinc-700 placeholder:italic rounded-lg focus:outline-none">

                        <option onClick={handleOptionClear}> Questions we already answered</option>

                        {Object.keys(props.key_qa).map((item, index) =>
                            <option value={optionValue} key={index} onClick={handleBaseQA} className="font-sans cursor-pointer mt-2  text-md font-base text-gray-800 bg-gray100 border border-gray-200 rounded-lg">
                                {item}</option>
                        )
                        }


                    </select> */}

					<div className="relative w-full ">

{/* 
						<input
							value={inputValue}
							onClick={() => handleClick(true)}
							onChange={(event) => setInputValue(event.target.value)}
							onKeyDown={handleKeyDown}
							title={inputValue}
							type="text"
							id="search"
							className={` block w-full  p-3 pr-10 text-sm text-zinc-500 dark:text-zinc-200 placeholder:text-zinc-90   ${inputError && inputValue.length === 0
								? 'border-1 border-r-0 border-red-300  focus:outline-none focus:border-red-300 focus:ring-0'
								: 'border border-zinc-200 border-r-0  dark:border-zinc-700  dark:border-r-0 focus:outline-none focus:border-zinc-200 focus:border-r-0 dark:focus:border-zinc-700 dark:focus:ring-0 focus:ring-zinc-200 focus:ring-0	'
								} placeholder:italic dark:placeholder:text-zinc-500 placeholder:text-zinc-400 rounded-l-full bg-zinc-50 dark:bg-darkMode `}
							placeholder="Ask anything to the transcript..."
							autoComplete="off"
							required
						/> */}

<input 
							value={inputValue}
							onClick={() => handleClick(true)}
							onChange={(event) => setInputValue(event.target.value)}
							onKeyDown={handleKeyDown}
							title={inputValue}
							type="text"
							id="search"
							placeholder="Ask anything to the transcript..."
							className="pr-10 placeholder:italic peer w-full h-full bg-white dark:bg-mildDarkMode dark:border-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border border border-zinc-200 focus:border text-sm px-3 py-2.5 rounded-[7px] focus:border-green-400 dark:focus:border-green-400"/>
							{/* <label class="text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-000 before:border-green-400 peer-focus:before:!border-blue-000 after:border-green-400 peer-focus:after:!border-blue-000">Search our database...</label> */}
							


						{inputValue.length > 0 ? (
							<div
								onClick={handleClear}
								className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 "
							>
								<svg
									width="20"
									onClick={handleClear}

									className="cursor-pointer"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 18L18 6M6 6l12 12"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
							</div>
						) : null}
					</div>

					{window.innerWidth>420 

					&&

					<Button type="submit"
					ref={buttonRef}
					onClick={fetchData}
					
							 className={`bg-green-400 text-[15px] ml-2 lg:ml-4 ${isLoadingInside ? "opacity-50 pointer-events-none":""}`}>
								
{isLoadingInside ? <Spinner className="h-4 w-4"/>:
					<svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
						}
						</Button>}

				</div>
				{inputError && inputValue.length === 0 ? (
					<div>
						<span className="text-sm ml-2 text-red-400">{errorText}</span>
					</div>
				) : null}



				<div className="mt-10">
					
					{isCleared && !isLoadingInside && answerData.length === 0 ? (
						<div>

							<p className="mb-5 underline text-l font-normal text-zinc-500 dark:text-zinc-200">
								{' '}
								Questions by Alphy
							</p>
							{Object.keys(props.key_qa).map((item, index) => (
									<div id="accordion-flush"  data-active-classes="bg-zinc-50 dark:bg-darkMode text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
										<h2 id="accordion-flush-heading-1">
											<button onClick={(event) => handleBaseQAaccordion(event,index,item)} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 text-md sm:text-l	" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
											<span>{item}</span>
											<svg data-accordion-icon class={`w-6 h-6 ${index==collapseIndex && collapseIndex!=-1 ? "rotate-180": ""} shrink-0`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
											</button>
										</h2>
								<div class={index==collapseIndex && collapseIndex!=-1 ? "": "hidden"} aria-labelledby="accordion-flush-heading-1">
										<div class="py-5 border-b border-gray-200 dark:border-gray-700">
										<div className="flex flex-row justify-end text-slate-400">
											
												<svg onClick={handleShareLink} className="cursor-pointer flex flex-row" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<title className="font-bold">Share link to question</title>
													<path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round"></path>
												</svg>
												<svg onClick={handleCopyToClipboard} className="cursor-pointer flex flex-row" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<title className="font-bold">Copy to clipboard</title>
													<path d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" strokeLinecap="round" strokeLinejoin="round"></path>
												</svg>
											</div>
											<div>
												<div>
											<p id="answer-area" className="answer-area text-zinc-700 dark:text-zinc-300 font-normal text-md sm:text-l" dangerouslySetInnerHTML={{ __html: props.key_qa[item].answer }} />
											</div>
									
											
											</div>
								
								<div className="col-span-1 justify-end flex flex-row flex ">
										
							<button
									className={`cursor-pointer justify-end mt-10 mx-auto flex`}
									onClick={() => setBaseSources(!baseSources)}
								>
									<span className={`${baseSources ? 'hidden' : 'block'} text-zinc-600 dark:text-zinc-200 text-l pr-1`}>
										See sources from the {props.data.source_type=="yt"?"video":"recording"}{' '}
									</span>
									<svg
										className={`${baseSources ? 'hidden' : 'block'} `}
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										width="30px"
									>
										<path
											clipRule="evenodd"
											d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
											fillRule="evenodd"
										></path>
									</svg>
								</button>

								{baseSources ? (
									<div className="mt-10">
										<div>
											<h1 className="mb-4 text-xl font-normal"> Sources from the video sorted by relevance</h1>

											{props.key_qa[item]
												? props.key_qa[item].sources.map((source, index) => (
													<p key={index}>

														{source.start && source.end ? (
															window.innerWidth > 999 && props.data.source_type == "yt" ?
																<a onClick={updateVariable} className="underline cursor-pointer">
																	

																	{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}` : `${Math.floor((source.start / 3600))}`}
																	{":"}
																	{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : Math.floor(source.start%3600)<600 ? `0${(Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}`:Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60)}
																	{":"}
																	{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))}

																	{" - "}
																	
																	{Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}` : `${Math.floor((source.end / 3600))}`}
																	{":"}
																	{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : Math.floor(source.end%3600)<600 ? `0${(Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60))}`:Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60)}
																	{":"}
																	{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
																</a> : <a target="_blank" href={`https://youtu.be/${props.data.source_id}?t=${Math.floor(source.start)}`} className="underline">

																	{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}:` : `${Math.floor((source.start / 3600))}:`}{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : (Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}:{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))} - {Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}:` : `${Math.floor((source.end / 3600))}:`}{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : (Math.floor(source.end / 60 - Math.floor(source.end / 3600) * 60))}:{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
																</a>
														) : 
														window.innerWidth > 999 && props.data.source_type == "yt" ?
																<a onClick={updateVariable} className="underline cursor-pointer">00:00:00</a>
															:
															<a target="_blank" href={`https://youtu.be/${props.data.source_id}?t=0`} className="underline">00:00:00</a>
															}


														<br /> <br /> {source.text[0] === source.text[0].toUpperCase() ? "" : "..."}{source.text}{((source.text[source.text.length - 1] === "." || source.text.substring(source.text.length - 1) === "?") || (source.text[source.text.length - 1] === ",") || (source.text[source.text.length - 1] === "!") || (source.text[source.text.length - 1] === ":") || (source.text[source.text.length - 1] === "...")) ? "" : "..."} <br /> <br />{' '}

													</p>
												))
												: null}
										</div>
										<button
											className={`cursor-pointer  justify-end  mt-10 mx-auto flex`}
											onClick={() => {
												setBaseSources(!baseSources);
												QARef.current.scrollIntoView({ behavior: 'smooth' });
											}}
										>
											<span className="text-zinc-600 dark:text-zinc-200 text-l pr-1">See less</span>
											<svg
												className=""
												aria-hidden="true"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												width="30px"
											>
												<path
													clipRule="evenodd"
													d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
													fillRule="evenodd"
												></path>
											</svg>{' '}
										</button>{' '}
									</div>
								) : null}
										</div>
										
											
											</div>
										</div>
									</div>))}

							{/* {Object.keys(props.key_qa).map((item, index) => (

								index % 2 == 0 ? <button
									key={index}
									onClick={handleBaseQA}
									className="font-sans mt-2 cursor-pointer px-5   py-3 text-md font-base text-zinc-600 dark:text-zinc-200  dark:bg-zinc-700 bg-zinc-100 border border-gray-200 dark:border-zinc-600 rounded-full"
								>
									{item}
								</button> : <button
									key={index}
									onClick={handleBaseQA}
									className="font-sans mt-2 cursor-pointer px-5   py-3 text-md font-base text-zinc-600 dark:text-zinc-200  bg-zinc-50 dark:bg-mildDarkMode border border-gray-200 dark:border-zinc-600 rounded-full"
								>
									{item}
								</button>
							))} */}
						</div>
					) : null}
				</div>
				{isLoadingInside && !showBaseQA ? (
					<div
						className="loading mt-5 mb-10"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '20vh',
						}}
					>

{/* <ReactLoading type="balls" color="#a1a1aa" width={50}/> */}
<TypeIt className="mb-3 text-zinc-400 dark:text-zinc-500"
				getBeforeInit={(instance) => {
					instance.type("Going through the recording to answer your question...").pause(1200).delete(100).pause(200).type("Gathering up the relevant sources...").pause(1200).delete(100).pause(500).type("Creating a network of information to find the best paperclips in the world...").pause(800).delete(40).pause(700).type("help you get the answer as quickly as possible!").pause(600);

					// Remember to return it!
					return instance;
				}}

										options={{
											loop: true,
											html: true,
											speed: 10,
											cursorChar: "",
										}}
									/>
					</div>
				) : (
					<div> </div>
				)}





				{answerData.length !== 0 && !showBaseQA && showUserQA ? (
					<div className="text-zinc-600 dark:text-zinc-200 pb-10">
						{answerData.answer ? (
							<div  >
								<div className="grid grid-cols-2 flex flex-row mb-4">


									<h1 className="text-xl col-span-1 flex flex-row font-normal">Answer from Alphy


										<svg onClick={handleClear} className="ml-2 mt-1 cursor-pointer" width="20px" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
											<title className="font-bold">Clear</title>
											<path clipRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" fillRule="evenodd"></path>
										</svg>


									</h1>
									<div className="col-span-1 justify-end flex flex-row flex ">

										<svg onClick={handleShareLink} className="cursor-pointer" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<title className="font-bold">Share link to question</title>
											<path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round"></path>
										</svg>

										<svg onClick={handleCopyToClipboard} title="Copy question and answer" className="cursor-pointer" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" strokeLinecap="round" strokeLinejoin="round"></path>
										</svg>
									</div>

								

							







								
								</div>
								<div id="answer-area" className="answer-area text-md sm:text-l container">
									<TypeIt className="mb-3"

										options={{
											strings: answerData.answer.split('\n'),
											html: true,
											speed: 0.1,
											cursorChar: "",
										}}
									/>

									{/* <p dangerouslySetInnerHTML={{ __html: answerData.answer.split('\n') }}></p> */}
								</div>

								<button
									className={`cursor-pointer justify-end mt-10 mx-auto flex`}
									onClick={() => setAnswer(!answer)}
								>
									<span className={`${answer ? 'hidden' : 'block'} text-zinc-600 dark:text-zinc-200 text-l pr-1`}>
									See sources from the {props.data.source_type=="yt"?"video":"recording"}{' '}
									</span>
									<svg
										className={`${answer ? 'hidden' : 'block'} `}
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										width="30px"
									>
										<path
											clipRule="evenodd"
											d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
											fillRule="evenodd"
										></path>
									</svg>
								</button>

								{answer ? (
									<div>
										<div>
											<h1 className="mb-4 text-xl font-normal md:mb-8"> Sources from the video sorted by relevance:</h1>

											{answerData.sources.map((source, index) => (
												<div>

													{source.start && source.end ? (
														window.innerWidth > 999 && props.data.source_type == "yt" ?
															<a onClick={updateVariable} className="underline cursor-pointer">

																{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}:` : `${Math.floor((source.start / 3600))}:`}{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : (Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}:{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))} - {Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}:` : `${Math.floor((source.end / 3600))}:`}{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : (Math.floor(source.end / 60 - Math.floor(source.end / 3600) * 60))}:{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
															</a> : <a target="_blank" href={`https://youtu.be/${props.data.source_id}?t=${Math.floor(source.start)}`} className="underline">

																{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}:` : `${Math.floor((source.start / 3600))}:`}{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : (Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}:{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))} - {Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}:` : `${Math.floor((source.end / 3600))}:`}{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : (Math.floor(source.end / 60 - Math.floor(source.end / 3600) * 60))}:{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
															</a>
													) : null}
													{/* 	<div className="mb-5">
														{(index === 0) ? <a className="text-blue-900 font-bold underline cursor-pointer mb-5">{source_timestamp1} </a> : null}

														{(index === 1) ? <a className="text-blue-900 font-bold underline cursor-pointer mb-5">{source_timestamp2} </a> : null}

														{(index === 2) ? <a className="text-blue-900 font-bold underline cursor-pointer mb-5">{source_timestamp3} </a> : null}

													</div> */}


													<p className="mt-5" key={index}>
														{source.text[0] === source.text[0].toUpperCase() ? "" : "..."}
														{source.text}
														{((source.text[source.text.length - 1] === "." || source.text.substring(source.text.length - 1) === "?") || (source.text[source.text.length - 1] === ",") || (source.text[source.text.length - 1] === "!") || (source.text[source.text.length - 1] === ":") || (source.text[source.text.length - 1] === "...")) ? "" : "..."} <br /> <br />{' '}
													</p>
												</div>
											))}
										</div>
										<button
											className={`cursor-pointer  justify-end  mt-10 mx-auto flex`}
											onClick={() => setAnswer(!answer)}
										>
											<span
												className={`${answer ? 'block' : 'hidden'} text-zinc-600 dark:text-zinc-200 text-l pr-1`}
											>
												See less
											</span>
											<svg
												className=""
												aria-hidden="true"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												width="30px"
											>
												<path
													clipRule="evenodd"
													d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
													fillRule="evenodd"
												></path>
											</svg>{' '}
										</button>{' '}
									</div>
								) : null}
							</div>
						) : (
							<div>
								<p className="text-whiteLike flex mx-auto justify-center  text-xl">
									It seems like the content doesn't have an answer for this query. Try another one!
								</p>
							</div>
						)}
					</div>
				) : null}

				{showBaseQA ? (
					<div className="text-zinc-600 dark:text-zinc-200 pb-10">
						{

							<div className={`${clicked ? "animate-highlight animate-delay-1000" : ""}`}>
								<div >
									<div className={`grid grid-cols-2 flex flex-row mb-4 `}>

										<h1 className="text-xl col-span-1 flex flex-row font-normal">Answer from Alphy

											<svg onClick={handleClear} className="ml-2 mt-1 cursor-pointer" width="20px" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
												<title className="font-bold">Clear</title>
												<path clipRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" fillRule="evenodd"></path>
											</svg>


										</h1>
										<div className="col-span-1 justify-end flex flex-row flex ">


											<svg onClick={handleShareLink} className="cursor-pointer" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<title className="font-bold">Share link to question</title>
												<path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round"></path>
											</svg>
											<svg onClick={handleCopyToClipboard} className="cursor-pointer" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<title className="font-bold">Copy to clipboard</title>
												<path d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" strokeLinecap="round" strokeLinejoin="round"></path>
											</svg>
										</div>
									</div>
									<p id="answer-area" className="answer-area text-sm md:text-md" dangerouslySetInnerHTML={{ __html: props.key_qa[baseQuestion].answer }} />
								</div>

								<button
									className={`cursor-pointer justify-end mt-10 mx-auto flex`}
									onClick={() => setBaseSources(!baseSources)}
								>
									<span className={`${baseSources ? 'hidden' : 'block'} text-zinc-600 dark:text-zinc-200 text-l pr-1`}>
										See sources from the video sorted by relevance{' '}
									</span>
									<svg
										className={`${baseSources ? 'hidden' : 'block'} `}
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										width="30px"
									>
										<path
											clipRule="evenodd"
											d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
											fillRule="evenodd"
										></path>
									</svg>
								</button>

								{baseSources ? (
									<div>
										<div>
											<h1 className="mb-4 text-xl font-normal"> Sources from the video</h1>

											{props.key_qa[baseQuestion]
												? props.key_qa[baseQuestion].sources.map((source, index) => (
													<p key={index}>

														{source.start && source.end ? (
															window.innerWidth > 999 && props.data.source_type == "yt" ?
																<a onClick={updateVariable} className="underline cursor-pointer">
																	

																	{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}` : `${Math.floor((source.start / 3600))}`}
																	{":"}
																	{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : Math.floor(source.start%3600)<600 ? `0${(Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}`:Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60)}
																	{":"}
																	{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))}

																	{" - "}
																	
																	{Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}` : `${Math.floor((source.end / 3600))}`}
																	{":"}
																	{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : Math.floor(source.end%3600)<600 ? `0${(Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60))}`:Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60)}
																	{":"}
																	{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
																</a> : <a target="_blank" href={`https://youtu.be/${props.data.source_id}?t=${Math.floor(source.start)}`} className="underline">

																	{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}:` : `${Math.floor((source.start / 3600))}:`}{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : (Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}:{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))} - {Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}:` : `${Math.floor((source.end / 3600))}:`}{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : (Math.floor(source.end / 60 - Math.floor(source.end / 3600) * 60))}:{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
																</a>
														) : 
														window.innerWidth > 999 && props.data.source_type == "yt" ?
																<a onClick={updateVariable} className="underline cursor-pointer">00:00:00</a>
															:
															<a target="_blank" href={`https://youtu.be/${props.data.source_id}?t=0`} className="underline">00:00:00</a>
															}



														<br /> <br /> {source.text[0] === source.text[0].toUpperCase() ? "" : "..."}{source.text}{((source.text[source.text.length - 1] === "." || source.text.substring(source.text.length - 1) === "?") || (source.text[source.text.length - 1] === ",") || (source.text[source.text.length - 1] === "!") || (source.text[source.text.length - 1] === ":") || (source.text[source.text.length - 1] === "...")) ? "" : "..."} <br /> <br />{' '}

													</p>
												))
												: null}
										</div>
										<button
											className={`cursor-pointer  justify-end  mt-10 mx-auto flex`}
											onClick={() => {
												setBaseSources(!baseSources);
												QARef.current.scrollIntoView({ behavior: 'smooth' });
											}}
										>
											<span className="text-zinc-600 dark:text-zinc-200 text-l pr-1">See less</span>
											<svg
												className=""
												aria-hidden="true"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												width="30px"
											>
												<path
													clipRule="evenodd"
													d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
													fillRule="evenodd"
												></path>
											</svg>{' '}
										</button>{' '}
									</div>
								) : null}
							</div>
						}
					</div>
				) : null}
			</div>
		</div>
	);
}
