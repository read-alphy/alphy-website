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





export default function Pricing({ stripePromise }) {
    const { currentUser } = useAuth();
    const windowSize = useWindowSize();
    const [subscription, setSubscription] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [hasActiveSub, setHasActiveSub] = useState(false);
    const [called, setCalled] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const auth = useAuth();

    const stripe = useStripe();
    const [subscriptionData, setSubscriptionData] = useState(null);
    const navigate = useNavigate()
    let userStripeId = "";


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

    const $targetEl1 = document.getElementById('popoverDescription1');

    // set the element that trigger the popover using hover or click
    const $triggerEl1 = document.getElementById('popoverButton1');

    // options with default values
    const options1 = {
        placement: 'right',
        triggerType: 'hover',
        offset: 10,

    };

    useEffect(() => {
        if (currentUser !== null && called === false) {
            setTimeout(() => {
                try {
                    getCustomerInfo()
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
    })

    const popover = new Popover($targetEl, $triggerEl, options);

    const getCustomerInfo = async () => {
        await axios.get(`https://backend-staging-2459.up.railway.app/payments/subscriptions?user_id=${currentUser.uid}`)
            //await axios.get(`https://backend-staging-2459.up.railway.app/payments/subscriptions?user_id=1233322111`)
            .then(r => {
                if (r.data !== null) {
                    setCalled(true)
                    const userStripe = r.data
                    setHasActiveSub(true)
                    userStripeId = userStripe


                }
                else {
                    setHasActiveSub(false)
                    setCalled(true)

                }
            })

    }
    const handleSubscribe = () => {

        axios.post(
            'https://backend-staging-2459.up.railway.app/payments/subscribe?subscription_type=price_1N2WwaJmF4J0rk0x8g3swifU&user_id=testuser'
        ).then(response => {
            setSubscription(response.data)
            setClientSecret(response.data)
        })
    }







    /*    const createSubscription = () => {
           stripe.api_key = "sk_test_51MeGOKJmF4J0rk0xkdOKOYwsbwnaDPp1bZYfBWG0CYmDSVnMl5f99yo0vhWZxzIZSddN5fEyF6UsZ6MlwyjFKyfB00npolLt3i"
           axios.post(
               'https://backend-staging-2459.up.railway.app/payments/subscribe?subscription_type=price_1N2WwaJmF4J0rk0x8g3swifU&user_id=testuser'
           )
               .then(r => {
                   console.log(r.data.id, subscriptionData)
                   const subscriptionId = r.data.id
                   const clientSecret = r.data.latest_invoice.payment_intent.client_secret
                   setSubscriptionData({ subscriptionId, clientSecret });
                   console.log(r.data.id, subscriptionData)
                   navigate("/plans/checkout")
   
               });
   
   
   
       } */

    /*     const elements = useElements();
        const handleSubmit = async (ev) => {
            ev.preventDefault();
    
            if (!stripe || !elements) {
                // Stripe.js has not loaded yet. Make sure to disable
                // form submission until Stripe.js has loaded.
                return;
            }
    
            const cardElement = elements.getElement(CardElement);
    
            if (cardElement) {
                setProcessing(true);
                const payload = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                    },
                });
                if (payload.error) {
                    setError(payload.error);
                    setProcessing(false);
                } else {
                    setError(null);
                    setProcessing(false);
                    setSucceeded(true);
                }
            }
        }; */

    const handleLoginWithGoogle = () => {
        auth.loginWithGoogle().then(() => {
            window.location.reload()
        })
    };

    return (
        <div>
            {isLoaded ?

                <div >

                    {
                        windowSize.width > 999 ?


                            <div className=" w-full pt-20 grid grid-col-3 mb-40 items-center margin-auto">
                                <p className="text-center text-blueLike text-5xl font-bold mb-10">Manage Subscription </p>
                                {hasActiveSub ? <div className="items-center flex flex-row justify-center"><a className="text-center text-blueLike text-l mx-auto justify-center underline font-semibold mb-10" target="_blank" href="https://billing.stripe.com/p/login/test_fZecNT7855nQ2Y0aEE">Change your billing plan or cancel subscription</a> </div> : null}
                                <div className="flex flex-wrap justify-center md:space-x-4 md:items-stretch">
                                    <div class="col-span-1 md:min-w-[400px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">


                                        <h5 class="mb-4 text-2xl font-medium text-gray-500 dark:text-gray-400">Free</h5>
                                        {/* <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">For Wanderers</h5> */}
                                        <div class="flex items-baseline text-gray-900 dark:text-white">
                                            {/* <span class="text-3xl font-semibold">$</span> */}
                                            <span class="text-5xl font-extrabold tracking-tight">Free</span>
                                            {/* <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span> */}
                                        </div>
                                        <p className="mt-3 text-gray-400">Discover Alphy's capabilities </p>
                                        <div className="h-[290px]">
                                            <ul role="list" class="space-y-5 my-7">
                                                <li class="flex space-x-3">

                                                    {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">___________________________ </span>
                                                </li>

                                                <li class="flex mt-20 space-x-3">

                                                    {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Access Alphy's public database</span>
                                                </li>
                                                <li class="flex space-x-3">

                                                    {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">2 hours of free transcription</span>
                                                </li>
                                                <li class="flex space-x-3">


                                                    <p class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                                        Standard Questioning <button id="popoverButton1" data-popover-target="popoverDescription1" data-popover-placement="right" data-popover-offset="20" type="button"><svg class="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button></p>

                                                    <div data-popover id="popoverDescription1" role="tooltip" class={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 border rounded-lg shadow-sm opacity-0 w-72`}>
                                                        <div class="p-3 space-y-2">
                                                            <p> Rate limits may apply for rapid queries.</p>

                                                        </div>
                                                        <div class="popover-arrow" role="presentation"></div>
                                                    </div>
                                                </li>
                                                {/*      <li class="flex space-x-3">
                                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Browser Extension</span>
                                    </li> */}
                                                <li class="flex space-x-3">

                                                    {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Submit content up to 1 hour</span>
                                                </li>
                                                <li class="flex space-x-3">

                                                    {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                    {/* <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">30,000 view limit on videos</span> */}

                                                    <p class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                                        Content popularity limit <button id="popoverButton" data-popover-target="popoverDescription" data-popover-placement="right" data-popover-offset="20" type="button"><svg class="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button></p>

                                                    <div data-popover id="popoverDescription" role="tooltip" class={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 border rounded-lg shadow-sm opacity-0 w-72`}>
                                                        <div class="p-3 space-y-2">
                                                            <p> You can only submit videos with greater than <strong className="underline">30,000 views</strong>. There is no limit for Twitter Spaces.</p>

                                                        </div>
                                                        <div class="popover-arrow" role="presentation"></div>
                                                    </div>
                                                </li>

                                                <li class="flex space-x-3 pt-4">


                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                                    </span>
                                                </li>

                                            </ul>
                                        </div>

                                        {currentUser ?
                                            <a target="_blank" href={hasActiveSub && "https://billing.stripe.com/p/login/test_fZecNT7855nQ2Y0aEE"}>
                                                <button type="button" class={`text-white bg-gray-400 hover:bg-gray-400 font-medium ${hasActiveSub ? "bg-zinc-500 hover:bg-zinc-500" : "pointer-events-none"} rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{currentUser ? (hasActiveSub ? "Switch Back To Free" : "Active") : "Sign Up For Free"}</button>
                                            </a>
                                            :
                                            <button onClick={handleLoginWithGoogle} type="button" class="text-white bg-green-400 hover:bg-blue-800 transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center">{currentUser ? "Active" : "Sign Up For Free"}</button>
                                        }







                                    </div>







                                    <div class="col-span-2 max-w-sm md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                                        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Premium</h5>
                                        {/* <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">For Seekers</h5> */}
                                        <div class="flex items-baseline text-gray-900 dark:text-white">
                                            <span class="text-3xl font-semibold">$</span>
                                            <span class="text-5xl font-extrabold tracking-tight">5</span>
                                            <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                                        </div>
                                        <p className="mt-3 text-gray-400">Level up your reach </p>
                                        <div className="h-[290px]">
                                            <ul role="list" class="space-y-5 my-7">
                                                <li class="flex space-x-3">

                                                    {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">___________________________ </span>
                                                </li>
                                                <li class="flex space-x-3">


                                                    <span class="text-l font-normal leading-tight text-gray-500 dark:text-gray-400">Everything on the free plan plus:</span>
                                                </li>

                                                <li class="flex space-x-3">

                                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Extra 10 hours of prioritized transcription credits per month</span>
                                                </li>

                                                <li class="flex space-x-3">

                                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Submit content up to 3 hours</span>
                                                </li>

                                                <li class="flex space-x-3">
                                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                    {/* <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Optional credit top ups</span> */}
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">No popularity limit</span>
                                                </li>

                                                <li class="flex space-x-3">
                                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Download transcripts and summaries</span>
                                                </li>

                                            </ul>
                                        </div>
                                        <a className={`${hasActiveSub ? "pointer-events-none" : ""}`} href={(currentUser && !hasActiveSub) && `/plans/checkout`}>
                                            {currentUser ? <button type="button" class={`text-white bg-green-400 hover:bg-blue-800 transition duration-200 ease-in ${hasActiveSub ? "pointer-events-none text-whiteLike" : "hover:bg-blue-800"} font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{hasActiveSub ? "Your Current Plan" : "Upgrade Plan"}</button> : <div></div>}
                                        </a>



                                    </div>







                                </div>

                            </div>



                            :

                            <div className="mb-20">

                                <p className="text-center text-blueLike text-4xl font-semibold mt-20 mb-10">Manage Subscription </p>
                                {hasActiveSub ? <div className="items-center flex flex-row justify-center"><a className="text-center text-blueLike text-l mx-auto justify-center underline font-semibold mb-10" target="_blank" href="https://billing.stripe.com/p/login/test_fZecNT7855nQ2Y0aEE">Change your billing plan or cancel subscription</a> </div> : null}
                                <div class="w-full md:min-w-[400px] items-center mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-10">

                                    <h5 class="mb-4 text-2xl font-medium text-gray-500 dark:text-gray-400">Free</h5>
                                    {/* <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">For Wanderers</h5> */}
                                    <div class="flex items-baseline text-gray-900 dark:text-white">
                                        {/* <span class="text-3xl font-semibold">$</span> */}
                                        <span class="text-5xl font-extrabold tracking-tight">Free</span>
                                        {/* <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span> */}
                                    </div>
                                    <p className="mt-3 text-gray-400">Discover Alphy's capabilities </p>
                                    <div className="h-[290px]">
                                        <ul role="list" class="space-y-5 my-7">
                                            <li class="flex space-x-3">

                                                {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">___________________________ </span>
                                            </li>

                                            <li class="flex mt-20 space-x-3">

                                                {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Access Alphy's public database</span>
                                            </li>
                                            <li class="flex space-x-3">

                                                {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">2 hours of free transcription</span>
                                            </li>
                                            <li class="flex space-x-3">
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Standard questioning</span>
                                            </li>
                                            {/*      <li class="flex space-x-3">
                                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Browser Extension</span>
                                    </li> */}
                                            <li class="flex space-x-3">

                                                {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Submit content up to 1 hour</span>
                                            </li>
                                            <li class="flex space-x-3">

                                                {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                {/* <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">30,000 view limit on videos</span> */}

                                                <p class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                                    Content popularity limit <button id="popoverButton" data-popover-target="popoverDescription" data-popover-placement="right" data-popover-offset="20" type="button"><svg class="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button></p>

                                                <div data-popover id="popoverDescription" role="tooltip" class={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 border rounded-lg shadow-sm opacity-0 w-72`}>
                                                    <div class="p-3 space-y-2">
                                                        <p> You can only submit videos with greater than <strong className="underline">30,000 views</strong>. There is no limit for Twitter Spaces</p>

                                                    </div>
                                                    <div class="popover-arrow" role="presentation"></div>
                                                </div>
                                            </li>

                                            <li class="flex space-x-3 pt-4">


                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                                </span>
                                            </li>


                                        </ul>
                                    </div>
                                    {currentUser ?
                                        <a target="_blank" href={hasActiveSub && "https://billing.stripe.com/p/login/test_fZecNT7855nQ2Y0aEE"}>
                                            <button type="button" class={`text-white bg-gray-400 hover:bg-gray-400 font-medium ${hasActiveSub ? "bg-zinc-500 hover:bg-zinc-500" : "pointer-events-none"} rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{currentUser ? (hasActiveSub ? "Switch Back To Free" : "Active") : "Sign Up For Free"}</button>
                                        </a>
                                        :
                                        <button onClick={handleLoginWithGoogle} type="button" class="text-white bg-green-400 hover:bg-blue-800 transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center">{currentUser ? "Active" : "Sign Up For Free"}</button>
                                    }
                                </div>







                                <div class="items-center mx-auto max-w-sm md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                                    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Premium</h5>
                                    {/* <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">For Seekers</h5> */}
                                    <div class="flex items-baseline text-gray-900 dark:text-white">
                                        <span class="text-3xl font-semibold">$</span>
                                        <span class="text-5xl font-extrabold tracking-tight">5</span>
                                        <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                                    </div>
                                    <p className="mt-3 text-gray-400">Level up your reach </p>
                                    <div className="h-[290px]">
                                        <ul role="list" class="space-y-5 my-7">
                                            <li class="flex space-x-3">

                                                {/* <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> */}
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">___________________________ </span>
                                            </li>
                                            <li class="flex space-x-3">


                                                <span class="text-l font-normal leading-tight text-gray-500 dark:text-gray-400">Everything on the free plan plus:</span>
                                            </li>

                                            <li class="flex space-x-3">

                                                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Extra 10 hours of prioritized transcription credits per month</span>
                                            </li>

                                            <li class="flex space-x-3">

                                                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Submit content up to 3 hours</span>
                                            </li>

                                            <li class="flex space-x-3">
                                                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                {/* <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Optional credit top ups</span> */}
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">No popularity limit</span>
                                            </li>

                                            <li class="flex space-x-3">
                                                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Download transcripts and summaries</span>
                                            </li>

                                        </ul>
                                    </div>
                                    {/*        <a href="/plans/checkout">
                        {currentUser ? <button type="button" class="text-white bg-green-400 hover:bg-blue-800 transition duration-200 ease-in font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center">{hasActiveSub ? "Your Current Plan" : "Upgrade Plan"}</button> : <div></div>}
                        </a> */}
                                    <a className={`${hasActiveSub ? "pointer-events-none" : ""}`} href={(currentUser && !hasActiveSub) && `/plans/checkout`}>
                                        {currentUser ? <button type="button" class={`text-white bg-green-400 hover:bg-blue-800 transition duration-200 ease-in ${hasActiveSub ? "pointer-events-none" : "hover:bg-blue-800"} font-medium rounded-lg text-l px-5 py-2.5 inline-flex justify-center w-full text-center`} >{hasActiveSub ? "Your Current Plan" : "Upgrade Plan"}</button> : <div></div>}
                                    </a>

                                </div>


                            </div>
                    }


                    < div id="FAQ" className="px-4 mx-auto container w-5/6 max-w-4xl mt-40 pb-20 text-l lg:text-l">
                        <h1 className="text-4xl  font-semibold">FAQ</h1>
                        <br></br>
                        <h2 className="text-xl lg:text-2xl   font-semibold"> Do my credits roll over?</h2>
                        <br></br>
                        <p className="text-xl">
                            {' '}
                            If you are using the free version, you have 2 hours of free transcription in total. In premium, you get 10 hours of transcription credits every month (on top of your 2 hours of credit). If you don't use your credits, they will roll over to the next month. You can accumulate up to 30 hours of transcription credits.

                        </p>
                        <br></br>
                        <br></br>

                        <h2 className="text-xl lg:text-2xl  font-semibold"> What happens to my credits if I cancel my subscriptions?</h2>
                        <br></br>
                        <p className="text-xl">
                            {' '}
                            If you want to cancel your subscription, you can do so at any time. Your credits will still be yours. However you will only be able to access premium benefits until the end of the billing period.

                        </p>
                        <br></br>
                        <br></br>
                        <h2 className="text-xl lg:text-2xl   font-semibold"> Can I get a refund?</h2>
                        <br></br>
                        <p className="text-xl">
                            {' '}
                            Sure! Reach us at info@alphy.app and we'll reimburse you for the remaining credits.
                        </p>
                        <br></br>
                        <br></br>


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