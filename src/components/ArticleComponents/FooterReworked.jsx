import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import DiscordIcon from "../../img/discord.svg"
import Dialog from '@mui/material/Dialog';
import { useState, useEffect} from 'react';
import FeedbackForm from '../FeedbackForm';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackIcon from '@mui/icons-material/Feedback';
import {Link} from "react-router-dom"


export default function FooterReworked({currentUser,collapsed,setCollapsed}){
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
                              <div className="mb-6">
                                  <div className="flex flex-col">
                              {localStorage.getItem("logged in")==="true" ? 
                              
                              <Link className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-10 " to="/account">
                                  {/* <PersonIcon className="text-zinc-300 mr-2" fontSize="medium"/> */}
                                  <span>Account</span>
                                  </Link>:

                                  <Link className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-10 " to="/plans">
                                    <span>Plans</span></Link>
                                  
                                  }
                                </div> 
                            
                                <div className="mt-6 pl-10">
                                  <Link className="text-zinc-500 dark:text-zinc-300 text-sm    w-full cursor-pointer w-[120px]" onClick={()=>setOpenFeedbackDialog(true)}>Reach Us</Link>
                              </div>
                              <div className="mt-6 pl-10">
                              <Link className="text-zinc-500 dark:text-zinc-300 text-sm     w-full cursor-pointer w-[120px]" to="/FAQ ">FAQ</Link>
                              </div>
                              </div>
                              <div className="pl-10 mt-6 text-sm cursor-pointer text-zinc-500 dark:text-zinc-300">
                                                                          {localStorage.getItem('theme') === 'light' ? (
                                                                              <div onClick={handleDarkMode} className="flex flex-row">
                                                                              
                                              <svg className="mr-1 hover:text-zinc-600 duration-200 transition ease-in"  width={25} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                                                  </svg>
                                                  <p className="text-center pt-1  ">Light</p>
                                                  </div>):
                                                  <div onClick={handleDarkMode} className="flex flex-row">
                                                      
                                                  <svg className="mr-2 hover:text-zinc-50 duration-200 transition ease-in" width={20}  aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" strokeLinecap="round" strokeLinejoin="round"></path>
                                                  </svg>
                                                  <p>Dark</p>
                                                  </div>}
                                          </div>
                              <div className="pl-10 mt-6 flex flex-row">
                              <Link className="text-zinc-500 dark:text-zinc-300 text-sm   w-full cursor-pointer w-[120px]" to="/privacypolicy">Privacy Policy</Link>
                              
                              </div>
                                     
                              <div class="border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-5 mt-5 dark:opacity-40"></div>

                              <div className="grid grid-cols-3 justify-items-center px-2 mb-8">
                                  <Link to="https://twitter.com/alphyapp" className="cursor-pointer">
                                  <TwitterIcon fontSize="small" className="text-[#ced4da]"/>
                                  </Link>
                                  <Link to="mailto:support@alphy.app" className="cursor-pointer">
                                  <EmailIcon fontSize="small" className="text-[#ced4da]"/>
                                  </Link>
                                  <div>
                                  <Link to="https://discord.gg/N4CkQhCVv2" >
                                      <img src={DiscordIcon} className="mt-1" />
                                  </Link>
                              </div>
                              </div>
                          </div>












                              :











                           <div className="pl-4 mb-6">
                              <div className="mb-6 ">
                                  <div className="flex flex-col">
                              
                              
                              <Link className="text-zinc-600 dark:text-zinc-300 text-sm w-full cursor-pointer w-full" to={localStorage.getItem("logged in")==="true" ? "/account" : "/plans"}>
                                   <PersonIcon className="text-zinc-300 mr-2" fontSize="medium"/> 
                                  
                                  </Link>
                                  
                                  
                                </div> 
                            
                                <div className="mt-6">
                                  <Link className="text-zinc-500 dark:text-zinc-300 text-sm    w-full cursor-pointer w-[120px]" onClick={()=>setOpenFeedbackDialog(true)}>
                                    
                                  <FeedbackIcon fontSize="small" className="text-zinc-500  dark:text-zinc-300"/> </Link>
                              </div>
                             
                              </div>
                              
                                      <div className=" mt-6 text-sm cursor-pointer text-zinc-500  dark:text-zinc-300">
                                                                          {localStorage.getItem('theme') === 'light' ? (
                                                                              <div onClick={handleDarkMode} className="flex flex-row">
                                                                              
                                              <svg className="mr-1 hover:text-zinc-600 duration-200 transition ease-in"  width={25} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                                                  </svg>
                                                  
                                                  </div>):
                                                  <div onClick={handleDarkMode} className="flex flex-row">
                                                      
                                                  <svg className="mr-2 hover:text-zinc-50 duration-200 transition ease-in" width={20}  aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" strokeLinecap="round" strokeLinejoin="round"></path>
                                                  </svg>
                                                  
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