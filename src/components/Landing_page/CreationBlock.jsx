import React, { useState } from 'react';

import { Button} from "@material-tailwind/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChatIcon from '@mui/icons-material/Chat';
import LinkIcon from '@mui/icons-material/Link';
import Dialog from '@mui/material/Dialog';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import UploadBlock from './UploadBlock';

import SubmitBlock from './SubmitBlock';





export default function HubCreationBlock({currentUser, hasActiveSub, credit}){
    const [submitDialog, setSubmitDialog] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [failed, setFailed] = useState(false);
    const [uploadDialog, setUploadDialog] = useState(false);

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

    const handleArcNavigation = () => {
        if(hasActiveSub){
            navigate('/arc/createArc')
        }

    }

    return(
        <div className="mt-10 mx-auto">
 

            <div className="flex flex-row gap-10 lg:gap-20 w-full mx-auto justify-start xl:px-20 ">
                <div className=" bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer w-[250px] transform hover:scale-105 transition duration-500 ease-in-out"
                          onClick={() => setSubmitDialog(true)}>
                    <div className="flex flex-col items-center mx-auto px-5 pt-5 grid grid-rows-5">
                       <p className="text-emerald-300 text-lg font-semibold text-center row-span-1"> Submit a Link

                       </p>
                       <p className="text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2">
                        Submit a link to a YouTube video or Twitter Spaces to unlock with Alphy.
                       </p>
                       <div className="row-span-1 w-full justify-center items-center flex">
                            <LinkIcon fontSize="large" className="text-emerald-200 mx-auto mb-2"/>
                       </div>
                       <button className="max-w-[150px] mx-auto px-5 py-2 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 rounded-md text-white mb-5  dark:text-zinc-700 dark:font-semibold">
                        Submit
                       </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex flex-col items-center mx-auto px-5 pt-5 grid grid-rows-5"
                                    onClick={() => setUploadDialog(true)}>
                         <p className="text-indigo-400 text-lg font-semibold text-center row-span-1">
                                Upload a Recording
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2">
                            Import an audio file from your device to transcribe, summarize, and question privately.
                            </p>
                            <div className="row-span-1 w-full justify-center items-center flex">
                                <CloudUploadIcon fontSize="large" className="text-indigo-300 mx-auto mb-2"/>
                                </div>
                                <button className=" max-w-[150px] mx-auto px-5 py-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 mb-5 rounded-md text-white row-span-1  dark:text-zinc-700 dark:font-semibold"
                    >
                        Upload
                          </button>
                    </div>

                </div>
                <div className=" bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                <div onClick={handleArcNavigation} className="flex flex-col items-center mx-auto px-5 pt-5 grid grid-rows-5">
                        <p className="text-red-300 text-lg font-semibold text-center row-span-1">
                            Create an Arc
                        </p>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm  text-center row-span-2">
                        Create your own AI-assisted search engine on countless hours of audiovisual content.
                        </p>
                        <div className="row-span-1 w-full justify-center items-center flex">
                            <ChatIcon fontSize="large" className="text-yellow-300 mx-auto mb-2 "/>
                            </div>
                            <button className="max-w-[150px] mx-auto px-5 py-2 bg-gradient-to-b from-red-200 via-red-300 to-yellow-200 mb-5 rounded-md text-white dark:text-zinc-700 dark:font-semibold"
                >
                    Create
                        </button>
                        </div>
                </div>
            </div>


            {submitDialog &&
			<Dialog maxWidth="md" fullWidth="true" open={submitDialog} onClose={() => setSubmitDialog(false)} >
                         <SubmitBlock currentUser={currentUser} hasActiveSub={hasActiveSub} handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} credit={credit} failed={failed} errorMessage={errorMessage}/>

			</Dialog>
			}

            {uploadDialog && 
            <Dialog maxWidth="md" fullWidth="true" open={uploadDialog} onClose={() => setUploadDialog(false)} >

              <UploadBlock currentUser={currentUser} hasActiveSub={hasActiveSub} credit={credit}/>
                </Dialog>}


        </div>
    )

}