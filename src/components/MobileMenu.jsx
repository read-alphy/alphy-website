import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link, useNavigate } from "react-router-dom"
import Switcher from './Switcher'
import "../helper/MobileMenu.css"
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/session";
import Feed from './Article_components/Feed'
import { useState } from 'react';
import { useEffect } from 'react';

function MobileMenu(signOut, data) {


    const sessionContext = useSessionContext()
    const navigate = useNavigate()


    const handleSignOut = async () => {
        try {
            console.log(sessionContext.userId)
            await signOut()
            navigate("/")
            console.log(sessionContext.userId)
        } catch (error) {
            console.log(error.message);

        }
    }
    return (
        <Menu right>

            {sessionContext.userId ? (<Link to="/article/new-article">New +</Link>) : null}

            {sessionContext.userId ? (< button onClick={handleSignOut}>Log Out</button>) : (<Link to="/auth">
                Sign In
            </Link>)}


        </Menu >
    )
}

export default MobileMenu