import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Languages from './Languages';
// import { useSessionContext } from "supertokens-auth-react/recipe/session";
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../Loading';
import ReactLoading from 'react-loading';

export default function Welcome() {
	//const sessionContext = useSessionContext()
	// const sessionContext = { userId: "123" }
	// const navigate = useNavigate()

	const [inputValue, setInputValue] = useState('');
	const [language, setLanguage] = useState('en-US');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (event, selectedOption) => {
		event.preventDefault();
		toast.dismiss();
		// Do something with the inputValue here
		console.log(inputValue);
		console.log(selectedOption);

		if (
			inputValue.includes('https://www.youtube.com') ||
			inputValue.includes('https://youtu.be') ||
			inputValue.includes('twitter.com/i/spaces')
		) {
			setLoading(true);
			axios
				.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/summaries`, {
					url: inputValue,
					language: selectedOption,
				})
				.then((response) => {
					console.log(response);
					setLoading(false);
					setInputValue('');
					if (response.status === 200 || response.status === 201 || response.status === 202) {
						toast.success(
							'Succesfully submitted the ! \n\n We will send you an email when the article is ready.',
						);
					} else {
						toast.error('There was an error submitting the form. Please try again.');
					}
				});
		} else {
			setInputValue('');
			toast.error('Please provide a link to a YouTube video or Twitter Spaces.');
		}
	};

	return (
		<div className="container font-semibold px-4 mx-auto py-18 lg:py-28">
			{loading && (
				<div className="flex justify-center items-center h-screen">
					<div className="flex flex-col items-center">
						<ReactLoading type="spinningBubbles" color="#000" />
						<p className="text-bordoLike text-center mb-10 mt-10">
							We are processing your request. This may take a few seconds.
						</p>
					</div>
				</div>
			)}
			<div>
				<div className="welcome-prompt text-5xl flex sm:flex-row flex-col justify-center text-bordoLike text-[2.25rem] font-semibold">
					<section class="animation1 lg:mr-2 text-orangeLike block">
						<div class="first ">
							<div>Transcribe</div>
						</div>
						<div class="second">
							<div>Summarize</div>
						</div>
						<div class="third">
							<div>Question</div>
						</div>
						<div class="forth">
							<div>Transcribe</div>
						</div>
					</section>
					YouTube with just one click
				</div>
				<p className="text-bordoLike text-center mb-10 mt-10">
					Paste a YouTube link, choose the language of the video, and submit. Alphy will transcribe and
					summarize the video!{' '}
				</p>

				<form
					className="items-center justify-center w-full lg:space-x-4 lg:flex"
					onSubmit={(e) => handleSubmit(e, language)}
				>
					<div className="flex items-center mt-4 space-x-4 md:justify-center lg:mt-0">
						<input
							className="w-full lg:w-[600px] border border-bordoLike text-bordoLike py-2 pl-4 rounded-md duration-200 focus:ring-2 focus:ring-whiteLike focus:outline-none"
							type="text"
							name="content_link"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder="Insert the YouTube link to start"
						/>
						<Languages language={language} onLangChange={setLanguage} />
					</div>

					<Toaster />
					<div className="flex justify-center">
						<button
							className="w-2/3 border-2 border-bordoLike bg-orangeLike px-8 py-2 mt-6 duration-300 rounded-md lg:mt-0 md:w-auto lg:w-auto hover:opacity-75"
							type="submit"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
