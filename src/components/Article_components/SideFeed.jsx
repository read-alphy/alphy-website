import React, { useState } from 'react'
import MainFeed from "./FeedTabs/MainFeed"

function SideFeed(props) {
    const data = props.data
    const onClick = props.onClick
    const isLoading = props.isLoading


    return (
        
        <div className='user-feed-buttons'>
            <div>
                <MainFeed data={data} onClick={onClick} isLoading={isLoading} />
            </div>
        </div >

    )
}

export default SideFeed