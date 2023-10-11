import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import DiscordIcon from "../../img/discord.svg"
import Dialog from '@mui/material/Dialog';
import { useState, useEffect} from 'react';
import FeedbackForm from '../FeedbackForm';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import {Link} from "react-router-dom"
import VerifiedIcon from '@mui/icons-material/Verified';

export default function FooterReworked({currentUser,collapsed,setCollapsed, handleSignout,tier}){
    const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
    const [isDarkMode, setDarkMode] = useState(localStorage.theme || "light");
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark')
		  } else {
			document.documentElement.classList.remove('dark')
		  }
		  const handleResize = () => {
			setWindowWidth(window.innerWidth);
		  };
	  
		  window.addEventListener('resize', handleResize);
	  
		  // Cleanup the event listener when the component is unmounted
		  return () => {
			window.removeEventListener('resize', handleResize);
		  };
	}, []);
  

    const handleDarkMode = () => {


      const colorTheme = isDarkMode === "dark" ? "light" : "dark";
      document.documentElement.classList.remove(isDarkMode);
      document.documentElement.classList.add(colorTheme);
      setDarkMode(colorTheme);
      localStorage.setItem("theme", colorTheme);
	  
    };

    return(
        <div className="w-full mx-auto mb-4">
          {!collapsed ? 
          <div>
                              <div className="">
                                  <div className="flex flex-col">
                                  {/*   {tier===free && 
                                    <div className="mb-6 hidden xl:block">
                                    <p className = "text-zinc-600 dark:text-zinc-200 text-md  w-full w-full pl-10 mb-5 ">Try Premium</p>
                                    <p className = "text-zinc-500 dark:text-zinc-300 text-sm w-full w-full pl-10 ">Extra transcription credits, multi-language access, local audio processing, and unlimited Arc creation</p>
                                    <Link to="/plans" className=" text-xs w-full cursor-pointer w-full pl-10 mt-5 text-green-400 dark:text-greenColor">Learn More > </Link>
                                    </div>
                                    }
 */}
                                {tier==="premium" && 
                                    <div className="mb-6  flex flex-row w-full pl-6 md:pl-10">
                                           
                                          <p className = "text-indigo-400 text-md  "> 
                                          <span className="mt-1">Premium
                                                      </span>
                                                      <VerifiedIcon fontSize="small" className=" ml-2 text-indigo-400 "/>
                                          </p>
                                    
                                    </div>
                                    }
                              {localStorage.getItem("logged in")==="true" ? 
                              
                              <Link className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 " to="/account">
                                  {/* <PersonIcon className="text-zinc-300 mr-2" fontSize="medium"/> */}
                                  <span>Account</span>
                                  </Link>:

                                  <Link className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 " to="/plans">
                                    <span>Plans</span></Link>
                                  
                                  }
                                </div> 
                            
                                <div className="mt-2 lg:mt-4 pl-6 md:pl-10">
                                  <Link className="text-zinc-500 dark:text-zinc-300 text-sm    w-full cursor-pointer w-[120px]" onClick={()=>setOpenFeedbackDialog(true)}>Reach Us</Link>
                              </div>
                              <div className=" mt-2 lg:mt-4 pl-6 md:pl-10">
                              <Link className="text-zinc-500 dark:text-zinc-300 text-sm     w-full cursor-pointer w-[120px]" to="/about ">About Alphy</Link>
                              </div>
                              </div>
                              <div className="pl-6 md:pl-10 mt-2 lg:mt-4 text-sm cursor-pointer text-zinc-500 dark:text-zinc-300">
                                                                          {localStorage.getItem('theme') === 'light' ? (
                                                                              <div onClick={handleDarkMode} className=" grid grid-cols-3">
                                                                              
                                             
                                                  <p className=" pt-1 col-span-2  ">Light</p>
                                                 <LightModeIcon className="col-span-1 pt-1  mr-2  ml-4 lg:ml-8 duration-200 transition ease-in duration-200"/>
                                                  </div>):
                                                  <div onClick={handleDarkMode} className="flex flex-row grid grid-cols-3">
                                                      
                                                      
                                                      <p className=" pt-1 col-span-2  ">Dark</p>
                                                < DarkModeIcon className="col-span-1 pt-1  mr-2 ml-4 lg:ml-8 duration-200 transition ease-in duration-200"/>
                                                  </div>}
                                          </div>
                              <div className="pl-6 md:pl-10 mt-2 lg:mt-4 flex flex-row">
                              <Link className="text-zinc-500 dark:text-zinc-300 text-sm   w-full cursor-pointer w-[120px]" to="/privacypolicy">Privacy Policy</Link>
                              
                              
                              </div>
                              {(currentUser!==null && currentUser!==undefined) && 
                              <div className="pl-6 md:pl-10 mt-2 lg:mt-4 flex flex-row">
                              <button className="text-zinc-500 dark:text-zinc-300 text-sm cursor-pointer" onClick={() => handleSignout()}>Sign Out</button>
                             </div>
                             }
                                     
                              <div className="border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-5 mt-5 dark:opacity-40"></div>

                              <div className="grid grid-cols-3 justify-items-center px-2 mb-8">
                                  <a href="https://twitter.com/alphyapp" className="cursor-pointer" target="_blank">
                                  <TwitterIcon fontSize="small" className="text-[#ced4da]"/>
                                  </a>
                                  <a href="mailto:support@alphy.app" className="cursor-pointer">
                                  <EmailIcon fontSize="small" className="text-[#ced4da]"/>
                                  </a>
                                  <div>
                                  <a href="https://discord.gg/N4CkQhCVv2" target="_blank" >
                                      <img src={DiscordIcon} className="mt-1" />
                                  </a>
                              </div>
                              </div>
                          </div>












                              :











                           <div className="pl-4 mb-6">
                              <div className="mb-6 ">
                                  <div className="flex flex-col">
                              
                              
                              <Link className="text-zinc-600 dark:text-zinc-300 text-sm w-full cursor-pointer w-full" to={localStorage.getItem("logged in")==="true" ? "/account" : "/plans"}>
                                   <PersonIcon className="text-zinc-600 dark:text-zinc-300 mr-2" fontSize="small"/> 
                                  
                                  </Link>
                                  
                                  
                                </div> 
                            
                                <div className="mt-6">
                                  <Link className="text-zinc-300 dark:text-zinc-300 text-sm    w-full cursor-pointer w-[120px]" onClick={()=>setOpenFeedbackDialog(true)}>
                                    
                                  <ChatBubbleIcon fontSize="small" className="text-zinc-500  dark:text-zinc-300"/> </Link>
                              </div>
                             
                              </div>
                              
                                      <div className=" mt-6 text-sm cursor-pointer text-zinc-500  dark:text-zinc-300">
                                                                          {localStorage.getItem('theme') === 'light' ? (
                                                                              <div onClick={handleDarkMode} className="flex flex-row">
                                          <LightModeIcon/>
                                                  
                                                  </div>):
                                                  <div onClick={handleDarkMode} className="flex flex-row">
                                                      
                                             <DarkModeIcon/>
                                                  
                                                  </div>}
                                          </div>
                              

                           
                              
                              </div>}

       

                  <Dialog maxWidth={"md"} fullWidth={true} open={openFeedbackDialog} onClose={()=>setOpenFeedbackDialog(false)}>
                    <div className="dark:bg-mildDarkMode">
                        <FeedbackForm/>
                    </div>
                  </Dialog>
        </div>
    )
}