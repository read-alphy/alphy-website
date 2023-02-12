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

		<footer className={'p-4 sm:p-6 flex flex-col justify center items-center text-mainText bg-blueLike'}>
			<hr className={'my-6 border-gray-200 sm:mx-auto lg:my-8'} />
			<div className={'container md:flex md:justify-between mx-auto'}>
				<div className={'mb-6 md:mb-0 ml-100'}>
					<a href="https://flowbite.com/" className={'flex items-center'}>
						<span className={'self-center text-2xl font-semibold whitespace-nowrap'}>Alphy</span>
					</a>
					<p className="text-l font-semibold sm:whitespace-nowrap">
						<br />
						Feel free to reach us through{' '}
						<a href="mailto:info@alphy.tech">
							<span className="text-yellow-600 hover:text-yellow-800 cursor-pointer ">
								{' '}
								info@alphy.tech
							</span>{' '}
						</a>
						or ping us on our Discord for any questions and feedback.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 mb-5">
					<div>
						<h2 className="sm:mb-6 text-2xl text-whiteLike font-bold ">REACH US</h2>
					</div>

					<a href="mailto:info@alphy.tech" className="mb-5">
						info@alphy.tech
					</a>

					<a href="https://discord.gg/" className="mb-5">
						Discord
					</a>

					<a href="https://twitter.com" className="">
						Twitter
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
