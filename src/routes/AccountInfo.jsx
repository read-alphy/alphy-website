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
import FreeCard from "../components/PricingCards/FreeCard";
import PremiumCard from "../components/PricingCards/PremiumCard";
import SideFeedReworked from '../components/ArticleComponents/SideFeedReworked';
import Loading from '../components/Loading';


  

let userStripeId = ""



export default function AccountInfo({ credit,hasActiveSub,currentUser}) {
    
    
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



         
        
        }
        else{
            setIsLoaded(true)
        }
        
    }, [currentUser]);

/* 
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


} */




    return (
        <div className="dark:bg-darkMode pb-20 ">
           
            {isLoaded ?

                <div className="dark:bg-darkMode">
                    <div className="max-w-[200px] min-w-[200px] flex-row flex">
                    {/* <Button onClick={() => handleStripeTrialCall("get")} className="text-white dark:text-zinc-700 bg-greenColor transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-white text-[16px]">
                        Get
                    </Button>
                    <Button onClick={() => handleStripeTrialCall("post")} className=" ml-10 text-white dark:text-zinc-700 bg-indigo-400 transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-white text-[16px]">
                        post
                    </Button> */}
                    </div>



                    {
                        windowSize.width > 1000 ?
                            <div className=" w-full max-w-[1200px] pt-20 md:pl-10 lg:pl-20 xl:pl-40 grid grid-col-3 mb-30 ">
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
                                                                                        {currentUser!==null && 
                                                                                            <div>
                                                                                            <button className="mt-5 text-md text-indigo-400  cursor-pointer underline" onClick={handleSignOut}>
                                                                                                Sign out</button>
                                                                                                </div>
                                }
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
                                   






                              






                                </div>

                            </div>



                            :

                            <div className="mb-10">
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
                                                                    {currentUser!==null && 
                              <div>
                              <button className="mt-5 text-md text-indigo-400 cursor-pointer underline" onClick={handleSignOut}>
                                  Sign out</button>
                                  </div>
                                }
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
                                </div>
                    }
 
                             
                              
                           <div className="flex md:pl-10 lg:pl-20 xl:pl-40 xl:ml-10 gap-10 mx-auto xl:mx-0 items-center justify-center flex-col xl:flex-row max-w-[1200px]">    

                    <FreeCard currentUser={currentUser} hasActiveSub={hasActiveSub} triggers1={triggers1} openPopover1={openPopover1} setOpenPopover1={setOpenPopover1} canceledAtPeriodEnd={canceledAtPeriodEnd}/>
                    <PremiumCard currentUser={currentUser} hasActiveSub={hasActiveSub} triggers={triggers} openPopover={openPopover} setOpenPopover={setOpenPopover} canceledAtPeriodEnd={canceledAtPeriodEnd}/>
                                </div>



                                


                  
                
                </div >

                :
                
                <div className="mx-auto">
                    <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
                   </div>
               
            }</div>
            
    )
}