// create a 404 page
import Link from 'next/link'
import Smiley from '../../../public/img/smiling_robot.png'

import Image from 'next/image'

export default function NotFound() {


  return (
    <div className="flex flex-col items-center w-full justify-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-center h-[90vh] ">
      <Image src={Smiley} className="opacity-70 saturate-50"/>
      <h1 className="welcome-prompt mb-5 text-6xl flex md:flex-row flex-col justify-center  text-[2.25rem] font-averta-semibold">
        Oops!
      </h1>
      <h2 className="mb-5 text-zinc-700 dark:text-zinc-300 font-averta-semibold">
        Sorry, we coluldn't find the page you were looking for :( <br></br>{' '}
      </h2>
      <div className="flex flex-row pb-20 mb-20">
        <Link
          href="/"
          type="button"
          className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 mr-5 underline font-averta-semibold"
        >
          Go Home
        </Link>

        <a
          href="https://twitter.com/alphyapp"
          type="button"
          className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 ml-5 underline font-averta-semibold"
        >
          Reach us
        </a>
      </div>
    </div>
  )
}
