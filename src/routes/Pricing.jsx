import React from "react";
import "tailwindcss/tailwind.css";
import { Carousel } from "react-responsive-carousel";
import { useAuth } from '../hooks/useAuth';
import { useWindowSize } from '../hooks/useWindowSize';
import axios from 'axios';
import { useState } from 'react';
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import ReactLoading from 'react-loading';
import {
	Popover,
	PopoverHandler,
	PopoverContent,
    ThemeProvider,
    Button

  } from "@material-tailwind/react";






export default function Pricing({ stripePromise,hasActiveSub }) {
    
    const { currentUser } = useAuth();
    const windowSize = useWindowSize();
    const [subscription, setSubscription] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [canceledAtPeriodEnd, setCanceledAtPeriodEnd] = useState(false);

    
    const [called, setCalled] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [credit, setCredit] = useState(null);
    const auth = useAuth();

    const stripe = useStripe();
    const [subscriptionData, setSubscriptionData] = useState(null);
    const navigate = useNavigate()
    let userStripeId = "";
    const [isDarkMode, setDarkMode] = useState(localStorage.theme || "light");

    const [openPopover, setOpenPopover] = useState(false);
    const[openPopover1, setOpenPopover1] = useState(false);

   


    //Popover
    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
      };

      const triggers1 = {
        onMouseEnter: () => setOpenPopover1(true),
        onMouseLeave: () => setOpenPopover1(false),
      };


      const themePopover = {
        popover: {
          styles: {
            base: {
              bg: "bg-zinc-50 dark:bg-mildDarkMode",
              color: "text-zinc-600 dark:text-zinc-200",
              border:"border-2 border-zinc-100 dark:border-mildDarkMode",
              
            },
          },
        },
      };
    
    useEffect(() => {
        // can be removed just for debugging

        if (currentUser !== null && called === false) {
            navigate("/account")
            setTimeout(() => {
                try {
                   
                    setTimeout(() => {
                        setIsLoaded(true)
                    }, 400)

                } catch (e) {
                    console.log(e)
                    setTimeout(() => {
                        setIsLoaded(true)
                    }, 400)
                }



            }, 1200)
        
        }
        else{
            setIsLoaded(true)
        }
       
    }, [currentUser]);
    

  




    const handleLoginWithGoogle = () => {
        auth.loginWithGoogle().then(() => {
            window.location.reload()
        })
    };

    return (
        <div className="dark:bg-darkMode ">
            {isLoaded ?

                <div className="dark:bg-darkMode">

                    {
                        windowSize.width > 999 ?


                            <div className=" w-full pt-20 grid grid-col-3 mb-30 items-center margin-auto">
                                <p className="text-center text-blueLike  dark:bg-darkMode dark:text-zinc-300 text-5xl font-bold mb-20">Choose the best plan for you</p>
                              
                            {/* <div className="items-center flex justify-center"><label className="relative inline-flex items-center ">
                            <input type="checkbox" value="" className="sr-only peer" onClick={handleDarkMode}/>
                            <div className="w-11 cursor-pointer h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium pointer-events-none text-gray-900 dark:text-gray-300">{isDarkMode=="dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}</span>
                            </label> </div> */}

                                <div className="flex flex-wrap justify-center md:space-x-4 md:items-stretch">
                                    <div className="col-span-1 md:min-w-[400px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">


                                        <h5 className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Free</h5>
                                        {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Wanderers</h5> */}
                                        <div className="flex items-baseline text-gray-900 dark:text-white">
                                            {/* <span className="text-3xl font-semibold">$</span> */}
                                            <span className="text-5xl font-extrabold tracking-tight">Free</span>
                                            {/* <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span> */}
                                        </div>
                                        <p className="mt-3 text-gray-400">Discover Alphy's capabilities </p>
                                        <div className="h-[400px]">
                                            <ul role="list" className="space-y-5 my-7">
                                                <li className="flex space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                                                </li>

                                                <li className="flex mt-20 space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Access Alphy's public database</span>
                                                </li>
                                                <li className="flex space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">2 hours of free transcription for YouTube</span>
                                                </li>
                                           
                                                <li className="flex space-x-3">


                                                    {/*    <p className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                        Standard Questioning <button id="popoverButton1" data-popover-target="popoverDescription1" data-popover-placement="right" data-popover-offset="20" type="button"><svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button></p>

                                                    <div data-popover id="popoverDescription1" role="tooltip" className={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 dark:bg-darkMode border rounded-lg shadow-sm opacity-0 w-72`}>
                                                        <div className="p-3 space-y-2">
                                                            <p> Rate limits may apply for rapid queries.</p>

                                                        </div>
                                                        <div className="popover-arrow" role="presentation"></div>
                                                    </div> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Ask questions to Alphy</span>
                                                </li>
                                                {/*      <li className="flex space-x-3">
                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Browser Extension</span>
                                    </li> */}
                                                <li className="flex space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Submit content up to 1 hour</span>
                                                </li>
                                                <li className="flex space-x-1">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">10,000 view limit on videos</span> */}
                                                    <Popover open={openPopover1} handler={setOpenPopover1}>
                                                    <p className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                        Content popularity limit </p>
                                                        <PopoverHandler {...triggers1} >
                                                        <svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                                        </PopoverHandler>
                                                    <ThemeProvider value={themePopover}>
                                                    <PopoverContent {...triggers1}>
                                                            <p> You can only submit videos with greater than <strong className="underline">10,000 views</strong></p>
                                                            </PopoverContent>
                                                        </ThemeProvider>
                                                        
                                                            </Popover>
                                                    </li>

                                                <li className="flex space-x-3 pt-4">


                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                    </span>
                                                </li>

                                            </ul>
                                        </div>

                        
                                        {currentUser ?
                                            <a target="_blank" href={hasActiveSub && !canceledAtPeriodEnd && "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"}>
                                                <Button type="button" className={` bg-zinc-600  font-semibold ${hasActiveSub && !canceledAtPeriodEnd ? "bg-zinc-700  dark:bg-darkMode dark:bg-zinc-700" : "pointer-events-none"} rounded-lg text-white text-[14px] px-5 py-4 inline-flex justify-center w-full text-center`} >{currentUser ? (hasActiveSub && !canceledAtPeriodEnd  ? "Switch Back To Free" : "Active") : "Sign Up For Free"}</Button>
                                            </a>
                                            :
                                            <a href="/u/login" type="button"> 
                                            <Button className="text-white bg-greenColor transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-white text-[16px]">{currentUser ? "Active" : "Sign Up For Free"}</Button></a>
                                        }






                                    </div>







                                    <div className="col-span-2 max-w-sm md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">
                                        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">Premium</h5>
                                        {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
                                        <div className="flex items-baseline text-gray-900 dark:text-white">
                                            <span className="text-3xl font-semibold">$</span>
                                            <span className="text-5xl font-extrabold tracking-tight">5</span>
                                            <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span>
                                        </div>
                                        <p className="mt-3 text-gray-400">Level up your reach </p>
                                        <div className="h-[400px]">
                                            <ul role="list" className="space-y-5 my-7">
                                                <li className="flex space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                                                </li>
                                                <li className="flex space-x-3">


                                                    <span className="text-l font-normal leading-tight text-gray-500 dark:text-zinc-300">Everything on the Basic Plan plus:</span>
                                                </li>

                                                <li className="flex space-x-3">

                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Extra 10 hours of prioritized transcription credits per month</span>
                                                </li>

                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No duration limit for submissions</span>
                                                </li>

                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No popularity limit</span>
                                                </li>
                                                <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Process lcoal audio files</span>
                                            </li>
                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}


                                                    <Popover open={openPopover} handler={setOpenPopover }>
                                                    <div className="flex flex-row">
                                                        
                                                            
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Multi-language translation </span>
                                                    
                                                    <PopoverHandler {...triggers} >
                                                    <svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                                    </PopoverHandler>
                    <ThemeProvider value={themePopover}>
                                                    <PopoverContent {...triggers}>
                                                        <p className="">Generate summaries and ask questions to any content in over 50 languages, regardless of the language of the content.
                                                        <br></br>
                                                       </p>
                                                    </PopoverContent>
                                                    </ThemeProvider>
                                                    </div>
                                                    </Popover>
                                                </li>
                                                <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts</span>
                                            </li>
                                                
                                                <li className="flex space-x-3">

                                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
                                                    </li>   

                                           {/*      <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                                                </li>
 */}
                                            </ul>
                                        </div>
                                        <a className={`${hasActiveSub ? "pointer-events-none" : ""}`} href={(currentUser && !hasActiveSub) && `/plans/checkout`}>
                                        {currentUser ? <Button type="button" className={` bg-greenColor  transition duration-200 ease-in ${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none text-whiteLike" : ""} rounded-lg text-[16px] font-semibold ]px-5 py-3 inline-flex text-white justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : (canceledAtPeriodEnd ? "Renew Plan" : "Upgrade Plan")}</Button> : <div></div>}
                                        </a>



                                    </div>







                                </div>

                            </div>



                            :

                            <div className="mb-20">

                                <p className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-4xl font-semibold mt-20 mb-10">Manage Subscription </p>
                                {hasActiveSub ? <div className="items-center flex flex-row justify-center"><a className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-10" target="_blank" href="https://billing.stripe.com/p/login/test_fZecNT7855nQ2Y0aEE">Change your billing plan or cancel subscription</a> </div> : null}
                                <div className="w-full md:min-w-[400px] items-center mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 mb-10">

                                    <h5 className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Free</h5>
                                    {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Wanderers</h5> */}
                                    <div className="flex items-baseline text-gray-900 dark:text-white">
                                        {/* <span className="text-3xl font-semibold">$</span> */}
                                        <span className="text-5xl font-extrabold tracking-tight">Free</span>
                                        {/* <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span> */}
                                    </div>
                                    <p className="mt-3 text-gray-400">Discover Alphy's capabilities </p>
                                    <div className="h-[360px]">
                                        <ul role="list" className="space-y-5 my-7">
                                            <li className="flex space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                                            </li>

                                            <li className="flex mt-20 space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Access Alphy's public database</span>
                                            </li>
                                            <li className="flex space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">2 hours of free transcription for YouTube</span>
                                            </li>
                                            <li className="flex space-x-3">
                                                     {/*    <p className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                        Standard Questioning <button id="popoverButton1" data-popover-target="popoverDescription1" data-popover-placement="right" data-popover-offset="20" type="button"><svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button></p>

                                                    <div data-popover id="popoverDescription1" role="tooltip" className={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 dark:bg-darkMode border rounded-lg shadow-sm opacity-0 w-72`}>
                                                        <div className="p-3 space-y-2">
                                                            <p> Rate limits may apply for rapid queries.</p>

                                                        </div>
                                                        <div className="popover-arrow" role="presentation"></div>
                                                    </div> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Ask questions to Alphy</span>
                                            </li>
                                            {/*      <li className="flex space-x-3">
                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Browser Extension</span>
                                    </li> */}
                                            <li className="flex space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Submit content up to 1 hour</span>
                                            </li>
                                            <li className="flex space-x-1">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">10,000 view limit on videos</span> */}
                                                <Popover open={openPopover1} handler={setOpenPopover1}>
                                                <p className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                    Content popularity limit </p>
                                                    <PopoverHandler {...triggers1} >
                                                    <svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                                    </PopoverHandler>
                                                <ThemeProvider value={themePopover}>
                                                <PopoverContent {...triggers1}>
                                                        <p> You can only submit videos with greater than <strong className="underline">10,000 views</strong></p>
                                                        </PopoverContent>
                                                    </ThemeProvider>
                                                    
                                                        </Popover>
                                                </li>

                                            <li className="flex space-x-3 pt-4">


                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                </span>
                                            </li>


                                        </ul>
                                    </div>
                                    {currentUser ?
                                        <a target="_blank" href={hasActiveSub && "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"}>
                                            {currentUser ? <Button type="button" className={` bg-greenColor  transition duration-200 ease-in ${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none text-whiteLike" : ""} rounded-lg text-[16px] font-semibold ]px-5 py-3 inline-flex text-white justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : (canceledAtPeriodEnd ? "Renew Plan" : "Upgrade Plan")}</Button> : <div></div>}
                                        </a>
                                        :
                                        <a href="/u/login" type="button"> 
                                            <Button className="text-white bg-greenColor transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-white text-[16px]">{currentUser ? "Active" : "Sign Up For Free"}</Button></a>
                                    }
                                </div>







                                <div className="items-center mx-auto max-w-sm md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">
                                    <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">Premium</h5>
                                    {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
                                    <div className="flex items-baseline text-gray-900 dark:text-white">
                                        <span className="text-3xl font-semibold">$</span>
                                        <span className="text-5xl font-extrabold tracking-tight">5</span>
                                        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span>
                                    </div>
                                    <p className="mt-3 text-gray-400">Level up your reach </p>
                                    <div className="h-[360px]">
                                        <ul role="list" className="space-y-5 my-7">
                                            <li className="flex space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                                            </li>
                                            <li className="flex space-x-3">


                                                <span className="text-l font-normal leading-tight text-gray-500 dark:text-zinc-300">Everything on the Basic Plan plus:</span>
                                            </li>

                                            <li className="flex space-x-3">

                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Extra 10 hours of prioritized transcription credits per month</span>
                                            </li>

                                            <li className="flex space-x-3">

                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No duration limit for submissions</span>
                                            </li>

                                            <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No popularity limit</span>
                                            </li>
                                            <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Process local audio files</span>
                                            </li>
                                            <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}


                                                    <Popover open={openPopover} handler={setOpenPopover }>
                                                    <div className="flex flex-row">
                                                        
                                                            
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Multi-language translation </span>
                                                    
                                                    <PopoverHandler {...triggers} >
                                                    <svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                                    </PopoverHandler>
                    <ThemeProvider value={themePopover}>
                                                    <PopoverContent {...triggers}>
                                                        <p className="">Generate summaries and ask questions to any content in over 50 languages, regardless of the language of the content.
                                                        <br></br>
                                                       </p>
                                                    </PopoverContent>
                                                    </ThemeProvider>
                                                    </div>
                                                    </Popover>
                                                </li>
                                                <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts</span>
                                            </li>
                                                
                                            <li className="flex space-x-3">

<svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
<span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
            </li>   


                                     {/*        <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                                            </li> */}

                                        </ul>
                                    </div>
                                    {/*        <a href="/plans/checkout">
                        {currentUser ? <button type="button" className="text-white bg-greenColor hover:bg-blue-800 transition duration-200 ease-in font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center">{hasActiveSub ? "Your Current Plan" : "Upgrade Plan"}</button> : <div></div>}
                        </a> */}
                                    <a className={`${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none" : ""}`} href={(currentUser && !hasActiveSub) && `/plans/checkout`}>
                                        {currentUser ? <button type="button" className={`text-white bg-greenColor transition duration-200 ease-in ${hasActiveSub & !canceledAtPeriodEnd ?  "pointer-events-none" : ""} font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : "Upgrade Plan"}</button> : <div></div>}
                                    </a>

                                </div>


                            </div>
                    }

                <div className="dark:bg-darkMode"> 
                    < div id="FAQ" className="px-4 mx-auto container w-5/6 max-w-4xl mt-60  pb-20 text-l lg:text-l dark:bg-darkMode dark:text-zinc-300">
                        <h1 className="text-2xl  font-semibold">FAQ</h1>
                        <br></br>
                        <h2 className="text-l lg:text-xl   font-normal"> Do my credits roll over?</h2>
                        <br></br>
                        <p className="text-md lg:text-l font-normal">
                            {' '}
                            If you are using the free version, you have 2 hours of free transcription in total. In premium, you get 10 hours of transcription credits every month (on top of your 2 hours of credit). If you don't use your credits, they will roll over to the next month. You can accumulate up to 30 hours of transcription credits.

                        </p>
                        <br></br>
                        <br></br>

                        <h2 className="text-l lg:text-xl  font-normal"> What happens to my credits if I cancel my subscriptions?</h2>
                        <br></br>
                        <p className="text-md lg:text-l">
                            {' '}
                            If you want to cancel your subscription, you can do so at any time. Your credits will still be yours. However you will only be able to access premium benefits until the end of the billing period.

                        </p>
                        <br></br>
                        <br></br>
                        <h2 className="text-l lg:text-xl   font-normal"> Can I get a refund?</h2>
                        <br></br>
                        <p className="text-md lg:text-l">
                            {' '}
                            Sure! Reach us at info@alphy.app and we'll reimburse you for the remaining credits.
                        </p>
                        <br></br>
                        <br></br>


                    </div>
                    </div>
                </div >

                :
                <div className="h-screen w-screen  opacity-50 flex justify-center items-center text-center mx-auto pb-40 ">
                    <div className="mb-20">
                        <ReactLoading type="spinningBubbles" color="blueLike" width={100} />
                    </div>
                </div>
            }</div>
            
    )
}