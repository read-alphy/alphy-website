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
    <div className="p-6  rounded-xl">
      {/* Back button - only when not in tab mode */}
      {!hideCredits && (
        <button
          onClick={() => setSubmitDialog(false)}
          className="group mb-6 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
      )}
      
      {currentUser ? (
        <div className="space-y-10">
          {/* Title with subtle accent */}
          <div className="relative">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
             Process a media from the web
            </h3>
            <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-indigo-500 dark:bg-indigo-400"></div>
          </div>
          
          {/* URL input with floating label and submit button side by side on md+ screens */}
          <div className="relative mt-20">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="flex-grow">
                <input
                  id="content-url"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder=" "
                  className={`peer w-full px-4 py-2 border-2 rounded-lg ${
                    failed ? 'border-red-500' : 'border-indigo-300 dark:border-indigo-700 focus:border-indigo-500 dark:focus:border-indigo-400'
                  } bg-transparent text-gray-900 dark:text-white focus:outline-none transition-colors`}
                />
                <label 
                  htmlFor="content-url"
                  className="absolute left-3 -top-6 text-xs text-gray-500 dark:text-gray-400 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 transition-all duration-200"
                >
                  Paste your content URL
                </label>
              </div>
              
              {/* Submit button - next to input on md+ screens */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`md:w-auto w-full py-3 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
            
            {failed && (
              <div className="mt-3 flex items-start text-sm text-red-500 dark:text-red-400">
                <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
          
          {/* Credits display - only when not in tab mode */}
          {!hideCredits && (
            <div className="flex justify-between items-center py-4 px-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg my-8">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-300 text-xs font-medium">
                    {Math.floor(credit)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Available credits</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {tier === 'free' ? 'Starter' : tier === 'basic' ? 'Basic' : 'Premium'} Plan
                  </p>
                </div>
              </div>
              
              {tier !== 'free' && (
                <button
                  onClick={navigateCredit}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Get more
                </button>
              )}
            </div>
          )}
          
          {/* Platforms section - only show when tier is defined */}
          <div className="mt-12 md:pt-8 ">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Supported Platforms
              </h4>
              <button 
                onClick={() => setShowExampleLinks(!showExampleLinks)}
                className="text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center"
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Example Links
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {[YoutubeIcon, TwitterIcon, SpacesIcon, TwitchIcon, ApplePodcastIcon].map((icon, index) => (
                <div key={index} className="flex items-center justify-center p-3">
                  <Image 
                    src={icon} 
                    width={100} 
                    height={100} 
                    alt="Platform" 
                    className="h-12 rounded-md w-auto filter grayscale opacity-70" 
                  />
                </div>
              ))}
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