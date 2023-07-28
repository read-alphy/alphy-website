import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChatIcon from '@mui/icons-material/Chat';
import LinkIcon from '@mui/icons-material/Link';
import Dialog from '@mui/material/Dialog';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import PublishIcon from '@mui/icons-material/Publish';
import { Button} from "@material-tailwind/react";





export default function HubCreationBlock({currentUser, hasActiveSub, credit}){
    const [submitDialog, setSubmitDialog] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [failed, setFailed] = useState(false);

    const navigate = useNavigate(); 
    

    const handleSubmit = (event, selectedOption) => {
		
			if(!(
				inputValue.includes('https://www.youtube.com/watch') ||
				inputValue.includes('https://youtu.be') ||
				inputValue.includes('https://m.youtube.com') ||
				inputValue.includes('https://twitter.com/i/spaces') ||
				inputValue.includes('https://www.youtube.com/live')
                )
			)
		 {
			setInputValue('');
			setErrorMessage('Please provide a link to a YouTube video or Twitter Spaces.')
			setFailed(true)
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
					setErrorMessage('Please switch to the premium plan to transcribe Twitter Spaces. See Account page for more detail.');
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
							setErrorMessage("")
							setLoading(false);
							setFailed(false)
							setInputValue('');
								navigate(`/${video_source}/${videoId}`)

						}).
						catch((error) => {
                            if(errorMessage.length===0){
							if(hasActiveSub){
								setErrorMessage("There was an error submitting the form. Make sure you have enough credits for the submission.")
                            }
						
						else{	
								if(error.response.data.detail=="Video not popular enough for free users")
								{
									setErrorMessage("Make sure the content you are submitting has more than 10,000 views.")
								}
								else if(error.response.data.detail=="Video too long for free users"){

									setErrorMessage("Make sure the content you are submitting doesn't exceed 1 hour.")
								}
								else {
									setErrorMessage("There was an error submitting the form. Please try again.")
								}
				
						}
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
				setErrorMessage('Please sign in to submit content.');
			}
		}
    }

    return(
        <div className="mt-10 md:pl-20">
 

            <div className="flex flex-row gap-20 w-full px-10">
                <div className=" bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer w-[250px] transform hover:scale-105 transition duration-500 ease-in-out"
                onClick={() => setSubmitDialog(true)}>
                    <div className="flex flex-col items-center mx-auto px-5 pt-5  ">
                       <p className="text-emerald-300 text-lg font-semibold "> Submit a Link

                       </p>
                       <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-5 text-center">
                        Submit a link to a YouTube video or Twitter Spaces to unlock with Alphy.
                       </p>
                       <div className="flex-row flex mt-5">
                         
                            <LinkIcon fontSize="large" className="text-emerald-200"/>
                       </div>
                       <button className="mt-5 px-5 py-2 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 rounded-md text-white mb-5">
                        Submit
                       </button>
                    </div>
                </div>
                <div className=" bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex flex-col items-center mx-auto px-5 pt-5  ">
                         <p className="text-indigo-400 text-lg font-semibold">
                                Upload a Recording
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-5 text-center ">
                            Import an audio file from your device to transcribe, summarize, and question with Alphy.
                            </p>
                                <CloudUploadIcon fontSize="large" className="text-indigo-300 mt-5"/>
                                <button className="mt-5 px-5 py-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 mb-5 rounded-md text-white"
                    >
                        Upload
                          </button>
                    </div>

                </div>
                <div className=" bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex flex-col items-center mx-auto px-5 pt-5  ">
                        <p className="text-red-300 text-lg font-semibold">
                            Create an Arc
                        </p>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-5 text-center">
                        Create your own AI-assisted search engine on countless hours of audiovisual content.
                        </p>
                            <ChatIcon fontSize="large" className="text-yellow-300 mt-5"/>
                            <button className="mt-5 px-5 py-2 bg-gradient-to-b from-red-200 via-red-300 to-yellow-200 mb-5 rounded-md text-white"
                >
                    Create
                        </button>
                        </div>
                </div>
            </div>


            {submitDialog &&
			<Dialog maxWidth="md" fullWidth="true" open={submitDialog} onClose={() => setSubmitDialog(false)} >
                            <div className="p-10 pt-20 text-zinc-700 h-[50vh] dark:text-zinc-300 bg-white dark:bg-mildDarkMode  items-center  justify-center">                                               
                        <p className="font-sans font-semibold text-zinc-700 dark:text-zinc-30">
                            Submit your link below</p>
                            <div className=" sm:grid sm:grid-cols-3 lg:grid-cols-4 mx-auto mt-5 ">
                            <div class="sm:col-span-2 lg:col-span-3 relative w-full min-w-[200px] h-12">
                                        <input 
                                        
                                        value={inputValue}
                                        onChange={(event) => setInputValue(event.target.value)}
                                        placeholder=" "

                                        className="peer w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-black dark:focus:border-r-green-400  dark:focus:border-l-green-400 dark:focus:border-b-green-400 focus:border-green-400"/>
                                        <label class="text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-green-400 before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-green-400 after:border-blue-gray-200 peer-focus:after:!border-green-400">Insert the link to YouTube video or Twitter Space</label>

                                        <div className="sm:hidden">
                                        <Button size="sm" className="!absolute right-1 top-1 rounded bg-green-300" onClick={(e) => {
                                            handleSubmit();
                                        }}> <PublishIcon fontSize="medium"/></Button>
                                </div>
                                    </div>

                            <div className={`hidden sm:block sm:col-span-1 mt-5 sm:mt-0 flex ml-5 justify-center md:justify-self-start items-center ${currentUser ? "" : ""}`}>
                                
                                    <div>
                                   
                                    
                                    <Button size="sm" type="submit"
                                        onClick={(e) => {
                                            handleSubmit();
                                        }} className=" bg-green-300 dark:text-zinc-300 px-6 py-3 text-sm lg:text-[15px] normal-case">Submit</Button>
                                    </div>
                               
                            </div>
                            </div>
                            {failed && 
                            <div className="mx-auto mt-5 text-sm text-red-400 ml-2">
                            {errorMessage}
                            </div>
                            }
                             <div className="flex items-center  mt-4 space-x-4 md:justify-center lg:mt-0  ">

<div className="w-full flex flex-col mt-6 ">
   

      
        <span className="text-sm mb-2 text-gray-600 dark:text-zinc-300 mt-4"> 
        
        <a href="/account" className="underline">{hasActiveSub ? "Premium Plan" : "Basic Plan"}</a> - Remaining Credits : {Math.floor(credit)} minutes 
        
    </span> 

    
        <div className=" space-y-2 ">

            {!hasActiveSub ? 
            <div>
            <p className="font-semibold text-md text-zinc-700 dark:text-zinc-200">You are on Basic Plan</p>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm"> • You can only submit YouTube videos.</p>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm"> • You can submit up to <strong>1 hour</strong> of content. </p>{/* <strong className="underline">1 hour</strong> if you are on a free tier, and <strong className="underline">4 hours</strong> if premium. Otherwise, you will get an error. </p> */}
            <p className="text-zinc-700 dark:text-zinc-200 text-sm"> • The video you are submitting should have more than <strong >10,000 views</strong>.</p>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm mt-2"> Alphy might fail to process content with location limits.</p>

            <p className="mt-4 text-sm"> Switch to a <a href="/u/account" className="text-green-400 text-sm underline"> paid plan </a>for limitless submissions and free Twitter Spaces transcription.</p>
            </div>
         :   
         <div>
            
            <p className="font-semibold text-md text-zinc-700 dark:text-zinc-200 mb-2 ml-1">You are on Premium Plan</p>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm"> • No duration limit applied.</p>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm"> • No view limit applied. </p>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm"> • You have access to <span className="text-green-400">unlimited Twitter Spaces transcription</span>.</p>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm mt-2">  Alphy might fail to process content with location limits.</p>
            </div>
        }
        

            
    
    
    </div>


    

</div>

</div>

<div class="border-b border-gray-100 mt-10 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 md:w-1/3"></div>

<div className="flex flex-row mt-5 justify-center mx-auto ml-4"> 
                    <YouTubeIcon fontSize="large" className="text-emerald-200"/>
                    <TwitterIcon fontSize="large" className="ml-4 text-emerald-200"/> 
    </div>
                            </div>


			</Dialog>
			}


        </div>
    )

}