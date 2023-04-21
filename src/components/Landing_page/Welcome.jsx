import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Languages from './Languages';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../Loading';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Popover } from 'flowbite';


export default function Welcome() {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [language, setLanguage] = useState('en-US');
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const [showToaster, setShowToaster] = useState(false);

	useEffect(() => {
		// check if the toaster has already been displayed


		if (!showToaster) {
			// if not, display the toaster and set a flag in localStorage
			setShowToaster(true);
			toast("⚠️ We are experiencing some technical problems. \n\n You may encounter long waiting times or errors with content longer than 1 hour.", {
				duration: 5000,
				position: "top-center",
				className: "text-xl min-w-[400px]",
				icon: "",
				style: {

					margin: "20px",

				}
			})
		}
	}, []);


	/*
	* $targetEl: required
	* $triggerEl: required
	* options: optional
	*/


	// set the popover content element
	const $targetEl = document.getElementById('popoverDescription');

	// set the element that trigger the popover using hover or click
	const $triggerEl = document.getElementById('popoverButton');

	// options with default values
	const options = {
		placement: 'left',
		triggerType: 'hover',
		offset: 20,

	};

	const popover = new Popover($targetEl, $triggerEl, options);


	const handleSubmit = (event, selectedOption) => {
		toast.dismiss();
		if (
			!(
				inputValue.includes('https://www.youtube.com/watch') ||
				inputValue.includes('https://youtu.be') ||
				inputValue.includes('https://m.youtube.com') ||
				inputValue.includes('https://twitter.com/i/spaces')
			)
		) {
			setInputValue('');
			toast.error('Please provide a link to a YouTube video or Twitter Spaces.');
			return;

		}
		else {
			let videoId
			let video_source
			//check if video already exists
			if (inputValue.includes('https://www.youtube.com')) {
				videoId = inputValue.split('/').pop().split('?v=')[1].split("&")[0];
				video_source = "yt"


			}

			else if (inputValue.includes('https://youtu.be')) {
				videoId = inputValue.split('/').pop().split("?")[0];
				video_source = "yt"

			}

			else if (inputValue.includes('https://m.youtube.com')) {
				videoId = inputValue.split('/').pop().split('?v=')[1].split("&")[0];
				video_source = "yt"

			}
			else if (inputValue.includes('https://twitter.com/i/spaces')) {
				videoId = inputValue.split('/').pop().split("?")[0];
				video_source = "sp"

			}


			if (currentUser) {
				setLoading(true);
				// get id token
				currentUser.getIdToken().then((idToken) => {
					axios
						.post(
							`${process.env.REACT_APP_API_URL}/summaries`,
							{
								url: inputValue,
								language: 'en',
							},
							{
								headers: {
									'id-token': idToken,
								},
							},
						)
						.then((response) => {

							setLoading(false);
							setInputValue('');
							navigate(`/${video_source}/${videoId}`)
							/* 							if (response.status === 200 || response.status === 201 || response.status === 202) {
															toast.success(
																'Succesfully submitted the content! \n\n We will send you an email when the article is ready.',
																{ duration: 3000 },
															);
														} else {
															toast.error('There was an error submitting the form. Please try again.', {
																duration: 3000,
															});
														} */
						})
						.catch((error) => {
							toast.error('There was an error submitting the form. Please try again.', {
								duration: 3000,
							});
							setInputValue('');
							setLoading(false);
							throw error;
						});
				});
			} else {
				// sign in
				// navigate('/auth');
				toast.error('Please sign in to submit content.', {
					duration: 3000,
				});
			}
		}
	};

	return (
		<div
			className={`container px-4 mx-auto py-10 sm:py-18 lg:py-28 ${loading ? 'max-[90vh] overflow-x-hidden overflow-y-hidden' : ''
				}`}
		>
			{loading && (
				<div className={`flex justify-center items-center h-[90vh]`}>
					<div className="flex flex-col items-center">
						<ReactLoading type="spinningBubbles" color="#000" />
						<p className="text-bordoLike text-center mb-10 mt-10">
							We are processing your request. This may take a few seconds.
						</p>
					</div>
				</div>
			)}


			<div className="flex flex-col justify-center text-bordoLike font-semibold font-noto lg:text-5xl md:text-4xl text-3xl lg:px-56 text-center">
				<section className="animation1 block justify-center lg:h-[4rem] md:h-[3rem] h-[2.5rem] text-green-400 select-none drag-none mx-auto">
					<div className="first flex justify-center pb-3 ">
						<div className="">Transcribe</div>
					</div>
					<div className="second  flex justify-center pb-3">
						<div className="">Summarize</div>
					</div>
					<div className="third  flex justify-center pb-3">
						<div className="">Question</div>
					</div>
					<div className="forth  flex justify-center pb-3">
						<div className="">Transcribe</div>
					</div>
				</section>
				audiovisual content with just one click. It's free.
			</div>
			<p className="text-bordoLike text-xl md:text-center mb-10 mt-10 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20">
				Submit a link to a YouTube video or Twitter Spaces, and Alphy will transcribe, summarize, and prepare the content for questioning within minutes. We will
				notify you with email when it's ready!{' '}
			</p>




			{/* 
			<ul className="text-bordoLike text-l md:text-center mb-10 mt-10 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20">
				<p className="text-xl mb-2">Before submitting:</p>
				<li className="mb-1 font-semibold">
					∙Alphy works best with the content in English. We are working on supporting other languages.
				</li>
				<li className="mb-1 font-semibold">
					∙ Submitting a content longer than 3 hours will turn an error.
				</li>
				<li className="mb-1 font-semibold">
					∙ Please notify us if you find any bugs or have any suggestions. We are working hard to improve Alphy.
				</li>
			</ul> */}

			<Toaster />

			<div className="items-center justify-center w-full lg:space-x-4 lg:flex">

				<div className="flex items-center mt-4 space-x-4 md:justify-center lg:mt-0">

					<div className="w-full flex flex-col">

						<p class=" text-l mb-2 text-gray-600 dark:text-gray-400 pb-2 ">

							<button id="popoverButton" data-popover-target="popoverDescription" data-popover-placement="left" data-popover-offset="20" type="button"><svg class="w-5 h-5 ml-1 pt-1 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button>

							Instructions for Alphy</p>

						<div data-popover id="popoverDescription" role="tooltip" class={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 border border-slate-800 rounded-lg shadow-sm opacity-0 w-72`}>
							<div class="p-3 space-y-2">
								<h3 class="font-semibold text-gray-900">Before submitting</h3>
								<p> Please make sure the duration of the content does not exceed <strong className="underline">3 hours</strong>. Otherwise, you will get an error. </p>
								<p> Alphy works best with the content in English. We are working on supporting other languages. Meanwhile, you may encounter some errors with content in other languages and alphabets.</p>
								<p></p>
								<h3 class="font-semibold text-gray-900 pt-2">When the content is ready</h3>
								<p>If you see a video that has inaccurate transcription and summary, please let us know. We will fix it as soon as possible.
								</p>


								<a href="https://twitter.com/alphyapp" className="flex pt-2 items-center font-medium text-blue-800 hover:text-blue-700">Reach us if you have any questions <svg class="w-4 h-4 ml-1 pt-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></a>
							</div>
							<div class="popover-arrow" role="presentation"></div>
						</div>
						<input

							className="w-full lg:w-[600px] border border-[#6B728E] text-bordoLike py-2 pl-4 rounded-md duration-200 focus:ring-2 focus:ring-whiteLike focus:outline-none"
							type="text"
							name="content_link"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder="Insert a link to start"
							autoComplete="off"
						/>

					</div>
					{/* <Languages language={language} onLangChange={setLanguage} /> */}
				</div>

				<div className="flex justify-center ">
					{currentUser ? (
						<button
							className="w-1/3 border-2 border-bordoLike px-8 bg-lightblueLike text-whiteLike py-2 mt-6 duration-300 rounded-md lg:mt-10 md:w-1/3 lg:w-auto hover:opacity-75"
							type="submit"
							onClick={(e) => {
								handleSubmit();
							}}
						>
							Submit
						</button>
					) : (
						<button
							className="w-2/3 border-2 border-bordoLike px-8 bg-lightblueLike text-whiteLike py-2 mt-6 duration-300 rounded-md lg:mt-10 md:w-auto lg:w-auto hover:opacity-75"
							type="submit"
							onClick={(e) => {
								handleSubmit();
							}}
						>
							Sign In To Submit
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
