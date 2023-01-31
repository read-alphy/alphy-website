import React, { useState } from 'react'
import MainFeed from "./FeedTabs/MainFeed"
import MyWorksFeed from './FeedTabs/MyWorksFeed'

function Feed(props) {
    const data = props.data
    const onClick = props.onClick
    // console.log(props)


    return (
        <div className='user-feed-buttons'>
            <div>
                <MainFeed data={data} onClick={onClick} />

            </div>
        </div >
    )
}

export default Feed