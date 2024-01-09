
import React, { useState } from "react";
import { Link } from "react-router-dom"
import Twitch from "../../img/twitch_full.png"
import Twitter from "../../img/twitter_square.png"
import Youtube from "../../img/youtube.png"
import ApplePodcast from "../../img/apple_podcasts.png"
import Spaces from "../../img/spaces_square.png"
import { Shine } from "frosted-ui"
import axios from "axios"
import { API_URL } from "../../constants"
import LitmusDemo from "../../img/litmus_demo.mp4"
import ChromeIcon from "../../img/chrome_icon.png"
import { Button } from '@material-tailwind/react';
import AboutMainPage from "./AboutMainPage.jsx"
import FooterMainPage from "./FooterMainPage.jsx"



export default function WelcomeExplainer({ currentUser }) {
    const [totalMinutes, setTotalMinutes] = useState(0)

    axios.get(`${API_URL}/stats`).then((res) => {
        if (res.data.total_mins !== undefined && res.data.total_mins !== null) {
            setTotalMinutes(res.data.total_mins)
        }
    })

    return (
        <div>
            <div className="w-full  mx-auto  md:pl-10  lg:pl-16 xl:pl-20 2xl:pl-40  overflow-hidden pb-10">

                <div className="pl-5 pr-5 mt-4  sm:mt-10 lg:mt-20 ">
                    {totalMinutes > 0 &&
                        <div className="flex flex-row ">
                            <p className="bg-gradient-to-r from-pink-200 to-amber-100 via-red-200 rounded-lg px-2 py-1   font-bold text-zinc-900 text-md xs:text-lg">{Math.floor(totalMinutes).toLocaleString()} <span className="font-averta-regular text-sm xs:text-lg">minutes processed with Alphy </span ></p>
                        </div>
                    }
                    <p className="text-zinc-900 dark:text-zinc-300 mb-5 mt-4 mx-auto text-3xl xs:text-4xl text-[30px]   font-bold  ">Save time and learn better from audiovisual content.</p>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-5  mt-4 text-lg xs:text-xl lg:text-xl font-averta-regular font-normal max-w-[600px]"> Join the Alphy community to transcribe, summarize, and ask questions to online and offline audiovisual content.
                    </p>
                    <div className={`mt-8 flex flex-row`}>
                        <Link to="/submit" className={`rounded-lg  text-zinc-800  text-center text-md sm:text-md bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-50 to-teal-100  px-4 py-3 font-averta-semibold drop-shadow-sm ${currentUser ? "w-[200px]" : "w-[250px]"}`}>
                            {currentUser ? window.innerWidth < 400 ? "New Submit" : "Submit New Content" : "Start Your Journey Now"}
                        </Link>
                        {currentUser &&
                            <Link to="/myhub" className="rounded-lg  text-zinc-800  text-center text-md sm:text-md bg-none border border-zinc-700 dark:border-zinc-500 dark:text-zinc-300 ml-4  px-4 py-3 font-averta-semibold drop-shadow-sm w-[150px]">
                                {window.innerWidth < 400 ? " Your Hub" : "Go to Your Hub"}
                            </Link>
                        }
                    </div>

                    <Shine puffyness="1">
                        <div className="flex flex-col text-zinc-700 dark:text-zinc-300 font-averta-bold text-lg mt-16 md:mt-24">
                            Supported Online Platforms
                            <div className="flex flex-row mt-4 sm:mt-8 gap-y-4 opacity-80 overflow-scroll">
                                <img src={Youtube} height={20} width={135} title="YouTube" className="sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3 mx-2 max-w-[160px]" />
                                <img src={Twitter} height={20} width={80} title="Twitter / X videos" className="  sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3  px-2 max-w-[130px]" />
                                <img src={Spaces} height={20} width={80} title="Twitter / X Spaces" className="  sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3  px-2 max-w-[130px]" />
                                <img src={Twitch} title="Twitch" height={20} width={80} className="sm:mr-4 lg:mr-10 justify-center sm:w-2/12 w-1/6 lg:w-1/3  px-2 max-w-[130px]" />
                                <img src={ApplePodcast} height={20} width={80} title="Apple Podcasts" className=" justify-center  sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3  px-2 max-w-[130px]" />
                            </div>
                        </div>
                    </Shine>

                    {/*                     <div className="flex flex-col mt-16">
                        <p className="text-xl">What can you do with Alphy?</p>


                        <div className="container flex flex-row  mt-8 gap-3 xs:gap-6 pb-10 ">





                            <div className="flex flex-col max-w-[120px] sm:max-w-[180px] ">



                                <p className="flex flex-col  h-[90px] hidden sm:flex">

                                    <span className="text-zinc-500 dark:text-zinc-400 text-md font-normal flex flex-col">Get key insights from the best audiovisual content on the web

                                     
                                    </span></p>


                            </div>
                            <div className="flex flex-col max-w-[120px] sm:max-w-[180px]">

                                
                                <p className="flex flex-col  h-[90px] hidden sm:flex">
                                    <span className="text-zinc-500 dark:text-zinc-400 text-md font-normal"> Import meetings, lectures, seminars, or any recording</span>
                                </p>
                            </div>


                            <div className="flex flex-col max-w-[120px] sm:max-w-[180px]">


                                
                                <p className="flex flex-col h-[90px] hidden sm:flex">
                                    <span className="text-zinc-500 dark:text-zinc-400 text-md font-normal">Create AI agents on hundreds of hours of content</span>
                                </p>


                            </div>


                        </div>
                    </div> */}
                    <div className="mt-10 sm:mt-20 xl:mt-40 flex flex-col" >
                        <div className="flex flex-col">
                            <p className="text-2xl text-zinc-900 dark:text-zinc-200">Meet Alphy's extension: Supercharge YouTube search with AI </p>
                            <span className="text-zinc-500 dark:text-zinc-400 mb-5  mt-4 text-md lg:text-lg md:text-[16px] font-averta-regular font-normal max-w-[800px]">
                                No need to watch. No need to summarize. Simply search YouTube and Alphy will give you direct answers from the top videos, complete with timestamps and source links.</span>



                        </div>
                        <div className="mb-10 mt-5">
                            <a className="" href="https://chrome.google.com/webstore/detail/alphy/eifpdfgnodpopimeakmdebmfglimkdno " target="_blank">


                                <button className=" rounded-lg flex flex-row normal-case bg-white dark:bg-mildDarkMode items-center border border-zinc-700 dark:border-zinc-700  px-2 py-3 w-[300px]">
                                    <div className="mx-auto flex flex-row items-center">
                                        <img src={ChromeIcon} width={40} />
                                        <span className="text-xl pl-4  font-averta-regular text-zinc-900 dark:text-zinc-300">Install on Chrome</span>
                                    </div>
                                </button>
                            </a>
                            <div>

                            </div>

                        </div>
                    </div>
                    <video className="3xl:max-w-[1000px] border-4 rounded-lg border-zinc-900 dark:border-zinc-400 drop-shadow-lg" autoPlay loop muted>
                        <source src={LitmusDemo} type="video/mp4" />
                    </video>

                </div>

                <div className="sm:hidden">
                    <AboutMainPage />
                </div>

            </div>
            <div className="sm:hidden">
                <FooterMainPage currentUser={currentUser} />

            </div>
        </div>
    )




}