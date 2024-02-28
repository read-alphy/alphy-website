import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Success() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  /* let subValue = sessionStorage.getItem("subValue") */

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  })

  return (
    <div>
      {currentUser ? (
        <div className="px-6 md:ml-20 text-zinc-700 dark:text-zinc-300 container items-center  mx-auto mt-40 lg:max-w-[800px] xl:max-w-[1200px]">
          <p className="text-2xl md:text-3xl font-averta-semibold">
            🎉 Success!{' '}
          </p>
          <br></br> <br></br>
        {/*   <p className="text-lg md:text-xl font-averta-semibold">
            You have now subscribed to Alphy!
          </p>
          <br></br> <br></br> */}
          <p className="text-lg md:text-xl font-averta-semibold">
            You'll be redirected to the main page shortly.
          </p>
        </div>
      ) : null}
    </div>
  )
}
