import React, { useEffect, useState, useRef } from 'react';
import QuestionAnswering from '../QuestionAnswering';
import srtParser2 from 'srt-parser-2';
import { Tab, Tabs } from 'react-bootstrap';
import Twitter from '../../../img/twitter_spaces.png';
import TwitterLogo from '../../../img/Twitter Logo Blue.svg';
import Loading from '../../Loading';
import working from './working.svg';

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { saveAs } from 'file-saver'; // library to save file as blob
import { useAuth } from "../../../hooks/useAuth"
import DownloadStatic from '../../../img/download_static.png';
import ReactMarkdown from "react-markdown";
import Box from '@mui/material/Box';	
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as Selection from 'selection-popover'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {
	Popover,
	PopoverHandler,
	PopoverContent,
	ThemeProvider,
	Button
} from "@material-tailwind/react";


export default function Content(props) {

	const trial_keywordlist=[
		"Ethereum", "Solana", "Cosmos", "convergent evolution", "Mike Ippolito", "BlockWorks", 
		"scalability trilemma", "validators", "decentralization", "MEV", "Miner Extractable Value", 
		"rollups", "bridges", "Bitcoin", "solo stakers", "full node validation", "professional node operators",
		"app chains", "super chains", "proof-of-stake", "consensus", "Atom", "Eigenlayer", 
		"blockchain trilemma", "Ethereum Roll-ups", "OP Superchains", "sequencing effect", 
		"product-market fit", "interoperability", "money", "sequencers", "Babylon", "Arbtrum", 
		"Optimism", "price discovery", "Liquidity", "Permissionless Conference", "permissionlessness", "governance"
	  ]
	  
	
	
	


	const [loading, setLoading] = useState(false);
	const [scrollUpButton, setScrollUpButton] = useState(false);
	const windowSize = useWindowSize();
	const [isLoading, setIsLoading] = useState(props.data.transcript === undefined);
	const [cautionaryTimeoutPassed, setCautionaryTimeoutPassed] = useState(false);
	const [activeTab, setActiveTab] = useState('tab1');
	const [autoplay, setAutoplay] = useState(0);
	const [timestamp, setTimestamp] = useState();
	const [showButton, setShowButton] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [basicDataLoaded, setBasicDataLoaded] = useState(false);
	const [showReportIssue, setShowReportIssue] = useState(false);
	const [showRerportIssueError, setShowReportIssueError] = useState(false);
	const [language, setLanguage] = useState(props.data.summaries !== undefined && props.data.summaries.length > 1 && props.data.lang !== undefined ? props.data.lang : 'en')
	const [translationMessage, setTranslationMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [translatingLanguage, setTranslatingLanguage] = useState("");
	const [languagesWanted, setLanguagesWanted] = useState([]);
	const [askText, setAskText] = useState("");
	const[selectionCall, setSelectionCall] = useState(false);
	const [openArchipelagoPopover,setOpenArchipelagoPopover] = useState(false);
	const [selectionPrompt, setSelectionPrompt] = useState("normal");
	const [mainPopoverOpen, setMainPopoverOpen] = useState(false);
	const [transcriptCalled, setTranscriptCalled] = useState(false);
	const [transcript, setTranscript] = useState([]);
	const [summaryArray, setSummaryArray] = useState([]);
	
	const [inputValue, setInputValue] = useState("");
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	const buttonRef = useRef(null);
	const inputRef = useRef(null);
	const contentRef = useRef(null);

	const userArchipelagoNames= props.userArchipelagos.map(item => [item.name,item.uid])
	
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {

			PaperProps: {
				style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				 backgroundColor: localStorage.getItem("theme")==="dark" ? "#1E1E1E" : "#fff",
				color: localStorage.getItem("theme")==="dark" ? "#e4e4e7" : "#3f3f46",
				outline: "none",



				
				},
			},
	};

	const data = props.data


	const title = data.title
	const inputDate = data.added_ts !== undefined ? data.added_ts.substring(0, 10) : undefined;

	let formattedDate = ""
	if (inputDate !== undefined && formattedDate.length === 0) {
		const parts = inputDate.split("-");
		formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`

	}


	let contentSummaries = []
	let languages = []
	let summary = ""



	const transcript_raw = props.data.transcript;
	const theme = localStorage.getItem("theme")

	const ref = useRef(null);
	




	


	const language_codes = {
		"__": "__",
		"af": "Afrikaans",
		"ar": "العربية",
		"hy": "Հայերեն",
		"az": "Azərbaycan dili",
		"be": "Беларуская",
		"bs": "Bosanski",
		"bg": "Български",
		"ca": "Català",
		"zh": "中文",
		"hr": "Hrvatski",
		"cs": "Čeština",
		"da": "Dansk",
		"nl": "Nederlands",
		"en": "English",
		"et": "Eesti",
		"fi": "Suomi",
		"fr": "Français",
		"gl": "Galego",
		"de": "Deutsch",
		"el": "Ελληνικά",
		"he": "עברית",
		"hi": "हिन्दी",
		"hu": "Magyar",
		"is": "Íslenska",
		"id": "Bahasa Indonesia",
		"it": "Italiano",
		"ja": "日本語",
		"kn": "ಕನ್ನಡ",
		"kk": "Қазақ",
		"ko": "한국어",
		"lv": "Latviešu",
		"lt": "Lietuvių",
		"mk": "Македонски",
		"ms": "Bahasa Melayu",
		"mr": "मराठी",
		"mi": "Māori",
		"ne": "नेपाली",
		"no": "Norsk",
		"fa": "فارسی",
		"pl": "Polski",
		"pt": "Português",
		"ro": "Română",
		"ru": "Русский",
		"sr": "Српски",
		"sk": "Slovenčina",
		"sl": "Slovenščina",
		"es": "Español",
		"sw": "Kiswahili",
		"sv": "Svenska",
		"tl": "Tagalog",
		"ta": "தமிழ்",
		"th": "ไทย",
		"tr": "Türkçe",
		"uk": "Українська",
		"ur": "اردو",
		"vi": "Tiếng Việt",
		"cy": "Cymraeg"
	}


	if ((props.data !== undefined || props.data !== null) && contentSummaries.length == 0) {
		contentSummaries = props.data.summaries


		if (contentSummaries !== undefined) {

			contentSummaries.map(summary => summary.summary !== null && languages.push(summary.lang));


			summary = contentSummaries.find(summary => summary.lang === language);

			if (summary !== undefined && summary.length > 0 && summary.summary === null) {
				setTranslationMessage(true)
				languagesWanted.push(language)
			}



		}

	}

	const reorderedLanguageCodes = {
		...languages.reduce(
			(result, code) => {
				if (language_codes.hasOwnProperty(code)) {
					result[code] = language_codes[code];
					delete language_codes[code];
				}
				return result;
			},
			{}
		),
		...language_codes
	};


	const handleLanguageChange = (event) => {
		/* 	if(errorMessage ==true || translationMessage==true)
			{
				window.location.reload();
			} */
		const selectedCode = event.target.value;
		setLanguage(selectedCode);


	};


	const requestTranslation = async () => {

		await currentUser.getIdToken().then((idToken) => {

			axios.post(
				`${process.env.REACT_APP_API_URL}/sources/${data.source_type}/${data.source_id}?lang=${language}`,
				{
					lang: language,
				},
				{
					headers: {
						'id-token': idToken,
					},
				}

			)
				.then((response) => {
					setLanguagesWanted([...languagesWanted, language])
					setTranslationMessage(true)
					setTranslatingLanguage(language)

				})
				.catch((error) => {

					setErrorMessage(true)
				}
				);

		})
	}



	
const handleBookmark = async () => {
	const changeBookmark = !props.isBookmarked
	
	await currentUser.getIdToken().then((idToken) => {
		
	axios.patch(
		`${process.env.REACT_APP_API_URL}/sources/${data.source_type}/${data.source_id}/bookmark?bookmark=${changeBookmark}`,
		{},
{
					headers: {
						'accept': 'application/json',
						'id-token': idToken	,
					}
					}
		
		).then(
			props.setIsBookmarked(!props.isBookmarked)
)


	})

	
	}

	const checkScrollPosition = () => {
		const windowHeight = ref.current.clientHeight;

		const scrollPosition = ref.current.scrollTop;

		if (scrollPosition >= 3 * windowHeight) {
			setShowButton(true);
		} else {
			setShowButton(false);
		}
	};


	const themePopover = {
		popover: {
			styles: {
				base: {
					bg: "bg-white dark:bg-mildDarkMode",
					color: "text-blue-gray-500 dark:text-zinc-200",
					border: "border-0",

				},
			},
		},
	};


	const url = window.location.href;
	const parts = url.split("/");
	const upPart = parts[3];

	setTimeout(() => {
		if (upPart === "up" && data.length === 0 && basicDataLoaded === true) {
			navigate("/404")
		}
	}, 1000);

	useEffect(() => {


		if (data != undefined && data.source_type === "up") {
			setTimeout(() => {
				setBasicDataLoaded(true);

			}
				, 2000);
		}
		else if (data != undefined) {
			setTimeout(() => {
				setBasicDataLoaded(true);
			}
				, 1000);
		}
		setTimeout(() => {


		}, 2000);

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

	const handleReportIssue = () => {
		if (showReportIssue === false) {
			if (currentUser !== null && currentUser !== undefined) {
				setShowReportIssue(true);
			}
			else {
				setShowReportIssueError(true)
			}
		}

	};

async function summaryParser(){
	if (summary !== undefined || summary !== null) {
		if (summary.summary_prettified !== undefined && summary.summary_prettified !== null) {

			setSummaryArray(summary.summary_prettified.split('\n'))
		}
		else {
			setSummaryArray(summary.summary.split('\n'))

		}
}
}

	async function transcriptParser() {
		let summaryArray = ''
		let transcript = []

console.log("hey")



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
		

		setTranscript(transcript)
		/* transcript_array = data.transcript_chunked.split("\n") */



	}


if (transcript.length === 0 && data.transcript !== null) {
		transcriptParser();
		
	}	
		

if (summaryArray.length===0){
	summaryParser();
}


	const handleDownload = (selection) => {


		setDownloading(true)
		// popover.toggle()


		// create .srt file
		setTimeout(() => {


			if (activeTab === "tab2") {
				if (selection == 1) {
					const blob = new Blob([data.transcript], { type: 'text/srt' });

					// save file as blob
					saveAs(blob, `${data.creator_name}_${title}_Subtitles.srt`);

				}
				else if (selection == 2) {
					let text = ""
					let stop = false
					for (let i = 0; i < transcript.length; i++) {
						text = text + transcript[i] + '\n\n'
						if (i === transcript.length - 1) {
							stop = true
						}

					}
					if (stop === true) {
						const blob = new Blob([text], { type: 'text/txt' });
						saveAs(blob, `${data.creator_name}_${title}_Transcript.txt`);

					}
				}

				setTimeout(() => {
					setDownloading(false)
				}, 2000)
			}

		}, 3000)


	};



	useEffect(() => {
		const handleSelection = () => {
		  const selectedText = window.getSelection().toString();
		  
		  if (selectedText.length > 0) {
		 	setAskText(selectedText)
			
			
		  } else {
			
		  }
		};
	    
		document.addEventListener('mouseup', handleSelection);
		return () => {
		  document.removeEventListener('mouseup', handleSelection);
		};
	  }, []);

	  

	const handleAskAlphy = (promptSelection) => {
		let askInput

		
		askInput = "Expand on the following: '" + askText + "?'"
		
		setInputValue(askInput)
		//setSelectionCall(true)
		
		if (inputRef.current) {
	
			setTimeout (() => {
				if(buttonRef.current) {
			buttonRef.current.click()
		}
			}, 1000)
			
		  }

			

			
		
	}

	const handleAddToArchipelago = (archipelagoUID) => {
		
		const newSource = {
			"source_id":data.source_id,
			"source_type":data.source_type, 
		}
		const neww=[...props.userArchipelagos,newSource]
		 axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${archipelagoUID}?nof_questions=10&tracks=true`).then	((response) => {
			axios.patch( `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${archipelagoUID}`, {
		"user_id": currentUser.uid,
		"sources": [...response.data.tracks,newSource],
	})
	setMainPopoverOpen(false)
	}).then(() => {

	 	
 })
	}


	
	  // Function to handle scroll and toggle visibility
	  const handleScroll = () => {
		const contentElement = document.getElementById('content');
		if (contentElement) {
		  contentElement.scrollIntoView({ behavior: 'smooth' });
		}
	  };

	  const toggleVisibility = () => {
		const bodyTextElement = document.getElementById('q_and_a');
			if (bodyTextElement) {
				const position = bodyTextElement.getBoundingClientRect();
				if (position.top < window.innerHeight && position.bottom >= 0) {
					setScrollUpButton(true);
				} else {
					setScrollUpButton(false);
				}
  }
	  };

	  useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	  }, []);

