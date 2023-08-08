import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import FeedItem from './FeedTabs/FeedItem';
import HubIcon from '@mui/icons-material/Hub';
import FooterReworked from "./FooterReworked"
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import LastPageIcon from '@mui/icons-material/LastPage';
import Logo from "../../img/logo.png"
import LogoBlack from "../../img/logo-inverted.png"
import { Link } from 'react-router-dom';
import HubFeedItem from "../../routes/Hub/HubFeedItemElements/HubFeedItem"
import {useLocation} from 'react-router-dom';


function SideFeedReworked({collapsed,setCollapsed,userLayout,submitLayout,globalLayout, dataArchipelago}) {
	
	
	const { currentUser } = useAuth();
	const [firstTimePersonal, setFirstTimePersonal] = useState(true);
	const [called, setCalled] = useState(false);
	const location = useLocation();
	const carouselRef = useRef(null);
	const auth = useAuth()
	const navigate= useNavigate()

	
	
	
	const temp = 10;
	const limit = temp;

	useEffect(() => {
		setTimeout(() => {
			setCalled(true);
			
			
		}, 1000);
	}, []);

	
	useEffect(() => {
        const handleScroll = () => {
          if (carouselRef.current) {
            const container = carouselRef.current;
            const isScrollEnd = container.scrollLeft + container.clientWidth === container.scrollWidth;

          }
        };
    
        // Attach scroll event listener
        if (carouselRef.current) {
          carouselRef.current.addEventListener('scroll', handleScroll);
        }

        // Clean up the event listener on component unmount
        return () => {
          if (carouselRef.current) {
            carouselRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);

	  const handleSignOut = async () => {
		try {
			auth.logout();
			navigate("/")
			window.location.reload()
			localStorage.setItem("logged in","false")
		} catch (error) {
			console.log("sign out error",error)
		
		}
	};

	return (
		<div id="side-feed" className={`dark:bg-mildDarkMode dark:text-zinc-300 bg-zinc-50 sm:bg-zinc-100 min-h-[100vh] sm:max-h-[100vh] ${collapsed? "min-w-[60px] max-w-[60px]" :"w-full lg:min-w-[270px] lg:max-w-[270px]" } relative transition-all duration-300 ease-in-out`} >

			{!collapsed ? 
			<div className="">
							<div className={`flex items-center font-bold pt-8 relative`}>

									<Link to="/" className="text-zinc-800 dark:text-gray-200 pl-4 sm:pl-6 ">
									<div className="flex-row flex">
									<img src={Logo} width={40} className="hidden dark:block"></img>
									<img src={LogoBlack} width={40} className="dark:hidden opacity-80 "></img>
									<h1 className="ml-2 text-2xl mt-1 ">ALPHY</h1>
						
									</div>
								</Link>
										<div className="hidden sm:block">
										<LastPageIcon onClick={()=> setCollapsed(true)} fontSize="large" className="rotate-180 ml-16  text-zinc-500 dark:text-zinc-500 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 hover:transition hover:duration-200 hover:ease-in-out p-1"/>
										</div>

			<div className="absolute right-0 mr-6 -mt-1">
											<div
												id={'nav-icon3'}
												onClick={() => setCollapsed(!collapsed)}
												className={` cursor-pointer sm:hidden ${collapsed ? ' ' : ' open '} text-zinc-500 dark:text-zinc-500`}
											>
												<span className="bg-zinc-700 dark:bg-zinc-200"></span>
												<span className="bg-zinc-700 dark:bg-zinc-200"></span>
												<span className="bg-zinc-700 dark:bg-zinc-200"></span>
												<span className="bg-zinc-700 dark:bg-zinc-200"></span>
											</div>
									</div>
									</div>

									
							<div className="pt-10 md:pl-5">

								<div className="flex flex-col w-full justify-start px-5">
									<Link to="/submit" className={`text-zinc-700  px-2 py-2 transition duration-300 ease-in-out ${submitLayout ? " drop-shadow-sm ":"drop-shadow-sm"}   text-sm sm:text-md bg-green-200 text-zinc-600 dark:text-zinc-700 rounded-lg  text-md max-w-[120px] flex flex-row `} >
									<AddIcon fontSize="small" className="mr-3"/>
										<p>New</p>
									</Link>
							

									<Link to="/myhub" className={` flex flex-row py-3 mt-2 sm:mt-6  text-sm sm:text-md  ${userLayout ? "text-zinc-700 dark:text-zinc-200":"text-zinc-500 dark:text-zinc-300"} dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`} >
									<HubIcon className="mr-3 " fontSize="small"/>
										<p className="">My Hub</p>
										
									</Link>

									<Link to="/"  className={`${globalLayout ? "text-zinc-700 dark:text-zinc-200":"text-zinc-500 dark:text-zinc-300"} flex flex-row py-3 mt-2 sm:mt-6 text-sm sm:text-md  dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`} >
									<ExploreIcon className="mr-3" fontSize="small"/>
										<p className="">Discover</p>
										
									</Link>
									{
									localStorage.getItem("logged in")==="true" ?   (
											null
										) : (
											<Link
											className="text-zinc-500 dark:text-zinc-300 hover:text-slate-400 duration-200 transition flex flex-row py-3 mt-2 sm:mt-6 text-sm sm:text-md dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out"
											to="/u/login"
										><LoginIcon className="mr-3 text-green-300 dark:text-green-200" fontSize="small"/>
										<p className="text-green-300 dark:text-green-200">Sign In</p>
										</Link>
									)}
								</div>

					</div>
					{( dataArchipelago!==undefined && dataArchipelago.length>0 && location.pathname.includes("/arc/createArc")==false)
					
					?
					<div>
					<div class="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-4" ></div>
					<p className="text-zinc-700 dark:text-zinc-300 mt-10 ml-4 mb-2  text-l">Sources</p>
					<div className="overflow-y-scroll max-h-[55vh] 2xl:max-h-[60vh]">
						            

					
								<div className="overflow-x-hidden hidden md:block lg:hidden">
									
									
								{dataArchipelago.map((item, index) => 
								
									<HubFeedItem sideFeed={true} key={index} item={item.source} setCollapsed={setCollapsed} myBookmarks={false}  />
							
								)}

								</div>

								<div className="overflow-x-hidden md:hidden lg:block">
									
									
									{dataArchipelago.map((item, index) => 
									
										<FeedItem sideFeed={true} key={index} item={item.source} setCollapsed={setCollapsed} myBookmarks={false}  />
								
									)}
	
									</div>
					</div>
					</div>

					:<div className="absolute bottom-0 w-full">
					<FooterReworked collapsed={collapsed} setCollapsed={setCollapsed} handleSignout={handleSignOut}/>
					</div>

					}

					

		</div>
		: 

		<div>
			<div className="">
							<div className={`flex items-center font-bold pt-10 pl-2`}>

									<button onClick={() => setCollapsed(false)} className="text-zinc-8 00 dark:text-gray-200 ">
									<div className="flex-row flex">
									<img src={Logo} width={40} className="hidden dark:block"></img>
									<img src={LogoBlack} width={40} className="dark:hidden opacity-80 "></img>
									
									<div className="absolute z-50 ">
										<LastPageIcon onClick={()=> setCollapsed(true)} fontSize="large" className="opacity-0 hover:opacity-100 ml-1 hover:text-zinc-100 hover:block text-zinc-500 dark:text-zinc-500 cursor-pointer rounded-full hover:bg-green-300 dark:hover:bg-zinc-700 hover:transition  hover:ease-in-out p-1"/>
									</div>
									</div>
								</button>
										
										
									</div>
									
							<div className="pt-16 ">

								<div className="flex flex-col w-full justify-start ">
									<div className="pl-2">
									<Link to="/submit" className={`text-zinc-700 transition duration-300 ease-in-out rounded-full bg-zinc-200 px-2 py-2 dark:bg-zinc-300 text-md`} >
									<AddIcon className="" fontSize="small"/>
										
									</Link>
									</div>
						
									<Link to="/myhub" className={` pl-4 flex flex-row py-3 mt-6 text-zinc-500 dark:text-zinc-300	 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`} >
									<HubIcon className="mr-3 " fontSize="small"/>
										
										
									</Link>
									<Link to="/"  className={` pl-4 text-zinc-500 dark:text-zinc-300 flex flex-row py-3 mt-6 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`} >
									<ExploreIcon className="mr-3" fontSize="small"/>		
									</Link>
									{
									localStorage.getItem("logged in")==="true" ?   (
											null
										) : (
											<Link
											className="pl-4 text-zinc-500 dark:text-zinc-300 hover:text-slate-400 duration-200 transition flex flex-row py-3 mt-6 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out"
											to="/u/login"
										><LoginIcon className="mr-3 text-green-300 dark:text-green-200" fontSize="small"/>
										
										</Link>
									)}
								</div>
					</div>

					<div className="items-end absolute bottom-0 w-full">
								<FooterReworked collapsed={collapsed} setCollapsed={setCollapsed} handleSignout={handleSignOut}/>
						</div>

		</div>
			</div>

			}
		</div>




	);
}
export default SideFeedReworked;