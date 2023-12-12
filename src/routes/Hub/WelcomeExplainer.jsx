
import React from "react";
import { Link } from "react-router-dom"
import Twitch from "../../img/twitch_full.png"
import Twitter from "../../img/twitter_square.png"
import Youtube from "../../img/youtube.png"
import ApplePodcast from "../../img/apple_podcasts.png"





export default function WelcomeExplainer() {



    return (
        <div>
            <div className="w-full  mx-auto  md:pl-10  lg:pl-16 xl:pl-20 2xl:pl-40  overflow-hidden pb-10">

                <div className="pl-5 pr-5">
                    <p className="text-zinc-700 dark:text-zinc-300 mb-5 mx-auto mt-4 text-xl md:text-[30px] font-averta-semibold ">Save time and learn better from audiovisual content.</p>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-5  mt-4 text-md md:text-[20px] font-averta-regular max-w-[600px]"> Join the Alphy community to transcribe, summarize, and create interactive learning experiences from audiovisual content with AI.
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
                    <div className="flex flex-col text-zinc-700 dark:text-zinc-300 font-averta-bold text-lg">
                        Supported Platforms
                        <div className="flex flex-row mt-10 opacity-50 overflow-scroll">
                            <img src={Youtube} height={20} width={110} title="YouTube" className="mr-6 grayscale" />
                            <img src={Twitter} height={20} width={80} title="Twitter videos and Twitter Spaces" className="grayscale rounded-lg mr-6" />
                            <img src={Twitch} title="Twitch" height={20} width={80} className="mr-6 grayscale rounded-lg" />
                            <img src={ApplePodcast} height={20} width={80} title="Apple Podcasts" className="grayscale" />
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )




}