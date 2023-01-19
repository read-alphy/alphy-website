import React, { useEffect, useState } from 'react'
import ReactLoading from "react-loading"
import axios from "axios"
import { useLocation } from "react-router-dom";
import ContentTab from './ContentTabs/ContentTab'


export default function Article() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    
    const [activeTab, setActiveTab] = useState('tab1');
    const source_id = location.pathname.split("/")[2]
    const url = `${process.env.REACT_APP_API_URL}/summaries/${source_id}`
    const fetchData = async () => {
        setLoading(true)
        try {
            setLoading(true);
            await axios.get(url)
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
        } catch (error) {
            console.error(`ERROR:  ${error}`)
        }    
    }
    useEffect(() => {
        fetchData()
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source_id])

    // use loading state to render loading component
    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
                {/* center loading react loading */}
                <ReactLoading type={"spin"} color={"#FBFBFB"} height={100} width={100} />
            </div>
        )
    }

    return location.pathname !== "/article/new-article" ? (
        < div className="content" >
            <h1 className="content-title">Title</h1>
            <div className="content-upperside">
                <div className="key-takeaways">
                    <h1>Key Takeaways</h1>
                    <br></br>
                    {data.key_takeaways ? data.key_takeaways.map((item, index) => {
                        return (
                            <div key={index} className="key-takeaways-item">
                                <p>{item}</p>
                            </div>
                        )
                    }) : null}
                </div>
                <iframe
                    title="My YouTube Video"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${source_id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <div className="summary-and-transcript">
                <div className="summary-and-transcript-buttons">

                    <button onClick={() => setActiveTab('tab1')}>Summary</button>
                    <button onClick={() => setActiveTab('tab2')}>Transcript</button>
                </div>
                <div className="main-content">

                    {activeTab === 'tab1' && <ContentTab data={data} transcript={false} />}
                    {activeTab === 'tab2' && <ContentTab data={data} transcript={true} />}
                </div>
            </div>

        </div >) : null
}