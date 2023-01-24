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

        <div className="container px-4 mx-auto py-18 lg:py-28">
            <div className="text-mainText">
                <h2 className="my-4 text-2xl font-semibold text-center lg:text-4xl ">
                    Transcribe and summarize any YouTube with just one click
                </h2>

                <p className='mb-4 text-center'>   Paste a YouTube link, choose the language of the video, and submit. Alphy will transcribe and summarize the video for you. </p>

                <form className="items-center justify-center space-x-4 lg:flex" onSubmit={(e) => handleSubmit(e, language)}>
                    <input className='lg:w-[600px] w-full  py-2 pl-4 rounded-md duration-200 focus:ring-2 focus:ring-white focus:outline-none' type="url" name="content_link" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Insert the YouTube link to start" />
                    <div className='flex items-center mt-4 space-x-4 lg:mt-0'>
                        <Languages language={language} onLangChange={setLanguage} />
                        <button className="w-full px-8 py-2 duration-300 rounded-md bg-main lg:w-auto hover:opacity-75" type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}