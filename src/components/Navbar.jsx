import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import Logo from "../img/logo.png"
import LogoBlack from "../img/logo-inverted.png"
import HomeIcon from '@mui/icons-material/Home';


function Navbar({ collapsed, setCollapsed }) {
	
	const navigate = useNavigate();
	const location = useLocation();
	const { currentUser, logout } = useAuth();
	const [isDarkMode, setDarkMode] = useState(localStorage.theme || "light");
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);


	useEffect(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark')
		  } else {
			document.documentElement.classList.remove('dark')
		  }

		  const handleResize = () => {
			if (window.innerWidth > 999) {
				setCollapsed(false);
			  }
			else{
				setCollapsed(true);
			}
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

	const handleScroll = (target) => {
		// if in article page first navigate to main page
		if (location.pathname !== '/') {
			
			navigate('/');
			setTimeout(() => {
				const about = document.getElementById(target);
				about.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 1);
		} else {
			setCollapsed(true);
			const about = document.getElementById(target);
			about.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

/* 	if (location.pathname === '/') {
		const pageTitle = document.getElementById('page-title');
		if (pageTitle) {
			pageTitle.innerHTML = 'Alphy';
		}
	} */
	const metaTag = document.querySelector('meta[property="og:image"]');
	if (metaTag) {
		metaTag.setAttribute('content', 'https://i.ibb.co/RBH2C63/homepage.png');
	}




	// boolean to check if the user is in the /yt/id or /sp/id
	const isYt = useLocation().pathname.includes('/yt');
	const isSp = useLocation().pathname.includes('/sp');
	const isUp = useLocation().pathname.includes('/up');
	const isArc = useLocation().pathname.includes('/arc');
	const isHub = useLocation().pathname.includes('/hub');

	return (
<div className={`items-center ${isYt || isSp || isUp || isArc || isHub ? "" : "mx32s-auto max-dasw-[1200px]"} justify-between dark:bg-darkMode	`}>
	<div
		className={`flex  justify-between flex-row 	 pt-4 top-0 z-40 text-blueLike bg-[#fafafa]   dark:text-zinc-300 dark:text-gray-200 text-sm md:text-md font-normal ${isYt || isSp || isUp || isArc || isHub ? "h-[8vh] min-h-[40px]" : "h-[8vh] min-h-[40px]"} dark:bg-darkMode`}
	>
		<div className={`flex mt-4 font-bold ${collapsed==false && windowWidth>999 && "pl-4"} ${(windowWidth > 999 && !collapsed)  ? "bg-zinc-100 dark:bg-mildDarkMode" : ""} h-[10vh] min-h-[40px] sm:min-w-[270px] sm:max-w-[270px] dark:sm:min-w-[270px] dark:sm:max-w-[270px]`}>
			{collapsed==true	 && (isArc) && <div onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex cursor-pointer bg-zinc-100 dark:bg-mildDarkMode min-w-[32px] max-w-[32px]	h-[10vh]"></div>}
			<Link to={"/"} className="dark:text-gray-200 pl-4 ">
				<div className="flex-row flex">
				<img src={Logo} width={40} className="hidden dark:block"></img>
				<img src={LogoBlack} width={40} className="dark:hidden opacity-80 "></img>
				<h1 className="ml-2 mt-1 text-2xl">ALPHY</h1>
	
				</div>
			</Link>


			{isArc  ? 
				<div onClick={() =>setCollapsed(!collapsed) } className={`hidden lg:flex rounded-full bg-opacity-0 hover:bg-opacity-60 hover:bg-zinc-200 dark:hover:bg-zinc-700 ml-40  mr-4 p-1 transition duration-300 ease-in-out ${collapsed ? " lg:hidden bg-zinc-50 dark:bg-darkMode" : " bg-zinc-100 dark:bg-mildDarkMode  justify-end  "}  `}>
				<button >

					
<svg className={`${!collapsed && "rotate-180"} opacity-50 hover:opacity-40 duration-200 ease-in-out transform`}  width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

			</button		>
			</div>
			: null} 
		</div>

		<div className={`flex `}>
			
			<div >
				<div className="flex flex-row mt-6 dark:text-gray-300 ">
				

				

				
					
					

				<div
					id={'nav-icon3'}
					onClick={() => setCollapsed(!collapsed)}
					className={`block cursor-pointer col-span-3 mr-5 lg:hidden ${collapsed ? ' ' : ' open '} `}
				>
					<span className="bg-zinc-700 dark:bg-zinc-200"></span>
					<span className="bg-zinc-700 dark:bg-zinc-200"></span>
					<span className="bg-zinc-700 dark:bg-zinc-200"></span>
					<span className="bg-zinc-700 dark:bg-zinc-200"></span>
				</div>
			</div>
		</div>
	</div>
</div>


			
			
			<div
				className={`w-screen   transition origin-top-right transform lg:hidden ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			>
				
			</div>
		</div>
	);
}

export default Navbar;
