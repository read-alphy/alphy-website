import React from "react";
import { useEffect, useState } from 'react'
import Feed from "./Feed"
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

function ArticleCreator() {
    const location = useLocation();
    const [data, setData] = useState([])
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"

    const coinData = async () => {
        try {
            await axios.get(url)
                .then((response) => {
                    setData(response.data)
                })
            setLoading(true)
        } catch (error) {
            console.error(`ERROR:  ${error}`)
        }
    }
    useEffect(() => {
        coinData()
        setLoading(false)
    }, [url])

    const [inputValue, setInputValue] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the inputValue here
        console.log(inputValue);
    }



    return location.pathname === "/article/new-article" ? (
        <div className="new-submission">

            <div className="instruction-texts">
                <h1>Instructions for Alphy

                </h1>
                <br></br>
                <p> 1. It is pretty straightforward. Paste the YouTube link for the video you want Alphy to work on and click the Submit Video button.
                    <br></br>2. If someone else has it processed before, that means we have it on our database and you will be able to access the transcript and summary without a delay.
                    <br></br>3. And if you are the first person to transcribe it, then congratulations, this will take a while. We will send you an e-mail when your work is ready. You can also see your WIP submissions on the feed at the left and can access them once they are complete.
                </p>
                <br></br><br></br>

                <h1>Quick heads-up:</h1>
                <br></br>
                <p> - Alphy is not perfect. It is useful.
                    <br></br>
                    - You can have 3 WIP submissions at the same time. Please do not spam.
                    <br></br>
                    - Videos in any languages other than English will take extra time.
                    <br></br>
                    - If you see a video that has a really bad transcription (wrong language, missing punctuations, etc.) ping us on Discord or Twitter.</p>
                <br></br>
            </div>



            <form className="sign-in-input" onSubmit={handleSubmit}>
                <label>
                    <input type="url" name="content_link" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Insert the YouTube link to start" />
                </label>
                <button className="submit-btn" type="submit" value="Submit">Submit</button>
            </form>

        </div>
    ) : null
}


export default ArticleCreator