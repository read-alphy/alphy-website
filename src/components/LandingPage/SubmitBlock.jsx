import PublishIcon from '@mui/icons-material/Publish';

import { Button, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Twitch from "../../img/twitch_full.png"
import Twitter from "../../img/twitter_square.png"
import Youtube from "../../img/youtube.png"
import ApplePodcast from "../../img/apple_podcasts.png"
import Spaces from "../../img/spaces_square.png"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';


export default function SubmitBlock({ currentUser, tier, credit, handleGoBack, handleSubmit, loading, inputValue, setInputValue, errorMessage, failed, inputRef }) {
    const navigate = useNavigate()
    const [showExampleLinks, setShowExampleLinks] = useState(false)


    const navigateCredit = () => {
        sessionStorage.setItem("creditPurchase", "true")
        navigate("/account")

    }

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    return (
        <div className="mt-10 sm:mt-20 text-zinc-700 h-full p-5 dark:text-zinc-300 max-w-[1000px] mx-auto items-center  justify-center sm:px-20">

            <div className="mb-10">
                <p onClick={() => handleGoBack()} className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200  ease-in transition cursor-pointer">
                    <KeyboardArrowLeftIcon fontSize="small" className="" />
                    <span className="text-sm  font-averta-semibold">Go Back</span>
                </p></div>

            <p className={`dark:text-zinc-300 text-zinc-700 mb-4 text-lg px-1 font-averta-semibold ${currentUser ? "" : "hidden"}`} >
                Submit your link below</p>
            <div className={`${currentUser ? "sm:grid sm:grid-cols-3 lg:grid-cols-4 mx-auto mt-5" : "hidden"}`}>
                <div className={`sm:col-span-2 lg:col-span-3 relative w-full min-w-[200px] h-12`}>
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder=" "

                        className="peer w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-zinc-700 dark:focus:border-r-greenColor  dark:focus:border-l-greenColor dark:focus:border-b-greenColor focus:border-greenColor" />
                    <label className=" font-averta-semibold text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-greenColor before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-greenColor after:border-blue-gray-200 peer-focus:after:!border-greenColor">
                        {window.innerWidth < 600 ? "Insert a link..." : "Insert a link to start..."}
                    </label>

                    <div className="sm:hidden">
                        <Button size="sm" className="!absolute right-1 top-1 rounded bg-green-300 font-averta-semibold" onClick={(e) => {
                            handleSubmit();
                        }}> <PublishIcon fontSize="medium" /></Button>
                    </div>
                </div>

                <div className={`hidden sm:block sm:col-span-1 mt-5 sm:mt-0 flex ml-5 justify-center md:justify-self-start items-center ${currentUser ? "" : ""}`}>

                    <div>


                        <Button size="sm" type="submit"
                            onClick={(e) => {
                                handleSubmit();
                            }} className={`bg-green-300 dark:text-zinc-700 px-6 py-3 text-sm lg:text-[15px] normal-case ${loading && "opacity-70 pointer-events-none"}`} >



                            {loading ? <Spinner></Spinner> : <p className="font-averta-semibold">Submit</p>}


                        </Button>
                    </div>

                </div>
            </div>
            {failed &&
                <div className="mx-auto mt-5 text-sm text-red-400 ml-2">
                    {errorMessage}
                </div>
            }
            <div className="flex items-center  mt-4 space-x-4 md:justify-center lg:mt-0  ">

                <div className="w-full flex flex-col">


                    {currentUser &&
                        <span className="text-sm mb-2 mt-4 text-gray-600 dark:text-zinc-300 ">

                            <div className="flex-col flex">
                                <div className="flex flex-row">
                                    <a href="/account" className="text-zinc-500 dark:text-zinc-400 font-averta-semibold">
                                        {tier === "free" && "Starter Plan"}
                                        {tier === "basic" && "Basic Plan"}
                                        {tier === "premium" && "Premium Plan"}

                                    </a>
                                    <p className="ml-1 mr-1 text-zinc-500 dark:text-zinc-400"> - </p>
                                    <p className=" text-zinc-500 dark:text-zinc-400 font-averta-semibold"> Remaining Credits : {Math.floor(credit)} minutes
                                    </p>
                                </div>

                            </div>
                        </span>

                    }
                    <div className=" space-y-2 mt-6 ">

                        {tier === "free" ?

                            currentUser ?
                                <div>
                                    {/* <p className="font-semibold text-md text-zinc-700 dark:text-zinc-200 font-averta-semibold">You are on the Starter Plan</p> */}
                                    <p className="mt-2 mb-2 font-averta-semibold text-zinc-600 dark:text-zinc-300">Available:</p>

                                    <div className="flex flex-row"><CheckCircleIcon className="text-green-300 p-1" /><p className="text-zinc-500 dark:text-zinc-400 font-averta-semibold">YouTube</p></div>
                                    <div className="flex flex-row"><CheckCircleIcon className="text-zinc-300 p-1" /><p className="line-through text-zinc-500 dark:text-zinc-400 font-averta-semibold">Twitter Spaces</p></div>
                                    <div className="flex flex-row"><CheckCircleIcon className="text-zinc-300 p-1" /><p className="line-through text-zinc-500 dark:text-zinc-400 font-averta-semibold">Twitter videos</p></div>

                                    <div className="flex flex-row"><CheckCircleIcon className="text-zinc-300 p-1" /><p className="line-through text-zinc-500 dark:text-zinc-400 font-averta-semibold">Twitch</p></div>

                                    <div className="flex flex-row"><CheckCircleIcon className="text-zinc-300 p-1" /><p className="line-through text-zinc-500 dark:text-zinc-400 font-averta-semibold">Apple Podcasts</p></div>

                                    <p className="dark:text-zinc-300 text-zinc-500 mb-3 mt-6 font-averta-semibold"> Switch to a <a href="/u/account" className="text-greenColor  underline"> paid plan</a> to for limitless access.</p>



                                </div>
                                :
                                <div className="text-zinc-600 dark:text-zinc-400 font-averta-regular">
                                    <a className="text-greenColor font-semibold underline" href="/u/login"> Sign in</a> to process content with Alphy.
                                </div>
                            :
                            null
                        }


                        <div className=" flex flex-col text-sm">

                            {
                                currentUser ?
                                    (tier !== "free"
                                        &&

                                        <div>
                                            <p onClick={navigateCredit} className={`text-indigo-400 underline font-averta-semibold cursor-pointer`}>Need more credits? </p>

                                        </div>

                                    )
                                    :
                                    null
                            }

                            {/*    <div className="flex flex-col ">
                                <Button onClick={navigateCredit} size="sm" className={`bg-indigo-300 ${(tier === "basic" || tier === "premium") ? "" : "pointer-events-none opacity-50"} text-white mt-4 w-[100px] font-averta-semibold`}>

                                    <span className="mt-1 dark:text-zinc-800">Buy here</span>


                                </Button>

                            </div> */}




                        </div>










                    </div>




                </div>

            </div>

            {currentUser &&
                <div>
                    <p onClick={() => setShowExampleLinks(!showExampleLinks)} className="mt-10 relative text-zinc-500 dark:text-zinc-400 font-averta-semibold cursor-pointer">Example Links <HelpIcon /></p>
                    {showExampleLinks &&
                        < div className=" bottom-0 mt-10 relative text-zinc-500 dark:text-zinc-400 font-averta-semibold">
                            <p className="mb-6"> Please make sure the link you are submitting is in one of the following formats:</p>
                            <p className="mt-4">YouTube : https://www.youtube.com/watch?v=h6fcK_fRYaI</p>
                            <p className="mt-4">Twitter / X Spaces : https://twitter.com/i/spaces/1yoJMwnLObwKQ</p>
                            <p className="mt-4">Twitter / X Videos : https://twitter.com/i/status/1731765772874129676</p>
                            <p className="mt-4">Twitch : https://www.twitch.tv/videos/1965889164</p>
                            <p className="mt-4">Apple Podcasts : https://podcasts.apple.com/us/podcast/54-kevin-lee-immi-healthy-ramen/id1507881694?i=1000529427756</p>
                        </div>}
                </div>
            }

            {currentUser && (tier === "basic" || tier === "premium") &&
                <div>

                    <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mt-5 mb-5 dark:opacity-40"></div>


                    <div className="flex flex-col text-zinc-700 dark:text-zinc-300 font-averta-semibold text-md sm:text-lg mt-4">
                        Supported Platforms
                        <div className="flex flex-row mt-4 sm:mt-10 opacity-50 overflow-scroll">
                            <img src={Youtube} height={20} width={120} title="YouTube" className="sm:mr-6 lg:mr-10 grayscale w-1/3 mx-2 max-w-[120px]" />
                            <img src={Twitter} height={20} width={80} title="Twitter / X videos" className="grayscale rounded-xl  sm:mr-6 lg:mr-10 w-1/3  px-2 max-w-[100px]" />
                            <img src={Spaces} height={20} width={80} title="Twitter / X Spaces" className="grayscale rounded-xl sm:mr-6 lg:mr-10 w-1/3  px-2 max-w-[100px]" />
                            <img src={Twitch} title="Twitch" height={20} width={80} className="sm:mr-6   grayscale rounded-xl lg:mr-10 w-1/3  px-2 max-w-[100px]" />
                            <img src={ApplePodcast} height={20} width={80} title="Apple Podcasts" className="grayscale rounded-lg  sm:mr-6 lg:mr-10 w-1/3  px-2 max-w-[100px]" />
                        </div>
                    </div>
                </div>
            }
        </div >

    )
}