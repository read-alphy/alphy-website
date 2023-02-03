import React, { useState } from 'react'
import MainFeed from "./FeedTabs/MainFeed"

function SideFeed(props) {
    const data = props.data
    const onClick = props.onClick
    const navigate = props.navigate


    return (
        <div className='user-feed-buttons'>
            <div>
                <MainFeed data={data} onClick={onClick} />
            </div>
        </div >

    )
}

export default SideFeed