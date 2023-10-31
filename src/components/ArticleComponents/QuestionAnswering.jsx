//import usestate
import React, { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useLocation } from 'react-router-dom';
import { Button, Spinner } from "@material-tailwind/react";
import SourceCardForDetail from './SourceCardForDetail';
import {initializeQaWsManager}  from './QA_Streaming';
import QaWsManager from './QaWsManager';
import { API_HOST, API_SSL } from '../../constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DataArrayIcon from '@mui/icons-material/DataArray';
import BaseQuestions from './BaseQuestions';
import QuestionLoading from './QuestionLoading';
import DynamicQA from './DynamicQA';


export default function QuestionAnswering(props) {

	
	const QARef = useRef(null);
	const location = useLocation();
	let sentences
    let groupedText
	const [collapseIndex, setCollapseIndex] = useState(0);

	const [answerData, setAnswerData] = useState({ answer: '', sources: [] });
	const [isLoadingInside, setIsLoadingInside] = useState(false);
	const [answer, setAnswer] = useState(false);
	const [showSource, setShowSource] = useState(-1)
	const [showBaseQA, setShowBaseQA] = useState(false);
	const [baseSources, setBaseSources] = useState(false);
	const [baseQuestion, setBaseQuestion] = useState('');
	const [isCleared, setIsCleared] = useState(true);
	const [showUserQA, setShowUserQA] = useState(false);
	const [inputError, setinputError] = useState(false);
	const [errorText, setErrorText] = useState('');
	const { currentUser } = useAuth();
	const [clicked, setClicked] = useState(false);
	const [triggerWs, setTriggerWs] = useState(false);
	const [singleSource,setSingleSource] = useState(false)

	
	const numberOfAreas = 5;
	const areaRefs = useRef(Array.from({ length: numberOfAreas }, () => createRef()));
	const [highlightIndex, setHighlightIndex] = useState(null);



	

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
				//props.setInputValue(decodedText)
				setClicked(true)

			}

			else {
				props.setInputValue(decodedText);
				
				setClicked(true);
				setTimeout(() => {
					if (props.buttonRef.current) {
				
					props.buttonRef.current.click();

					}
				}, 1000);
			}

		}
	}


	const handleClear = () => {
		setAnswerData({ answer: '', sources: [] });	
		setIsCleared(true);
		setIsLoadingInside(false)
		setShowBaseQA(false);
		setShowUserQA(false);
		props.setInputValue('');
		setinputError(false);
		
		
	};

	
	  
	  // Sample usage:



	const handleBaseQA = (event) => {
		setIsCleared(false);
		setShowBaseQA(true);
		props.setInputValue(event.target.textContent);
		setBaseQuestion(event.target.textContent);
		QARef.current.scrollIntoView({ behavior: 'smooth' });
	};


	const handleBaseQAaccordion = (event, index, item) => {


		if (collapseIndex === index) {
			setCollapseIndex(-1)
			return
		}
		else {
			setCollapseIndex(index)
		}

		// setIsCleared(false);
		/* setShowBaseQA(true); */
		// props.setInputValue(event.target.textContent);
		setBaseQuestion(item);
		QARef.current.scrollIntoView({ behavior: 'smooth' });
	};
	const handleOptionClear = () => {
		setShowBaseQA(false);
		props.setInputValue('');
	};

		

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			fetchData()
		}
	};


	

	
	const handleShareLink = () => {
		const encodedText = encodeURIComponent(props.inputValue.length>0 ? props.inputValue : baseQuestion);

		const url = `${window.location.origin}${location.pathname.split('&q=')[0]}&q=${encodedText}`;
		navigator.clipboard.writeText(url);
		toast.success('Link copied to clipboard!');
	};
	const handleCopyToClipboard = () => {
		let question
		if (baseQuestion) {
			question = baseQuestion
		}
		else {
			question = props.inputValue
		}
		const myHtml = document.getElementById("answer-area");
		const plainText = `${question} \n\n ${myHtml.innerText}`
		navigator.clipboard.writeText(plainText);
		toast.success('Answer copied to clipboard!');
	};

	const formatAnswer = (answer, answerData) => {
		const cleanedText = answer.replace(/\r?\n|\r/g, ' ');
		const regexPattern = /\]\./g;    
		const replaceEverySecondOccurrence = (text, pattern, replacement) => {
		  let count = 0;
		  return text.replace(new RegExp(pattern, 'g'), (match) => {
			count++;
			return count % 2 === 0 ? match.replace(pattern, replacement) : match;
		  });
		};
		const formattedRawAnswer = replaceEverySecondOccurrence(cleanedText,regexPattern,"].\n\n")
		const parts = formattedRawAnswer.split(/\[(\d+)\]/g);

		return parts.map((part, index) => {
		  if (answerData.sources.hasOwnProperty(part-1)) {

			return (
				<div className="relative inline-flex  group "> 
					<span key={index} className="underline text-xs text-green-300 cursor-pointer" onClick={() => handleShowSingleSource(part)}>
						[{part}]
			  		</span>
			  	</div>
				);
		  }
		  return part;
		});
	  };




	  const handleShowSingleSource = (sourceNumber) => {
		setSingleSource(true)
		setAnswer(true)
		setBaseSources(true)
		setShowSource(parseInt(sourceNumber, 10));
		setTimeout (() => {
		handleScroll(sourceNumber-1)
		} , 300)
	
	};





		const handleScroll = (index) => {
				const targetRef = areaRefs.current[index];

				const executeScroll = () => {
					targetRef.current.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "start",
					});
				};

				executeScroll();
				setHighlightIndex(index);

				setTimeout(() => {
					setHighlightIndex(null);
				}, 1000);
};




	const handleShowAllSources = () => {


		if(singleSource===true && (answer===true || baseSources===true)){
			
			setSingleSource(false)
			
		}

		if(singleSource===false){
			setAnswer(!answer)
			setBaseSources(!baseSources)
		}
	}

	const fetchData = () => {
		toast.dismiss();
		
		setShowBaseQA(false);
		setShowUserQA(true);
		setinputError(false);
		setIsCleared(false)

		let selectionInput
		if (props.selectionPrompt === "simple"){
			selectionInput = "Explain '" + props.inputValue + "' like I'm five"
		}
		else if (props.selectionPrompt==="advanced"){
			selectionInput ="Explain '" + props.inputValue + "' like I'm an expert and give as much detail as possible"
		}
		else if(props.selectionPrompt==="normal"){
			selectionInput = props.inputValue
		}


		if (props.inputValue.length > 200) {
			setinputError(true);
			setErrorText('Your question is too long, please keep it under 200 characters.');
			props.setInputValue('');
			return;
		} else if (props.inputValue.length === 0) {
			setinputError(true);

			setErrorText('Please enter a question.');
			props.setInputValue('');
			return;
		} else {
			if (currentUser) {
				try {
					setIsLoadingInside(true);
					setAnswer(false);
					setAnswerData({ answer: '', sources: [] });

				setTriggerWs(true)			
				const wsManager = new QaWsManager({
					apiInfo: {
						apiHost: API_HOST,
						ssl: API_SSL,
					},
					callbacks: {
					  setSources: (sources) => {
						setIsLoadingInside(false)
					 
						setAnswerData((prevData) => ({
						  ...prevData,
						  sources: sources,
						}));
						
					  },



					  setAnswer: (answer) => {
						setIsLoadingInside(false)

				

					 
						setAnswerData((prevData) => ({
						  ...prevData,
						  answer: answer,
						}));
						
					  },
					  onError: (reason) => {
						console.error(`Error in main: ${reason}`);
					  }
					},
					question:props.inputValue,
					source:{source_type:props.data.source_type, source_id:props.data.source_id},
					idToken:currentUser.accessToken
				  });

				  setTimeout(() => {
					wsManager.close();
				}, 20000);


				
			
				} catch (error) {
					console.error(`Error fetching data: ${error}`);
					props.setSelectionCall(false)

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
				props.setInputValue('');
				setIsCleared(true);
				setinputError(true);
				props.setSelectionCall(false)
			}
		}
	};



	const handleLength = (text) => {
		const sentenceRegex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/;
        sentences = text.split(sentenceRegex);
        const groups = sentences.reduce((acc, sentence, index) => {
            const groupIndex = Math.floor(index / 2);
            if (!acc[groupIndex]) {
                acc[groupIndex] = [];
            }
            acc[groupIndex].push(sentence);
            return acc;
        }, []);
        const groupedSentences = groups.map(group => group.join(' '));
        groupedText = groupedSentences.join('<br/> <br/>');
        groupedText = `${groupedText[0] === groupedText[0].toUpperCase() ? "" : "..."}${groupedText}${((groupedText[groupedText.length - 1] === "." || groupedText.substring(groupedText.length - 1) === "?") || (groupedText[groupedText.length - 1] === ",") || (groupedText[groupedText.length - 1] === "!") || (groupedText[groupedText.length - 1] === ":") || (groupedText[groupedText.length - 1] === "...")) ? "" : "..."}`


		return groupedText
	}


	
	return (
		/* <div className="bg-whiteLike drop-shadow-2xl border mt-5   rounded-2xl p-5 pb-20 mb-20  mx-auto" ref={QARef}> */
		<div id="q_and_a" className={` md:min-h-[600px] lg:w-[800px] xl:w-[500px] 2xl:w-[500px] 3xl:w-full bg-white drop-shadow-sm dark:bg-mildDarkMode border-b overflow-auto mx-auto pt-10 pl-5 pr-5 pb-5 border border-zinc-100 dark:border-zinc-700   rounded-xl`} ref={QARef}>

		


			<p className="mb-4 font-light_ text-l text-zinc-500 dark:text-zinc-200">Chat with the content. In any language you want</p>

			<div className="Md:pl-10 md:pr-10 ">

				<Toaster position="bottom-center" />


				
				<div className="flex flex-row items-center pl-1 pr-1">
				

						<div className="flex flex-row drop-shadow-md w-full flex-grow relative dark:bg-zinc-800  border border-black/10   dark:text-white rounded-xl dark:rounded-xl gizmo:rounded-2xl shadow-xs dark:shadow-xs dark:bg-zinc-700 bg-white">

							
							<input
								ref={props.inputRef}
								value={props.inputValue}
								
								onChange={(event) => props.setInputValue(event.target.value)}
								onKeyDown={handleKeyDown}
								title={props.inputValue}
								type="text"
								id="questionAnswering"
								placeholder="Ask anything to the transcript..."
								className="m-0 w-full  text-zinc-700 dark:text-zinc-300 dark:placeholder:text-zinc-500 text-sm resize-none border-0 bg-transparent dark:bg-transparent py-[10px] pr-16 focus:ring-0 focus-visible:ring-0 md:py-4 md:pr-20 gizmo:md:py-3.5 pl-4 md:pl-[26px]" />
							{props.inputValue.length > 0 ? (
								<div
									onClick={handleClear}
									className="cursor-pointer absolute inset-y-0 right-0 flex items-center mr-10 md:mr-14 dark:text-zinc-500 text-zinc-400 "
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
{isLoadingInside  ? 

<div className="absolute md:right-3 bottom-3 md:bottom-4 right-2">
	<Spinner color="green" className="opacity-60 w-5 h-5 text-"/>
	</div>:

	<button ref={props.buttonRef} onClick={fetchData} className="absolute  rounded-md absolute p-1 rounded-md  gizmo:md:bottom-2.5 md:p-2 md:right-3 bottom-2 md:bottom-3 right-2  bg-green-200">


	<svg className="w-4 h-4 text-zinc-600 dark:text-zinc-700" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" stroke-linecap="round" stroke-linejoin="round"></path>
									</svg> 
									
						</button>}

						</div>


						
				</div>
				{inputError && props.inputValue.length === 0 ? (
					
						<span className="text-sm ml-2 text-red-400">{errorText}</span>
					
				) : null}



				<div className="mt-10">

					{(isCleared && !isLoadingInside && answerData.answer.length === 0) && (

						<BaseQuestions key_qa={props.key_qa} data={props.data} collapseIndex={collapseIndex} setCollapseIndex={setCollapseIndex} handleBaseQAaccordion={handleBaseQAaccordion}  setBaseSources = {setBaseSources} handleCopyToClipboard={handleCopyToClipboard} handleShareLink={handleShareLink} handleLength={handleLength} QARef={QARef}
						baseSources={baseSources} updateVariable={updateVariable} DataArrayIcon={DataArrayIcon} formatAnswer={formatAnswer} areaRefs={areaRefs} singleSource={singleSource}
						showSource = {showSource} handleShowAllSources = {handleShowAllSources}/>	
					) }


				</div>

				{(isLoadingInside && !showBaseQA) && (
					<QuestionLoading/>
				)}

			{answerData.answer.length !== 0 && !showBaseQA && showUserQA ? (
					/* answerData, setAnswer, answer, props, handleClear, handleShareLink, handleCopyToClipboard, formatAnswer, singleSource, showSource, updateVariable, DataArrayIcon*/ 
					<DynamicQA answerData={answerData} data={props.data} setAnswer={setAnswer} answer={answer} handleClear = {handleClear} handleShareLink={handleShareLink} handleCopyToClipboard = {handleCopyToClipboard}
					formatAnswer = {formatAnswer} singleSource={singleSource} showSource = {showSource} updateVariable = {updateVariable} DataArrayIcon = {DataArrayIcon}  handleShowAllSources={handleShowAllSources}
					areaRefs={areaRefs} highlightIndex={highlightIndex} handleLength={handleLength}/>
					
					
					
					
					) : null}




			</div>
		</div>
	);
}
