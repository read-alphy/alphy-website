import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { UserAuth } from "../context/AuthContext"
import { Navigate, useNavigate } from 'react-router-dom'

import { useSessionContext } from "supertokens-auth-react/recipe/session";



// React Icons

export default function Welcome() {
    const sessionContext = useSessionContext()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the inputValue here
        console.log(inputValue);
    }

    const handleSignIn = async () => {
        try {
            navigate("/auth")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="welcome-area">
            <div className="welcome-text">
                <h2 className="text-center my-4 text-3xl text-white font-semibold md:text-left md:text-4xl md:my-4">
                    Meet Alphy, your new generation speech-to-meaning agent
                </h2>
                <br></br>
                <p className="text-center text-4xl text-pink font-bold md:text-left md:text-5xl">
                    What can you do with Alphy?



                </p>
                <br></br>

                <p className="text-center font-normal text-md text-light-gray my-6 mb-8 md:text-left md:text-xl leading-normal">
                    - Get the transcription of the video <br></br>
                    -  Instantly summarize a video<br></br>
                    - Get the key takeaways from the video<br></br>
                    - Import videos (soon)<br></br>
                    - Customize summary & transcript (soon)<br></br>
                    - Converse with the video (soon)<br></br>
                    - Create an AI chatbot for your transcribed content (soon)
                </p>
                {sessionContext.userId?.email ? (
                    <form className="landing-page-input" onSubmit={handleSubmit}>
                        <label>
                            <input type="url" name="content_link" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                                placeholder="Insert the YouTube link to start" />
                        </label>
                        <button className="landing-page-submit-button" type="submit">Submit</button>
                    </form>)

                    : (<form className="landing-page-input" onSubmit={handleSignIn}>
                        <label>
                            <input type="url" name="content_link" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                                placeholder="Insert the YouTube link to start" />
                        </label>
                        <button className="sign-in-to-try" type="submit">Submit</button></form>)}

            </div>

            <div>
                <img src="/smiling robot.png" alt="smiling-robot" className="welcome-img" />
            </div>
        </div>
    )
}