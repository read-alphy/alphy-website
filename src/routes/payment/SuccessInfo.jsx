import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Success() {
    const navigate = useNavigate();
    const { currentUser } = useAuth()
    /* let subValue = sessionStorage.getItem("subValue") */

    useEffect(() => {
        setTimeout(() => {
           navigate('/') 
        }, 3000)
    })

    return (
        <div>
            {currentUser ?
                <div className="text-2xl  text-zinc-700 dark:text-zinc-300 container items-center  mx-auto mt-40 max-w-[1200px]">
                    🎉 Thank you! You have now subscribed to Alphy!
                </div>
                : null}
        </div>
    )
}