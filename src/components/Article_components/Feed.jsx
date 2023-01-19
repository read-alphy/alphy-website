import React, { useState } from 'react'
import MainFeed from "./FeedTabs/MainFeed"
import MyWorksFeed from './FeedTabs/MyWorksFeed'

function Feed(props) {
    const data = props.data
    // console.log(props)
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <div className='user-feed-buttons'>
            <div className="tabs">
                <button className="tablink" onClick={() => setActiveTab('tab1')}><p>Main</p></button>
                <button className="tablink" onClick={() => setActiveTab('tab2')}><p>My Works</p></button>
            </div>
            <div>
                {activeTab === 'tab1' && <MainFeed data={data} />}
                {activeTab === 'tab2' && <MyWorksFeed/>}
            </div>
        </div >
    )
}

export default Feed