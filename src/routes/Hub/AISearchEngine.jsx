import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Spinner, } from "@material-tailwind/react";


import SourceCard from '../CrossVideo/SourceCard';
import Dialog from '@mui/material/Dialog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import QuizIcon from '@mui/icons-material/Quiz';
import QaWsManager from '../../components/ArticleComponents/QaWsManager';
import LoopIcon from '@mui/icons-material/Loop';
import RefreshIcon from '@mui/icons-material/Refresh';
import { API_HOST, API_SSL } from '../../constants';


export default function ArchipelagoChat({ currentUser, collapsed }) {
    const [inputValue, setInputValue] = useState("")
    const [isLoadingInside, setIsLoadingInside] = useState(false)

    const [errorMessage, setErrorMessage] = useState(false)


    const [answerData, setAnswerData] = useState({ answer: '', sources: [] });
    const [selectedSourceCard, setSelectedSourceCard] = useState("")
    const [openDialog, setOpenDialog] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);

    const [elementCalled, setElementCalled] = useState(false)
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isForwardArrowVisible, setIsForwardArrowVisible] = useState(true);
    const [isBackwardArrowVisible, setIsBackwardArrowVisible] = useState(false);


    const ref = useRef();

    const [triggerWs, setTriggerWs] = useState(false);








    const carouselRef = useRef(null);







    const buttonRef = useRef(null);

    if (localStorage.getItem("archipelagoEdited") === "true") {

        localStorage.setItem("archipelagoEdited", "false")
        window.location.reload()
    }
    //remove cursor for trendyol carousel gaps
    const elements = document.querySelectorAll(".styles-module_item-container__a8zaY")
    if (elements && elementCalled === false) {
        elements.forEach(element => {
            element.classList.add('cursor-default');
        });
        setElementCalled(true)
    }



    const handleSubmit = () => {


        setErrorMessage(false)

        if (currentUser === null && selectedQuestions.includes(inputValue) === false) {
            setErrorMessage(true)
            setIsLoadingInside(false)
            return
        }
        else {

            if (inputValue.length === 0) {
                return
            }
            else {
                try {
                    setAnswerData({ answer: '', sources: [] })
                    setTriggerWs(true)
                    const idToken = currentUser ? currentUser.accessToken : "123"
                    setIsLoadingInside(true)
                    setErrorMessage(false)


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
                        question: inputValue,
                        arcId: "123456",
                        idToken: idToken
                    });

                    setTimeout(() => {
                        wsManager.close();
                    }, 20000);

                    setTimeout(() => {

                        const elements = document.querySelectorAll(".styles-module_item-container__a8zaY")
                        if (elements) {
                            elements.forEach(element => {
                                element.classList.add('cursor-default');
                            });
                        }
                    }, 500);
                }


                catch (error) {
                    console.log(error)
                }

            }

        }

    }




    const handleClear = () => {
        setAnswerData({ answer: '', sources: [] });

        setTriggerWs(false)
        setIsLoadingInside(false);
        setInputValue('');
        setErrorMessage(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    };




    const handleAskPremadeQuestion = (event) => {
        setInputValue(event.target.innerText)
        setIsLoadingInside(true)
        setTimeout(() => {
            buttonRef.current.click()
        }, 300);
    }


    useEffect(() => {
        const handleScroll = () => {
            if (carouselRef.current) {
                const container = carouselRef.current;
                const isScrollEnd = container.scrollLeft + container.clientWidth === container.scrollWidth;
                setIsForwardArrowVisible(!isScrollEnd);
                setIsBackwardArrowVisible(container.scrollLeft > 0);


            }
        };

        // Attach scroll event listener
        if (carouselRef.current) {
            carouselRef.current.addEventListener('scroll', handleScroll);
        }

        // Clean up the event listener on component unmount
        return () => {
            if (carouselRef.current) {
                carouselRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const scrollForward = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;




            const scrollAmount = window.innerWidth < 640 ? 260 : 380;

            carouselRef.current.scrollLeft += scrollAmount;
        }
    };

    const scrollBackward = () => {
        if (carouselRef.current) {


            const scrollAmount = 300;
            carouselRef.current.scrollLeft -= scrollAmount;
        }
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



        const formattedRawAnswer = replaceEverySecondOccurrence(cleanedText, regexPattern, "].\n\n")
        const parts = formattedRawAnswer.split(/\[(\d+)\]/g);

        return parts.map((part, index) => {
            if (answerData.sources.hasOwnProperty(part - 1)) {

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
        setSelectedSourceCard(answerData.sources[sourceNumber - 1])

        setTimeout(() => {
            setOpenDialog(true)
        }
            , 300);



    };


    return (
        <div className={`${collapsed ? "lg:w-[1000px] xl:max-w-[1000px]" : "lg:w-[600px] xl:w-[900px] 2xl:w-[1000px]"} grow mx-auto pt-10 pb-20 `} >
            <div className="sm:ml-10 px-3 ">
                <div>
                    <div className="flex items-center pr-1 mt-6 xl:mt-8 max-w-[900px] ">
                        <div className="flex flex-row drop-shadow-md w-full flex-grow relative dark:bg-zinc-800  border border-black/10   dark:text-white rounded-xl dark:rounded-xl gizmo:rounded-2xl shadow-xs dark:shadow-xs  bg-white">


                            <input

                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                                onKeyDown={handleKeyDown}
                                title={inputValue}
                                type="text"
                                id="questionAnswering"
                                placeholder="Type your question here..."
                                className="m-0 w-full  font-averta-semibold text-zinc-700 dark:text-zinc-300 dark:placeholder:text-zinc-400 text-sm resize-none border-0 bg-transparent dark:bg-transparent py-[10px] pr-16 focus:ring-0 focus-visible:ring-0 md:py-4 md:pr-20 gizmo:md:py-3.5 pl-4 md:pl-[26px]" />
                            {inputValue.length > 0 ? (
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


                            <button ref={buttonRef} onClick={handleSubmit} className={`absolute  rounded-md absolute p-1 rounded-md  gizmo:md:bottom-2.5 md:p-2 md:right-3 bottom-2 right-2 ${isLoadingInside ? "pointer-events-none cursor-default  md:bottom-2 bg-transparent" : "bg-green-200"}`} >
                                {isLoadingInside ?
                                    <Spinner fontSize="small" className="opacity-40 p-1 cursor-default z-50" color="black" /> :
                                    <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-700" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>



                                }
                            </button>

                        </div>

                    </div>

                </div>
                {errorMessage &&
                    <div className="mt-4 text-zinc-500 dark:text-zinc-400">
                        <p className="font-averta-semibold">Please <a href="/u/login" className="underline text-greenColor dark:text-green-200 font-averta-semibold">sign in</a> to start asking questions.</p>
                    </div>
                }
            </div>

            <div className="mt-10 animate-bounce-slow px-3 " >

                <div id="answer-area" className="answer-area text-l max-w-[900px] ml-2 sm:ml-10 mt-10 ">

                    {isLoadingInside || answerData.answer !== "" ? <p className="text-greenColor dark:text-green-200 text-l font-averta-semibold">
                        <QuestionAnswerIcon className="text-greenColor dark:text-green-200 mr-1 " />
                        Answer

                        <LoopIcon className="ml-2 cursor-pointer text-zinc-500 dark:text-zinc-300" fontSize="small" onClick={() => {

                            setAnswerData({ answer: '', sources: [] })
                            setInputValue("")
                        }
                        } />
                    </p>


                        : null}
                    {isLoadingInside &&
                        <div className="opacity-60 dark:opacity-100">
                            <div className="hidden dark:block opacity-60 w-full pr-3 lg:px-0 ">
                                <Box >
                                    <Skeleton sx={{ bgcolor: "#71717a" }} animation="wave" />
                                    <Skeleton sx={{ bgcolor: "#71717a" }} animation="wave" />
                                    <Skeleton sx={{ bgcolor: "#71717a" }} animation="wave" />
                                    <Skeleton sx={{ bgcolor: "#71717a" }} animation="wave" height={80} />
                                </Box>
                            </div>
                            <div className="dark:hidden w-full pr-3 lg:px-0 lg:w-[900px]">

                                <Box fullWidth>
                                    <Skeleton sx={{ bgcolor: "dark:#fff" }} animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" height={80} />
                                </Box>
                            </div>
                        </div>
                    }

                    {answerData.answer !== "" &&
                        <div className="text-zinc-700 dark:text-zinc-300">
                            {/* <p dangerouslySetInnerHTML={{ __html: answerData.answer.replace(/\n/g, '<br/>')
                                 }}/>  */}


                            <div className="whitespace-pre-line font-averta-regular">{formatAnswer(answerData.answer, answerData)}</div>


                            <div className="dark:text-zinc-300 text-zinc-600 opacity-60 text-center items-center mt-20 font-averta-semibold">
                                Always check the passages before quoting. AI may not be 100% accurate.
                            </div>
                        </div>

                    }

                </div>
                {<div className={`${answerData.answer.length === 0 && "hidden"} mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`} ></div>}

                <p className={`text-greenColor dark:text-green-200  ml-10 mt-4 mb-4 font-averta-semibold ${answerData.answer.length === 0 && "hidden"}`} >

                    <TextSnippetIcon />  Passages
                </p>



                <div className="relative ">

                    {(answerData.sources !== undefined && answerData.sources.length !== 0 && isLoadingInside === false) &&
                        <div className="flex flex-col lg:flex-row ">
                            <button onClick={scrollBackward} type="button" className={`left-arrow hidden md:block justify-center my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${isBackwardArrowVisible ? '' : 'hidden'
                                }`}>
                                <div className="rounded-full  p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                                    <ArrowBackIosNewIcon className="cursor-pointer text-zinc-600 p-1 " />
                                </div>
                            </button>

                            <div className={`   flex  flex-row gap-4 overflow-x-scroll scroll-smooth carousel-area `} ref={carouselRef}>



                                {answerData.sources.map((source) => <SourceCard forDialog={false} source={source} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog} />)}






                            </div>

                            <button onClick={scrollForward} type="button" className={` right-arrow hidden md:block my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${isForwardArrowVisible ? 'block' : 'hidden'
                                }`}>
                                <div className="rounded-full p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                                    <ArrowForwardIosIcon className="cursor-pointer text-zinc-600 p-1 " />
                                </div>
                            </button>

                            <div className="flex flex-row mx-auto mt-6 md:hidden">
                                <button onClick={scrollBackward} type="button" className={`left-arrow justify-center my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none `}>
                                    <div className="rounded-full  p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                                        <ArrowBackIosNewIcon className={`${isBackwardArrowVisible ? "cursor-pointer text-zinc-500  " : " text-zinc-300 dark:text-zinc-700cursor-default"} p-1 `} />
                                    </div>
                                </button>
                                <button onClick={scrollForward} type="button" className={`  right-arrow my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none`}>
                                    <div className="rounded-full p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                                        <ArrowForwardIosIcon className={`${isForwardArrowVisible ? "cursor-pointer text-zinc-500" : "  text-zinc-300 dark:text-zinc-700 cursor-default"} p-1 `} />
                                    </div>
                                </button>
                            </div>
                        </div>



                    }


                </div>

                <Dialog maxWidth={"sm"} fullWidth={fullWidth} open={openDialog} onClose={() => setOpenDialog(false)} >
                    {answerData.sources !== undefined && answerData.sources.length !== 0 && answerData.sources.map((source) =>

                        <div ref={ref}>
                            {source === selectedSourceCard &&
                                <SourceCard forDialog={true} setFullWidth={setFullWidth} source={source} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog} />
                            }
                        </div>

                    )}

                </Dialog>
            </div>
        </div>


    )

}