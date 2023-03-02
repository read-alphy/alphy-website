import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Languages from './Languages';
import Session from 'supertokens-auth-react/recipe/session';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../Loading';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';


export default function Welcome() {


	const [inputValue, setInputValue] = useState('');
	const [language, setLanguage] = useState('en-US');

	const [loading, setLoading] = useState(false);
	let sessionContext = useSessionContext();
	const navigate = useNavigate();




	const handleSubmit = (event, selectedOption) => {
		let video_id = ""
		let source_type = ""
		toast.dismiss()
		// Do something with the inputValue here	

		if (!sessionContext.doesSessionExist) {
			if (
				inputValue.includes('https://www.youtube.com') ||
				inputValue.includes('https://youtu.be') ||
				inputValue.includes('https://m.youtube.com') ||
				inputValue.includes('https://twitter.com/i/spaces')
			) {

				setLoading(true);

				//check if the video is already in the database

				if (inputValue.includes('https://www.youtube.com') || inputValue.includes('https://m.youtube.com')) {
					source_type = "youtube"
					video_id = inputValue.split('v=')[1];
					var ampersandPosition = video_id.indexOf('&');
					if (ampersandPosition != -1) {
						video_id = video_id.substring(0, ampersandPosition);
					}

				}
				else if (inputValue.includes('https://youtu.be')) {
					source_type = "youtube"
					video_id = inputValue.split('be/')[1];
					var ampersandPosition = video_id.indexOf('&');
					if (ampersandPosition != -1) {
						video_id = video_id.substring(0, ampersandPosition);
					}
				}

				else if (inputValue.includes("https://twitter.com/i/spaces")) {
					source_type = "twitter"
					video_id = inputValue.split("https://twitter.com/i/spaces/")[1]
					var ampersandPosition = video_id.indexOf('?');
					if (ampersandPosition != -1) {
						video_id = video_id.substring(0, ampersandPosition);
					}
				}
				/* 				navigate("/article/" + video_id)
								axios.get(`${process.env.REACT_APP_API_URL}/summaries/${source_type}/${video_id}`).then((response) => {
									if (response === 200) {
										navigate("/article/" + video_id)
										return
									}
								}).catch() */

				//send request to database for post

				axios.post(`${process.env.REACT_APP_API_URL}/summaries`, {

					url: inputValue,
					language: "English"

				})
					.then((response) => {
						console.log(response)
						setLoading(false);
						setInputValue('');
						/* 						if (response.status === 200) {
						
												toast(
													'Someone already submitted this video! Give us a few minutes to process it.', {
													icon: '⌛',
													style: {
														background: "#F9F8F8"
													}
												}
												);
						
																		} */
						if (response.status === 200 || response.status === 201 || response.status === 202) {
							toast.success(
								'Succesfully submitted the content! \n\n We will send you an email when the article is ready.', { duration: 3000 }
							);

						}
						else {
							toast.error('There was an error submitting the form. Please try again.', {
								duration:
									3000
							});
						}

					})
					.catch(error => {

						toast.error('There was an error submitting the form. Please try again on desktop on another browser than Safari.', {
							duration:
								3000
						});
						setInputValue("")
						setLoading(false)
						throw error;

					})
			}

			else {

				setInputValue('');
				toast.error('Please provide a link to a YouTube video or Twitter Spaces.');

			}

		}

		else {

			navigate("/auth")

		};

	};

	return (
		<div className={`container px-4 mx-auto py-18 lg:py-28 ${loading ? "max-[90vh] overflow-x-hidden overflow-y-hidden" : ""}`}>
			{loading && (
				<div className={`flex justify-center items-center h-[95vh]`}>
					<div className="flex flex-col items-center">
						<ReactLoading type="spinningBubbles" color="#000" />
						<p className="text-bordoLike text-center mb-10 mt-10">
							We are processing your request. This may take a few seconds.
						</p>
					</div>
				</div>
			)}

			<div className="welcome-prompt 	text-5xl flex sm:flex-row flex-col justify-center text-bordoLike text-[2.25rem] font-semibold">
				<section className="animation1 lg:mr-2 text-green-400 block">
					<div className="first ">
						<div>Transcribe</div>
					</div>
					<div className="second">
						<div>Summarize</div>
					</div>
					<div className="third">
						<div>Question</div>
					</div>
					<div className="forth">
						<div>Transcribe</div>
					</div>
				</section>
				online media with just one click
			</div>
			<p className="text-bordoLike text-l md:text-center mb-10 mt-10 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20">
				Paste a link to a YouTube video or Twitter Spaces, choose the language of the content (only English for now), and submit. Alphy
				will transcribe, summarize and prepare the content for questioning. We will notify you via email
				when it's ready!{' '}
			</p>
			<Toaster />
			<div
				className="items-center justify-center w-full lg:space-x-4 lg:flex"

			>
				<div className="flex items-center mt-4 space-x-4 md:justify-center lg:mt-0">

					<input
						className="w-full lg:w-[600px] border border-[#6B728E] text-bordoLike py-2 pl-4 rounded-md duration-200 focus:ring-2 focus:ring-whiteLike focus:outline-none"
						type="text"
						name="content_link"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						placeholder="Insert a link to start"
						autoComplete="off"
					/>



					{/* <Languages language={language} onLangChange={setLanguage} /> */}
				</div>




				<div className="flex justify-center ">
					{sessionContext.doesSessionExist ? (
						<button
							className="w-1/3 border-2 border-bordoLike px-8 bg-lightblueLike text-whiteLike py-2 mt-6 duration-300 rounded-md lg:mt-0 md:w-auto lg:w-auto hover:opacity-75"
							type="submit"
							onClick={(e) => { handleSubmit() }}
						>
							Submit
						</button>
					) : (
						<button
							className="w-2/3 border-2 border-bordoLike px-8 bg-lightblueLike text-whiteLike py-2 mt-6 duration-300 rounded-md lg:mt-0 md:w-auto lg:w-auto hover:opacity-75"
							type="submit"
							onClick={(e) => { handleSubmit() }}
						>

							Sign In To Submit
						</button>
					)}
				</div>
			</div>

		</div>
	);
}
