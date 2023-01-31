import React, { useState } from 'react'
import MainFeed from "./FeedTabs/MainFeed"
import MyWorksFeed from './FeedTabs/MyWorksFeed'

function Feed(props) {
    const data = props.data
    const onClick = props.onClick
    const navigate = props.navigate
    // console.log(props)
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <MainFeed data={data} onClick={onClick} navigate={navigate} />
        // <div className='user-feed-buttons'>
        //     <div className="tabs">
        //         <button className="tablink" onClick={() => setActiveTab('tab1')}><p>Main</p></button>
        //         <button className="tablink" onClick={() => setActiveTab('tab2')}><p>My Works</p></button>
        //     </div>
        //     <div>
        //         {activeTab === 'tab1' && <MainFeed data={data} onClick={onClick} />}
        //         {activeTab === 'tab2' && <MyWorksFeed/>}
        //     </div>
        // </div >
    )
}

export default Feed