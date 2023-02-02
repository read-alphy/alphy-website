import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './SideFeedItem.css'

const SideFeedItem = (props) => {

    const item = props.item
    const source_id = item.source_id
    const navigate = props.navigate
    const imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`;

    return (

        <div
            title={item.title}
            className={'flex flex-row items-center justify-start cursor-pointer w-full h-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md mb-2 transition duration-200 ease-in-out hover:shadow-md  hover:scale-105 transform hover:translate-x-2 hover:translate-y-2 mr-auto ml-auto'}
            onClick={() => {
                navigate(`/article/${item.source_id}`)
            }}
        >
            <div className="w-1/2 min-w-150 max-w-[300px] mr-3">
                <div className="flex items-center justify-center h-0 bg-gray-600 rounded-md"
                    style={{ backgroundImage: `url(${imageUrl})`, paddingBottom: '50%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
                </div>
            </div>

            <div className='w-1/2 text-xs'>
                <div className='text-sm video-text text-mainText' >
                    {item.title}
                </div>
                <div className='side-feed-creator font-italic'>{item.creator_name}</div>
                <div className='side-feed-date'>{moment(item.source_ts).format("DD:MM:YYYY")}</div>
            </div>
        </div>

    )
}
export default SideFeedItem