return (
		<div id="content" ref={ref} className={`md:max-w-[100vw]  scroll-smooth pb-10 md:px-10 xl:px-20 3xl:px-40  mt-5 md:mt-0 grow mx-auto overflow-x-hidden  md:pt-20 h-full lg:min-h-[100vh] lg:max-h-[100vh] overflow-y-auto`}>
			


			<div>
				<div className="grid grid-cols-3 ">
					<div className={`col-span-2 lg:col-span-3 xl:mt-0 ${transcript.length > 0 && language == summary.lang ? "xl:col-span-2" : "xl:col-span-3"}`} >
						<div className="flex flex-row ">
							<h1 className="col-span-2 mt-10 text-xl lg:max-w-[40vw] text-left lg:col-span-3  lg:text-2xl text-blueLike dark:bg-darkMode dark:text-zinc-300 font-bold">
								{data.source_type === 'up' ? title.substring(0, title.lastIndexOf('.')) : title}
							</h1>

							<div className="flex flex-row justify-end mx-auto ">
								<Popover open={mainPopoverOpen}>
									<PopoverHandler onClick={() => setMainPopoverOpen(!mainPopoverOpen)}>
										<div className="hidden lg:flex mt-8">

											<svg className="cursor-pointer text-zinc-700 dark:text-zinc-300" width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>

										</div>

									</PopoverHandler>
									<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
										<div className="">
											<div className="">
												{data.source_type === 'yt' &&
													<a target="_blank" className="flex flex-row  xl:hidden mb-5 mt-3" href={`https://www.youtube.com/watch?v=${data.source_id}`}>
														<img className="mr-1 -ml-2" src="/youtubeicon.png" width={40} />
														<p className="text-zinc-600 dark:text-zinc-300 items-center pt-1 text-center  text-md">Click to watch</p>
													</a>
												}{data.source_type === "sp" &&
													<a className="flex flex-row mb-5 mt-3" target="_blank" href={`https://twitter.com/i/spaces/${data.source_id}`}>
														<img className="mr-2 ml-1" src={TwitterLogo} width={20} />
														<p className=" items-center text-md text-zinc-600 dark:text-zinc-300">Click to listen</p>
													</a>
												}
												
												<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
												

													<Popover placement="right">
														<PopoverHandler>
														<button onClick={() => setOpenArchipelagoPopover()} className="flex flex-row text-zinc-600 dark:text-zinc-300"><AddCircleIcon className="text-greenColor"/> <p className="ml-2">Add To Arc</p></button>
														</PopoverHandler>
														<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
											
													
													{userArchipelagoNames.map(item => 
														
																	<MenuItem onClick={() => handleAddToArchipelago(item[1])} className="text-zinc-700 dark:text-zinc-200"  value={item}>
																		<p>{item[0]}</p> 
																	</MenuItem>
																
														

																)}

														</PopoverContent>
													</Popover>


												<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 mt-5"></div>
												<div className="flex flex-row mb-5 items-center hover:opacity-80 dark:hover:opacity-80 ">

													<p onClick={handleBookmark} className="text-center items-center flex text-zinc-700 dark:text-zinc-200 opacity-80 cursor-pointer">
														
														{currentUser && props.isBookmarked && (currentUser && data && data.submitter_id!==currentUser.uid) &&
														<BookmarkRemoveIcon/>
}
														{props.isBookmarked===false &&  (currentUser && data && data.submitter_id!==currentUser.uid)  &&
														<BookmarkAddIcon/>}
	
	{currentUser && props.isBookmarked ===true && (currentUser && data && data.submitter_id!==currentUser.uid) && <span className="ml-2">Remove Bookmark</span>}
	{currentUser && props.isBookmarked===false &&  (currentUser && data && data.submitter_id!==currentUser.uid)  &&  <span className="ml-2">Add To Bookmarks</span>}
	</p>
												</div>
												{ (currentUser && data && data.submitter_id!==currentUser.uid) &&
											<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>}

							
											</div>
											<p className="mb-2 text-zinc-700 dark:text-zinc-300">Choose Language</p>
											
											<Box sx={{minWidth: 200}} className="">
												<FormControl  className="w-full text-zinc-200 dark:text-zinc-700 " size="small">
													
													<Select
													sx={{
														border: "1px solid #e2e8f0",
														
													}}
													value={language}
													onChange={handleLanguageChange}
													displayEmpty
													MenuProps={MenuProps}
													className="text-zinc-700 dark:text-zinc-200"
													>
													
													{Object.entries(reorderedLanguageCodes).map(([code, name], index) => (

(language === code ?
	<MenuItem className="text-zinc-700 dark:text-zinc-200" key={code} value={code}>
		{name}
	</MenuItem>
	:


	(index === languages.length
		?
		<div class=" border-t mt-2 mb-4 border-gray-100 dark:border-zinc-700 mx-auto items-center flex  dark:opacity-40 text-zinc-700 dark:text-zinc-200"></div>
		:
		<MenuItem className={`${languages.includes(code) ? "" : "text-gray-300 dark:text-gray-500"}`} key={code} value={code}>
			{name}
		</MenuItem>

	)

)

))}


													</Select>
													
												</FormControl>
												</Box>

											<div className="mt-5">
												<div class="border-b border-gray-100 mx-auto items-center flex dark:opacity-40"></div>
												
											</div>

											<Popover className="">

												<PopoverHandler>

													<button className=" bg-none text-sm text-zinc-700 dark:text-zinc-200 flex  mt-5 pt-1 opacity-70" onClick={handleReportIssue}>

														<svg className="w-5 h-5 pr-1 " aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
															<path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" stroke-linecap="round" stroke-linejoin="round"></path>
														</svg><p className="text-left">Report an issue</p>

													</button>
												</PopoverHandler>
												<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500">
													{currentUser ?
														<div>

															<iframe className="h-[600px] dark:hidden md:h-[640px] min-w-[350px]" src={`https://tally.so/embed/wve4d8?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}></iframe>
															<iframe className="h-[600px] hidden dark:block md:h-[640px] min-w-[350px]" src={`https://tally.so/embed/wMNL70?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`} ></iframe>
														</div> :
														<p className="dark:text-zinc-200">Please <a className="text-greenColor underline" href="/u/login">sign in </a>to access the form.</p>}
												</PopoverContent>
											</Popover>
										</div>
									</PopoverContent>
								</Popover>
								
							</div>
						</div>
						<div className="col-span-2   grid grid-cols-2 flex flex-row">
							<div className="col-span-1">

								<h2 className="mt-5 text-l text-left lg:col-span-3 lg:mt-5 lg:text-xl text-blueLike dark:bg-darkMode dark:text-zinc-300 font-light_ flex flex-row">

									{data.source_type !== "up" && data.creator_name}
									{data.source_type === "up" && `Private Content - ${formattedDate}`}



								</h2>
								

							</div>
						</div>
						<p className="w-full mt-5 border border-zinc-100 dark:border-zinc-700"></p>
		
					</div>

					<div className="flex flex-col mt-5 ml-2 items-center cursor-pointer lg:hidden ">


						<Popover >
							<PopoverHandler>
								<div className="lg:hidden mt-5">

									<svg width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path>
									</svg>

								</div>

							</PopoverHandler>
							<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
								<div	>
									{data.source_type === 'yt' &&
										<a target="_blank" className="flex flex-row mb-3" href={`https://www.youtube.com/watch?v=${data.source_id}`}>
											<img className="-ml-2" src="/youtubeicon.png" width={40} />
														<p className="text-zinc-600 dark:text-zinc-300 items-center pt-1 text-center text-md ">Click to watch</p>
										</a>
									}{data.source_type === "sp" &&
										<a className="flex flex-row mb-5 mt-3  " target="_blank" href={`https://twitter.com/i/spaces/${data.source_id}`}>
											<img className="ml-1" src={TwitterLogo} width={20} />
											<p className=" text-zinc-600 dark:text-zinc-300 opacity-80 items-center text-md">Click to listen</p>
										</a>
									}
										<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
												

												<Popover placement="right">
													<PopoverHandler>
													<button onClick={() => setOpenArchipelagoPopover()} className="flex flex-row text-zinc-600 dark:text-zinc-300"><AddCircleIcon className="text-greenColor"/> <p className="ml-2">Add To Arc</p></button>
													</PopoverHandler>
													<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
										
												
												{userArchipelagoNames.map(item => 
													
																<MenuItem onClick={() => handleAddToArchipelago(item[1])} className="text-zinc-700 dark:text-zinc-200"  value={item}>
																	<p>{item[0]}</p> 
																</MenuItem>
															
													

															)}

													</PopoverContent>
												</Popover>

												<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mt-5 mb-5 dark:opacity-40"></div>
									
									{(currentUser && data && data.submitter_id!==currentUser.uid) &&
									<div className="flex flex-row mb-5 items-center hover:opacity-80 dark:hover:opacity-80 ">

													<p onClick={handleBookmark} className="text-center items-center flex text-zinc-700 dark:text-zinc-200 opacity-80 cursor-pointer">
														
														{
														currentUser && props.isBookmarked && (currentUser && data && data.submitter_id!==currentUser.uid) &&
														<BookmarkRemoveIcon/>}
														{props.isBookmarked===false &&  (currentUser && data && data.submitter_id!==currentUser.uid)  &&
														
														<BookmarkAddIcon/>
														}
	
	{currentUser && props.isBookmarked ===true &&  <span className="ml-2">Remove Bookmark</span>}
	{currentUser && props.isBookmarked===false &&    <span className="ml-2">Add Bookmark</span>}
	</p>
												</div>
												}
												{ (currentUser && data && data.submitter_id!==currentUser.uid) ?
											<div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>:null}
									
										<p className="mb-2 text-zinc-700 dark:text-zinc-200 opacity-80">Choose Language</p>
									
										<Box sx={{minWidth: 200}} className="">
												<FormControl  className="w-full text-zinc-200 dark:text-zinc-700 " size="small">
													
													<Select
													value={language}
													onChange={handleLanguageChange}
													displayEmpty
													MenuProps={MenuProps}
													className="text-zinc-700 dark:text-zinc-200"
													>
													
													{Object.entries(reorderedLanguageCodes).map(([code, name], index) => (

(language === code ?
	<MenuItem className="text-zinc-700 dark:text-zinc-200" key={code} value={code}>
		{name}
	</MenuItem>
	:


	(index === languages.length
		?
		<div class=" border-t mt-2 mb-4 border-gray-100 dark:border-zinc-700 mx-auto items-center flex  dark:opacity-40 text-zinc-700 dark:text-zinc-200"></div>
		:
		<MenuItem className={`${languages.includes(code) ? "" : "text-gray-300 dark:text-gray-500"}`} key={code} value={code}>
			{name}
		</MenuItem>

	)

)

))}


													</Select>
													
												</FormControl>
												</Box>

									<div class="border-b border-gray-100 mx-auto items-center flex mt-5 dark:opacity-40"></div>
									<Popover className="">
										<PopoverHandler>
											<button className=" bg-none text-sm text-zinc-700 dark:text-zinc-200 flex  mt-5 pt-1 opacity-70" onClick={handleReportIssue}>

												<svg className="w-5 h-5 pr-1 " aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" stroke-linecap="round" stroke-linejoin="round"></path>
												</svg><p className="text-left">Report an issue</p>

											</button>
										</PopoverHandler>
										<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500">
											{currentUser ?
												<div>

													<iframe className="h-[600px] dark:hidden md:h-[640px] min-w-[350px]" src={`https://tally.so/embed/wve4d8?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}></iframe>
													<iframe className="h-[600px] hidden dark:block md:h-[640px] min-w-[350px]" src={`https://tally.so/embed/wMNL70?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}></iframe>
												</div> :
												<p className="dark:text-zinc-200">Please <a className="text-greenColor underline" href="/u/login">sign in </a>to access the form.</p>}
										</PopoverContent>
									</Popover>
								</div>
							</PopoverContent>
						</Popover>





					</div>


				</div>

				<div id="content-area ">
					{transcript.length > 0 && language == summary.lang
						?
						<div className="flex flex-col xl:flex-row mt-5 lg:mt-16">
							{transcript.length > 0 &&


								<div className={`grid-cols-2 w-full md:min-w-[500px]`}>
									{/* <div className={`hidden lg:flex justify-center items-center ${data.transcript ? "xl:w-1/2 w-2/3 h-[300px]" : "w-full h-[500px]"}  h-inherit mx-auto pb-10 xl:pb-0`}> */}

									<div className={`col-span-2 hidden ${data.source_type === "yt" ? "xl:flex" : ""}  justify-center items-center w-[95%] h-[400px]  h-inherit mx-auto pb-10 xl:pb-0`}>
										{data.source_type === "yt" &&
											(transcript.length > 0 || data.complete === true ?
												<iframe
													id="player"
													title="My YouTube Video "
													src={`https://www.youtube.com/embed/${data.source_id}?autoplay=${autoplay}&start=${timestamp}`}
													width="100%"
													height="100%"
													frameBorder="0"
													allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
												></iframe>
												: null)


										}

									</div>
									{/* <Loading /> */}
									<div className={`col-span-2 ${data.source_type == "yt" && "md:mt-10"} drop-shadow-sm `}>
										{summary.key_qa === undefined || summary.key_qa === null ? (
											<div id="q_and_a" className={`question-answering  md:min-h-[600px] border-b overflow-auto mx-auto pt-10 pl-5 pr-5 pb-5 border border-zinc-100 dark:border-zinc-700   rounded-xl`}>
												<p className="text-xl text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center italic">

													Generating questions... plugging in an AI assistant...

													<img className={`opacity-70 dark:opacity-90 mx-auto`} src={working} width={140} alt="My SVG" />


												</p>
											</div>


										) : (
											summary.key_qa && (
												<QuestionAnswering
													source_id={data.source_id}
													source_type={data.source_type}
													selectionCall={selectionCall}
													setSelectionCall={setSelectionCall}
													key_qa={summary.key_qa}
													inputValue={inputValue}
													setInputValue={setInputValue}
													buttonRef={buttonRef}
													inputRef={inputRef}
													data={data}
													transcript={transcript}
													timestampChanger={timestampChanger}
												/>
											)
										)}
									</div>

								</div>
							}
							{transcript.length > 0 &&

								<div  className={`${isLoading ? "hidden" : ""} w-full 3xl:w-5/6  mx-auto mt-10 md:mt-0 ${window.innerWidth > 1280 && window.innerWidth < 1420 ? "" : ""}`} >
									{transcript.length > 0 ? (
										<div className={` mt-14 xl:mt-0 w-full bg-white dark:bg-mildDarkMode drop-shadow-sm 3xl:min-w-[500px] mb-10 lg:mb-0  ${window.innerWidth > 1280 && window.innerWidth < 1420 ? window.innerWidth > 1280 && window.innerWidth < 1340 ? "ml-2" : "ml-6" : "xl:ml-10"} rounded-lg px-5 py-2 border border-zinc-100 drop-shadow-sm dark:border-zinc-700`} >

											<div className="text-sm font-medium text-center text-zinc-700 dark:text-zinc-200 dark:border-gray-700 ">
												<ul className="flex flex-wrap border-b border-gray-200 xl:w-[400px] w-full mx-auto	">
													<li className={`w-1/3 md:w-4/12 ${activeTab == "tab3" ? "text-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300 border-b-2 font-normal border-greenColor" : "hover:text-gray-600 hover:border-gray-300"}`} >
														<button onClick={() => setActiveTab("tab3")} className={`text-l inline-block p-4 pt-6 rounded-t-lg dark:text-zinc-200 dark:border-greenColor`}>Key Takeaways</button>
													</li>
													<li className={` w-1/3 md:w-4/12 ${activeTab == "tab1" ? "text-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300 border-b-2 font-normal border-greenColor" : "hover:text-gray-600 hover:border-gray-300"}`} >
														<button onClick={() => setActiveTab("tab1")} className={`text-l inline-block p-4 pt-6 rounded-t-lg dark:text-zinc-200 dark:border-greenColor`}>Summary</button>
													</li>
													<li className={` w-1/3 md:w-4/12 ${activeTab == "tab2" ? "text-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300 border-b-2 font-normal border-greenColor" : "hover:text-gray-600 hover:border-gray-300"}`} >
														<button onClick={() => setActiveTab("tab2")} className={`text-l inline-block p-4 pt-6 rounded-t-lg dark:text-zinc-200 dark:border-greenColor`}>Transcript</button>
													</li>
													{/* 										<li className={` w-1/3 md:w-3/12 ${activeTab == "tab4" ? "text-blueLike dark:bg-darkMode dark:text-zinc-300 border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab4")} className={`text-l inline-block p-4 rounded-t-lg  dark:text-zinc-200 dark:border-greenColor`}>Ask questions</button>
										</li> */}

												</ul>
											</div>
											<Selection.Root>
											<Selection.Portal>
      <Selection.Content>
		
			<Button className="rounded-xl bg-green-300 mt-2 mb-2 text-white dark:text-zinc-800" onClick={handleAskAlphy}> Ask Alphy to learn more about it.</Button>
					
		
			 <Selection.Arrow className="text-green-300 fill-green-300 mb-2" color="white" />

      </Selection.Content>
    </Selection.Portal>
    <Selection.Trigger>
	

  
											<div ref={contentRef} className="main-content text-zinc-700 dark:text-zinc-200  " >

												<Tabs>
													<Tab eventKey="transcript" title="">

														{activeTab === "tab3" && (data ? summary.key_takeaways ? summary.key_takeaways.map((item, index) => {
															return (
																<p className="pb-2">{index + 1}) {item}</p>)
														}) : (<p><p className="text-l text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">

															Processing key takeaways...

															<img className={`opacity-70 dark:opacity-90 mx-auto`} src={working} width={80} alt="My SVG" />


														</p>
														</p>) : null)}


														{activeTab === 'tab1' && (

															<div className="content-area text-l font-normal  max-w-screen-md overflow-auto  h-full xl:max-h-[110vh]">
																{/* <button className="flex ml-auto justify-end flex-row justify-end mb-2 mr-8 opacity-60 font-semibold text-black" onClick={handleDownload}><p className="pr-2">Download</p> {downloading ? <img src={Download}></img> : <img title="Download summary" src={DownloadStatic}></img>}</button> */}


																{isLoading ? (
																	<Loading />
																) : summaryArray.length === 0 ? (
																	<tr className="border-b-0">
																		<td className="pt-4">Still waiting for the summary! Meanwhile, check the transcript.</td>
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
															<div className="content-area text-l font-normal max-w-screen-md overflow-auto h-full xl:max-h-[110vh] ">

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



																						<div className={`${index !== 0 ? "hidden" : ""}   flex ml-auto justify-end flex-row justify-end`} >
																							<Popover
																							>



																								<PopoverHandler>
																									<button id="popoverButtonDownload" data-popover-target="popoverHover" data-popover-trigger="hover" className={`${props.tier === "free" || props.tier == undefined ? "cursor-default dark:invert" : ""} mr-8 opacity-80 pt-4`} > <img className={`${props.tier === "free" || props.tier == undefined ? " opacity-30" : ""} dark:invert`} src={DownloadStatic}></img></button>
																								</PopoverHandler>

																								<div data-popover id="popoverHover" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-zinc-200 dark:border-gray-600 dark:bg-mildDarkMode ">
																									<ThemeProvider value={themePopover}>
																										<PopoverContent background="indigo">
																											{props.tier !=undefined && props.tier!="free" && basicDataLoaded == true ?

																												<div>
																													<div onClick={() => handleDownload(1)} className="px-3 cursor-pointer py-2 hover:bg-zinc-100  dark:hover:bg-zinc-200 dark:hover:text-zinc-500">
																														<p className="">Download as Plain Subtitles (.srt)</p>
																													</div>

																													<div onClick={() => handleDownload(2)} className="px-3 cursor-pointer py-2 hover:bg-zinc-100  dark:hover:bg-zinc-200 dark:hover:text-zinc-500">
																														<p>Download Formatted Transcript (.txt)</p>
																													</div>
																												</div>
																												:

																												<div className="px-3 cursor-pointer py-2 pointer-events-none ">
																													<p className="">Upgrade your plan to download the transcript</p>
																												</div>}
																										</PopoverContent>
																									</ThemeProvider>

																								</div>
																							</Popover>

																						</div>


																					</div>

																					:
																					<div className="flex flex-row">
																						<a

																							target="_blank" href={data.source_type !== "up" ? "yt" ? `https://youtu.be/${data.source_id}?t=${Math.floor(parseInt(item.split(':')[0] * 3600) + parseInt(item.split(':')[1] * 60) + parseInt(item.split(':')[2]))}` : `https://twitter.com/i/spaces/${data.source_id}` : null}


																							className={`${data.source_type === 'yt'
																								? 'lg:cursor-pointer lg:pointer-events-auto'
																								: ''
																								}  lg:pointer-events-auto lg:text-slate-900 dark:text-zinc-300 font-bold underline`}
																							key={index}
																						>
																							<br></br>

																							{item}{' '}


																						</a>

																						<div className={`${index !== 0 ? "hidden" : ""}   flex ml-auto justify-end flex-row justify-end`} >
																							<Popover
																							>



																								<PopoverHandler>
																									<button id="popoverButtonDownload" data-popover-target="popoverHover" data-popover-trigger="hover" className={`${props.tier === "free" || props.tier == undefined ? "cursor-default dark:invert" : ""} mr-8 opacity-80 pt-4`} > <img className={`${props.tier === "free" || props.tier == undefined ? " opacity-30" : ""} dark:invert`} src={DownloadStatic}></img></button>
																								</PopoverHandler>

																								<div data-popover id="popoverHover" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-zinc-200 dark:border-gray-600 dark:bg-mildDarkMode ">
																									<ThemeProvider value={themePopover}>
																										<PopoverContent background="indigo">
																											{props.tier!==undefined && props.tier != "free" && basicDataLoaded == true ?

																												<div>
																													<div onClick={() => handleDownload(1)} className="px-3 cursor-pointer py-2 hover:bg-zinc-100  dark:hover:bg-zinc-200 dark:hover:text-zinc-500">
																														<p className="">Download as Plain Subtitles (.srt)</p>
																													</div>

																													<div onClick={() => handleDownload(2)} className="px-3 cursor-pointer py-2 hover:bg-zinc-100  dark:hover:bg-zinc-200 dark:hover:text-zinc-500">
																														<p>Download Formatted Transcript (.txt)</p>
																													</div>
																												</div>
																												:

																												<div className="px-3 cursor-pointer py-2 pointer-events-none ">
																													<p className="">Upgrade your plan to download the transcript</p>
																												</div>}
																										</PopoverContent>
																									</ThemeProvider>

																								</div>
																							</Popover>

																						</div>
																						{/* 			{index === 0 && <button className="flex ml-auto justify-end flex-row justify-end  mr-4 opacity-80 pt-4" onClick={handleDownload}>{downloading ? <img src={Download}></img> : <img title="Download transcript" src={DownloadStatic}></img>}</button>} */}
																					</div>

																			);
																		} else if (index % 2 === 1 && index < transcript.length) {
																			return (
																				<div key={index}>
																					<br></br>
																					{item}
{/* 
																		{item.split(/\s+/).map((word, idx) => {
																						const cleanedWord = word.replace(/[^a-zA-Z]/g, ''); // remove punctuations for comparison
																						
																							return (
																								
																								<span key={idx} className={`${trial_keywordlist.includes(cleanedWord) && "bg-green-200"}`} >{word}{' '}</span>
																								
																								
																							
																								
																							);
																						
																					
																					})} */}
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
										</Selection.Trigger>
										
										</Selection.Root>
										</div>
									) : (
										<div>

										</div>
									)}
								</div>}{' '}
						</div>
						:


						<div className="flex flex-col mb-20 mt-20 ">
							{(errorMessage == true || (languagesWanted.includes(language) === true) || languages.includes(language) || (summary !== undefined && summary.summary !== undefined && summary.summary !== null && summary.summary.length > 0) || (contentSummaries !== undefined && contentSummaries.length > 1 && (contentSummaries[0].lang == language || contentSummaries[1].lang === language)) || language == "en") ? null :

								<p className="text-xl text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">

									Seems like Alphy hasn't processed the content in {language_codes[language]} yet. {props.tier!==undefined && props.tier!=="free" ? <p>Request Alphy to generate summary, key takeaways, and questions in {language_codes[language]} clicking <a onClick={requestTranslation} className="underline text-greenColor cursor-pointer">here</a>.</p>
										: <p>Upgrade your plan request translation. You can check out the <a className="underline text-green-300" href={currentUser ? "/account" : "/plans"}>{currentUser ? "Account" : "Plans"} </a> page for more detail</p>}

									{/* 	<div className="ml-4 mt-12">
						<button type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Request Summary</button>
					</div> */}
								</p>
							}

						</div>

					}
				</div>

			</div>

			{basicDataLoaded == true && <div>
				{data !== null && transcript.length === 0 && (language === "en") ?

					<div className="flex flex-col mb-20 mt-20 ">
						<p className="text-xl text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">

							<span>
							Alphy is doing its best to process this {data.source_type==="yt" ? "video" : "recording"}, it will be ready in a few minutes. Meanwhile, you can check out other videos.
							<img className={`opacity-70 dark:opacity-90 mx-auto `} src={working} alt="My SVG" />
							</span>

						</p>

					</div> : null
				}
				{((summary != undefined && summary !== null && summary.summary == null && summary.lang !== "en" && language!=="en") || (languagesWanted.includes(language) == true && language!=="en")) && <div className="flex flex-col mb-20 mt-20 ">
					{data !== null &&
						<p className="text-xl text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">

							Alphy is currently working hard to translate this  {data.source_type==="yt" ? "video" : "recording"} to {language_codes[language]}. Please come back in a few minutes!

							<img className={`opacity-70 dark:opacity-90 mx-auto `} src={working} alt="My SVG" />

						</p>
					}
				</div>}
			</div>}
			{errorMessage == true && <div className="flex flex-col mb-20 mt-20 ">
				<p className="text-xl text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">

					There was an error with the request :( <br></br><br></br>Please refresh the page and try again. If the issue persists, please contact us at support@alphy.app



				</p>

			</div>}

			<button
      onClick={handleScroll}
      className={`lg:hidden absolute text-zinc-300 dark:text-zinc-600 bottom-5 right-5 bg-mildDarkMode opacity-80 dark:opacity-100 dark:bg-green-200 hover:bg-green-300 hover:text-zinc-600 text-white font-bold py-2 px-2 rounded-full`}
    >
      <ArrowUpwardIcon className="" />
    </button>
		</div>
	);
}
