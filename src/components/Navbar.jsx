import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useState } from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { CgProfile } from "react-icons/cg"
// import Switcher from './Switcher'
// import Logout from "../supertokens_home/Logout"

import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png';
import { useGoogleLogin } from '@react-oauth/google';

function Navbar({ collapsed, setCollapsed }) {
	let sessionContext = useSessionContext();

	const navigate = useNavigate();
	const location = useLocation();

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

	const handleSignOut = async () => {
		try {
			await signOut();
			if (location.pathname === '/') {
				window.location.reload();
			} else {
				navigate('/');
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => console.log(tokenResponse),
	});

	// get the position of the navbar and fire a function if it is not at the top
	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 0) {
				setCollapsed(true);
			} else {
				// setCollapsed(false);
			}
		});
	}, []);

	// boolean to check if the user is in the /yt/id or /sp/id
	const isYt = useLocation().pathname.includes('/yt');
	const isSp = useLocation().pathname.includes('/sp');

	return (
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

						<div
							className="hidden cursor-pointer font-semibold text-zinc-200 md:block mr-5 pt-2"
							onClick={() => handleScroll('about')}
						>
							{' '}
							About{' '}
						</div>

						{sessionContext.userId ? (
							<div className="hidden md:block pt-2">
								<a className="text-l font-semibold text-zinc-200" onClick={handleSignOut}>
									Log Out
								</a>
							</div>
						) : (
							<div className="hidden md:block font-semibold pt-2 text-zinc-200">
								<Link to="/auth">Sign In</Link>
								{/* <button onClick={() => login()}>
									Sign in🚀{' '}
								</button> */}
							</div>
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

			{!isYt && !isSp && (
				<div
					className={`fixed top-0 z-50 w-screen transition origin-top-right transform md:hidden mb-auto pt-[2px] rounded-lg mt-[10vh] mr-2 ml-2 shadow-lg bg-zinc-100 ${
						collapsed ? 'nav-ham-collapsed' : 'nav-ham-not-collapsed'
					}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="overflow-y-auto">
							<div className="flex items-center justify-end"></div>
							<div className="flex">
								<div className="w-1/3 m-1 ">
									<div
										type="button"
										onClick={() => handleScroll('feedback')}
										className={`cursor-pointer text-zinc-600 font-semibold bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700  rounded-lg text-sm px-3 py-1.5 text-center`}
									>
										Give us feedback!
									</div>
								</div>
								<div className="w-1/3 flex">
									<div className="justify-center items-center ml-auto mr-auto flex">
										<Link
											className="text-l font-semibold text-blueLike cursor-pointer"
											onClick={() => handleScroll('about')}
										>
											About
										</Link>
									</div>
								</div>
								<div className="w-1/3 flex">
									<div className="justify-center items-center ml-auto mr-auto flex">
										{sessionContext.doesSessionExist ? (
											<Link
												className="text-l font-semibold text-blueLike"
												onClick={handleSignOut}
											>
												Log Out
											</Link>
										) : (
											<Link
												className="text-l font-semibold text-blueLike"
												to="/auth "
												onClick={() => setCollapsed(true)}
											>
												Sign In
											</Link>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
