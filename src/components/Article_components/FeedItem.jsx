import React from 'react'

import { Link } from "react-router-dom"

const handleClick = (id) => {
    return () => {
        window.location.href = `/article/${id}`
    }
}

function FeedItem({ index,item }) {

    return (
        <tr key={index} onClick={handleClick(item.source_id)}>
            <td>{index + 1}</td>
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
            <td>
                {
                item.summary_requested ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path

strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}

d="M6 18L18 6M6 6l12 12"
/>
                    </svg>)
                }
            </td>
        </tr>
    )
}

export default FeedItem