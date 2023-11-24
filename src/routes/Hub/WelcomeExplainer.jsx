
import React from "react";
import { Link } from "react-router-dom"




export default function WelcomeExplainer() {



    return (
        <div>
            <div className="w-full  mx-auto  md:pl-10  lg:pl-16 xl:pl-20 2xl:pl-40  overflow-hidden">

                <div className=" pl-5 ">
                    <p className="text-zinc-700 dark:text-zinc-300 mb-5 mx-auto mt-4 text-xl md:text-3xl font-averta-semibold ">Save time and learn better from audiovisual content.</p>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-5  mt-4 text-md md:text-xl font-averta-regular max-w-[600px]"> Join the Alphy community to transcribe, summarize, and create interactive learning experiences from audiovisual content with AI.
                    </p>
                    {/* 
                    Works on:
                    Upload an Audio File
                    Transcribe an Online Conversation   
                    Create a Chatbot */}


                    <div className="container flex flex-row  mt-16 gap-3 xs:gap-6 pb-10 ">

                        {/*  <Link to="/submit" className={`text-zinc-700  transition duration-300 ease-in-out ${submitLayout ? " drop-shadow-sm ":"drop-shadow-lg  scale-105 transform"}   bg-green-200 text-zinc-600 dark:text-zinc-700 rounded-lg px-2 text-md max-w-[120px] flex flex-row py-2`} >
 
         
             <p>Start Creating</p>
            
         </Link>
         {currentUser ? null : <Link to="/u/register" className="text-green-300 dark:text-green-200 font-semibold underline ml-10 pt-2">Sign in</Link>} */}

                        <div className="flex flex-col max-w-[120px] sm:max-w-[180px] ">



                            <Link to="/submit" onClick={() => { localStorage.setItem("newItem", "link") }} className="rounded-lg text-zinc-600  text-center text-sm xs:text-md bg-green-100 px-2 py-2  font-averta-semibold drop-shadow-md">Submit a Link
                            </Link>

                            <p className="flex flex-col mt-8  h-[90px] hidden sm:flex">
                                <span className="text-zinc-500 dark:text-zinc-400 text-md font-averta-regular px-2">Get key insights from YouTube videos and Twitter Spaces</span>
                            </p>


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

                </div>
            </div>
        </div>
    )




}