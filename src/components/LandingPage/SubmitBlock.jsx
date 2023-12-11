import PublishIcon from '@mui/icons-material/Publish';

import { Button, Spinner } from "@material-tailwind/react";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Twitch from "../../img/twitch_full.png"
import Twitter from "../../img/twitter_square.png"
import Youtube from "../../img/youtube.png"
import ApplePodcast from "../../img/apple_podcasts.png"

import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



export default function SubmitBlock({ currentUser, tier, credit, handleSubmit, loading, inputValue, setInputValue, errorMessage, failed, inputRef }) {
    const navigate = useNavigate()


    const navigateCredit = () => {
        sessionStorage.setItem("creditPurchase", "true")
        navigate("/account")

    }

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    return (
        <div className="p-10 sm:pt-20 text-zinc-700 h-full sm:h-[70vh] dark:text-zinc-300 bg-white dark:bg-mildDarkMode  items-center  justify-center sm:px-20">
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

                <div className="w-full flex flex-col  px-1">


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
                                            <p onClick={navigateCredit} className={`text-indigo-400 underline mr-2  font-averta-semibold cursor-pointer`}>Need more credits? </p>

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

                            {/* <div className=" bottom-0 mt-20 relative text-zinc-500 dark:text-zinc-400 font-averta-semibold">
                                <p className="mb-6">Example links. Please make sure the link you are submitting is in the same format:</p>
                                <p>YouTube : https://www.youtube.com/watch?v=h6fcK_fRYaI</p>
                                <p>Twitter Spaces : https://twitter.com/i/spaces/1yoJMwnLObwKQ</p>
                                <p>Twitch : https://www.twitch.tv/videos/1965889164</p>
                                <p>Apple Podcasts : https://podcasts.apple.com/us/podcast/54-kevin-lee-immi-healthy-ramen/id1507881694?i=1000529427756</p>
                            </div>
 */}


                        </div>










                    </div>




                </div>

            </div>
            {currentUser && (tier === "basic" || tier === "premium") &&
                <div>
                    <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mt-10 dark:opacity-40 md:mt-20"></div>
                    <p className="mt-10 text-zinc-700 dark:text-zinc-300 font-averta-bold text-md">
                        Supported Platforms
                    </p>
                    <div className="flex flex-row bottom-0  mt-10 opacity-50 overflow-scroll ">

                        <img src={Youtube} height={10} width={80} title="YouTube" className=" mr-10 grayscale" />

                        <img src={Twitter} height={10} width={60} title="Twitter videos and Twitter Spaces" className="  mr-10 grayscale rounded-lg" />
                        <img src={Twitch} title="Twitch" height={10} width={60} className=" mr-10 grayscale rounded-lg" />
                        <img src={ApplePodcast} height={10} width={60} title="Apple Podcasts" className="  mr-10 grayscale" />

                    </div>
                </div>
            }


        </div>

    )
}