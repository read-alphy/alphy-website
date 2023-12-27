
import React from "react";
import { Link } from "react-router-dom"
import Twitch from "../../img/twitch_full.png"
import Twitter from "../../img/twitter_square.png"
import Youtube from "../../img/youtube.png"
import ApplePodcast from "../../img/apple_podcasts.png"
import Spaces from "../../img/spaces_square.png"
import { Shine } from "frosted-ui"





export default function WelcomeExplainer() {



    return (
        <div>
            <div className="w-full  mx-auto  md:pl-10  lg:pl-16 xl:pl-20 2xl:pl-40  overflow-hidden pb-10">

                <div className="pl-5 pr-5">
                    <p className="text-zinc-700 dark:text-zinc-300 mb-5 mx-auto mt-4 text-2xl sm:text-[30px] sm:mt-10  font-averta-semibold ">Save time and learn better from audiovisual content.</p>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-5  mt-4 text-md md:text-[16px]font-averta-regular max-w-[600px]"> Join the Alphy community to transcribe, summarize, and create interactive learning experiences from audiovisual content with AI.
                    </p>

                    <div className="container flex flex-row  mt-16 gap-3 xs:gap-6 pb-10 ">



                        <div className="flex flex-col max-w-[120px] sm:max-w-[180px] ">



                            <Link to="/submit" onClick={() => { localStorage.setItem("newItem", "link") }} className="rounded-lg text-zinc-600  text-center text-sm xs:text-md bg-green-100 px-2 py-2  font-averta-semibold drop-shadow-md">Submit a Link
                            </Link>

                            <p className="flex flex-col mt-8  h-[90px] hidden sm:flex">
                                <span className="text-zinc-500 dark:text-zinc-400 text-md font-averta-regular px-2 flex flex-col">Get key insights from best audiovisual content on the web

                                    {/*   <span className="mt-2">YouTube videos</span>
                                    <span>Twitter Spaces</span> <span>Twitter videos</span> <span>Twitch recordings</span> <span>Apple Podcasts</span> */}
                                </span></p>


                        </div>
                        <div className="flex flex-col max-w-[120px] sm:max-w-[180px]">

                            <Link to="/submit" onClick={() => { localStorage.setItem("newItem", "upload") }} className="rounded-lg text-zinc-600 text-center text-sm xs:text-md bg-indigo-100 px-2 py-2  font-averta-semibold drop-shadow-md">Upload a File</Link>
                            <p className="flex flex-col mt-8  h-[90px] hidden sm:flex">
                                <span className="text-zinc-500 dark:text-zinc-400 text-md font-averta-regular px-2"> Import meetings, lectures, seminars, or any recording for transcription</span>
                            </p>
                        </div>


                        <div className="flex flex-col max-w-[120px] sm:max-w-[180px]">


                            <Link to="/arc/createArc" className="rounded-lg text-zinc-600 text-center text-sm xs:text-md bg-red-100 px-2 py-2 font-averta-semibold drop-shadow-md">Create an Arc</Link>
                            <p className="flex flex-col mt-8  h-[90px] hidden sm:flex">
                                <span className="text-zinc-500 dark:text-zinc-400 text-md font-averta-regular px-2">Learn interactively by asking questions to hundreds of hours of videos</span>
                            </p>


                        </div>


                    </div>
                    <Shine puffyness="1">
                        <div className="flex flex-col text-zinc-700 dark:text-zinc-300 font-averta-bold text-md sm:text-lg mt-10">
                            Supported Platforms
                            <div className="flex flex-row mt-4 sm:mt-10gap-y-4 opacity-80 overflow-scroll">
                                <img src={Youtube} height={20} width={135} title="YouTube" className="sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3 mx-2 max-w-[160px]" />
                                <img src={Twitter} height={20} width={80} title="Twitter / X videos" className="  sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3  px-2 max-w-[130px]" />
                                <img src={Spaces} height={20} width={80} title="Twitter / X Spaces" className="  sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3  px-2 max-w-[130px]" />
                                <img src={Twitch} title="Twitch" height={20} width={80} className="sm:mr-4 lg:mr-10 justify-center sm:w-2/12 w-1/6 lg:w-1/3  px-2 max-w-[130px]" />
                                <img src={ApplePodcast} height={20} width={80} title="Apple Podcasts" className=" justify-center  sm:mr-4 lg:mr-10 w-1/6 sm:w-2/12 lg:w-1/3  px-2 max-w-[130px]" />
                            </div>
                        </div>
                    </Shine>
                </div>



            </div>
        </div>
    )




}