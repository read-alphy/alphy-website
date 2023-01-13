import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { UserAuth } from "../context/AuthContext"
import { Navigate, useNavigate } from 'react-router-dom'
import Languages from "../helper/Languages"
import { useSessionContext } from "supertokens-auth-react/recipe/session";



// React Icons

export default function Welcome() {
    //const sessionContext = useSessionContext()
    const sessionContext = { userId: "123" }
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the inputValue here
        console.log(inputValue);
    }


    return (
        <div className="welcome-area">
            <div className="welcome-text">
                <h2 className="text-center my-4 text-3xl text-white font-semibold md:text-left md:text-4xl md:my-4">
                    Transcribe and summarize any YouTube with just one click<br>
                    </br>
                </h2>
                <br>
                </br>
                <p>
                    Paste a YouTube link, choose the language of the video, and submit. Alphy will transcribe and summarize the video for you.

                </p>
                <br></br>

                <form className="landing-page-input" onSubmit={handleSubmit}>
                    <label>
                        <input type="url" name="content_link" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                            placeholder="Insert the YouTube link to start" />
                    </label>
                    <Languages />
                    <button className="landing-page-submit-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}