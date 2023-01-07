
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FeedItem from './FeedItem'
import MainFeed from "./FeedTabs/MainFeed"
import MyWorksFeed from './FeedTabs/MyWorksFeed'

function Feed({ coins }) {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <div className='user-feed-buttons'>
            <div className="tabs">
                <button className="tablink" onClick={() => setActiveTab('tab1')}><p>Main</p></button>
                <button className="tablink" onClick={() => setActiveTab('tab2')}><p>My Works</p></button>
            </div>
            <div>
                {activeTab === 'tab1' && <MainFeed coins={coins} />}
                {activeTab === 'tab2' && <MyWorksFeed coins={coins} />}
            </div>
        </div >
    )
}

export default Feed