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
import { Button} from "@material-tailwind/react";


export default function Welcome({hasActiveSub,credit}) {
	

	
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [language, setLanguage] = useState('en-US');
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const [showToaster, setShowToaster] = useState(false);
/* 	const [credit, setCredit] = useState(0);
 */	
	const[called, setCalled] = useState(false)
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

	const handleSubmit = (event, selectedOption) => {
		toast.dismiss();
		if (
			!(
				inputValue.includes('https://www.youtube.com/watch') ||
				inputValue.includes('https://youtu.be') ||
				inputValue.includes('https://m.youtube.com') ||
				inputValue.includes('https://twitter.com/i/spaces') ||
				inputValue.includes('https://www.youtube.com/live')
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
				
				if(inputValue.includes('https://www.youtube.com/watch')){
				videoId = inputValue.split('/').pop().split('?v=')[1].split("&")[0];
				
				}
				else if(inputValue.includes('https://www.youtube.com/live') ){
					videoId = inputValue.split('/').pop().split("?")[0];
					
				}
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
					toast.error('Please switch to the premium plan to transcribe Twitter Spaces. See Account page for more detail.');
					return;
				}

			}


			if (currentUser) {
				setLoading(true);
				// get id token
				currentUser.getIdToken().then((idToken) => {
					
				axios
						.post(
							`${process.env.REACT_APP_API_URL}/sources/`,
							{
								url: inputValue,
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
							toast('There was an error submitting the form. \n\n You are on the Premium Plan. Make sure you have enough credits for the submission.', {
								duration: 5000,
								icon: '⚠️',
							});
						}
						else{	
							console.log(error)
							
							toast('There was an error submitting the form. \n \n You are on the Basic Plan. Make sure the content you are submitting is shorter than 1 hour and conforms with our content popularity limits.', {
								duration: 6000,
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
		>			<div className="flex flex-col justify-center text-bordoLike dark:text-zinc-300 dark:bg-darkMode dark:text-zinc-500 font-semibold font-noto lg:text-5xl md:text-4xl text-3xl lg:px-56 text-center">
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
				<p className="dark:text-zinc-200">audiovisual content with just one click.</p>
			</div>
			<p className="text-zinc-600 dark:bg-darkMode dark:text-zinc-300 text-xl md:text-center mb-10 mt-10 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20">
				Submit a link to a YouTube video or Twitter Spaces, and Alphy will transcribe, summarize, and prepare the content for questioning within minutes. We will
				notify you with email when it's ready!{' '}
			</p>





			<Toaster />

			<div className="items-center container justify-center w-full mx-auto lg:ml-60">

				<div className="flex  items-center mt-4 space-x-4 md:justify-center lg:mt-0  ">

					<div className="w-full flex flex-col">

						<p className=" text-l mb-2 text-gray-600 dark:text-zinc-300 pb-2 ">

							<button id="popoverButton" data-popover-target="popoverDescription" data-popover-placement="left" data-popover-offset="20" type="button"><svg className="w-5 h-5 ml-1 pt-1 dark:text-zinc-300 text-gray-400 hover:dark:text-zinc-300 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button>

							Instructions for Alphy </p>
							{currentUser && 
							<span className="text-sm pl-2 mb-2 text-gray-600 dark:text-zinc-300"> 
							
							<a href="/account" className="underline">{hasActiveSub ? "Premium Plan" : "Basic Plan"}</a> - Remaining Credits : {Math.floor(credit)} minutes </span>
							}

						<div data-popover id="popoverDescription" role="tooltip" className={`popover-description absolute z-10 invisible inline-block text-sm dark:text-zinc-300 text-gray-500 transition-opacity duration-300 bg-zinc-50 dark:bg-darkMode border border-slate-800 rounded-lg shadow-sm opacity-0 w-72`}>
							<div className="p-3 space-y-2">
								<p className="font-semibold text-l dark:text-zinc-300 text-gray-900"><span >Basic Plan</span>:</p>
								<p></p>
								<p> • Make sure the content you are submitting doesn't exceed <strong>1 hour</strong>. </p>{/* <strong className="underline">1 hour</strong> if you are on a free tier, and <strong className="underline">4 hours</strong> if premium. Otherwise, you will get an error. </p> */}
								<p> • Make sure it has more than <strong >10,000 views</strong>.</p>
								<p className="font-semibold text-l dark:text-zinc-300 text-gray-900 pt-3"><span className="text-green-400">Premium Plan</span>:</p>
								<p>• No duration limit.</p>
								<p>• No view limit. </p>
								<p>• You have access to <span className="text-green-400">unlimited Twitter Spaces transcription</span>.</p>
								<p className="pt-2">Check the <a className="underline font-semibold" href={currentUser ? "/account" : "/plans"}>{currentUser ? "Account" : "Plans"}</a> page for more info about Premium benefits.</p>
						
								<p className="font-semibold text-l dark:text-zinc-300 text-gray-900 pt-3">When the content is ready</p>
								<p>If you see a video that has inaccurate transcription and summary, please let us know. We will fix it as soon as possible.
								</p>


								<a href="https://twitter.com/alphyapp" className="flex pt-2 items-center font-medium text-blue-800 hover:text-blue-700">Reach us if you have any questions <svg className="w-4 h-4 ml-1 pt-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></a>
							</div>
							<div className="popover-arrow" role="presentation"></div>
						</div>

					
						

					</div>
					
				</div>

			<div className=" sm:grid sm:grid-cols-3 lg:grid-cols-4 mx-auto mt-5">
				<div class="sm:col-span-2 lg:col-span-2 relative w-full min-w-[200px] h-12">
							<input 
							
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder=" "
							className="peer w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-black dark:focus:border-r-green-400  dark:focus:border-l-green-400 dark:focus:border-b-green-400 focus:border-green-400"/>
							<label class="text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-green-400 before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-green-400 after:border-blue-gray-200 peer-focus:after:!border-green-400">Insert a link to start</label>
							
						 </div>
				<div className={`sm:col-span-1 mt-5 sm:mt-0 flex ml-5  ${currentUser ? "" : ""}`}>
					{currentUser ? (
						<div>
						{/* <button
							className="w-1/3 border-2 border-blueLike px-8 bg-blueLike text-whiteLike py-3 mt-6 rounded-full lg:mt-10 md:w-1/3 lg:w-auto hover:opacity-90 transition duration-200 ease-in-out"
							type="submit"
							onClick={(e) => {
								handleSubmit();
							}}
						>
							Submit
						</button> */}

						<Button type="submit"
							onClick={(e) => {
								handleSubmit();
							}} className="bg-zinc-700 dark:bg-green-400 dark:text-zinc-300 px-10 py-3  text-[15px] ">Submit</Button>
						</div>
					) : (
						<div>
							     
								 <a href="/u/login">
						<Button  className="bg-zinc-700 px-10 py-3 dark:bg-green-400 dark:text-zinc-300 text-[15px] ">Sign in to submit</Button></a>
						
						{/* <a
							className="w-2/3 border-2 border-blueLike px-8 text-center bg-blueLike text-whiteLike py-3 mt-6 duration-300 rounded-full lg:mt-10 md:w-auto lg:w-auto hover:opacity-90"
							type="submit"
							href="/u/login"
						>
							Sign In To Submit
						</a> */}
						</div>
					)}
				</div>
				</div>
			</div>
		</div>
	);
}
