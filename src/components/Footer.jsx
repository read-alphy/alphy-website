import React from 'react'
import DiscordLogo from "../img/discord.svg"
import TwitterLogo from "../img/twitter.svg"
function Footer() {
    return (
        /*         <div className='footer-main '>
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
        
                </div> */

        <footer class="p-4 sm:p-6 ">
            <div class="container md:flex md:justify-between mx-auto">
                <div class="mb-6 md:mb-0 ml-100">
                    <a href="https://flowbite.com/" class="flex items-center">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="FlowBite Logo" /> */}
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Alphy</span>
                    </a>
                    <p className="text-l font-semibold whitespace-nowrap dark:text-white"><br />Feel free to reach us through <span className="text-yellow-600"> info@alphy.tech</span> or ping us on our Discord for any questions and feedback.</p>

                </div>
                <div class="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-1">
                    <div>
                        <h2 class="mb-6 mt-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Reach us</h2>
                        <ul class="text-gray-600 dark:text-gray-400">
                            <li class="mb-4">
                                <a href="mailto:info@alphy.tech" class="hover:underline ">info@alphy.tech</a>
                            </li>
                            <li class="mb-4">
                                <a href="https://discord.gg/" class="hover:underline">Discord</a>
                            </li>
                            <li>
                                <a href="https://twitter.com" class="hover:underline">Twitter</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        </footer>

    )
}

export default Footer

