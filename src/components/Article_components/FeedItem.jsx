import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from '../../hooks/useWindowSize'

function FeedItem({ index,item }) {
    const navigate = useNavigate()

    const window = useWindowSize()

    const handleClick = (id) => {
        navigate(`/article/${id}`)
    }

    return (
        <tr key={index} onClick={()=>handleClick(item.source_id)} className="cursor-pointer">
            <td>
                {item.source_type === "youtube" ? (
                    <img src={`https://i.ytimg.com/vi/${item.source_id}/default.jpg`} alt={item.title} />
                ) : (
                    "Source: " + item.source_type
                )}
            </td>
                <td title={item.title} className='text-left md:pl-4 lg:pl-0'>
                {item.title.length > ( window.width >1024 ? 75 : 46) ? (
                    item.title.substring(0, ( window.width >1024 ? 75 : 46)) + "..."
                ) : (
                    item.title
                )}
            </td>
            <td className='text-left '>{item.creator_name}</td>
            <td className='text-left'>{moment(item.source_ts).format("DD:MM:YYYY")}</td>
        </tr>
    )
}

export default FeedItem