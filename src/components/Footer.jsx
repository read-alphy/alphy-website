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

		<footer className={'p-4 sm:p-6 flex flex-col justify center items-center w-full text-mainText bg-bordoLike'}>
			<hr className={'my-6 bg-bordoLike sm:mx-auto lg:my-8'} />
			<div className={'container lg:flex lg:justify-between mx-auto'}>
				<div className={'mb-6 md:mb-0 '}>
					<span className={' text-2xl font-semibold lg:whitespace-nowrap'}>ALPHY</span>

					<p className="text-l font-semibold md:whitespace-nowrap">
						<br />
						Feel free to reach us through{' '}
						<a href="mailto:info@alphy.app">
							<span className="text-green-400 hover:text-green-300 cursor-pointer "> info@alphy.app</span>{' '}
						</a>
						or ping us on our Discord for any questions and feedback.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 mb-5">
					<div>
						<h2 className="mb-6  text-2xl text-whiteLike font-bold ">Related Links</h2>
					</div>

					<a href="mailto:info@alphy.app" className="mb-5">
						info@alphy.app
					</a>

					<a href="https://discord.gg/2Vvk9xJz" className="mb-5">
						Discord
					</a>

					<a href="https://twitter.com/alphyapp" className="mb-5">
						Twitter
					</a>
					<a href="https://alphy.app/privacypolicy" className="">
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
