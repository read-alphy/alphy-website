import React from 'react'
import Switcher from './Switcher'
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineGithub, AiFillDiscord } from "react-icons/ai"
import DiscordLogo from "../img/discord-mark-black.svg"

function Footer() {
    return (
        <div className='footer-main '>
            <div className=' footer-main-2 my-5 grid gap-2 md:grid-cols-4 sm:grid-cols-3'>
                <div>
                    <h1 >Reach Us</h1>
                    <p ><br />Feel free to ping our Discord server or Twitter page <br></br> for your questions and feedback.</p>
                </div>
                <div className='socials'>
                    <img src={DiscordLogo}></img>
                    <AiOutlineTwitter size={30} />
                </div>

            </div>

        </div>
    )
}

export default Footer

