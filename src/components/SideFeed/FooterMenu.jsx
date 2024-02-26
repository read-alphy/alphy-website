import Link  from 'next/link'
import VerifiedIcon from '@mui/icons-material/Verified'

export default function FooterMenu({
  currentUser,
  handleSignout,
  loggedIn,
  setOpenFeedbackDialog,
  handleDarkMode,
  tier,
  theme
}) {
  return (
    <div className="">
      {/* {currentUser && 
            <div className="flex flex-col">
            <Link
                  href="/explore"
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      setCollapsed(true)
                    }
                  }}
                  className={`


dark:hover:bg-zinc-700 rounded-sm dark:hover:bg-opacity-50

                  pl-6
                       text-zinc-500 dark:text-zinc-200
                     flex flex-row py-2 text-sm sm:text-md  dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-0.5 mt-0.5 feather feather-compass"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>

                  <p className="font-averta-semibold ml-2">Explore</p>
                </Link>
             
             <Link
                    href="/arcs"
                    onClick={() => {
                        if (window.innerWidth < 640) {
                        setCollapsed(true)
                        }
                    }}
                    className={`  w-full pl-6 my-3 flex flex-row text-sm sm:text-md  text-zinc-500 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-200 transition duration-300 ease-in-out`}
                    >
                    <svg
                        className="mr-1 mt-0.5 feather feather-message-square"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <p className="font-averta-semibold text-sm  ml-2">Arcs</p>
                    </Link>

                    <div className="flex w-full border-b border-gray-100 dark:border-zinc-700"></div>


                    </div>
                }
            */}
      {tier === 'premium' && (
        <div className="mb-6  flex flex-row w-full pl-6 ">
          <p className="text-indigo-400 text-md  ">
            <VerifiedIcon fontSize="small" className="text-indigo-400 " />
            <span className="mt-1 font-averta-semibold ml-2">Premium</span>
          </p>
        </div>
      )}

      {loggedIn ? (
        <Link
          className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6  py-2 flex flex-row "
          href="/account"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <span className="font-averta-semibold ml-2">My Plan</span>
        </Link>
      ) : (
        <Link
          className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 flex flex-row py-2 "
          href="/plans"
        >
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
          <span className="font-averta-semibold ml-2">Pricing</span>
        </Link>
      )}

      <div className="pl-6  py-2 text-sm cursor-pointer text-zinc-500 dark:text-zinc-300">
        {theme ==='light' ? (
          <div onClick={handleDarkMode} className=" flex flex-row">
            <svg
              className=" mt-1 mr-1 duration-200 transition ease-in duration-200 feather feather-sun"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <p className=" pt-0.5  font-averta-semibold ml-2 ">Light </p>
          </div>
        ) : (
          <div onClick={handleDarkMode} className="flex flex-row">
            <svg
              className=" mt-1 mr-1 duration-200 transition ease-in duration-200 feather feather-moon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <p className=" pt-0.5  font-averta-semibold  ml-2">Dark</p>
          </div>
        )}
      </div>
      <div className="py-2  pl-6 ">
        <button
          className="text-zinc-500 flex flex-row dark:text-zinc-300 text-sm  font-averta-semibold  w-full cursor-pointer w-[120px]"
          onClick={() => setOpenFeedbackDialog(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
            />
          </svg>

          <span className="ml-2 font-averta-semibold">Reach Us</span>
        </button>
      </div>
      <div className="  pl-6 ">
        <Link
          className="text-zinc-500 dark:text-zinc-300 text-sm font-averta-semibold   my-3  flex flex-row w-full cursor-pointer w-[120px]"
          href="/about "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>

          <span className="ml-2 font-averta-semibold">FAQ</span>
        </Link>
      </div>

      <div className="pl-6 py-2 flex flex-row">
        <Link
          className="text-zinc-500 dark:text-zinc-300 text-sm   w-full cursor-pointer w-[120px] font-averta-semibold"
          href="/privacypolicy"
        >
          Privacy Policy
        </Link>
      </div>

      {currentUser !== null && currentUser !== undefined && (
        <div className="pt-2 flex flex-col">
          <div className="flex w-full border-b border-gray-100 dark:border-zinc-700"></div>
          <div className="flex flex-row pl-6 mt-2">
            <button
              className="text-zinc-500 dark:text-zinc-300 text-sm cursor-pointer font-averta-semibold flex flex-row"
              onClick={() => handleSignout()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <p className="ml-2">Log Out</p>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
