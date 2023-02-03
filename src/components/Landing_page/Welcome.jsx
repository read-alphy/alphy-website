import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import Languages from "../../helper/Languages"
// import { useSessionContext } from "supertokens-auth-react/recipe/session";
import toast, { Toaster } from 'react-hot-toast';


export default function Welcome() {
    //const sessionContext = useSessionContext()
    // const sessionContext = { userId: "123" }
    // const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');
    const [language, setLanguage] = useState('en-US');


    const handleSubmit = (event, selectedOption) => {
        event.preventDefault();
        toast.dismiss();
        // Do something with the inputValue here
        console.log(inputValue);
        console.log(selectedOption);

        if (inputValue.includes("https://www.youtube.com") || inputValue.includes("https://youtu.be") || inputValue.includes("twitter.com/i/spaces")) {
            let answer = axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:3001"}/summaries`, { url: inputValue, language: selectedOption })
            setInputValue("")
            if (answer.status === 200) {
                toast.success('Succesfully submitted the ! \n\n We will send you an email when the article is ready.')
            }
            else {
                toast.error('There was an error submitting the form. Please try again.')
            }
        }
        else {
            setInputValue("")
            toast.error("Please provide a link to a YouTube video or Twitter Spaces.")

        }

    }


    return (

        <div className="container px-4 mx-auto py-18 lg:py-28">
            <div className="text-mainText ">

            <h2 className="hidden lg:flex my-4 text-4xl font-semibold text-center lg:text-4xl flex justify-center">
                <section class=" animation1 lg:mr-2">
                    <div class="first "><div>Transcribe</div></div>
                    <div class="second"><div>Summarize</div></div>
                    <div class="third"><div>Search</div></div>
                </section>
                 YouTube with just one click
            </h2>
            <h2 className="flex flex-row flex-wrap lg:hidden my-4 text-4xl font-semibold text-center lg:text-4xl flex justify-center">
                <div h-3>
                    <section className="animation1 lg:mr-2">
                    <div className="first "><div>Transcribe</div></div>
                    <div className="second"><div>Summarize</div></div>
                    <div className="third"><div>Search</div></div>
                    </section>
                </div>
                <div style={{flexBasis: 'auto', flexGrow: 1}}>
                    YouTube with just one click
                </div>
            </h2>


                <p className='text-center text-gray-300 mb-10 mt-10'>Paste a YouTube link, choose the language of the video, and submit. Alphy will transcribe and summarize the video!     </p>

                <form className="items-center justify-center space-x-4 lg:flex" onSubmit={(e) => handleSubmit(e, language)}>
                    <input className='lg:w-[600px] w-full  py-2 pl-4 rounded-md duration-200 focus:ring-2 focus:ring-white focus:outline-none' type="text" name="content_link" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Insert the YouTube link to start" />
                    <Toaster />
                    <div className='flex items-center mt-4 space-x-4 md:justify-center lg:mt-0'>
                        <Languages language={language} onLangChange={setLanguage} />
                        <button className="w-full px-8 py-2 duration-300 rounded-md bg-main md:w-auto lg:w-auto hover:opacity-75" type="submit">Submit</button>

                    </div>

                </form>
            </div>
        </div>
    )
}