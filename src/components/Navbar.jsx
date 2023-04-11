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
		<div className="">
			<div
				className={`navbar z-50 bg-bordoLike text-slate-100 font-bold h-[10vh] min-h-[50px] ${
					collapsed ? ' ' : '  '
				}`}
			>
				<div className="pl-10 flex flex-row ">
					<Link to="/">
						{/* <img className="w-10" src={Logo} /> */}
						<h1 className="text-2xl">ALPHY</h1>
					</Link>
				</div>

				<div>
					<div className=" navbar-right-section">
						<div className="signed-in-navbar grid gap-4">
							<div
								type="button"
								onClick={() => handleScroll('feedback')}
								className={`cursor-pointer hidden md:block text-zinc-600 font-semibold bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700  rounded-lg text-sm px-5 py-2.5 text-center mr-4`}
							>
								Give us feedback!
							</div>
							{/* <a href="https://www.producthunt.com/posts/alphy?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-alphy" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=388247&theme=light" width="250" height="54" /></a> */}
							<div
								className="hidden cursor-pointer font-semibold text-zinc-200 md:block mr-5 pt-2"
								onClick={() => handleScroll('about')}
							>
								{' '}
								About{' '}
							</div>

							{/* if user is in, show logout else login */}
							{currentUser ? (
								<div className="hidden md:block ">
									<button
										className="hidden md:block bg-zinc-50 hover:bg-zinc-200 text-slate-500 font-semibold  py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
										onClick={handleSignOut}
									>
										<FaGoogle className="inline-block mr-2 mb-1" />
										Sign Out
									</button>
								</div>
							) : (
								<button
									className="hidden md:block bg-zinc-50 hover:bg-zinc-200 text-slate-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
									onClick={handleLoginWithGoogle}
								>
									<FaGoogle className="inline-block mr-2 mb-1" />
									Sign In
								</button>
							)}

							<div
								id={'nav-icon3'}
								onClick={() => setCollapsed(!collapsed)}
								className={`block cursor-pointer md:hidden ${collapsed ? ' ' : ' open '}`}
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
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden ${
					collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed '
				}`}
			>
				<div className="">
					<div className="overflow-y-auto">
						<div className="flex">
							<div className="w-1/3 flex">
								<div className="justify-center items-center ml-auto mr-auto flex">
									<div
										className="text-l font-semibold text-slate-100 cursor-pointer"
										onClick={() => handleScroll('about')}
									>
										About
									</div>
								</div>
							</div>

							<div className="w-1/3 flex m-1 justify-center">
								<div
									type="button"
									onClick={() => handleScroll('feedback')}
									className={`cursor-pointer text-zinc-600 font-semibold bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 w-[100px] rounded-lg text-sm py-1.5 text-center`}
								>
									Give us feedback!
								</div>
							</div>
							<div className="w-1/3 flex">
								<div className="justify-center items-center ml-auto mr-auto flex text-sm">
									<button
										className="bg-zinc-50 hover:bg-zinc-200 text-slate-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
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
