import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import FeedItem from './FeedTabs/FeedItem';
import PublicIcon from '@mui/icons-material/Public';
import HubIcon from '@mui/icons-material/Hub';
import FooterReworked from "./FooterReworked"
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
function SideFeed(props) {
	
	
	const { currentUser } = useAuth();
	const [firstTimePersonal, setFirstTimePersonal] = useState(true);
	const [called, setCalled] = useState(false);

	const carouselRef = useRef(null);


	


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

	return (
		<div id="side-feed" className="dark:bg-mildDarkMode dark:text-zinc-300 bg-zinc-50 lg:bg-zinc-100 min-h-[100vh] lg:min-h-[92vh] relative">
				<div className="lg:hidden">
					<Navbar collapsed={props.collapsed} setCollapsed={props.setCollapsed}/>
				</div>
		<div className="pt-10 md:pl-5">

			<div className="flex flex-col w-full justify-start px-5">
				<a href="/submit" className={`text-white transition duration-300 ease-in-out ${props.submitLayout ? " drop-shadow-sm ":"drop-shadow-lg  scale-105 transform"}   bg-green-200 text-zinc-600 dark:text-zinc-700 rounded-lg px-2 text-md max-w-[120px] flex flex-row py-2`} >
				<AddIcon className="mr-3"/>
					<p>New</p>
				</a>
		

				<a href="/myhub" className={` flex flex-row py-3 mt-6  ${props.userLayout ? "text-zinc-700 dark:text-zinc-200":"text-zinc-500 dark:text-zinc-300"} dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`} >
				<HubIcon className="mr-3 " fontSize="medium"/>
					<p className="">My Hub</p>
					
				</a>

				<a href="/discover"  className={`${props.globalLayout ? "text-zinc-700 dark:text-zinc-200":"text-zinc-500 dark:text-zinc-300"} flex flex-row py-3 mt-6 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`} >
				<ExploreIcon className="mr-3" fontSize="medium"/>
					<p className="">Discover</p>
					
				</a>
				{
				localStorage.getItem("logged in")==="true" ?   (
						null
					) : (
						<a
						className="text-zinc-500 dark:text-zinc-300 hover:text-slate-400 duration-200 transition flex flex-row py-3 mt-6 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out"
						href="/u/login"
					><LoginIcon className="mr-3" fontSize="medium"/>
					<p className="">Sign In</p>
					</a>
				)}
			</div>

</div>

<div className="absolute bottom-0 w-full">
			<FooterReworked/>
	</div>

		
			
		</div>




	);
}
export default SideFeed;