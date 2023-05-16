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


export default function Welcome({hasActiveSub}) {
	

	
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [language, setLanguage] = useState('en-US');
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const [showToaster, setShowToaster] = useState(false);
	
	const[called, setCalled] = useState(false)
	const[videoData, setVideoData] = useState([])
	const[failed,setFailed]	= useState(false)

	
	
	const auth = useAuth()
    const handleLoginWithGoogle = () => {
        auth.loginWithGoogle().then(() => {
            window.location.reload()
        })
    };





	const handleCloseBanner = () => {
		if(localStorage.getItem("bannerClosed") === null){
		localStorage.setItem('bannerClosed', true);
	}
		
	};	



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

	/* const getYouTubeInfo = (videoId) => {
		try {
			const response =  axios.get(
			  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
			).then((response) => {
			
			const duration =response.data.items[0].contentDetails.duration;
			const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

			const hours = parseInt(match[1]) || 0;
			const minutes = parseInt(match[2]) || 0;
			const seconds = parseInt(match[3]) || 0;
			const duration_seconds = hours*3600 + minutes*60 + seconds
			setVideoData([response.data.items[0].statistics.viewCount, duration_seconds]);
			return(response.data.items[0].statistics.viewCount, duration_seconds)
			})
		  } catch (error) {
			console.error('Error fetching video data:', error);
		  }
	} */

 
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
				if (hasActiveSub){
				videoId = inputValue.split('/').pop().split("?")[0];
				video_source = "sp"
				}
				else{
					toast.error('Please switch to the premium plan to transcribe Twitter Spaces.');
					return;
				}

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
							setFailed(false)
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
						}).
						catch((error) => {
							if(hasActiveSub){
							toast('There was an error submitting the form. \n \n Potential causes: \n\n • You may have run out of credits \n\n • The video you are submitting is longer than 4 hours.', {
								duration: 5000,
								icon: '⚠️',
							});
						}
						else{	toast('There was an error submitting the form. \n \n Potential causes: \n\n • You may have run out of credits \n\n • The video you are submitting has less than 10,000. \n\n • The video you are submitting is longer than 1 hour.', {
								duration: 5000,
								icon: '⚠️',
							});
						}
							setFailed(true)
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
			className={`container xl:max-w-[1280px] px-4 mx-auto py-10 sm:py-18 lg:py-28 ${loading ? 'max-h-[90vh] overflow-x-hidden overflow-y-hidden' : ''
				}`}
		>
			{localStorage.getItem("bannerClosed")==="true" ? (null) : 

						(<div id="marketing-banner" tabindex="-1" class={`fixed ${localStorage.getItem("bannerClosed")===true ? "hidden":""}z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 drop-shadow-md rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600`}>
				<div class="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
			
					<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Notice: We had some changes to our usage policy. Check the {currentUser ? "Account" : "Plans"} page for more info! </p>
				</div>
				<div class="flex items-center flex-shrink-0">
				<a onClick={handleCloseBanner} href={currentUser ? "/account" : "plans"} class="inline-flex items-center px-3 py-2 mr-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg> Learn more</a>
					<button data-dismiss-target="#marketing-banner" type="button" class="absolute top-2.5 right-2.5 md:relative md:top-auto md:right-auto flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
						
						<svg onClick = {handleCloseBanner} aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
						<span class="sr-only">Close banner</span>
					</button>
				</div>
			</div>)
			}


{/* 			{loading && (
				<div className={`z-50 top-0 flex justify-center items-center h-[90vh]`}>
					<div className="flex flex-col items-center">
						<ReactLoading type="spinningBubbles" color="#000" />
						<p className="text-bordoLike dark:bg-darkMode dark:text-zinc-500 text-center mb-10 mt-10">
							We are processing your request. This may take a few seconds.
						</p>
					</div>
				</div>
			)}
 */}

			<div className="flex flex-col justify-center text-bordoLike dark:bg-darkMode dark:text-zinc-500 font-semibold font-noto lg:text-5xl md:text-4xl text-3xl lg:px-56 text-center">
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
				audiovisual content with just one click.
			</div>
			<p className="text-zinc-600 dark:bg-darkMode dark:text-zinc-500 text-xl md:text-center mb-10 mt-10 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20">
				Submit a link to a YouTube video or Twitter Spaces, and Alphy will transcribe, summarize, and prepare the content for questioning within minutes. We will
				notify you with email when it's ready!{' '}
			</p>




			{/* 
			<ul className="text-bordoLike dark:bg-darkMode dark:text-zinc-500 text-l md:text-center mb-10 mt-10 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20">
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

						<p class=" text-l mb-2 text-gray-600 dark:text-zinc-300 pb-2 ">

							<button id="popoverButton" data-popover-target="popoverDescription" data-popover-placement="left" data-popover-offset="20" type="button"><svg class="w-5 h-5 ml-1 pt-1 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button>

							Instructions for Alphy </p>
						<div data-popover id="popoverDescription" role="tooltip" class={`popover-description absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-zinc-50 dark:bg-darkMode border border-slate-800 rounded-lg shadow-sm opacity-0 w-72`}>
							<div class="p-3 space-y-2">
								<h3 class="font-semibold text-gray-900">Before submitting</h3>
								<p> Please make sure the duration of the content does not exceed <strong className="underline">1 hour</strong> if you are on a free tier and <strong className="underline">4 hours</strong> if premium. Otherwise, you will get an error. </p>
								<p> Free tier users can only submit videos with more than <strong className="underline">10,000 views</strong>. There is no popularity limity if you are premium.</p>
				<p>Submitting content will spend from your credits. Check the {currentUser ? "Acccount" : "Plans"} page for more info.</p>
								<p></p>
								<h3 class="font-semibold text-gray-900 pt-2">When the content is ready</h3>
								<p>If you see a video that has inaccurate transcription and summary, please let us know. We will fix it as soon as possible.
								</p>


								<a href="https://twitter.com/alphyapp" className="flex pt-2 items-center font-medium text-blue-800 hover:text-zinc-200">Reach us if you have any questions <svg class="w-4 h-4 ml-1 pt-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></a>
							</div>
							<div class="popover-arrow" role="presentation"></div>
						</div>
						<input

							className={`w-full lg:w-[600px] border border-zinc-300 text-bordoLike dark:bg-mildDarkMode  dark:border-zinc-600 dark:text-zinc-500 py-3 pl-4 rounded-full  focus:ring-whiteLike dark:focus:ring-mildDarkMode dark:focus:outline-none focus:outline-none ${failed && inputValue.length===0 ? "border-red-500" : ""}`} 
							type="text"
							name="content_link"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder="Insert a link to start"
							autoComplete="off"
						/>
					{/* 	{failed && inputValue.length===0 ?<p className="font-light ml-2 text-red-500"> Check again.</p> : null} */}

					</div>
					{/* <Languages language={language} onLangChange={setLanguage} /> */}
				</div>

				<div className="flex justify-center ">
					{currentUser ? (
						<button
							className="w-1/3 border-2 border-blueLike px-8 bg-blueLike text-whiteLike py-3 mt-6 rounded-full lg:mt-10 md:w-1/3 lg:w-auto hover:opacity-90 transition duration-200 ease-in-out"
							type="submit"
							onClick={(e) => {
								handleSubmit();
							}}
						>
							Submit
						</button>
					) : (
						<button
							className="w-2/3 border-2 border-blueLike px-8 bg-blueLike text-whiteLike py-2 mt-6 duration-300 rounded-full lg:mt-10 md:w-auto lg:w-auto hover:opacity-75"
							type="submit"
							onClick={handleLoginWithGoogle}
						>
							Sign In To Submit
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
