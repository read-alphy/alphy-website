// create a 404 page
import Link from 'next/link'
import Smiley from '../../../public/img/smiling_robot.png'

import Image from 'next/image'

export default function NotFound() {


  return (
    <div className="flex flex-col items-center w-full justify-center text-slate-700 dark:bg-darkMode dark:text-zinc-300 text-center h-[90vh] ">
      <Image src={Smiley} className="opacity-70 saturate-50" alt = "smiling robot" />
      <h2 className="welcome-prompt mb-5 text-6xl flex md:flex-row flex-col justify-center  text-[2.25rem] font-averta-semibold">
        Oops!
      </h2>
      <h2 className="mb-5 text-zinc-700 dark:text-zinc-300 font-normal">
        Sorry, we couldn't find the page you were looking for :( <br></br>{' '}
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
          href="https://x.com/alphyapp"
          type="button"
          className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 ml-5 underline font-averta-semibold"
        >
          Reach us
        </a>
      </div>
    </div>
  )
}
