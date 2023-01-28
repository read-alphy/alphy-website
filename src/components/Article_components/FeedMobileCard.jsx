import moment from 'moment/moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function FeedMobileCard({ index, item }) {
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/article/${id}`)
    }

    return (
        <div className='grid grid-cols-5 gap-5 cursor-pointer' key={index} onClick={() => handleClick(item.source_id)}>
            <div className='col-span-2'>
                {item.source_type === "youtube" ? (
                    <img className='object-fill w-full h-full' src={`https://i.ytimg.com/vi/${item.source_id}/default.jpg`} alt={item.title} />
                ) : (
                    "Source: " + item.source_type
                )}

            </div>

            <div className='col-span-3 '>
                <p className='text-sm'>{item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}</p>
                <p className='my-2 text-xs opacity-75'>{item.creator_name}</p>
                <p className='my-2 text-xs opacity-75'>Date: {moment(item.source_ts).format("DD:MM:YYYY") }</p>

                {/* <div className='flex items-center space-x-3'>
                    <p className='text-xs opacity-90'>Summary:</p>

                    {
                        item.summary_requested ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7"
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
                                className="w-7 h-7"
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
                </div> */}
            </div>
        </div>
    )
}

export default FeedMobileCard