// components/AuthorizationError.jsx
import React from 'react'
import Link from 'next/link'

const AuthorizationError = () => {
  return (
    <div className="mx-10 mx-auto md:mx-20 mt-20 md:mt-40">
      <div className="text-xl text-zinc-700 dark:text-zinc-300 max-w-[600px] quicksand font-semibold">
        The arc you're trying to reach either doesn't exist or you
        don't have permission to access it. Check out arcs by Alphy{' '}
        <Link
          href="/explore"
          className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
        >
          here
        </Link>
        .
      </div>
    </div>
  )
}

export default AuthorizationError