import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'
import Link from 'next/link'
import DiscordIcon from '../../../public/img/discord.svg'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import FeedbackForm from '../SideFeed/FeedbackForm.jsx'
import Image from 'next/image'

export default function FooterMainPage({ currentUser }) {
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)

  return (
    <div className="bottom-0 text-zinc-700 dark:text-zinc-300">
      <div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            {!currentUser && (
              <div className=" mt-2 lg:mt-4 pl-6 md:pl-10">
                <Link
                  className="text-zinc-500 dark:text-zinc-300 text-sm font-averta-semibold    w-full cursor-pointer w-[120px]"
                  href="/u/login "
                >
                  Sign In
                </Link>
              </div>
            )}

            {(currentUser != undefined && currentUser !== null) ? (
              <Link
                className="text-zinc-500  mt-2 lg:mt-4 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 "
                href="/account"
              >
                {/* <PersonIcon className="text-zinc-300 mr-2" fontSize="medium"/> */}
                <span className="font-averta-semibold">Account</span>
              </Link>
            ) : (
              <Link
                className="text-zinc-500 dark:text-zinc-300 mt-2 lg:mt-4 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 "
                href="/plans"
              >
                <span className="font-averta-semibold">Plans</span>
              </Link>
            )}
          </div>

          <div className="mt-1 pl-6 md:pl-10">
            <button
              className="text-zinc-500 dark:text-zinc-300 text-sm  font-averta-semibold  w-full cursor-pointer w-[120px]"
              onClick={() => setOpenFeedbackDialog(true)}
            >
              Reach Us
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-5 mt-5 dark:opacity-40"></div>

      <div className="grid grid-cols-3 justify-items-center px-2 mb-8">
        <a
          href="https://twitter.com/alphyapp"
          className="cursor-pointer"
          target="_blank"
        >
          <TwitterIcon fontSize="small" className="text-[#ced4da]" />
        </a>
        <a href="mailto:support@alphy.app" className="cursor-pointer">
          <EmailIcon fontSize="small" className="text-[#ced4da]" />
        </a>
        <div>
          <a href="https://discord.gg/N4CkQhCVv2" target="_blank">
            <Image src={DiscordIcon} className="mt-1" 
            width={20} alt="Discord Icon"
            />
          </a>
        </div>
      </div>

      <Dialog
        maxWidth={'md'}
        fullWidth={true}
        open={openFeedbackDialog}
        onClose={() => setOpenFeedbackDialog(false)}
      >
        <div className="dark:bg-mildDarkMode">
          <FeedbackForm />
        </div>
      </Dialog>
    </div>
  )
}
