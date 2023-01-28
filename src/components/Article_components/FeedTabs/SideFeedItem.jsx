import { useEffect, useState } from 'react'
import Tooltip from '../../../helper/Tooltip'
import './SideFeedItem.css'

const SideFeedItem = (props) => {

    const item = props.item
    const index = props.index
    const onClick = props.onClick
    const thumbnailUrl = `https://i.ytimg.com/vi/${item.source_id}/default.jpg`
    const source_id = item.source_id
    const imageUrl = `https://i.ytimg.com/vi/${source_id}/default.jpg`;
    const gifUrl1 = `https://i.ytimg.com/vi/${source_id}/1.jpg`;
    const gifUrl2 = `https://i.ytimg.com/vi/${source_id}/2.jpg`;
    const gifUrl3 = `https://i.ytimg.com/vi/${source_id}/3.jpg`;


    return (

        <div key={index} className={' flex  space-x-3 my-4'}
            onClick={() => { onClick(source_id) }}
        >
            <div className=''>
                <div className="video" style={{ backgroundImage: `url(${imageUrl})` }} >
                </div>
            </div>
            <div className='text-xs lg:w-40'>
                {/* <Tooltip content={`${item.title}`} direction="right"> */}
                <div className='text-sm text-mainText' >
                    {/* if the title is more than 75 chars put ... */}
                    {item.title.length > 75 ? item.title.slice(0, 75) + '...' : item.title}
                </div>
                {/* </Tooltip> */}
                <div className='side-feed-creator'>{item.creator_name}</div>
                <div className='side-feed-date'>Date</div>
            </div>
        </div>

    )
}

export default SideFeedItem
