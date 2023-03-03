import React from 'react';
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

	/* 	const responseMessage = (response) => {
			console.log(response);
		};
		const errorMessage = (error) => {
			console.log(error);
		}; */

	const handleScroll = (target) => {
		// if in article page first navigate to main page
		if (location.pathname.includes('/article')) {
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

	return (
		<div className="navbar  bg-bordoLike text-slate-100 font-bold max-h-[10vh] min-h-[60px]">
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

						<div onClick={() => setCollapsed(!collapsed)} className={`block mr-4 cursor-pointer md:hidden`}>
							<i className="text-2xl ri-menu-line text-mainText"></i>
						</div>
					</div>
				</div>
			</div>

			{!collapsed ? ( // hamburger menu for mobile devices
				<div className="fixed top-0 z-50 transition origin-top-left w-full transform md:hidden mb-auto pt-[2px]">
					<div className="rounded-lg rounded-t-none shadow-lg bg-whiteLike">
						<div className="h-screen px-4 overflow-y-auto">
							<div className="flex items-center justify-end p-4 "></div>
							<div className="grid grid-row">
								<div className="grid grid-cols-2">
									<p className=" ml-5 text-xl font-bold text-blueLike pb-10">ALPHY</p>

									<button
										className={`mb-10 w-1/12 justify-self-end mr-5 text-blueLike ${
											collapsed ? 'block' : 'block'
										}`}
										onClick={() => setCollapsed(true)}
									>
										<svg
											className="w-5 h-5"
											fill="bg-blueLike"
											stroke="currentColor"
											viewBox="0 0 24 24 "
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap={'round'}
												strokeLinejoin={'round'}
												strokeWidth={'2'}
												d="M6 18L18 6M6 6l12 12"
											></path>
										</svg>
									</button>
								</div>
								<div className="w-1/3 ml-5 mb-5">
									<div
										type="button"
										className={`text-blueLike font-semibold cursor-pointer `}
										onClick={() => {
											handleScroll('feedback');
										}}
									>
										Give us feedback!
									</div>
								</div>
								<div className="w-1/3 ml-5 mb-5">
									<Link
										className="text-l font-semibold text-blueLike"
										to="/"
										onClick={() => setCollapsed(true)}
									>
										Home
									</Link>
								</div>
								<div className="w-1/3 ml-5 mb-5">
									<div
										type="button"
										className={`text-blueLike font-semibold cursor-pointer `}
										onClick={() => {
											handleScroll('about');
										}}
									>
										About
									</div>
								</div>
								{sessionContext.userId ? (
									<div className="w-1/3 ml-5 mb-5">
										<a className="text-l font-semibold text-blueLike" onClick={handleSignOut}>
											Log Out
										</a>
									</div>
								) : (
									<div className="w-1/3 ml-5 mb-5">
										<a
											className="text-l font-semibold text-blueLike"
											to="/auth "
											onClick={() => setCollapsed(true)}
										>
											Sign In
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Navbar;
