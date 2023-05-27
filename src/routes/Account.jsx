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
import { Popover } from 'flowbite';
import ReactLoading from 'react-loading';
import { useLocation } from "react-router-dom";







export default function Account({ stripePromise }) {
    
    const { currentUser } = useAuth();
    
    const windowSize = useWindowSize();
    const [subscription, setSubscription] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [canceledAtPeriodEnd, setCanceledAtPeriodEnd] = useState(false);

    const [hasActiveSub, setHasActiveSub] = useState(false);
    const [called, setCalled] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [credit, setCredit] = useState(null);
    const auth = useAuth();

    const navigate = useNavigate()
    let userStripeId = "";
    const [isDarkMode, setDarkMode] = useState(localStorage.theme || "light");


    // set the popover content element
    const $targetEl = document.getElementById('popoverDescription');

    // set the element that trigger the popover using hover or click
    const $triggerEl = document.getElementById('popoverButton');

    // options with default values
    const options = {
        placement: 'right',
        triggerType: 'hover',
        offset: 10,

    };

    const popover = new Popover($targetEl, $triggerEl, options);

    const $targetEl1 = document.getElementById('popoverDescription1');

    // set the element that trigger the popover using hover or click
    const $triggerEl1 = document.getElementById('popoverButton1');

    // options with default values
    const options1 = {
        placement: 'right',
        triggerType: 'hover',
        offset: 10,

    };
    const popover1 = new Popover($targetEl1, $triggerEl1, options1);
    
    useEffect(() => {

        if (currentUser !== null && called === false) {
            setTimeout(() => {
                try {
                    getCustomerInfo(currentUser)
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
        if (currentUser) {
            currentUser.getIdToken().then((idToken) => {
                axios
                    .get(
                        `${process.env.REACT_APP_API_URL}/credit`,
                        {
                            headers: {
                                'id-token': idToken,
                            },
                        },
                    )
                    .then((response) => {
                        const [fixed, monthly] = response.data
                        setCredit(fixed + monthly)
                        
                    })
                    .catch((error) => {
                        console.error(error)
                    });
            });
        } 
    }, [currentUser]);
  
    const getCustomerInfo = async (currentUser) => {
        const idToken = await currentUser.getIdToken()
        
        await axios.get(`${process.env.REACT_APP_API_URL}/payments/subscription`,
        {
            headers: {
                'id-token': idToken,
            },
        },
        )
            
            .then(r => {
                
                if (r.data.length >0) {
                    setCalled(true)
                    const userStripe = r.data[0]
                    setHasActiveSub(true)
                    userStripeId = userStripe
                    if(r.data[0].cancel_at_period_end){
                        setCanceledAtPeriodEnd(true)
                    }
                
                }
                else {
                    setHasActiveSub(false)
                    setCalled(true)

                }
            })

    }






    const handleLoginWithGoogle = () => {
        auth.loginWithGoogle().then(() => {
            window.location.reload()
        })
    };

    return (
        <div className="dark:bg-darkMode ">
            {isLoaded ?

                <div clasName="dark:bg-darkMode">

                    {
                        windowSize.width > 999 ?


                            <div className=" w-full pt-20 grid grid-col-3 mb-30 items-center margin-auto">
                                <p className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-5xl font-bold mb-10">Manage Subscription </p>
                                {currentUser ? <div className="items-center flex flex-col justify-center">  
                                { hasActiveSub ? <a className="text-center text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change your billing plan or cancel subscription"}</a> : null}
                                     {credit!==null ?
                                    <p className="items-center flex mb-6 " >Remaining Credits: {Math.floor(credit)} minutes</p> :null
                                            }      </div> : null}

                            {/* <div className="items-center flex justify-center"><label className="relative inline-flex items-center ">
                            <input type="checkbox" value="" className="sr-only peer" onClick={handleDarkMode}/>
                            <div className="w-11 cursor-pointer h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium pointer-events-none text-gray-900 dark:text-gray-300">{isDarkMode=="dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}</span>
                            </label> </div> */}

                                <div className="flex flex-wrap justify-center md:space-x-4 md:items-stretch">
                                    <div className="col-span-1 md:min-w-[400px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">


                                    <p className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Free</p>
                                        {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Wanderers</h5> */}
                                        <div className="flex items-baseline text-gray-900 dark:text-white">
                                            {/* <span className="text-3xl font-semibold">$</span> */}
                                            <span className="text-5xl font-extrabold tracking-tight">Free</span>
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
                                            
                                                <li className="flex space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Submit content up to 1 hour</span>
                                                </li>
                                                <li className="flex space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">10,000 view limit on videos</span> */}

                                                    <p className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                        Content popularity limit <button id="popoverButton" data-popover-target="popoverDescription" data-popover-placement="right" data-popover-offset="20" type="button"><svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button></p>

                                                    <div data-popover id="popoverDescription" role="tooltip" className={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 dark:bg-darkMode border rounded-lg shadow-sm opacity-0 w-72`}>
                                                        <div className="p-3 space-y-2">
                                                            <p> You can only submit videos with greater than <strong className="underline">10,000 views</strong></p>

                                                        </div>
                                                        <div className="popover-arrow" role="presentation"></div>
                                                    </div>
                                                </li>

                                                <li className="flex space-x-3 pt-4">


                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                    </span>
                                                </li>

                                            </ul>
                                        </div>

                                        {currentUser ?
                                            <a target="_blank" href={hasActiveSub && !canceledAtPeriodEnd && "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"}>
                                                <button type="button" className={`text-white bg-gray-400 hover:bg-gray-400 font-medium ${hasActiveSub && !canceledAtPeriodEnd ? "bg-zinc-50 dark:bg-darkMode0 dark:bg-darkMode0" : "pointer-events-none"} rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{currentUser ? (hasActiveSub && !canceledAtPeriodEnd  ? "Switch Back To Free" : "Active") : "Sign Up For Free"}</button>
                                            </a>
                                            :
                                            <button onClick={handleLoginWithGoogle} type="button" className="text-white bg-green-400 transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center">{currentUser ? "Active" : "Sign Up For Free"}</button>
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
                                        <div className="h-[320px]">
                                            <ul role="list" className="space-y-5 my-7">
                                                <li className="flex space-x-3">

                                                    {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                                                </li>
                                                <li className="flex space-x-3">


                                                    <span className="text-l font-normal leading-tight text-gray-500 dark:text-zinc-300">Everything on the free plan plus:</span>
                                                </li>

                                                <li className="flex space-x-3">

                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Extra 10 hours of prioritized transcription credits per month</span>
                                                </li>

                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No duration limit for submissions</span>
                                                </li>

                                                <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No popularity limit</span>
                                                </li>
                                                <li className="flex space-x-3">

                                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
                                                    </li>   

                                  {/*               <li className="flex space-x-3">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                                                </li> */}

                                            </ul>
                                        </div>
                                        <a className={`${hasActiveSub &&!canceledAtPeriodEnd ? "pointer-events-none" : ""}`} href={
                                            (currentUser && !hasActiveSub) ? `/plans/checkout` : (canceledAtPeriodEnd ? "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE": "")}
                >
                                            {currentUser ? <button type="button" className={`text-white bg-green-400  transition duration-200 ease-in ${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none text-whiteLike" : ""} font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : (canceledAtPeriodEnd ? "Renew Plan" : "Upgrade Plan")}</button> : <div></div>}
                                        </a>



                                    </div>







                                </div>

                            </div>



                            :

                            <div className="mb-20">

                                <p className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-4xl font-semibold mt-20 mb-10">Manage Subscription </p>
                                {currentUser ? <div className="items-center flex flex-col justify-center">  
                                { hasActiveSub ? <a className="text-center text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change your billing plan or cancel subscription"}</a> : null}
                                     {credit!==null ?
                                    <p className="items-center flex mb-6 " >Remaining Credits: {Math.floor(credit)} minutes</p> :null
                                            }      </div> : null}
                              
                                    <div className="w-full md:min-w-[400px] items-center mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 mb-10">

                                    <p className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Free</p>
                                    {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Wanderers</h5> */}
                                    <div className="flex items-baseline text-gray-900 dark:text-white">
                                        {/* <span className="text-3xl font-semibold">$</span> */}
                                        <span className="text-5xl font-extrabold tracking-tight">Free</span>
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
                                            <li className="flex space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">10,000 view limit on videos</span> */}

                                                <p className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                    Content popularity limit <button id="popoverButton" data-popover-target="popoverDescription" data-popover-placement="right" data-popover-offset="20" type="button"><svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button></p>

                                                <div data-popover id="popoverDescription" role="tooltip" className={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 dark:bg-darkMode border rounded-lg shadow-sm opacity-0 w-72`}>
                                                    <div className="p-3 space-y-2">
                                                        <p> You can only submit videos with greater than <strong className="underline">10,000 views</strong></p>

                                                    </div>
                                                    <div className="popover-arrow" role="presentation"></div>
                                                </div>
                                            </li>

                                            <li className="flex space-x-3 pt-4">


                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                                                </span>
                                            </li>


                                        </ul>
                                    </div>
                                    {currentUser ?
                                        <a target="_blank" href={hasActiveSub && !canceledAtPeriodEnd && "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"}>
                                            <button type="button" className={`text-white bg-gray-400 hover:bg-gray-400 font-medium ${hasActiveSub && !canceledAtPeriodEnd ? "bg-zinc-50 dark:bg-darkMode0 dark:bg-darkMode0" : "pointer-events-none"} rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{currentUser ? (hasActiveSub && !canceledAtPeriodEnd  ? "Switch Back To Free" : "Active") : "Sign Up For Free"}</button>
                                        </a>
                                        :
                                        <button onClick={handleLoginWithGoogle} type="button" className="text-white bg-green-400  transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center">{currentUser ? "Active" : "Sign Up For Free"}</button>
                                    }
                                </div>







                                <div className="items-center mx-auto max-w-sm md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">
                                <p className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Premium</p>
                                    {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
                                    <div className="flex items-baseline text-gray-900 dark:text-white">
                                        <span className="text-3xl font-semibold">$</span>
                                        <span className="text-5xl font-extrabold tracking-tight">5</span>
                                        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span>
                                    </div>
                                    <p className="mt-3 text-gray-400">Level up your reach </p>
                                    <div className="h-[320px]">
                                        <ul role="list" className="space-y-5 my-7">
                                            <li className="flex space-x-3">

                                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                                            </li>
                                            <li className="flex space-x-3">


                                                <span className="text-l font-normal leading-tight text-gray-500 dark:text-zinc-300">Everything on the free plan plus:</span>
                                            </li>

                                            <li className="flex space-x-3">

                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Extra 10 hours of prioritized transcription credits per month</span>
                                            </li>

                                            <li className="flex space-x-3">

                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No duration limits for submissions</span>
                                            </li>

                                            <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No popularity limit</span>
                                            </li>
                                            <li className="flex space-x-3">

<svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
<span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
            </li>   


                                         {/*    <li className="flex space-x-3">
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-400 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                                            </li> */}

                                        </ul>
                                    </div>
                                    
                                    <a className={`${hasActiveSub &&!canceledAtPeriodEnd ? "pointer-events-none" : ""}`} href={
                                            (currentUser && !hasActiveSub) ? `/plans/checkout` : (canceledAtPeriodEnd ? "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE": "")}
                >
                                            {currentUser ? <button type="button" className={`text-white bg-green-400  transition duration-200 ease-in ${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none text-whiteLike" : ""} font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : (canceledAtPeriodEnd ? "Renew Plan" : "Upgrade Plan")}</button> : <div></div>}
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
                            Sure! Reach us at support@alphy.app and we'll reimburse you for the remaining credits.
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