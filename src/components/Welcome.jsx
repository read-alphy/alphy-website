import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
import Languages from "../helper/Languages"
// import { useSessionContext } from "supertokens-auth-react/recipe/session";


export default function Welcome() {
    //const sessionContext = useSessionContext()
    // const sessionContext = { userId: "123" }
    // const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');
    const [language, setLanguage] = useState('en-US');

    const handleSubmit = (event, selectedOption) => {
        event.preventDefault();
        // Do something with the inputValue here
        console.log(inputValue);
        console.log(selectedOption);
        // go to article/new-article
        // window.location.href = `/article/new-article`;
        
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

                <form className="landing-page-input" onSubmit={(e)=>handleSubmit(e,language)}>
                    <label>
                        <input type="url" name="content_link" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                            placeholder="Insert the YouTube link to start" />
                    </label>
                    <Languages language={language} onLangChange={setLanguage}/>
                    <button className="landing-page-submit-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}