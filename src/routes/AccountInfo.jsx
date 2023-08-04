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
//import { Popover } from 'flowbite';
import ReactLoading from 'react-loading';
import { useLocation } from "react-router-dom";
import {
	Popover,
	PopoverHandler,
	PopoverContent,
    ThemeProvider,
    Button

  } from "@material-tailwind/react";
  import SideFeedReworked from '../components/ArticleComponents/SideFeedReworked';

  

let userStripeId = ""



export default function AccountInfo({ credit,hasActiveSub,idToken}) {
    
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    

    
    const windowSize = useWindowSize();
    const [subscription, setSubscription] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [canceledAtPeriodEnd, setCanceledAtPeriodEnd] = useState(false);

    // const [hasActiveSub, setHasActiveSub] = useState(false);
    const [called, setCalled] = useState(false);
    
    const auth = useAuth();
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

      const handleSignOut = async () => {
		try {
			auth.logout();
			navigate("/")
			localStorage.setItem("logged in","false")
		} catch (error) {
			console.log("sign out error",error)
		
		}
	};
    useEffect(() => {
        

        if (currentUser !== null && called === false) {
            setTimeout(() => {
                try {
                    //getCustomerInfo(currentUser)
                    setTimeout(() => {
                        setIsLoaded(true)
                    }, 400)
                    setCalled(true)

                } catch (e) {
                    console.log(e)
                    setTimeout(() => {
                        setIsLoaded(true)
                    }, 400)
                    setCalled(true)
                }



            }, 1200)
        
        }
        else{
            setIsLoaded(true)
        }
        
    }, [currentUser]);


function handleStripeTrialCall(type){
    if(type==="get"){
            console.log("get")
            axios.get(`http://localhost:3001/payments/subscription?refresh_firebase=false&refresh_stripe=false`,
            {
                headers: {
                    'id-token': idToken,
                },
            }
            
            ).then((response) => {
                console.log(response)
            })
    }

    else if(type==="post")
        {
        console.log("post")
        axios.post("http://localhost:3001/payments/subscription?subscription_type=basic&refresh_firebase=false&refresh_stripe=false",
        {
            headers: {
                'id-token': idToken,
            },
        }

        ).then((response) => {
            console.log(response)
        })
    }


}




    return (
        <div className="dark:bg-darkMode ">
           
            {isLoaded ?

                <div className="dark:bg-darkMode">
                    <div className="mx-auto max-w-[200px] min-w-[200px] flex-row flex">
                    {/* <Button onClick={() => handleStripeTrialCall("get")} className="text-white dark:text-zinc-700 bg-greenColor transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-white text-[16px]">
                        Get
                    </Button>
                    <Button onClick={() => handleStripeTrialCall("post")} className=" ml-10 text-white dark:text-zinc-700 bg-indigo-400 transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-white text-[16px]">
                        post
                    </Button> */}
                    </div>



                    {
                        windowSize.width > 999 ?
                            <div className=" w-full pt-20 grid grid-col-3 mb-30 items-center margin-auto">
                                     <div className="items-center margin-auto justify-center flex flex-col">
                        {currentUser ? 
                                <div>
                                    
                                            <h1 className="text-md dark:text-zinc-300 text-zinc-600 mb-10 ">Account Details</h1>

                            <div className="grid grid-cols-3 mb-5">
                                            <div className="col-span-1 text-zinc-500 dark:text-zinc-400 text-sm">
                                                <p className="mb-2">Your Email</p>
                                                <p className="mb-2">Password</p>
                                                {credit!==null ?
                                                <p className="mt-2">Remaining Credits</p> :null
                                                        }
                                                        <p className="mt-2">Plan</p>
                                            </div> 
                                <div class="border-r border-gray-300 h-[10vh] col-span-1  mx-auto items-center flex"></div>
                                            <div className="col-span-1 text-black dark:text-zinc-200 text-sm">
                                                <p className="mb-2">{currentUser.email}</p>
                                                <a href="/u/resetpassword" className="mb-2 underline">Reset password</a>
                                                {credit!==null ?
                                                <p className="mt-2" >{Math.floor(credit)} minutes</p> :null
                                                        }
                                                         <p className="mt-2">{hasActiveSub ? "Premium" : "Basic"}</p>
                                                         <div>
                               <button className="mt-5 text-md font-semibold text-zinc-700 dark:text-zinc-200 cursor-pointer underline" onClick={handleSignOut}>
                                Sign out</button>
                                </div>
                                            </div>
                              
                            </div>
                           
                   

                               {/*  {currentUser ? <div className="flex flex-col justify-center">  
                                { hasActiveSub ? <a className="text-center text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change your billing plan or cancel subscription"}</a> : null}
                                     {credit!==null ?
                                    <p className="items-center flex" >Remaining Credits: {Math.floor(credit)} minutes</p> :null
                                            }      </div> : null} */}

                         
                            </div>
                             :null}
                                </div>
{/*                                 {currentUser && <div class="border-b border-gray-300 w-[50vw] mt-10 mb-20 mx-auto items-center flex"></div>}

 */}
                                 <p className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-2xl font-bold mb-10 mt-20">Manage Subscription </p>
                         
                                { hasActiveSub ? <a className="text-center mb-10 text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change your billing plan or cancel subscription"}</a> : null}
                                <div className="flex flex-wrap justify-center md:space-x-4 md:items-stretch">
                                    <div className="col-span-1 md:min-w-[400px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">


                                    <p className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Basic</p>
                                        
                                        <div className="flex items-baseline text-gray-900 dark:text-white">
                                            
                                            <span className="text-5xl font-extrabold tracking-tight">Free</span>
                                            
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
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">2 hours of free transcription for YouTube videos</span>
                                                </li>
                                           
                                                <li className="flex space-x-3">


                                        
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Ask questions to Alphy</span>
                                                </li>
                                            
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
                                                <Button type="button" className={` bg-zinc-600   font-semibold ${hasActiveSub && !canceledAtPeriodEnd ? "bg-zinc-700  dark:bg-darkMode dark:bg-zinc-700" : "pointer-events-none"} rounded-lg text-white text-[14px] px-5 py-4 inline-flex justify-center w-full text-center`} >{currentUser ? (hasActiveSub && !canceledAtPeriodEnd  ? "Switch Back To Free" : "Active") : "Sign Up For Free"}</Button>
                                            </a>
                                            :
                                            <a href="/u/login" type="button"> 
                                            <Button className="text-white bg-greenColor transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-white text-[16px]">{currentUser ? "Active" : "Sign Up For Free"}</Button></a>
                                        }







                                    </div>







                                    <div className="col-span-2 max-w-sm md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">
                                    <p className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Premium</p>
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

                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Extra 10 hours of prioritized transcription credits per month</span>
                                                </li>

                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No duration limit for submissions</span>
                                                </li>

                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No popularity limit</span>
                                                </li>
                                                
                                                <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Process local audio files</span>
                                            </li>
                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
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
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts</span>
                                            </li>
																	
                                                <li className="flex space-x-3">

                                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
                                                    </li>   

                                  {/*               <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                                                </li> */}

                                            </ul>
                                        </div>
                                        <a className={`${hasActiveSub &&!canceledAtPeriodEnd ? "pointer-events-none" : ""}`} href={
                                            (currentUser && !hasActiveSub) ? `/plans/checkout` : (canceledAtPeriodEnd ? "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE": "")}
                >
                                            {currentUser ? <Button type="button" className={` bg-greenColor  transition duration-200 ease-in ${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none text-whiteLike" : ""} rounded-lg text-[16px] font-semibold ]px-5 py-3 inline-flex text-white justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : (canceledAtPeriodEnd ? "Renew Plan" : "Upgrade Plan")}</Button> : <div></div>}

                                        </a>



                                    </div>







                                </div>

                            </div>



                            :

                            <div className="mb-20">
          <div className="items-center margin-auto justify-center flex flex-col mt-20">
                        {currentUser ? 
                                <div className="px-4 sm:mx-0">
                                    
                                            <h1 className="text-md text-zinc-600 dark:text-zinc-300 mb-10 ">Account Details</h1>

                            <div className="grid grid-cols-3 mb-5  ">
                                            <div className="col-span-1 text-zinc-500 dark:text-zinc-400 text-sm border-r border-gray-300 pr-4">
                                                <p className="mb-3">Your Email</p>
                                                <p className="mb-3">Password</p>
                                                {credit!==null ?
                                                <p className="mt-2">Remaining <br></br>Credits</p> :null
                                                        }
                                                        <p className="mt-2">Plan</p>
                                            </div> 
                                {/* <div class="border-r border-gray-300 h-[10vh] col-span-1 mx-auto items-center flex"></div> */}
                                            <div className="col-span-2 text-black dark:text-zinc-200 text-sm ml-6">
                                                <p className="mb-3">{currentUser.email}</p>
                                                <a href="/u/resetpassword" className="mb-2 underline">Reset password</a>
                                                {credit!==null ?
                                                <p className="mt-5" >{Math.floor(credit)} minutes</p> :null
                                                        }
                                                        <p className="mt-5">{hasActiveSub ? "Premium" : "Basic"}</p>
                                            </div>
                               
                            </div>
                           
                   

                               {/*  {currentUser ? <div className="flex flex-col justify-center">  
                                { hasActiveSub ? <a className="text-center text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change your billing plan or cancel subscription"}</a> : null}
                                     {credit!==null ?
                                    <p className="items-center flex" >Remaining Credits: {Math.floor(credit)} minutes</p> :null
                                            }      </div> : null} */}

                         
                            </div>
                             :null}
                                </div>
                                
                                <p className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-2xl font-semibold mt-20 mb-10">Manage Subscription </p>
                                {currentUser ? <div className="items-center flex flex-col justify-center">  
                                { hasActiveSub ? <a className="text-center text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change your billing plan or cancel subscription"}</a> : null}
                                       </div> : null}
                              
                                    <div className="w-full md:min-w-[400px] items-center mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-zinc-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 mb-10">

                                    <p className="mb-4 text-l font-medium text-gray-500 dark:text-zinc-300">Basic</p>
                                    {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Wanderers</h5> */}
                                    <div className="flex items-baseline text-gray-900 dark:text-white">
                                        {/* <span className="text-3xl font-semibold">$</span> */}
                                        <span className="text-2xl font-extrabold tracking-tight">Free</span>
                                        {/* <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span> */}
                                    </div>
                                    <p className="mt-3 text-gray-400">Discover Alphy's capabilities </p>
                                    <div className="h-[320px]">
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
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">2 hours of free transcription for YouTube videos</span>
                                            </li>
                                            <li className="flex space-x-3">
                                                  
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
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Content popularity limit </span>

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







                                <div className="items-center mx-auto max-w-sm md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">
                                <p className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">Premium</p>
                                    {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
                                    <div className="flex items-baseline text-gray-900 dark:text-white">
                                        <span className="text-3xl font-semibold">$</span>
                                        <span className="text-5xl font-extrabold ">5</span>
                                        <span className="ml-1 text-xl font-normal">/month</span>
                                    </div>
                                    <p className="mt-3 text-gray-400">Level up your reach </p>
                                    <div className="h-[430px]">
                                        <ul role="list" className="space-y-5 my-7">
                                            <li className="flex space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                                            </li>
                                            <li className="flex space-x-3">


                                                <span className="text-l font-normal leading-tight text-gray-500 dark:text-zinc-300">Everything on the Basic Plan plus:</span>
                                            </li>

                                            <li className="flex space-x-3">

                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Extra 10 hours of prioritized transcription credits per month</span>
                                            </li>

                                            <li className="flex space-x-3">

                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No duration limits for submissions</span>
                                            </li>

                                            <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No popularity limit</span>
                                            </li>
                                            <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Process local audio files</span>
                                            </li>
                                            <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
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
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts</span>
                                            </li>
                                            <li className="flex space-x-3">

<svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
<span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
            </li>   


                                         {/*    <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                                            </li> */}

                                        </ul>
                                    </div>
                                    
                                    <a className={`${hasActiveSub &&!canceledAtPeriodEnd ? "pointer-events-none" : ""}`} href={
                                            (currentUser && !hasActiveSub) ? `/plans/checkout` : (canceledAtPeriodEnd ? "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE": "")}
                >
                                            {currentUser ? 
                                            <Button type="button" className={` bg-greenColor  transition duration-200 ease-in ${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none text-whiteLike" : ""} rounded-lg text-[16px] font-semibold ]px-5 py-3 inline-flex text-white justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : (canceledAtPeriodEnd ? "Renew Plan" : "Upgrade Plan")}</Button> : <div></div>}
                                        </a>
                                </div>


                            </div>
                    }

                
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