import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import Logo from "../img/logo.png"
import LogoBlack from "../img/logo-inverted.png"

function Navbar({ collapsed, setCollapsed }) {
	const auth = useAuth();
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
		metaTag.setAttribute('content', 'homepage.png');
	}

	const handleLoginWithGoogle = () => {
		auth.loginWithGoogle();
		setCollapsed(true)
			.then(() => {
				window.location.reload()
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleSignOut = async () => {
		try {
			auth.logout();
			setCollapsed(true);
			window.location.reload()
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignIn = () => {
		// navigate('/auth');
	};


	// boolean to check if the user is in the /yt/id or /sp/id
	const isYt = useLocation().pathname.includes('/yt');
	const isSp = useLocation().pathname.includes('/sp');
	const isUp= useLocation().pathname.includes('/up');

	return (
<div className={`items-center ${isYt || isSp || isUp ? "" : "mx-auto max-w-[1200px]"} justify-between dark:bg-darkMode`}>
	<div
		className={`flex dropshadow-l justify-between flex-row 	 top-0 z-40 text-blueLike bg-[#fafafa] dark:bg-darkMode dark:text-zinc-300 dark:text-gray-200 text-sm md:text-md font-normal ${isYt || isSp || isUp ? "h-[8vh] min-h-[40px]" : "h-[8vh] min-h-[40px]"} ${collapsed ? ' ' : '  '
			}`}
	>
		<div className={`flex items-center font-bold ${collapsed==false && windowWidth>999 && "pl-4"} ${(windowWidth > 999 && (isYt || isSp || isUp) && !collapsed)  ? "bg-zinc-100 dark:bg-mildDarkMode" : ""} h-[10vh] min-h-[40px] w-[250px] min-w-[250px] 3xl:w-[330px] 3xl:min-w-[330px]`}>
			{collapsed==true	 && (isYt || isSp || isUp) && <div onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex cursor-pointer bg-zinc-100 dark:bg-mildDarkMode min-w-[32px] max-w-[32px]	h-[10vh]"></div>}
			<Link to="/" className="dark:text-gray-200 pl-4 ">
				<div className="flex-row flex">
				<img src={Logo} width={40} className="hidden dark:block"></img>
				<img src={LogoBlack} width={40} className="dark:hidden opacity-80 "></img>
				<h1 className="ml-2 text-2xl">ALPHY</h1>
	
				</div>
			</Link>
			{isYt || isSp || isUp ? 
				<div className={`hidden lg:flex 3xl:ml-40 lg:ml-20 pr-4 ${collapsed ? " lg:hidden bg-zinc-50 dark:bg-darkMode" : " bg-zinc-100 dark:bg-mildDarkMode  justify-end  "}  `}>
				<button onClick={() =>setCollapsed(!collapsed) }>

					
<svg className={`${!collapsed && "rotate-180"} opacity-50 hover:opacity-40 duration-200 ease-in-out transform`}  width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

			</button		>
			</div>
			: null}
		</div>

		<div className={`flex dark:bg-darkMode`}>
			<div >
				<div className="flex flex-row mt-6 dark:text-gray-300 dark:bg-darkMode">
				{/* <a className="mr-4 hidden lg:block" href="https://www.producthunt.com/posts/alphy?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-alphy" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=388247&theme=light"  width={160} height={40} /></a> */}
					<div
						type="button"
						onClick={() => handleScroll('feedback')}
						className={`hidden lg:block lg:flex cursor-pointer text-center font-normal mr-6 text-blueLike dark:bg-darkMode dark:text-zinc-300 dark:text-gray-200 lg:block pt-2`}
					>
						Reach Us
					</div>

					
{/* 					<div
						className="hidden lg:block lg:flex cursor-pointer text-center font-normal mr-6 text-blueLike dark:bg-darkMode dark:text-zinc-300 dark:text-gray-200 lg:block  pt-2"
						onClick={() => handleScroll('about')}
					>
						{' '}
						About{' '}
					</div> */}
					<div
						type="button"
						className={`hidden lg:block lg:flex cursor-pointer text-center font-normal mr-6 text-blueLike dark:bg-darkMode dark:text-zinc-300 dark:text-gray-200 lg:block pt-2`}
					>
						{' '}
						<Link to={currentUser ?"/account" : "/plans"} className="dark:text-gray-200">
							{currentUser ? "Account" : "Plans"}
						</Link>{' '}
					</div>
					<div className="hidden lg:block lg:flex font-normal mr-6 cursor-pointer">
											{localStorage.getItem('theme') === 'dark' ? (
										<svg className="mr-1 hover:text-zinc-50 duration-200 transition ease-in" onClick={handleDarkMode} width={30} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round"></path>
					</svg>):
					<svg className="mr-2 hover:text-zinc-800 duration-200 transition ease-in" width={25} onClick={handleDarkMode} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" strokeLinecap="round" strokeLinejoin="round"></path>
					</svg>}
					</div>
					{currentUser ? (
						<div className="hidden lg:block lg:block lg:flex  ">
							<button
								className="hidden lg:block text-slate-600 dark:text-gray-200 hover:text-slate-400 duration-200 transition ease-in font-normal py-2 cursor-pointer rounded focus:outline-none focus:shadow-outline mr-4 dark:hover:text-zinc-400"
								onClick={handleSignOut}
							>
{/* 								<FaGoogle className="inline-block mr-2 mb-1" />
 */}								Sign Out
							</button>
						</div>
					) : (
						<a
						className="hidden lg:block text-slate-600 dark:text-gray-200 hover:text-slate-400 duration-200 transition ease-in font-normal py-2  rounded focus:outline-none focus:shadow-outline mr-4 dark:hover:text-zinc-400"
						href="/u/login"
					>
{/* 						<FaGoogle className="inline-block mr-2 mb-1" />
 */}						Sign In
					</a>
				)}

				<div
					id={'nav-icon3'}
					onClick={() => setCollapsed(!collapsed)}
					className={`block cursor-pointer col-span-3 mr-5 lg:hidden ${collapsed ? ' ' : ' open '} dark:text-gray-200 dark:invert`}
				>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	</div>
</div>


			
			
			<div
				className={`w-screen   dark:bg-darkMode  transition origin-top-right transform lg:hidden ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			>
				<div className="text-center mx-auto items-center">
					<div className="overflow-y-auto z-40  text-sm mx-auto items-center justify-center flex flex-row">
						<div className="flex mx-auto flex-row min-w-[300px]">
						{/* 	<div className="flex flex-row">
								<div className="justify-center items-center flex ml-4">
									<div
										className="mr-2 font-normal text-blueLike dark:bg-darkMode dark:text-zinc-300 cursor-pointer"
										onClick={() => handleScroll('about')}
									>
										About
									</div>
								</div>
							</div> */}

							<div className=" flex m-1 ml-6 text-center justify-center text-sm">
								<div className="mr-4 mx-auto items-center hidden xs:flex">
							{/* <a  href="https://www.producthunt.com/posts/alphy?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-alphy" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=388247&theme=light"  width={160} height={40} /></a> */}
							</div>
								<div
									type="button"
									onClick={() => handleScroll('feedback')}
									className={`cursor-pointer text-blueLike dark:bg-darkMode dark:text-zinc-300 font-normal items-center text-center mx-auto flex`}
								>
									Reach Us
								</div>
							</div>

							<div className="flex m-1 ml-6 justify-center text-sm">
								<div
									type="button"

									className={`cursor-pointer text-blueLike dark:bg-darkMode dark:text-zinc-300 font-normal items-center text-center mx-auto flex`}
								>
									<Link to="/plans">
										{currentUser ? "Account" : "Plans"}
									</Link>{' '}
								</div>
							</div>

										<div className="flex font-normal ml-6 cursor-pointer">
														{localStorage.getItem('theme') === 'dark' && !collapsed ? (
													<svg className="mr-1 hover:text-zinc-50 duration-200 transition ease-in" onClick={handleDarkMode} width={25} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round"></path>
								</svg>):
								<svg className="mr-2 hover:text-zinc-500 duration-200 transition ease-in" width={25} onClick={handleDarkMode} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" strokeLinecap="round" strokeLinejoin="round"></path>
								</svg>}
									</div>

							<div className="flex">
								<div className="justify-center items-center ml-auto mr-auto flex text-sm">
									<a
										className="bg-zinc-50 dark:bg-darkMode hover:text-opacity-90 duration-600 transition ease-in text-slate-500 font-normal py-2 px-4 rounded cursor-pointer "
										onClick={currentUser && handleSignOut }
										href={currentUser==null && '/u/login'}
									>
										{/* <FaGoogle className="inline-block mr-1 mb-1 w-1/6" /> */}
										{currentUser ? 'Sign Out' : 'Sign In'}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
