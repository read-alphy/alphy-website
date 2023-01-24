import React from 'react'
import { useNavigate } from 'react-router-dom'

function FeedItem({ index,item }) {
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/article/${id}`)
    }

    return (
        <tr key={index} onClick={handleClick(item.source_id)} className="cursor-pointer">
            <td>
                {item.source_type === "youtube" ? (
                    <img src={`https://i.ytimg.com/vi/${item.source_id}/default.jpg`} alt={item.title} />
                ) : (
                    "Source: " + item.source_type
                )}
            </td>
                <td>
                {item.title.length > 75 ? (
                    item.title.substring(0, 75) + "..."
                ) : (
                    item.title
                )}
            </td>
            <td className='text-left'>{item.creator_name}</td>
            <td className='text-left'>3 weeks ago</td>
        </tr>
    )
}

export default FeedItem