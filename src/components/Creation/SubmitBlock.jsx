import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import { Button } from '@material-tailwind/react';

// Icons
import { 
  ArrowLeft, 
  HelpCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

// Platform logos
import YoutubeIcon from '../../../public/img/youtube.png';
import TwitterIcon from '../../../public/img/x_square.jpg';
import SpacesIcon from '../../../public/img/spaces_square.png';
import TwitchIcon from '../../../public/img/twitch_full.png';
import ApplePodcastIcon from '../../../public/img/apple_podcasts.png';

export default function SubmitBlock({
  currentUser,
  tier,
  credit,
  handleSubmit,
  setSubmitDialog,
  loading,
  inputValue,
  setInputValue,
  errorMessage,
  failed,
  inputRef,
  hideCredits = false // New prop to conditionally hide credits display
}) {
  const router = useRouter();
  const [showExampleLinks, setShowExampleLinks] = useState(false);

  const navigateCredit = () => {
    sessionStorage.setItem('creditPurchase', 'true');
    router.push('/account');
  };

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const isPremiumUser = tier === 'basic' || tier === 'premium';

  return (
    <div className="mt-10 sm:mt-20 text-slate-700 h-full p-5 dark:text-zinc-300 max-w-[1000px] mx-auto items-center  justify-center sm:px-20">
      <div className="mb-10">
        <p
          onClick={() => handleGoBack()}
          className="text-slate-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200  ease-in transition cursor-pointer"
        >
          <KeyboardArrowLeftIcon fontSize="small" className="" />
          <span className="text-sm  quicksand font-normal">Go Back</span>
        </p>
      </div>

      <p
        className={`dark:text-zinc-300 text-slate-700 mb-4 text-lg px-1 quicksand font-normal ${
          currentUser ? '' : 'hidden'
        }`}
      >
        Submit your link below
      </p>
      <div
        className={`${
          currentUser
            ? 'sm:grid sm:grid-cols-3 lg:grid-cols-4 mx-auto mt-5'
            : 'hidden'
        }`}
      >
        <div
          className={`sm:col-span-2 lg:col-span-3 relative w-full min-w-[200px] h-12`}
        >
          <input
            ref={inputRef}
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            placeholder=" "
            className="peer w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-zinc-700 dark:focus:border-r-greenColor  dark:focus:border-l-greenColor dark:focus:border-b-greenColor focus:border-greenColor"
          />
          <label className=" quicksand font-normal text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-greenColor before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-greenColor after:border-blue-gray-200 peer-focus:after:!border-greenColor">
            {window.innerWidth < 600
              ? 'Insert a link...'
              : 'Insert a link to start...'}
          </label>

          <div className="sm:hidden">
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-green-300 quicksand font-normal"
              onClick={e => {
                handleSubmit()
              }}
            >
              {' '}
              <PublishIcon fontSize="medium" />
            </Button>
          </div>
        </div>

        <div
          className={`hidden sm:block sm:col-span-1 mt-5 sm:mt-0 flex ml-5 justify-center md:justify-self-start items-center ${
            currentUser ? '' : ''
          }`}
        >
          <div>
            <Button
              size="sm"
              type="submit"
              onClick={e => {
                handleSubmit()
              }}
              className={`bg-green-300 dark:text-slate-700 px-6 py-3 text-sm lg:text-[15px] normal-case ${
                loading && 'opacity-70 pointer-events-none'
              }`}
            >
              {loading ? (
                <Spinner></Spinner>
              ) : (
                <p className="quicksand font-normal">Submit</p>
              )}
            </Button>
          </div>
        </div>
      </div>
      {failed && (
        <div className="mx-auto mt-5 text-sm text-red-400 ml-2">
          {errorMessage}
        </div>
      )}
      <div className="flex items-center  mt-4 space-x-4 md:justify-center lg:mt-0  ">
        <div className="w-full flex flex-col">
       {/*    {inputValue.includes('twitter.com/') &&
            inputValue.includes('/status/') && (
              <p className="mt-2 text-yellow-400 dark:text-amber-200 text-sm items-center">
                <WarningIcon
                  fontSize="small"
                  className="text-yellow-300 p-0.5"
                />{' '}
                <span className="pt-2">
                  You are about to submit a Twitter video. If you are trying to
                  submit a Twitter Space, please get the link to the Space.
                </span>
              </p>
            )} */}

          {currentUser && (
            <span className="text-sm mb-2 mt-4 text-gray-600 dark:text-zinc-300 ">
              <div className="flex-col flex">
                <div className="flex flex-col sm:flex-row"> 
                  <a
                    href="/account"
                    className="text-slate-500 dark:text-zinc-400 quicksand font-normal"
                  >
                    {tier === 'free' && 'Starter Plan'}
                    {tier === 'basic' && 'Basic Plan'}
                    {tier === 'premium' && 'Premium Plan'}
                  </a>
                  <p className="ml-1 mr-1 text-slate-500 dark:text-zinc-400 hidden sm:block">
                    {' '}
                    -{' '}
                  </p>
                  <p className=" text-slate-500 dark:text-zinc-400 quicksand font-normal mt-2   sm:mt-0">
                    {' '}
                    Remaining Credits : {Math.floor(credit)} minutes
                  </p>

                  {currentUser
                    ? tier !== 'free' && (
                        <div className="mt-2 sm:mt-0 sm:ml-4">
                          <p
                            onClick={navigateCredit}
                            className={`text-indigo-400 underline quicksand font-normal cursor-pointer`}
                          >
                            Need more credits?{' '}
                          </p>
                        </div>
                      )
                    : null}
                </div>
                <div>
                  {/* <p className="font-semibold text-md text-slate-700 dark:text-zinc-200 quicksand font-normal">You are on the Starter Plan</p> */}
                  <p className="mt-2 mb-2 font-averta-regular text-zinc-600 dark:text-zinc-300">
                    Available:
                  </p>

                  <div className="flex flex-row">
                    <CheckCircleIcon className="text-green-300 p-1" />
                    <p className="text-slate-500 dark:text-zinc-400 font-averta-regular">
                      YouTube
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <CheckCircleIcon className="text-zinc-300 p-1" />
                    <p className="line-through text-slate-500 dark:text-zinc-400 font-averta-regular">
                      Twitter Spaces
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <CheckCircleIcon className="text-zinc-300 p-1" />
                    <p className="line-through text-slate-500 dark:text-zinc-400 font-averta-regular">
                      Twitter videos
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <CheckCircleIcon className="text-zinc-300 p-1" />
                    <p className="line-through text-slate-500 dark:text-zinc-400 font-averta-regular">
                      Twitch
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <CheckCircleIcon className="text-zinc-300 p-1" />
                    <p className="line-through text-slate-500 dark:text-zinc-400 font-averta-regular">
                      Apple Podcasts
                    </p>
                  </div>

                  <p className="dark:text-zinc-300 text-slate-500 mb-3 mt-6 font-averta-regular">
                    {' '}
                    Switch to a{' '}
                    <Link href="/account" className="text-greenColor  underline">
                      {' '}
                      paid plan
                    </Link>{' '}
                    for limitless access.
                  </p>
                </div>
              ) : (
                <div className="text-zinc-600 dark:text-zinc-400 font-averta-regular">
                  <Link
                    className="text-greenColor font-semibold underline"
                    href="/u/login"
                  >
                    {' '}
                    Sign in
                  </Link>{' '}
                  to process content with Alphy.
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>

      {currentUser && (
        <div>
          <p
            onClick={() => setShowExampleLinks(!showExampleLinks)}
            className="mt-10 relative text-slate-500 dark:text-zinc-400 quicksand font-normal cursor-pointer"
          >
            Example Links{' '}
            <HelpIcon className="text-zinc-600 p-1 dark:text-zinc-300 mb-1 -ml-1" />
          </p>
          {showExampleLinks && (
            <div className=" bottom-0 mt-4 sm:mt-10 relative text-slate-400 dark:text-zinc-400 quicksand font-normal text-sm">
              <p className="mb-6">
                {' '}
                Please make sure the link you are submitting is in one of the
                following formats:
              </p>
              <p className="mt-4">
                YouTube : https://www.youtube.com/watch?v=h6fcK_fRYaI
              </p>
              <p className="mt-4">
                Twitter / X Spaces : https://twitter.com/i/spaces/1yoJMwnLObwKQ
              </p>
              <p className="mt-4">
                Twitter / X Videos :
                https://twitter.com/i/status/1731765772874129676
              </p>
              <p className="mt-4">
                Twitch : https://www.twitch.tv/videos/1965889164
              </p>
              <p className="mt-4">
                Apple Podcasts :
                https://podcasts.apple.com/us/podcast/54-kevin-lee-immi-healthy-ramen/id1507881694?i=1000529427756
              </p>
            </div>
          )}
        </div>
      )}

      {currentUser && (tier === 'basic' || tier === 'premium') && (
        <div>
          <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mt-5 mb-5 dark:opacity-40"></div>

          <div className="flex flex-col text-slate-700 dark:text-zinc-300 quicksand font-normal text-md sm:text-lg mt-4">
            Supported Platforms
            <div className="flex flex-row mt-4 sm:mt-10 opacity-50 overflow-scroll">
              <Image
                src={Youtube}
                height={20}
                width={120}
                title="YouTube"
                className="sm:mr-6 lg:mr-10 grayscale w-1/3 mx-2 max-w-[120px]"
                alt="YouTube"
              />
              <Image
                src={Twitter}
                height={20}
                width={80}
                title="Twitter / X videos"
                className="grayscale rounded-xl  sm:mr-6 lg:mr-10 w-1/3  px-2 max-w-[100px]"
                alt="Twitter"
              />
              <Image
                src={Spaces}
                height={20}
                width={80}
                title="Twitter / X Spaces"
                className="grayscale rounded-xl sm:mr-6 lg:mr-10 w-1/3  px-2 max-w-[100px]"
                alt="Twitter"
              />
              <Image
                src={Twitch}
                title="Twitch"
                height={20}
                width={80}
                className="sm:mr-6   grayscale rounded-xl lg:mr-10 w-1/3  px-2 max-w-[100px]"
                alt="Twitch"

              />
              <Image
                src={ApplePodcast}
                height={20}
                width={80}
                title="Apple Podcasts"
                className="grayscale rounded-lg  sm:mr-6 lg:mr-10 w-1/3  px-2 max-w-[100px]"
                alt="Apple Podcasts"
              />
            </div>
            
            {showExampleLinks && (
              <div className="mt-8 p-5 rounded-lg text-xs">
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-3">Example formats:</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• YouTube: youtube.com/watch?v=h6fcK_fRYaI</li>
                  <li>• X Spaces: x.com/i/status/1892283575736643620</li>
                  <li>• X Videos: x.com/i/status/1731765772874129676</li>
                  <li>• Twitch: twitch.tv/videos/1965889164</li>
                  <li>• Apple Podcasts: podcasts.apple.com/.../id1507881694?i=1000529427756</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-20 w-20 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-8">
            <svg className="h-10 w-10 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-light text-gray-900 dark:text-white mb-4">Sign in to continue</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center max-w-xs">
            Create an account to process and analyze content with Alphy
          </p>
          <Link 
            href="/u/login" 
            className="px-8 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}