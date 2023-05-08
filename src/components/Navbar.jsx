import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
function Navbar({ collapsed, setCollapsed }) {
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const { currentUser, logout } = useAuth();

	const handleScroll = (target) => {
		// if in article page first navigate to main page
		if (location.pathname !== '/') {
			console.log('debug');
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

	if (location.pathname === '/') {
		const pageTitle = document.getElementById('page-title');
		if (pageTitle) {
			pageTitle.innerHTML = 'Alphy';
		}
	}
	const metaTag = document.querySelector('meta[property="og:image"]');
	if (metaTag) {
		metaTag.setAttribute('content', 'https://i.ibb.co/Q8pQPFs/1.png');
	}

	const handleLoginWithGoogle = () => {
		auth.loginWithGoogle();
		setCollapsed(true)
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleSignOut = async () => {
		try {
			auth.logout();

			setCollapsed(true);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignIn = () => {
		// navigate('/auth');
	};

	// get the position of the navbar and fire a function if it is not at the top
	// useEffect(() => {
	// 	window.addEventListener('scroll', () => {
	// 		if (window.scrollY > 0) {
	// 			setCollapsed(true);
	// 		} else {
	// 			setCollapsed(false);
	// 		}
	// 	});
	// }, []);

	// boolean to check if the user is in the /yt/id or /sp/id
	const isYt = useLocation().pathname.includes('/yt');
	const isSp = useLocation().pathname.includes('/sp');

	return (
		<div className={`items-center ${isYt || isSp ? "" : "mx-auto max-w-[1200px]"}  justify-between`}>
			<div
				className={`flex dropshadow-l justify-between flex-row top-0 z-50 text-blueLike font-bold ${isYt || isSp ? "h-[8vh] min-h-[40px]" : "h-[8vh] min-h-[40px]"} ${collapsed ? ' ' : '  '
					}`}
			>
				<div className={`pl-10 flex items-center ${(window.innerWidth > 999 && (isYt || isSp)) ? "bg-zinc-100 " : ""}  h-[10vh] min-h-[40px] min-w-[330px] w-[330px]`}>
					<Link to="/">
						{/* <img className="w-10" src={Logo} /> */}
						<h1 className="text-2xl">ALPHY</h1>
					</Link>
				</div>

				<div className={`flex`}>
					<div >
						<div className=" grid grid-cols-4 gap-3 mt-6 ">
							<div
								type="button"
								onClick={() => handleScroll('feedback')}
								className={`hidden md:col-span-1 cursor-pointer text-center font-semibold text-blueLike md:block pt-2`}
							>
								Reach Us
							</div>
							{/* <a href="https://www.producthunt.com/posts/alphy?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-alphy" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=388247&theme=light" width="250" height="54" /></a> */}
							<div
								className="hidden md:col-span-1 cursor-pointer text-center font-semibold text-blueLike md:block  pt-2"
								onClick={() => handleScroll('about')}
							>
								{' '}
								About{' '}
							</div>
							<div
								type="button"

								className={`hidden md:col-span-1 cursor-pointer text-center font-semibold text-blueLike md:block pt-2`}
							>
								{' '}
								<Link to="/plans">
									{currentUser ? "Account" : "Plans"}
								</Link>{' '}
							</div>



							{/* if user is in, show logout else login */}
							{currentUser ? (
								<div className="hidden md:block md:col-span-1 ">
									<button
										className="hidden md:block bg-zinc-200 hover:bg-zinc-100 text-slate-600 font-semibold  py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
										onClick={handleSignOut}
									>
										<FaGoogle className="inline-block mr-2 mb-1" />
										Sign Out
									</button>
								</div>
							) : (
								<button
									className="hidden md:block md:col-span-1 bg-zinc-200 hover:bg-zinc-100 text-slate-600 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
									onClick={handleLoginWithGoogle}
								>
									<FaGoogle className="inline-block mr-2 mb-1" />
									Sign In
								</button>
							)}

							<div
								id={'nav-icon3'}
								onClick={() => setCollapsed(!collapsed)}
								className={`block cursor-pointer col-span-3 mr-5 md:hidden ${collapsed ? ' ' : ' open '}`}
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
				className={`w-screen  border-[0.5px] border-b border-zinc-100  transition origin-top-right transform md:hidden ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed '
					}`}
			>
				<div className="">
					<div className="overflow-y-auto z-50">
						<div className="flex">
							<div className="w-3/12 flex">
								<div className="justify-center items-center ml-auto mr-auto flex">
									<div
										className="text-l font-semibold text-blueLike cursor-pointer"
										onClick={() => handleScroll('about')}
									>
										About
									</div>
								</div>
							</div>

							{/* 							<div className="w-1/3 flex m-1 justify-center">
								<div
									type="button"
									onClick={() => handleScroll('feedback')}
									className={`cursor-pointer text-zinc-600 font-semibold bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 w-[100px] rounded-lg text-sm py-1.5 text-center`}
								>
									Give us feedback!
								</div>
							</div> */}
							{/* 
							<div
								className="cursor-pointer w-3/12 text-center font-semibold text-blueLike md:block pt-5"

							>
								{' '}
								<Link to="/plans">
							
									Pricing
								</Link>{' '}
							</div> */}
							<div className="w-3/12 flex m-1 text-center justify-center">
								<div
									type="button"
									onClick={() => handleScroll('feedback')}
									className={`cursor-pointer text-blueLike font-semibold items-center text-center mx-auto flex`}
								>
									Reach Us
								</div>
							</div>

							<div className="w-3/12 flex m-1 justify-center">
								<div
									type="button"

									className={`cursor-pointer text-blueLike font-semibold items-center text-center mx-auto flex`}
								>
									<Link to="/plans">
										{currentUser ? "Account" : "Plans"}
									</Link>{' '}
								</div>
							</div>



							<div className="w-1/3 flex">
								<div className="justify-center items-center ml-auto mr-auto flex text-sm">
									<button
										className="bg-zinc-50 hover:bg-zinc-100 text-slate-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
										onClick={currentUser ? handleSignOut : handleLoginWithGoogle}
									>
										<FaGoogle className="inline-block mr-1 mb-1 w-1/6" />
										{currentUser ? 'Sign Out' : 'Sign In'}
									</button>
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
