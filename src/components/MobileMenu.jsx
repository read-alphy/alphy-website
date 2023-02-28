import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link, useNavigate } from "react-router-dom"
import "../helper/MobileMenu.css"
// import Switcher from './Switcher'
import { useSessionContext } from "supertokens-auth-react/recipe/session";
// import { signOut } from "supertokens-auth-react/recipe/session";
// import Feed from './Article_components/Feed'
// import { useState } from 'react';
// import { useEffect } from 'react';

function MobileMenu(signOut, data) {


    const sessionContext = useSessionContext()
    const navigate = useNavigate()


    const handleSignOut = async () => {
        try {

            await signOut()
            navigate("/")

        } catch (error) {
            console.log(error.message);

        }
    }
    return (
        <Menu right>

            {/*        {sessionContext.doesSessionExist ? (<Link to="/article/new-article">New +</Link>) : null} */}

            {sessionContext.doesSessionExist ? (<div className="w-1/3 ml-5 mb-5">
                <Link className="text-l font-semibold text-blueLike" onClick={handleSignOut}>
                    Log Out
                </Link>
            </div>) : (<Link to="/auth" >
                <p className="font-bold">Sign In</p>
            </Link>)}


        </Menu >
    )
}

export default MobileMenu