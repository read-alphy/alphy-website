import React from 'react';
import DiscordLogo from '../img/discord.svg';
import TwitterLogo from '../img/twitter.svg';
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

		<footer class="p-4 sm:p-6 flex flex-col justify center items-center">
			<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
			<div class="container md:flex md:justify-between mx-auto">
				<div class="mb-6 md:mb-0 ml-100">
					<a href="https://flowbite.com/" class="flex items-center">
						<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Alphy</span>
					</a>
					<p className="text-l font-semibold sm:whitespace-nowrap dark:text-white">
						<br />
						Feel free to reach us through{' '}
						<a href="mailto:info@alphy.tech">
							<span className="text-yellow-600 hover:text-yellow-800 cursor-pointer">
								{' '}
								info@alphy.tech
							</span>{' '}
						</a>
						or ping us on our Discord for any questions and feedback.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-1">
					<div>
						<h2 className="sm:mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white text-center">
							Reach us
						</h2>
						<ul className="text-gray-600 dark:text-gray-400 flex justify-center sm:justify-between">
							<li className="m-2">
								<a href="mailto:info@alphy.tech" className="m-2">
									<img src="/mail.svg" alt="mail" className="sm:w-[50px] w-[20px] opacity-75" />
								</a>
							</li>
							<li className="m-2">
								<a href="https://discord.gg/" className="m-2">
									<img src="/discord.svg" alt="discord" className="sm:w-[50px] w-[20px] opacity-75" />
								</a>
							</li>
							<li className={'m-2'}>
								<a href="https://twitter.com" className="m-2">
									<img src="/twitter.svg" alt="twitter" className="sm:w-[50px] w-[20px] opacity-75" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
