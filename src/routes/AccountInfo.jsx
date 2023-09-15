import React from "react";
import "tailwindcss/tailwind.css";
import { Carousel } from "react-responsive-carousel";
import { useAuth } from '../hooks/useAuth';
import { useWindowSize } from '../hooks/useWindowSize';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { Popover } from 'flowbite';
import FreeCard from "../components/PricingCards/FreeCard";
import BasicCard from "../components/PricingCards/BasicCard";
import PremiumCard from "../components/PricingCards/PremiumCard";
import SideFeedReworked from '../components/ArticleComponents/SideFeedReworked';
import Loading from '../components/Loading';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {Button, Spinner} from "@material-tailwind/react";
import Dialog from '@mui/material/Dialog';
import { Remove } from "@mui/icons-material";

let userStripeId = ""



export default function AccountInfo({ credit,tier,currentUser,canceledAtPeriodEnd}) {
    
    
    
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [creditPurchaseLoading, setCreditPurchaseLoading] = useState(false);

    const handleQuantityChange = (event) => {
      const value = event.target.value;
  
      // Ensure the value is numeric
      if (!isNaN(value)) {
        setQuantity(parseInt(value, 10));
      }
      if (value === "") {
        setQuantity("");
      }
    
    };


    useEffect(() => {
        if(sessionStorage.getItem("creditPurchase") === "true"){
            setCreditPurchaseDialog(true)
            sessionStorage.removeItem("creditPurchase")
        }
    }, [])
  
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(prevQuantity => prevQuantity - 1);
      }
    };
  
    const handleIncrement = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleBlur = () => {
        if (quantity === 0) {
          setQuantity(1);
        }
      };
    
    const windowSize = useWindowSize();
    const [subscription, setSubscription] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [creditPurchaseDialog, setCreditPurchaseDialog] = useState(false);
    
    

    
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



    const buyCredit = async () => {
        setCreditPurchaseLoading(true)
        try{
        await currentUser.getIdToken().then((idToken) => {
        axios.post(  `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/payments/credit?quantity=${quantity}`, {},
        {
            headers: {
                'accept': 'application/json',
                'id-token': idToken,
            },
        })
        .then((response) => {
            setCreditPurchaseLoading(false)
            window.location.reload()
        })
    }
        )
    }
        catch(error){
            console.log(error)
            setCreditPurchaseLoading(false)
        }
    
}

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



    return (
        <div className="dark:bg-darkMode pb-20 md:pl-10  3xl:pl-40">


           
            {isLoaded ?

                <div className="dark:bg-darkMode">
                    <div className="max-w-[200px] min-w-[200px] flex-row flex">

                    </div>



                    {
                        windowSize.width > 1280 ?
                            <div className=" w-full max-w-[1200px] pt-20 grid grid-col-3 mb-30 ">
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
                                                                                <p className="mt-2" >{Math.floor(credit)} minutes
                                                                                
                                                                                
                                                                                </p> :null
                                                                                        }
                                                                                        <p className="mt-2">
                                                                                            {tier==="free" && "Starter"}
                                                                                            {tier==="basic" && "Basic"}
                                                                                            {tier==="premium" && "Premium"}
                                                                                            </p>
                                                                        {(tier==="basic" || tier==="premium") &&

                                                                    <div className="mt-4"> 
                                                                    
                                                                        <Button size="sm" className="bg-indigo-300 text-white" onClick={() => setCreditPurchaseDialog(true)}>
                                                                        <AddCircleOutlineIcon  className="mr-2 dark:text-zinc-800" />
                                                                            <span className="mt-1 dark:text-zinc-800">Buy Credits</span>
                                                                    
                                                                    </Button>
                                                                    
                                                                    
                                                                    </div>}

                                                                   
                                                                                     

            
                                                                            </div>
                                                            
                                                            </div>
                                                        
                                                

                                                        
                                                            </div>
                                                            :null}
                                </div>
{/*                                 {currentUser && <div class="border-b border-gray-300 w-[50vw] mt-10 mb-20 mx-auto items-center flex"></div>}

 */}
                                
                                 <p className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-2xl font-bold mb-10 mt-20">Manage Subscription </p>
                         
                                { tier!=="free" ? <a className="text-center mb-10 text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change payment details or cancel subscription"}</a> : null}
                                
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
                                                                        <p className="mt-5" >{Math.floor(credit)} minutes
                                                                     
                                                                        </p> :null
                                                                                }
                                                                                
                                                                                <p className="mt-5">
                                                                                    
                                                                                {tier==="free" && "Starter Plan"}
                                                                                            {tier==="basic" && "Basic Plan"}
                                                                                            {tier==="premium" && "Premium Plan"}
                                                                                    
                                                                                    </p>
                                                                                    {(tier==="basic" || tier==="premium") &&

                                                                                <div className="mt-4"> 
                                                                                
                                                                                    <Button size="sm" className="bg-indigo-300 text-white" onClick={() => setCreditPurchaseDialog(true)}>
                                                                                    <AddCircleOutlineIcon  className="mr-2 dark:text-zinc-800" />
                                                                                        <span className="mt-1 dark:text-zinc-800">Buy Credits</span>

                                                                                </Button>
                                                                                
                                                                                </div>}

                                                                                
                                                                    </div>

                                                                    
                                                    
                                                    </div>
                         
                            </div>
                             :null}

                             
                                </div>

                                


                                <p className="text-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-2xl font-semibold mt-20 mb-10">Manage Subscription </p>
                                {currentUser ? <div className="items-center flex flex-col justify-center">  
                                { tier!=="free" ? <a className="text-center text-blueLike dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4" target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"> {canceledAtPeriodEnd ?"We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link." : "Change payment details or cancel subscription"}</a> : null}
                                       </div> : null}
                                </div>
                    }
 
                             
                              
                           <div className="flex  gap-y-8 xl:gap-y-0 gap-x-4 2xl:gap-x-8  mx-auto xl:mx-0 items-center justify-center flex-col xl:flex-row max-w-[1200px]">    

                    <FreeCard currentUser={currentUser} tier={tier} triggers1={triggers1} openPopover1={openPopover1} setOpenPopover1={setOpenPopover1} canceledAtPeriodEnd={canceledAtPeriodEnd}/>
                    <BasicCard currentUser={currentUser} tier={tier} triggers={triggers} openPopover={openPopover} setOpenPopover={setOpenPopover} canceledAtPeriodEnd={canceledAtPeriodEnd}/>
                    <PremiumCard currentUser={currentUser} tier={tier} triggers={triggers} openPopover={openPopover} setOpenPopover={setOpenPopover} canceledAtPeriodEnd={canceledAtPeriodEnd}/>
                                </div>



                              


                  
                
                </div >

                :
                
                <div className="mx-auto">
                    <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
                   </div>
               
            }
            
            
            <Dialog fullWidth={"true"} maxWidth={"sm"} open={creditPurchaseDialog} onClose={() => setCreditPurchaseDialog(false)}>
                                                                        <div className="h-[400px] p-10 text-zinc-600 text-sm dark:text-zinc-300 dark:bg-mildDarkMode  text-center items-center">
                                                                            
                                                                            <p className="text-lg font-normal ">
                                                                                You are about to purchase extra credits.
                                                                            </p>
                                                                            <p className="">
                                                                              Update quantity to scale your minutes proportionally.
                                                                            </p>

                                                                            <div className="mt-6"> 
                                                                            <p className="font-
                                                                             text-lg"> ${quantity*5}</p>
                                                                            <p>{quantity*300} minutes (={quantity*5} hours)</p>
                                                                            </div>
                                                                            
                                                                            
                                                                            


                                                                        <div className="flex flex-col  text-center items-center">
                                                                                <div className="flex flex-row mt-6">
                                                                                <RemoveCircleIcon className={`cursor-pointer text-zinc-300 mt-2 mr-2  ${quantity>1 ? "opacity-60" : "opacity-30 pointer-events-none text-zinc-200"}`}  onClick={handleDecrement}/>
                                                                                        <input 
                                                                                            type="text" 
                                                                                            value={quantity} 
                                                                                            onChange={handleQuantityChange} 
                                                                                            onBlur={handleBlur}
                                                                                            className="w-[70px] rounded-lg border border-gray-200 text-center dark:bg-mildDarkMode"
                                                                                        />
                                                                                    
                                                                                <AddCircleIcon className="cursor-pointer mt-2 ml-2 opacity-60 text-zinc-300" onClick={handleIncrement}/>
                                                                                
                                                                                    
                                                                                </div>
                                                                        
                                                                            
                                                                            <Button className={`bg-indigo-300 w-[200px] mt-6 py-3 ${(quantity<1  || creditPurchaseLoading) && "pointer-events-none opacity-60"}`}  size="md" onClick={buyCredit}>
                                                                                {creditPurchaseLoading ? 
                                                                                <Spinner color="gray" className="opacity-40 w-5 text-center margin-auto w-full"/> :
                                                                                <p className="py-1 dark:text-zinc-800 text-md">Purchase</p>
                                                                            }
                                                                                
                                                                                </Button>
                                                                                <p className="items-center margin-auto flex mt-4">
                                                                                 You will be charged automatically.
                                                                                 </p>
                                                                        </div>   
                                                                     </div>

</Dialog>
            
            </div>
            
    )
}