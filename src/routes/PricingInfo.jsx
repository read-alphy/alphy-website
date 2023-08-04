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
  import FreeCard from "../components/PricingCards/FreeCard";
  import PremiumCard from "../components/PricingCards/PremiumCard";





export default function Pricing({hasActiveSub }) {
    
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



                            <div className=" w-full pt-20 grid grid-col-3 mb-30 items-center margin-auto">
                                <p className="text-center text-blueLike  dark:bg-darkMode dark:text-zinc-300 text-3xl font-bold mb-20">Choose the best plan for you</p>
                              
                            {/* <div className="items-center flex justify-center"><label className="relative inline-flex items-center ">
                            <input type="checkbox" value="" className="sr-only peer" onClick={handleDarkMode}/>
                            <div className="w-11 cursor-pointer h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium pointer-events-none text-gray-900 dark:text-gray-300">{isDarkMode=="dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}</span>
                            </label> </div> */}






                        <div className="flex md:pl-10 lg:pl-20 xl:pl-40 gap-10 mx-auto items-center justify-center flex-col xl:flex-row max-w-[1200px]">    

                        <FreeCard currentUser={currentUser} hasActiveSub={hasActiveSub} triggers1={triggers1} openPopover1={openPopover1} setOpenPopover1={setOpenPopover1} canceledAtPeriodEnd={canceledAtPeriodEnd}/>
                        <PremiumCard currentUser={currentUser} hasActiveSub={hasActiveSub} triggers={triggers} openPopover={openPopover} setOpenPopover={setOpenPopover} canceledAtPeriodEnd={canceledAtPeriodEnd}/>
                                    </div>
                                   







                        

                            </div>
                </div>

                :
                <div className="h-screen w-screen  opacity-50 flex justify-center items-center text-center mx-auto pb-40 ">
                    <div className="mb-20">
                        <ReactLoading type="spinningBubbles" color="blueLike" width={100} />
                    </div>
                </div>
}
            </div>
            
    )
}