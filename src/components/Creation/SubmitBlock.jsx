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
import TwitterIcon from '../../../public/img/twitter_square.png';
import SpacesIcon from '../../../public/img/spaces_square.png';
import TwitchIcon from '../../../public/img/twitch_full.png';
import ApplePodcastIcon from '../../../public/img/apple_podcasts.png';

export default function SubmitBlock({
  currentUser,
  tier,
  credit,
  handleGoBack,
  handleSubmit,
  loading,
  inputValue,
  setInputValue,
  errorMessage,
  failed,
  inputRef,
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}     
      
      {/* Main content card */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
          Submit content for processing
        </h3>
        
        {currentUser ? (
          <>
            <div className="mb-6">
              <label htmlFor="content-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content URL
              </label>
              <div className="relative">
                <input
                  id="content-url"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Paste your content URL here..."
                  className={`w-full px-4 py-3 rounded-lg border ${failed ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white`}
                />
              </div>
              {failed && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  {errorMessage}
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {tier === 'free' && 'Starter Plan'}
                  {tier === 'basic' && 'Basic Plan'}
                  {tier === 'premium' && 'Premium Plan'}
                </span>
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {Math.floor(credit)} minutes remaining
                </span>
              </div>
              
              {tier !== 'free' && (
                <button
                  onClick={navigateCredit}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  Need more credits?
                </button>
              )}
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`max-w-xs mx-auto flex justify-center items-center px-5 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Submit for Processing'
              )}
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8m10 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sign in Required</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              You need to sign in to process content with Alphy.
            </p>
            <Link href="/u/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
              Sign In
            </Link>
          </div>
        )}
      </div>
      
      {/* Available platforms section */}
      {currentUser && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              {tier === 'free' ? 'Available Platforms' : 'Supported Platforms'}
            </h4>
            <button 
              onClick={() => setShowExampleLinks(!showExampleLinks)}
              className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              Example Links
            </button>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 rounded-xl s p-6">
            {tier === 'free' ? (
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <div className="flex items-center">
                    <Image src={YoutubeIcon} width={80} height={30} alt="YouTube" className="h-6 w-auto" />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">YouTube</span>
                  </div>
                </div>
                
                <div className="flex items-center opacity-50">
                  <CheckCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <div className="flex items-center">
                    <Image src={SpacesIcon} width={80} height={30} alt="Twitter Spaces" className="h-6 w-auto" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">Twitter Spaces</span>
                  </div>
                </div>
                
                <div className="flex items-center opacity-50">
                  <CheckCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <div className="flex items-center">
                    <Image src={TwitterIcon} width={80} height={30} alt="Twitter Videos" className="h-6 w-auto" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">Twitter Videos</span>
                  </div>
                </div>
                
                <div className="flex items-center opacity-50">
                  <CheckCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <div className="flex items-center">
                    <Image src={TwitchIcon} width={80} height={30} alt="Twitch" className="h-6 w-auto" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">Twitch</span>
                  </div>
                </div>
                
                <div className="flex items-center opacity-50">
                  <CheckCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <div className="flex items-center">
                    <Image src={ApplePodcastIcon} width={80} height={30} alt="Apple Podcasts" className="h-6 w-auto" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">Apple Podcasts</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center">
                  <Image src={YoutubeIcon} width={80} height={30} alt="YouTube" className="h-7 w-auto" />
                </div>
                <div className="flex items-center">
                  <Image src={TwitterIcon} width={80} height={30} alt="Twitter" className="h-7 w-auto" />
                </div>
                <div className="flex items-center">
                  <Image src={SpacesIcon} width={80} height={30} alt="Twitter Spaces" className="h-7 w-auto" />
                </div>
                <div className="flex items-center">
                  <Image src={TwitchIcon} width={80} height={30} alt="Twitch" className="h-7 w-auto" />
                </div>
                <div className="flex items-center">
                  <Image src={ApplePodcastIcon} width={80} height={30} alt="Apple Podcasts" className="h-7 w-auto" />
                </div>
              </div>
            )}
            
            {tier === 'free' && (
              <div className="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/account" className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  Switch to a paid plan for unlimited access
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
            
            {showExampleLinks && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Please make sure your link matches one of these formats:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>YouTube: https://www.youtube.com/watch?v=h6fcK_fRYaI</li>
                  <li>Twitter/X Spaces: https://twitter.com/i/spaces/1yoJMwnLObwKQ</li>
                  <li>Twitter/X Videos: https://twitter.com/i/status/1731765772874129676</li>
                  <li>Twitch: https://www.twitch.tv/videos/1965889164</li>
                  <li>Apple Podcasts: https://podcasts.apple.com/us/podcast/54-kevin-lee-immi-healthy-ramen/id1507881694?i=1000529427756</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}