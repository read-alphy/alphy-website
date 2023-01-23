import React, { useEffect, useState } from 'react'
import ReactLoading from "react-loading"
import axios from "axios"
import { useLocation } from "react-router-dom";
import ContentTab from './ContentTabs/ContentTab'


export default function Content(props) {
    const data = props.data
    const location = useLocation();
    
    const [activeTab, setActiveTab] = useState('tab1');
    
    return location.pathname !== "/article/new-article" ? (
        < div className="content" >
            <h1 className="content-title">{data.title}</h1>
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
                    src={`https://www.youtube.com/embed/${data.source_id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <div className="summary-and-transcript">
                <div className="summary-and-transcript-buttons">

                    <button className={activeTab === 'tab1' ? 'content-active-button ' : ''} 
                        onClick={() => setActiveTab('tab1')}>Summary</button>
                    <button className={activeTab === 'tab2' ? 'content-active-button' : ''} 
                        onClick={() => setActiveTab('tab2')}>Transcript</button>
                </div>
                <div className="main-content">

                    {activeTab === 'tab1' && <ContentTab data={data.summary} />}
                    {activeTab === 'tab2' && <ContentTab data={data.transcript} />}
                </div>
            </div>

        </div >) : null
}