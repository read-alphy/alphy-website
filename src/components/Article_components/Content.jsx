import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"
import { Sparklines, SparklinesLine } from 'react-sparklines';
import axios from "axios"
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading"
import { Tab, Tabs, TabPanel } from 'react-bootstrap';
import SummaryTab from './ContentTabs/Summary'
import TranscriptTab from './ContentTabs/Transcript'


export default function Article() {
    const buttonRef = React.useRef();
    const [data, setData] = useState([])
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const url = `https://api.coingecko.com/api/v3/coins/${params.article_ID}?localization=false&sparkline=true`

    const [activeTab, setActiveTab] = useState('tab1');
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


    return location.pathname !== "/article/new-article" ? (
        < div className="content" >

            <h1 className="content-title">Title</h1>
            <div className="content-upperside">
                <div className="key-takeaways">
                    <h1>Key Takeaways</h1>
                </div>
                <iframe
                    title="My YouTube Video"
                    width="560"
                    height="315"

                    src="https://www.youtube.com/embed/ENPk_Jk0AJg"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <div className="summary-and-transcript">
                <div className="summary-and-transcript-buttons">

                    <button onClick={() => setActiveTab('tab1')}>Summary</button>
                    <button onClick={() => setActiveTab('tab2')}>Transcript</button>
                </div>
                <div className="main-content">

                    {activeTab === 'tab1' && <TranscriptTab data={data} />}
                    {activeTab === 'tab2' && <SummaryTab />}
                </div>
            </div>

        </div >) : null
}