import React from 'react'
import DiscordLogo from "../img/discord.svg"
import TwitterLogo from "../img/twitter.svg"
function Footer() {
    return (
        <div className='footer-main '>
            <div className='grid gap-2 my-5 container mx-auto w-800 footer-main-2 md:grid-cols-4 sm:grid-cols-3'>
                <div>
                    <h1 className="text-2xl">Reach Us</h1>
                    <p ><br />Feel free to reach us through<span className="text-yellow-600"> hello@alphy.tech</span> or ping us on our Discord for any questions and feedback.</p>
                </div>
                <div className='relative flex mb-4 space-x-20 px-4'>
                    <img src={DiscordLogo} alt={'discord'}></img>
                    <img src={TwitterLogo} alt={'twitter'}></img>
                </div>

            </div>

        </div>
    )
}

export default Footer

