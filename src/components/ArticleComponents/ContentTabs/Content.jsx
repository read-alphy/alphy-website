import React, { useEffect, useState, useRef } from 'react';
import QuestionAnswering from '../QuestionAnswering';
import srtParser2 from 'srt-parser-2';
import { Tab, Tabs } from 'react-bootstrap';
import TwitterLogo from '../../../img/Twitter Logo Blue.svg';
import Loading from '../../Loading';
import working from './working.svg';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
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
import AddIcon from '@mui/icons-material/Add';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ClearIcon from '@mui/icons-material/Clear';
import TwitterSpaces from "../../../img/twitter_spaces.png"
import TwitterIcon from '@mui/icons-material/Twitter';
import {
	Popover,
	PopoverHandler,
	PopoverContent,
	ThemeProvider,
	Button
} from "@material-tailwind/react";	
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MemoryIcon from '@mui/icons-material/Memory';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { API_URL } from '../../../constants';


export default function Content(props) {
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	
	

	const [isLoading, setIsLoading] = useState(props.data.transcript === undefined);

	const [activeTab, setActiveTab] = useState('tab1');
	const [autoplay, setAutoplay] = useState(0);
	const [timestamp, setTimestamp] = useState();
	const [downloading, setDownloading] = useState(false);
	const [basicDataLoaded, setBasicDataLoaded] = useState(false);
	const [showReportIssue, setShowReportIssue] = useState(false);
	const [language, setLanguage] = useState(props.data.summaries !== undefined && props.data.summaries.length > 1 && props.data.lang !== undefined ? props.data.lang : 'en')
	const [errorMessage, setErrorMessage] = useState(false);
	const [translatingLanguage, setTranslatingLanguage] = useState("");
	const [languagesWanted, setLanguagesWanted] = useState([]);
	const [askText, setAskText] = useState("");
	const[selectionCall, setSelectionCall] = useState(false);
	const [modelName, setModelName] = useState("");
	

	const [mainPopoverOpen, setMainPopoverOpen] = useState(false);
	const [mainPopoverOpenSmall, setMainPopoverOpenSmall] = useState(false);
	const [transcript, setTranscript] = useState([]);
	const [summaryArray, setSummaryArray] = useState([]);
	const [showYouTubeFrame, setShowYouTubeFrame] = useState(props.data.source_type !== undefined && props.data.source_type==="sp"?false: (localStorage.getItem("showYouTubeFrame")==="false"?false:true));
	const [isPastMainPopoverOpenThreshold, setIsPastMainPopoverOpenThreshold] = useState(window.innerWidth <= 1000);

	const [summary, setSummary] = useState("")

	const [inputValue, setInputValue] = useState("");


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
useEffect(() => {

	if (inputDate !== undefined && formattedDate.length === 0) {
		const parts = inputDate.split("-");
		formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`

	}
}, [inputDate])


	let contentSummaries = []
	let languages = []
	
	


	const transcript_raw = props.data.transcript;


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
useEffect(() => {
	if(summary!== undefined && summary!==null){
		setModelName(summary.model_name)
	}
},[summary]
)
	
useEffect(() => {
	if ((props.data !== undefined && props.data !== null) && contentSummaries.length == 0) {
		contentSummaries = props.data.summaries
		if (contentSummaries !== undefined && contentSummaries.length>0 ) {
			contentSummaries.map(summary => (summary.summary !== undefined&& summary.summary!==null) && languages.push(summary.lang));
			setSummary(contentSummaries.find(summary => summary.lang === language))
			
			if (summary !== undefined && summary.length > 0 && summary.summary === null) {
				languagesWanted.push(language)
			}
		}
		

	}
}, [props.data,language])

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

	useEffect(() => {
		summaryParser()
	}, [language])

	const requestTranslation = async () => {

		await currentUser.getIdToken().then((idToken) => {

			axios.post(
				`${API_URL}/sources/${data.source_type}/${data.source_id}?lang=${language}`,
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
		`${API_URL}/sources/${data.source_type}/${data.source_id}/bookmark?bookmark=${changeBookmark}`,
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
/* 
		if (scrollPosition >= 3 * windowHeight) {
			setShowButton(true);
		} else {
			setShowButton(false);
		} */
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


	useEffect(() => {
		if (upPart === "up" && data.length === 0 && basicDataLoaded === true) {
			/* navigate("/404") */
		}
	
	}, [basicDataLoaded,data])

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
		setShowYouTubeFrame(true)
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
		setShowYouTubeFrame(true)
	};

	const handleReportIssue = () => {
		if (showReportIssue === false) {
			if (currentUser !== null && currentUser !== undefined) {
				setShowReportIssue(true);
			}

			
		}

	};




async function summaryParser(){
	if (summary !== undefined && summary !== null && summary.summary!==undefined && summary.summary!==null) {
		if (summary.summary_prettified !== undefined && summary.summary_prettified !== null) {
			setSummaryArray(summary.summary_prettified.split('\n'))
		}
		else {
			setSummaryArray(summary.summary.split('\n'))
		}

	}

}

	async function transcriptParser() {

	
		let transcript = []





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
		

useEffect(() => {
	if (summaryArray.length===0 && summary!==undefined && summary.summary!==null){
		summaryParser();
	}
}, [summary])



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

		
		askInput ="Expand on the following:" + askText + "?'"
		
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

	const handleAddToArchipelago = (archipelagoUID,create) => {
		
		const newSource = {
			"source_id":data.source_id,
			"source_type":data.source_type, 
			}
			if(create===false){
				axios.get(`${API_URL || 'http://localhost:3001'}/playlists/${archipelagoUID}?nof_questions=10&tracks=true`).then	((response) => {
					axios.patch( `${API_URL || 'http://localhost:3001'}/playlists/${archipelagoUID}`, {
				"user_id": currentUser.uid,
				"sources": [...response.data.tracks,newSource],
			})
			
			setMainPopoverOpen(false)
			}).then(() => {

				
		})
					}

		else if(create===true){
			axios.post(`${API_URL || 'http://localhost:3001'}/playlists/`, {	
						"name": title,
						"user_id": currentUser.uid,
						"sources": [newSource],
				}
				, {
					headers: {
						'id-token': currentUser.accessToken,
					},
				})
				.then((response) => {
					setMainPopoverOpen(false)
					const archipelagoUID = response.data.uid
					navigate(`/arc/${archipelagoUID}`)
				})
				.catch((error) => {
					console.log(error)
					setMainPopoverOpen(false)
				}
				);


		}
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
			/* 	if (position.top < window.innerHeight && position.bottom >= 0) {
					setScrollUpButton(true);
				} else {
					setScrollUpButton(false);
				} */
  }
	  };

	  useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	  }, []);

	  
  useEffect(() => {
	const handleResize = () => {
		const currentWidth = window.innerWidth;
		const newIsPastThreshold = currentWidth <= 1000;
		
  
		if (isPastMainPopoverOpenThreshold !== newIsPastThreshold) {
			
		  setIsPastMainPopoverOpenThreshold(newIsPastThreshold);
		  setMainPopoverOpenSmall(false)
		  setMainPopoverOpen(false);
		}
	  };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isPastMainPopoverOpenThreshold]);


  function handleShowYouTubeFrame (){

	if(showYouTubeFrame){
		setShowYouTubeFrame(false)
		localStorage.setItem("showYouTubeFrame",false)
		
	}
	else {
		setShowYouTubeFrame(true)
		localStorage.setItem("showYouTubeFrame",true)

	}
  }


/* useEffect(() => {

	if(summary!==undefined && summary.complete== undefined && activeTabset===false){
		setActiveTab("tab2")
	
	}
	else if(summary!==undefined && summary.complete!== undefined && activeTabset===false){
		setActiveTab("tab1")
	}
}, [summary])

 */
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#bbf7d0',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#71717a',
      boxSizing: 'border-box',
    },
  }));

  
return (
		<div id="content" ref={ref} className={`md:max-w-[100vw]  scroll-smooth pb-10 md:px-10 xl:px-20 3xl:px-40  mt-5 md:mt-0 grow mx-auto overflow-x-hidden  md:pt-20 h-full lg:min-h-[100vh] lg:max-h-[100vh] overflow-y-auto`}>
				<div>
				<div className="grid grid-cols-3 ">
					<div className={`col-span-2 lg:col-span-3 xl:mt-0 ${transcript.length > 0 && (summary!=undefined &&language == summary.lang) ? "xl:col-span-2" : "xl:col-span-3"}`} >
						{modelName==="gpt-4" &&
						<div className="relative flex flex-col">
						<div className="relative flex flex-row group cursor-default">
						  <WorkspacePremiumIcon className="text-indigo-400"/>
						  <p className="text-indigo-400 ml-2">Premium Processing</p>
						  <span className="absolute opacity-0 group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-zinc-300 text-sm rounded py-1 px-2 left-0 md:bottom-full z-50 mb-2 ml-4">
							This content was processed with advanced AI models accessible to Premium.
						  </span>
						</div>
					  </div>				  
					  
								
								}

								{modelName==="gpt-3.5-turbo-16k" &&
										<div className="relative flex flex-col">
										<div className="relative flex flex-row group cursor-default">
										<MemoryIcon className="text-gray-500"/>
										<p className="text-gray-500 ml-2">Standard Processing</p>
										<span className="absolute opacity-0 group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:bottom-full z-50 mb-2 ml-4">
											This content was processed with standard AI models.
										</span>
										</div>
									</div>		



								}
						<div className="flex flex-row ml-1">
							<h1 className="col-span-2 mt-6 text-xl  lg:max-w-[40vw] text-left lg:col-span-3  lg:text-2xl text-blueLike dark:bg-darkMode dark:text-zinc-300 font-bold">
								{data.source_type === 'up' ? title.substring(0, title.lastIndexOf('.')) : title}
							</h1>

							<div className="flex flex-row justify-end mx-auto ">
								<Popover open={mainPopoverOpen} onBlur = {() => setMainPopoverOpen(false)}>
									<PopoverHandler onClick={() => setMainPopoverOpen(!mainPopoverOpen)}>
										<div className="hidden lg:flex mt-8">

											<svg className="cursor-pointer text-zinc-700 dark:text-zinc-300" width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>

										</div>

									</PopoverHandler>
									<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode"  >
										<div className="">
											<div className="">
												{data.source_type === 'yt' &&
													<a target="_blank" className="flex flex-row  xl:hidden mb-5 mt-3" href={`https://www.youtube.com/watch?v=${data.source_id}`}>
														<img className="mr-1 -ml-2" src="/youtubeicon.png" width={40} />
														<p className="text-zinc-600 dark:text-zinc-300 items-center pt-1 text-center  text-md">Click to watch</p>
													</a>
												}												
												<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
												

													<Popover placement="right">
														<PopoverHandler>
														<button  className="flex flex-row text-zinc-600 dark:text-zinc-300"><AddCircleIcon className="text-green-200"/> <p className="ml-2">Add To Arc</p></button>
														</PopoverHandler>
														<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
											
														<MenuItem onClick={() => handleAddToArchipelago(0,true)} className="text-zinc-700 dark:text-zinc-200 flex-row flex">
															<AddIcon className="text-zinc-600 dark:text-zinc-300"/>
														<p className="text-zinc-600 dark:text-zinc-300 pl-1">Create An Arc</p>
															</MenuItem>
													{userArchipelagoNames.map(item => 
														
																	<MenuItem onClick={() => handleAddToArchipelago(item[1],false)} className="text-zinc-700 dark:text-zinc-200"  value={item}>
																	<p className="text-zinc-600 dark:text-zinc-300">{item[0]}</p> 
																	</MenuItem>
																
														

																)}

														</PopoverContent>
													</Popover>
												
						{(data.source_type==="up" && (props.data!==undefined && props.data !== null && (currentUser!==null && props.data.submitter_id==currentUser.uid))) &&
												<div>

												<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 mt-5"></div>
													


												<div className="relative flex flex-row  group  cursor-default">
																<div className=" flex flex-row text-zinc-600 dark:text-zinc-300 items-center z-[9999]">
																	
																	<AntSwitch onChange={props.handleVisibility} defaultChecked={props.isVisible} disabled={props.tier!=="premium"}/>
																	<span className="text-sm mx-2">{props.isVisible===true ? "Public" : "Private"}</span>
														</div>
										

										{props.tier==="premium" &&
                                        <span className="absolute opacity-0 min-w-[200px] group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-[9999] mb-2 ml-4">
                                            {props.isVisible ? "Toggle the visibility of this content. Switching to private makes it accessible only by you.":  "Toggle the visibility of this content. Switching to public makes it accessible by all."}
                                        </span>
                                    }
									 {props.tier!=="premium" &&
                                    <span className="absolute opacity-0 min-w-[200px]  group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 z-[9999] md:top-full z-50 mb-2 ml-4">
                                    This content is private. Switch to the Premium plan to make it publicly accessible.
                                </span>}

													</div>
													
													</div>		
													
													
													
													}

												<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 mt-5"></div>
												
												<div className="flex flex-row mb-2	 items-center hover:opacity-80 dark:hover:opacity-80 ">

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
											<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>}

							
											</div>
											<p className="mb-2 text-zinc-700 dark:text-zinc-300">Language</p>
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
		<div className=" border-t mt-2 mb-4 border-gray-100 dark:border-zinc-700 mx-auto items-center flex  dark:opacity-40 text-zinc-700 dark:text-zinc-200"></div>
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
												<div className="border-b border-gray-100 mx-auto items-center flex dark:opacity-40"></div>
												
											</div>



												

													<button className=" bg-none text-sm text-zinc-700 dark:text-zinc-200 flex  mt-5 pt-1 opacity-70" onClick={handleReportIssue}>

														<svg className="w-5 h-5 pr-1 " aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
															<path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" stroke-linecap="round" stroke-linejoin="round"></path>
														</svg><p className="text-left">Report an issue</p>

													</button>
												
												<Dialog maxWidth={"sm"} open={showReportIssue} onClose={()=>setShowReportIssue(false)} className=" dark:border-zinc-500">
													{currentUser ?
														<div className="px-10 dark:bg-mildDarkMode dark:border-zinc-500">

															<iframe className="h-[600px] dark:hidden md:h-[640px] min-w-[350px]" src={`https://tally.so/embed/wve4d8?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}></iframe>
															<iframe className="h-[600px] hidden dark:block md:h-[640px] min-w-[350px]" src={`https://tally.so/embed/wMNL70?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`} ></iframe>
														</div> :
														<p className="dark:bg-mildDarkMode dark:border-zinc-500 dark:text-zinc-200">Please <a className="text-greenColor underline" href="/u/login">sign in </a>to access the form.</p>}
												</Dialog>
											
										</div>
									</PopoverContent>
								</Popover>
								
							</div>
						</div>
						<div className="col-span-2  ml-1 grid grid-cols-2 flex flex-row">
							<div className="col-span-1">

								<h2 className="mt-5 text-l text-left lg:col-span-3 lg:mt-5 lg:text-xl text-blueLike dark:bg-darkMode dark:text-zinc-300 font-light_ flex flex-row">

									{data.source_type !== "up" && data.creator_name}
									{data.source_type === "up" && `Private Content`}

								</h2>
								
							</div>

							<div>
							
							</div>

						

						</div>
						<p className="w-full mt-5 border border-zinc-100 dark:border-zinc-700"></p>
		
					</div>

					<div className="flex flex-col mt-5 ml-2 items-center  lg:hidden cursor-default">


					<Popover open={mainPopoverOpenSmall} onBlur = {() => setMainPopoverOpenSmall(false)}>
									<PopoverHandler onClick={() => setMainPopoverOpenSmall(!mainPopoverOpenSmall)}>
								<div className="lg:hidden mt-5">

									<svg width={30} className="cursor-pointer" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
										<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
												

												<Popover placement="right">
													<PopoverHandler>
													<button className="flex flex-row text-zinc-600 dark:text-zinc-300"><AddCircleIcon className="text-green-200"/> <p className="ml-2">Add To Arc</p></button>
													</PopoverHandler>
													<PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
										
													<MenuItem onClick={() => handleAddToArchipelago(0,true)} className="text-zinc-700 dark:text-zinc-200 flex-row flex">
															<AddIcon className="text-zinc-600 dark:text-zinc-300"/>
														<p className="text-zinc-600 dark:text-zinc-300 pl-1">Create An Arc</p>
															</MenuItem>
												{userArchipelagoNames.map(item => 
													
																<MenuItem onClick={() => handleAddToArchipelago(item[1],false)} className="text-zinc-700 dark:text-zinc-200"  value={item}>
																	<p className="text-zinc-600 dark:text-zinc-300">{item[0]}</p> 
																</MenuItem>
															
													

															)}

													</PopoverContent>
												</Popover>
												{(data.source_type==="up" && (props.data!==undefined && props.data !== null && (currentUser!==null && props.data.submitter_id==currentUser.uid))) &&

												<div>

												<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 mt-5"></div>
													


												<div className="relative flex flex-row  group  cursor-default">
																<div className=" flex flex-row text-zinc-600 dark:text-zinc-300 items-center z-[9999]">
																	
																	<AntSwitch onChange={props.handleVisibility} defaultChecked={props.isVisible} disabled={props.tier!=="premium"}/>
																	<span className="text-sm mx-2">{props.isVisible===true ? "Public" : "Private"}</span>
														</div>
										

										{props.tier==="premium" &&
                                        <span className="absolute mt-6 opacity-0 min-w-[200px] group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-[9999] mb-2 ml-4">
                                            {props.isVisible ? "Toggle the visibility of this content. Switching to private makes it accessible only by you.":  "Toggle the visibility of this content. Switching to public makes it accessible by all."}
                                        </span>
                                    }
									 {props.tier!=="premium" &&
                                    <span className="absolute mt-6 opacity-0 min-w-[200px]  group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 z-[9999] md:top-full z-50 mb-2 ml-4">
                                    This content is private. Switch to the Premium plan to make it publicly accessible.
                                </span>}

													</div>
													
													</div>		
													
													
													
													}
												<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mt-5 mb-5 dark:opacity-40"></div>
									
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
											<div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>:null}
									
										<p className="mb-2 text-zinc-700 dark:text-zinc-200 opacity-80">Language</p>
									
										<Box sx={{minWidth: 200}} className="">
												<FormControl  className="w-full text-zinc-200 dark:text-zinc-700  " size="small">
													
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
		<div className=" border-t mt-2 mb-4 border-gray-100 dark:border-zinc-700 mx-auto items-center flex  dark:opacity-40 text-zinc-700 dark:text-zinc-200"></div>
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

									<div className="border-b border-gray-100 mx-auto items-center flex mt-5 dark:opacity-40"></div>
									


									<button className=" bg-none text-sm text-zinc-700 dark:text-zinc-200 flex  mt-5 pt-1 opacity-70" onClick={handleReportIssue}>

<svg className="w-5 h-5 pr-1 " aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg><p className="text-left">Report an issue</p>

</button>

<Dialog maxWidth={"sm"} open={showReportIssue} onClose={()=>setShowReportIssue(false)} className="">
{currentUser ?
<div className="px-10 dark:bg-mildDarkMode dark:border-zinc-500">

	<iframe className="h-[640px] dark:hidden  md:min-w-[350px]" src={`https://tally.so/embed/wve4d8?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}></iframe>
	<iframe className="h-[640px] hidden dark:block md:min-w-[350px]" src={`https://tally.so/embed/wMNL70?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`} ></iframe>
</div> :
<p className=" dark:bg-mildDarkMode dark:border-zinc-500 dark:text-zinc-200">Please <a className="text-greenColor underline" href="/u/login">sign in </a>to access the form.</p>}
</Dialog>
								</div>
							</PopoverContent>
						</Popover>





					</div>


				</div>

			{/* <div className="flex flex-col border border-gray-200 rounded-lg p-10 text-zinc-500 max-w-[750px]">
			<h1 className="font-bold text-xl text-red-400 mb-5"> Bankless - The Blockchain Trilemma - ETH Vs SOL Vs ATOM with Mike Ippolito</h1>
			
			<p className="font-bold text-lg text-zinc-600">Opportunity 3 : Investing in Ethereum</p>
			<div className="flex flex-col gap-y-4">
			<p className="mt-4">The speaker regards Ethereum's model of prioritizing decentralized validators as pluses. Ethereum optimizes on allowing solo stakers to still validate the chain, hence enhanced security. This shows robustness and commitment to maintaining a decentralized network, which could translate to market strength and potential return on investment.</p>
			<p className="font-semibold text-zinc-600">Implications</p> 
			<p>Growth in Ethereum could potentially influence its layer 2 platforms, creating an upward wave in the sector. If Ethereum continues to scale and remain resilient, this could also attract more developers building around its ecosystem, which brings more value to Ethereum

			</p>
</div>
	<div className="flex flex-col gap-y-4">
    <p className="mt-4 font-semibold text-zinc-600">Risk Assessment</p>
    <p>
	The risk lies in potential scalability issues and the highly contentious nature of changes in the Ethereum network. Slow transaction speeds and high gas fees during peak times could affect user experience negatively
	</p>
	</div>
	<div className="flex flex-col">
    <p className="mt-4 font-semibold text-zinc-600">DYOR</p>
	<p>Investors should review Ethereum's roadmap, its plans for addressing scalability, and its view on maintaining ecosystem decentralization. Explore Ethereum's reddit, twitter, EIPs and understand the updates in Ethereum 2.0.

	</p>
	</div>

	<p className="mt-6 text-red-400 underline">See timestamped sources from the discussion ></p>
  
				</div> */}

				<div id="content-area ">
					{transcript.length > 0  && ((summary!==undefined && summary.complete!==undefined && language == summary.lang) || (summary!== undefined && summary.complete===undefined)) 
						?
						<div className="flex flex-col xl:flex-row mt-5 lg:mt-16">
							{transcript.length > 0 &&


								<div className={`${summary.key_qa===undefined || summary.key_qa===null ? "hidden" : ""} grid-cols-2 w-full md:min-w-[500px]`}>
									{/* <div className={`hidden lg:flex justify-center items-center ${data.transcript ? "xl:w-1/2 w-2/3 h-[300px]" : "w-full h-[500px]"}  h-inherit mx-auto pb-10 xl:pb-0`}> */}

									{showYouTubeFrame ===true && 

									<div>
									<div className={`hidden ${data.source_type === "yt" ? "lg:flex" : ""}  justify-center items-center `}>
									{data.source_type === "yt" &&
											(transcript.length > 0 || data.complete === true ?
												<div>
											
												{/* <div id="drag-handle" ref={dragHandleRef}  className="fixed bottom-4 right-4 w-[300px] h-[200px] cursor-move z-[9999] bg-black opacity-20"></div>										 */}

												<iframe
													id="player"
													
													title="My YouTube Video "
													className={`fixed bottom-24 right-4 w-[360px] h-[240px] rounded-lg z-50 transition-all duration-500 ease-in-out transform hover:scale-105 ${showYouTubeFrame ? "opacity-100" : "opacity-0"}}`} 
													src={`https://www.youtube.com/embed/${data.source_id}?autoplay=${autoplay}&start=${timestamp}`}
													width="100%"
													height="100%"
													frameBorder="0"
													allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
												></iframe>
												
												</div>
												: null)


										}

									</div>


								<div className={`bg-white dark:bg-mildDarkMode border pt-6 cursor-default items-center border-zinc-300 dark:border-zinc-500 drop-shadow-lg rounded-xl fixed bottom-24 right-4 min-w-[360px] max-w-[400px] min-h-[240px] z-50 ${data.source_type==="sp" ? "hidden lg:flex" : " hidden"}`}>
								<a className=" flex flex-col col-span-1 hidden lg:flex mx-auto mb-5 mt-3" target="_blank" href={`https://twitter.com/i/spaces/${data.source_id}`}>
									<img src={TwitterSpaces} className="w-[240px] h-[120px] mx-auto"/>
									<p className="text-md text-zinc-600 dark:text-zinc-300 mt-10 text-center px-5 mx-auto underline">
										Listen to <span className="font-bold pb-6 hyphenate">"{`${title}`.substring(0,90)} {title.length>90 && "..."}"</span>  on Twitter
									</p>

									</a>
									</div>

							</div>
										}
									
									
									<button onClick={handleShowYouTubeFrame}className={`z-50 fixed hidden ${data.source_type=="yt" && "lg:block"} bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-red-400 transform transition-all duration-500 ease-in-out  hover:-translate-y-2 dark:bg-zinc-60`}>
										{showYouTubeFrame ? 
										<ArrowDownwardIcon fontSize="large" className="text-white "/>
										:
										<YouTubeIcon fontSize="large" className="text-white"/>
										}
									</button>

									
									
									<button onClick={handleShowYouTubeFrame}className={`z-50 fixed hidden ${data.source_type=="sp" && "lg:block"} bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-[#7366d7] transform transition-all duration-500 ease-in-out  hover:-translate-y-2 `}>
										{showYouTubeFrame ? 
										<ArrowDownwardIcon fontSize="large" className="text-white "/>
										:
										<TwitterIcon fontSize="large" className="text-white"/>
										}
									</button>



								
									
									<div className={`col-span-2 ${data.source_type == "yt" && ""} drop-shadow-sm `}>
									{summary.key_qa === undefined && summary.key_qa === null ? (
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

								<div  className={`${isLoading ? "hidden" : ""} w-full 3xl:w-5/6 max-w-[700px] mx-auto mt-10 md:mt-0 ${window.innerWidth > 1280 && window.innerWidth < 1420 ? "" : ""}`} >
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
													
														<Button className="rounded-md bg-green-200 mt-2 mb-2 text-zinc-600 dark:text-zinc-800 " onClick={handleAskAlphy}> Ask Alphy to learn more about it.</Button>
																
													
														<Selection.Arrow className="text-green-300 fill-green-300 mb-2" color="white" />

												</Selection.Content>
												</Selection.Portal>
												<Selection.Trigger>
												

  
											<div ref={contentRef} className="main-content text-zinc-700 dark:text-zinc-200  " >

												<Tabs>
													<Tab eventKey="transcript" title="">

														{activeTab === "tab3" && (data ? summary.key_takeaways ? summary.key_takeaways.map((item, index) => {
															return (
																<p className="flex flex-row pb-2 ">{index+1}) 
																<ReactMarkdown className="ml-1 ">{item}</ReactMarkdown>
																</p>)


														}) : (
														
														summary.key_takeaways===undefined || summary.key_takeaways===null
														
														? 
														
														<p className="text-l text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">
														This content doesn't have key takeaways. Check out the transcript!

														</p> :


														  <p>
															<p className="text-l text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">

															Processing key takeaways...

															<img className={`opacity-70 dark:opacity-90 mx-auto`} src={working} width={80} alt="My SVG" />


														</p>
														</p>
														
														) : null)}


														{activeTab === 'tab1' && (

															<div className={`content-area text-l font-normal  max-w-screen-lg overflow-auto  h-full xl:max-h-[110vh]`}>
																{/* <button className="flex ml-auto justify-end flex-row justify-end mb-2 mr-8 opacity-60 font-semibold text-black" onClick={handleDownload}><p className="pr-2">Download</p> {downloading ? <img src={Download}></img> : <img title="Download summary" src={DownloadStatic}></img>}</button> */}


																{isLoading ? (
																	<Loading />
																) : summaryArray.length === 0 ? (
																	
																		<p className="text-l text-zinc-500 dark:text-zinc-200 font-light_ max-w-screen-md mx-auto p-3 text-center">
												
																			{summary.summary===undefined || summary.summary===null ? "This content doesn't have a summary. Check out the transcript!" : "Still waiting for the summary! Meanwhile, check the transcript."}
																		</p>
																	
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

																						<div className={`${index !== 0 ? "hidden" : ""}   flex ml-auto justify-end flex-row justify-end`}>
																							<Popover>
																								<PopoverHandler>
																									<button id="popoverButtonDownload" data-popover-target="popoverHover" data-popover-trigger="hover" className={`${props.tier === "free" || props.tier == undefined ? "cursor-default dark:invert" : ""} mr-8 opacity-80 pt-4`} > <img className={`${props.tier === "free" || props.tier == undefined ? " opacity-50" : ""}`} src={DownloadStatic}></img></button>
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
										: <p>Upgrade your plan request translation. You can check out the <a className="underline text-green-300" href={currentUser ? "/account" : "/plans"}>{currentUser ? "account" : "plans"}</a> page for more detail</p>}

									{/* 	<div className="ml-4 mt-12">
						<button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Request Summary</button>
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
