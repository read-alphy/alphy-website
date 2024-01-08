import React, { useState, useEffect, useRef } from 'react';

import { Button } from "@material-tailwind/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChatIcon from '@mui/icons-material/Chat';
import LinkIcon from '@mui/icons-material/Link';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArcBlock from '../../components/LandingPage/ArcBlock';


import UploadBlock from '../../components/LandingPage/UploadBlock';

import SubmitBlock from '../../components/LandingPage/SubmitBlock';


import { API_URL } from '../../constants';


export default function HubCreationBlock({ currentUser, tier, credit, dataGlobalArchipelagos, setDataGlobalArchipelagos }) {
    const [submitDialog, setSubmitDialog] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [failed, setFailed] = useState(false);
    const [uploadDialog, setUploadDialog] = useState(false);
    const [creationDialogMobile, setCreationDialogMobile] = useState(false);
    const [mobileWindow, setMobileWindow] = useState(window.innerWidth < 600);
    const [arcDialog, setArcDialog] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef(null)

    const handleButtonClick = () => {
        // current property is referring to the actual input element

        inputRef.current.focus();

    };

    if (localStorage.getItem("newItem") !== null) {
        if (localStorage.getItem("newItem") === "link") {
            setSubmitDialog(true)
            localStorage.setItem("newItem", null)
            sessionStorage.setItem("navigatedFromMainPage", "true")
        }
        else if (localStorage.getItem("newItem") === "upload") {
            setUploadDialog(true)
            localStorage.setItem("newItem", null)
            sessionStorage.setItem("navigatedFromMainPage", "true")
        }

    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 600) {
                setMobileWindow(true);
            }
            else {
                setMobileWindow(false);
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const handleSubmit = (event, selectedOption) => {


        if (!(
            inputValue.includes('https://www.youtube.com/watch') ||
            inputValue.includes('https://youtu.be') ||
            inputValue.includes('https://m.youtube.com') ||
            inputValue.includes('https://twitter.com/i/spaces') ||
            inputValue.includes('https://www.youtube.com/live') ||
            inputValue.includes('https://podcasts.apple.com') ||
            inputValue.includes('https://www.twitch.tv') ||
            inputValue.includes('https://www.twitch.com') ||
            inputValue.includes('https://twitter.com') ||
            inputValue.includes("https://x.com") ||
            inputValue.includes("https://x.com/i/spaces")
        )
        ) {
            setInputValue('');
            setErrorMessage('Please provide a link to a YouTube video, Twitter Space, Twitter video, Twitch recording, or an Apple Podcast.')
            setFailed(true)
            return;
        }
        else {
            let videoId
            let video_source
            //check if video already exists
            if (inputValue.includes('https://www.youtube.com')) {

                if (inputValue.includes('https://www.youtube.com/watch')) {
                    videoId = inputValue.split('/').pop().split('?v=')[1].split("&")[0];

                }
                else if (inputValue.includes('https://www.youtube.com/live')) {
                    videoId = inputValue.split('/').pop().split("?")[0];

                }
                video_source = "yt"


            }

            else if (inputValue.includes('https://youtu.be')) {
                videoId = inputValue.split('/').pop().split("?")[0];
                video_source = "yt"

            }

            else if (inputValue.includes('https://m.youtube.com')) {
                videoId = inputValue.split('/').pop().split('?v=')[1].split("&")[0];
                video_source = "yt"

            }
            else if (inputValue.includes('https://twitter.com/i/spaces')) {
                if (tier === "basic" || tier === "premium") {
                    videoId = inputValue.split('/').pop().split("?")[0];
                    video_source = "sp"
                }
                else {
                    setFailed(true)
                    setErrorMessage('Upgrade your plan to process Twitter Spaces. See Account page for more detail.');
                    return;
                }

            }

            else if (inputValue.includes("https://podcasts.apple.com")) {
                if (tier === "basic" || tier === "premium") {
                    const idRegex = /id(\d+)/;
                    const iRegex = /i=(\d+)/;

                    const idMatch = inputValue.match(idRegex);
                    const iMatch = inputValue.match(iRegex);

                    const podcastId = idMatch ? idMatch[1] : '';
                    const episodeId = iMatch ? iMatch[1] : '';

                    videoId = `${podcastId}-${episodeId}`;
                    video_source = "ap"
                }
                else {
                    setFailed(true)
                    setErrorMessage('Upgrade your plan to process Apple Podcasts. See Account page for more detail.');
                    return;
                }
            }
            else if (inputValue.includes("https://www.twitch.tv") || inputValue.includes("https://www.twitch.com")) {
                if (tier === "basic" || tier === "premium") {
                    const regex = /twitch\.(tv|com)\/videos\/(\d+)/;
                    const match = inputValue.match(regex);
                    videoId = match ? match[1] : null;

                    video_source = "tv"
                }
                else {
                    setFailed(true)
                    setErrorMessage('Upgrade your plan to process Twitch recordings. See Account page for more detail.');
                    return;
                }
            }

            else if ((inputValue.includes("https://x.com") || inputValue.includes("https://twitter.com")) && !inputValue.includes("i/spaces")) {
                if (tier === "basic" || tier === "premium") {
                    setInputValue(inputValue.split('/video/')[0])
                    const regex = /status\/(\d+)/;
                    const match = inputValue.split('/video/')[0].match(regex);
                    videoId = match ? match[1] : '';
                    video_source = "tw"
                }
                else {
                    setFailed(true)
                    setErrorMessage('Upgrade your plan to process Twitter videos. See Account page for more detail.');
                    return;
                }
            }

            if (currentUser) {
                setLoading(true);

                // get id token
                currentUser.getIdToken().then((idToken) => {

                    axios
                        .post(
                            `${API_URL}/sources/`,
                            {
                                url: video_source === "x" ? inputValue.split('/video/')[0] : inputValue
                            },
                            {
                                headers: {
                                    'id-token': idToken,
                                },
                            },
                        )
                        .then((response) => {
                            sessionStorage.setItem("refreshCredit", "true")


                            videoId = response.data.source_id
                            video_source = response.data.source_type

                            setErrorMessage("")
                            setLoading(false);
                            setFailed(false)
                            setInputValue('');
                            navigate(`/${video_source}/${videoId}`)

                        }).
                        catch((error) => {
                            console.log(error)
                            setLoading(false)
                            if (tier === "basic" || tier === "premium") {
                                setErrorMessage("There was an error submitting the form. Make sure you have enough credits for the submission.")
                            }

                            else {
                                if (error.response.data.detail == "Video not popular enough for free users") {
                                    setErrorMessage("Make sure the content you are submitting has more than 10,000 views.")
                                }
                                else if (error.response.data.detail == "Not enough minutes") {

                                    setErrorMessage("You don't have enough credits to submit this content.")
                                }
                                else if (error.response.data.detail == "Free users cannot submit twitter spaces") {
                                    setErrorMessage("Upgrade your plan to process Twitter Spaces. See Account page for more detail.");
                                }
                                else {
                                    setErrorMessage("There was an error submitting the form. Please try again.")
                                }


                            }
                            setFailed(true)
                            setInputValue('');
                            setLoading(false);
                            throw error;
                        });
                });
            } else {
                // sign in
                // navigate('/auth');
                setErrorMessage('Please sign in to submit content.');
            }
        }
    }

    const handleArcNavigation = () => {
        navigate('/arc/createArc')
    }

    const handleGoBack = () => {
        if (sessionStorage.getItem("navigatedFromMainPage") !== null) {
            navigate("/")

            setSubmitDialog(false)
            setUploadDialog(false)
            setArcDialog(false)
            sessionStorage.setItem("navigatedFromMainPage", null)
        }
        setSubmitDialog(false)
        setUploadDialog(false)
        setArcDialog(false)

    }

    return (
        <div className="md:mt-10 xl:mt-20 mx-auto ">



            {

                (!submitDialog && !uploadDialog && !arcDialog) &&

                <div className="hidden pt-10 lg:flex flex-row gap-6 sm:gap-10 lg:gap-20 w-full mx-auto justify-center xl:px-20   ">


                    <div className="flex flex-col gap-10">
                        <div className="text-xl text-stone-900  dark:text-zinc-300 text-center mb-10 font-averta-semibold">
                            Process New Content
                        </div>


                        <div className="min-h-[230px] max-h-[230px] bg-white  dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer w-[300px] transform hover:scale-105 transition duration-500 ease-in-out"

                            onClick={() => {
                                setSubmitDialog(true)
                                handleButtonClick()
                            }}>


                            <div className="flex flex-col items-center mx-auto px-5 pt-5 grid sm:grid-rows-5">
                                <p className="text-green-300 text-lg font-averta-semibold text-center row-span-1"> Submit a Link

                                </p>
                                <p className="hidden sm:block text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2 font-averta-semibold">
                                    Submit a link to an audiovisual content to process with Alphy.
                                </p>
                                <div className="row-span-1 w-full justify-center items-center flex">
                                    <LinkIcon fontSize={window.innerWidth > 600 ? "large" : "medium"} className="text-green-300 mx-auto mb-2" />
                                </div>
                                {/*  <button className="max-w-[150px] mx-auto px-5 py-2 bg-green-300 rounded-md text-white mb-5 row-span-1 dark:text-zinc-700 dark:font-averta-semibold">
                                                        Submit
                                                    </button> */}
                            </div>
                        </div>
                        <div className="min-h-[230px] max-h-[230px] bg-white  dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[300px] transform hover:scale-105 transition duration-500 ease-in-out">
                            <div className="flex flex-col items-center mx-auto px-5 pt-5 grid sm:grid-rows-5"
                                onClick={() => setUploadDialog(true)}>

                                <p className="text-indigo-400 text-lg font-averta-semibold text-center row-span-1">
                                    Upload a Recording
                                </p>
                                <p className="hidden sm:block text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2 font-averta-semibold">
                                    Import an audio file from your device to transcribe, summarize, and question privately.
                                </p>
                                <div className="row-span-1 w-full justify-center items-center flex">
                                    <CloudUploadIcon fontSize={window.innerWidth > 600 ? "large" : "medium"} className="text-indigo-300 mx-auto mb-2" />
                                </div>
                                {/*     <button className=" max-w-[150px] mx-auto px-5 py-2 bg-indigo-400  mb-5 rounded-md text-white   dark:text-zinc-700 dark:font-averta-semibold"
                                            >
                                                Upload
                                                </button> */}
                            </div>

                        </div>
                    </div>

                    <div className=" mt-10 border-r border-gray-200 dark:border-zinc-700 dark:opacity-40"></div>

                    <div className="justify-center flex flex-col ">

                        <div className="text-xl text-stone-900   font-averta-semibold dark:text-zinc-300 text-center mb-10">
                            Connect Audio with AI
                        </div>
                        <div className="min-h-[230px] max-h-[230px]  my-auto  bg-white  dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[300px]    transform hover:scale-105 transition duration-500 ease-in-out">
                            <div onClick={handleArcNavigation} className="flex flex-col items-center mx-auto px-5 pt-5 grid sm:grid-rows-5">

                                <p className="text-red-300 text-lg font-averta-semibold text-center mt-2 row-span-1">
                                    Create an Arc
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2 font-averta-semibold">
                                    {window.innerWidth > 600 ? "Build your own AI-assisted search engine on countless hours of audiovisual content."
                                        : "Build your AI assistants"}
                                </p>


                                <div className="row-span-1 w-full justify-center items-center flex mt-1">
                                    <ChatIcon fontSize={window.innerWidth > 600 ? "large" : "medium"} className="text-red-300 mx-auto mb-2 " />
                                </div>
                                {/*    <button className="hidden sm:block max-w-[150px] mx-auto px-5 py-2 bg-red-300 mb-5 rounded-md text-white dark:text-zinc-700 dark:font-averta-semibold"
                    >
                        Create
                            </button> */}
                            </div>
                        </div>
                    </div>
                </div>

            }

            {(!submitDialog && !uploadDialog && !arcDialog) &&
                <div className="dark:bg-darkMode lg:hidden justify-center h-full py-10 px-5 items-center overflow-y-scroll sm:min-h-[100vh] sm:max-h-[100vh] mt-20">

                    <p className="mb-10 text-xl font-averta-semibold text-zinc-600 dark:text-zinc-300 text-center">Start discovering Alphy's capabilities</p>
                    <div className="flex flex-col gap-6 sm:gap-10 lg:gap-20 w-full mx-auto justify-center xl:px-20 ">
                        <div className="bg-white mx-auto dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer w-[250px] transform hover:scale-105 transition duration-500 ease-in-out"
                            onClick={() => {
                                setSubmitDialog(true)
                                handleButtonClick()
                            }}>
                            <div className="flex flex-col items-center mx-auto px-5 pt-5 grid sm:grid-rows-5">
                                <p className="text-emerald-300 text-lg font-averta-semibold text-center row-span-1"> Submit a Link

                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2">

                                    {!mobileWindow ? "Submit a link to an audiovisual content to process with Alphy."
                                        : "Use Alphy on online content"}
                                </p>
                                <div className="row-span-1 w-full justify-center items-center flex mt-4 mb-4">
                                    <LinkIcon fontSize={window.innerWidth > 600 ? "large" : "medium"} className="text-emerald-200 mx-auto mb-2" />
                                </div>
                                <button className="hidden sm:block max-w-[150px] mx-auto px-5 py-2 bg-green-300 rounded-md text-white mb-5  dark:text-zinc-700 dark:font-averta-semibold">
                                    Submit
                                </button>
                            </div>
                        </div>
                        <div className="bg-white mx-auto dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                            <div className="flex flex-col items-center mx-auto px-5 pt-5 grid sm:grid-rows-5"
                                onClick={() => setUploadDialog(true)}>
                                <p className="text-indigo-400 text-lg font-averta-semibold text-center row-span-1">
                                    Upload a Recording
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2">
                                    {!mobileWindow ? " Import an audio file from your device to transcribe, summarize, and question privately"
                                        : "Process an audio file from your device"}

                                </p>
                                <div className="row-span-1 w-full justify-center items-center flex mt-4 mb-4">
                                    <CloudUploadIcon fontSize={window.innerWidth > 600 ? "large" : "medium"} className="text-indigo-300 mx-auto mb-2" />
                                </div>
                                <button className="hidden sm:block max-w-[150px] mx-auto px-5 py-2 bg-indigo-400  mb-5 rounded-md text-white row-span-1  dark:text-zinc-700 dark:font-averta-semibold"
                                >
                                    Upload
                                </button>
                            </div>

                        </div>
                        <div className=" bg-white mx-auto dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                            <div onClick={handleArcNavigation} className="flex flex-col items-center mx-auto px-5 pt-5 grid sm:grid-rows-5">
                                <p className="text-red-300 text-lg font-averta-semibold text-center row-span-1">
                                    Create an Arc
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2 ">
                                    {!mobileWindow ? "Build your own AI-assisted search engine as effortlessly as building a playlist."
                                        : "Create an AI assistant as simply as creating a playlist"}
                                </p>


                                <div className="row-span-1 w-full justify-center items-center flex mt-4 mb-4">
                                    <ChatIcon fontSize={window.innerWidth > 600 ? "large" : "medium"} className="text-red-300 mx-auto mb-2 " />
                                </div>
                                <button className="hidden sm:block max-w-[150px] mx-auto px-5 py-2 bg-red-300 mb-5 rounded-md text-white dark:text-zinc-700 dark:font-averta-semibold"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            }



            {submitDialog &&

                <SubmitBlock handleGoBack={handleGoBack} loading={loading} currentUser={currentUser} tier={tier} handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} credit={credit} failed={failed} errorMessage={errorMessage} handleButtonClick={handleButtonClick} inputRef={inputRef} />


            }

            {uploadDialog &&


                <UploadBlock handleGoBack={handleGoBack} currentUser={currentUser} tier={tier} credit={credit} />
            }

            {/*   {arcDialog &&
                <Dialog maxWidth="lg" fullWidth="true" open={arcDialog} onClose={() => setArcDialog(false)} >
                    <ArcBlock currentUser={currentUser} tier={tier} credit={credit} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} />
                </Dialog>

            } */}

        </div>
    )

}