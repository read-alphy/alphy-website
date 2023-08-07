import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Success() {
    const navigate = useNavigate();
    const { currentUser } = useAuth()

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    })

    return (
        <div>
            {currentUser ?
                <div className="text-2xl lg:text-5xl font-semibold text-zinc-700 container items-center  mx-auto mt-40 max-w-[1200px]">
                    🎉 Thank you! You have now subscribed to Alphy Premium!
                </div>
                : null}
        </div>
    )
}