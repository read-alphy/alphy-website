import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useState } from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { CgProfile } from "react-icons/cg"
// import Switcher from './Switcher'
// import Logout from "../supertokens_home/Logout"
// import MobileMenu from './MobileMenu'
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/session';
import { useNavigate } from 'react-router-dom';
function Navbar({ collapsed, setCollapsed }) {
	const sessionContext = useSessionContext();

	const navigate = useNavigate();
	const location = useLocation();

	const handleSignOut = async () => {
		try {
			await signOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	console.log(location.pathname);
	//Navbar component called About that sends people to #about section on the homepage

	return (
		<div className="navbar bg-bordoLike text-slate-100 font-bold">
			<div className="company-logo">
				<Link to="/">
					<h1 className="text-2xl">ALPHY</h1>
				</Link>
			</div>

			<div>
				<div className=" navbar-right-section">

					<div className="signed-in-navbar grid ">

						<a href="/#feedback" type="button" class="text-gray-900 font-semibold bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700  rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2">Give us feedback!</a>
						<a href="/#about" className="hidden lg:block mr-5 pt-2"> About </a>


						{sessionContext.userId ? (<div className="hidden lg:block pt-2">
							<button onClick={handleSignOut} className="navbar-link">
								Log Out
							</button>
						</div>) : (

							<div className="hidden lg:block pt-2">
								{/* <Link to="/article/new-article" className="navbar-link"> User Hub </Link> */}
								<Link to="/auth">Sign In</Link>
							</div>
						)}

						<div
							onClick={() => setCollapsed(!collapsed)}
							className="block mr-4 cursor-pointer lg:hidden"
						>
							<i className="text-2xl ri-menu-line text-mainText"></i>
						</div>


					</div>

				</div>
			</div>
		</div>
	);
}

export default Navbar;
