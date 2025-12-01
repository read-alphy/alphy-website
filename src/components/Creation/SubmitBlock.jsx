import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Icons
import { 
  ArrowLeft, 
  HelpCircle,
  AlertCircle,
  Loader2,
  Send,
  ChevronDown,
  ChevronUp
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
  hideCredits = false
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

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  const platforms = [
    { icon: YoutubeIcon, name: 'YouTube', example: 'youtube.com/watch?v=h6fcK_fRYaI' },
    { icon: TwitterIcon, name: 'X Videos', example: 'x.com/user/status/1731765772874129676' },
    { icon: SpacesIcon, name: 'X Spaces', example: 'x.com/i/status/1892283575736643620' },
    { icon: TwitchIcon, name: 'Twitch', example: 'twitch.tv/videos/1965889164' },
    { icon: ApplePodcastIcon, name: 'Apple Podcasts', example: 'podcasts.apple.com/.../id1507881694?i=1000529427756' }
  ];

  return (
    <div className="p-6 md:p-8">
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
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Process media from the web
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Paste a URL from any supported platform to transcribe and analyze
            </p>
          </div>
          
          {/* URL input with submit button */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <input
                  id="content-url"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste your URL here..."
                  className={`w-full px-4 py-3 border-2 rounded-xl ${
                    failed 
                      ? 'border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-200 dark:border-zinc-600 focus:border-indigo-500 dark:focus:border-indigo-400'
                  } bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 transition-all duration-200`}
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={loading || !inputValue.trim()}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 min-w-[140px] ${
                  loading 
                    ? 'bg-indigo-400 dark:bg-indigo-600 cursor-wait' 
                    : !inputValue.trim()
                      ? 'bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-zinc-500 cursor-not-allowed'
                      : 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02]'
                } ${loading ? 'text-white' : ''}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Error message */}
            {failed && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-600 dark:text-red-400">{errorMessage}</span>
              </div>
            )}
          </div>
          
          {/* Credits display - only when not in tab mode */}
          {!hideCredits && (
            <div className="flex justify-between items-center py-4 px-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-300 text-sm font-semibold">
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
          
          {/* Supported Platforms */}
          <div className="pt-4 border-t border-gray-100 dark:border-zinc-700">
            <button 
              onClick={() => setShowExampleLinks(!showExampleLinks)}
              className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-gray-400" />
                Supported Platforms & Examples
              </span>
              {showExampleLinks ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            {/* Platform icons - always visible */}
            <div className="flex items-center justify-start gap-4 py-4 overflow-x-auto">
              {platforms.map((platform, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 flex items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700"
                  title={platform.name}
                >
                  <Image 
                    src={platform.icon} 
                    width={36} 
                    height={36} 
                    alt={platform.name} 
                    className="rounded-md opacity-80 hover:opacity-100 transition-opacity" 
                  />
                </div>
              ))}
            </div>
            
            {/* Expandable example links */}
            {showExampleLinks && (
              <div className="mt-2 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700">
                <ul className="space-y-3">
                  {platforms.map((platform, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">
                        {platform.name}:
                      </span>
                      <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded break-all">
                        {platform.example}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sign in to continue</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs">
            Create an account to process and analyze content with Alphy
          </p>
          <Link 
            href="/u/login" 
            className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/25"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}