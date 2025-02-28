import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { ChevronLeft, Search } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

import FeedItem from '../FeedTabs/FeedItem';
import SkeletonItem from '../FeedTabs/SkeletonItem';
import { API_URL } from '../../constants';

// Constants
const VALID_URL_PATTERNS = [
  'https://www.youtube.com/watch',
  'https://youtu.be',
  'https://m.youtube.com',
  'https://twitter.com/i/status',
  'https://www.youtube.com/live',
  'https://podcasts.apple.com',
  'https://www.twitch.tv',
  'https://www.twitch.com',
  'https://twitter.com',
  'https://x.com',
  'https://x.com/i/status',
  'https://twitter.com/i/spaces',
  'https://x.com/i/spaces'
];

/**
 * Shared ArcForm component used by both ArcCreation and EditArc
 */
const ArcForm = ({
  // Arc data
  arcInfo,
  arcTitle,
  arcDescription,
  sourceIDsArc,
  dataArc,
  
  // Setters
  setArcTitle,
  setArcDescription,
  setSourceIDsArc,
  setDataArc,
  
  // User info
  currentUser,
  tier,
  credit,
  
  // Other props
  errorMessage,
  setCreditCalled,
  isEditMode = false, // Flag to determine if we're in edit mode
}) => {
  // State variables
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [failed, setFailed] = useState(false);
  const [errorMessageSubmit, setErrorMessageSubmit] = useState('');
  const [searchCalled, setSearchCalled] = useState(false);
  const [prevLength, setPrevLength] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);

  // Navigation
  const handleGoBack = () => {
    if (isEditMode && arcInfo?.uid) {
      window.location.href = `/arc/${arcInfo.uid}`;
    } else {
      window.history.back();
    }
  };

  // Data fetching
  const fetchSources = (currentOffset, isFirstLoad, shouldFetch) => {
    if (!shouldFetch) {
      return;
    }
    
    setIsLoading(true);
    
    const params = {
      offset: currentOffset,
      limit,
      ...(inputValue && { q: inputValue })
    };
    
    axios.get(`${API_URL}/sources/`, { params })
      .then(response => {
        const hasMoreData = response.data.length >= limit;
        setHasMore(hasMoreData);
        
        if (isFirstLoad) {
          setData(response.data);
        } else {
          setData(prevData => [...prevData, ...response.data]);
        }
        
        setIsLoading(false);
        setSearchCalled(true);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching sources:", error);
      });
  };

  const loadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchSources(newOffset, false, true);
  };

  // URL validation and processing
  const isValidUrl = (url) => {
    return VALID_URL_PATTERNS.some(pattern => url.includes(pattern));
  };

  const extractVideoInfo = (url) => {
    let videoId = null;
    let videoSource = null;

    if (url.includes('https://www.youtube.com')) {
      if (url.includes('https://www.youtube.com/watch')) {
        videoId = url.split('/').pop().split('?v=')[1]?.split('&')[0];
      } else if (url.includes('https://www.youtube.com/live')) {
        videoId = url.split('/').pop().split('?')[0];
      }
      videoSource = 'yt';
    } else if (url.includes('https://youtu.be')) {
      videoId = url.split('/').pop().split('?')[0];
      videoSource = 'yt';
    } else if (url.includes('https://m.youtube.com')) {
      videoId = url.split('/').pop().split('?v=')[1]?.split('&')[0];
      videoSource = 'yt';
    } else if (url.includes('https://twitter.com/i/spaces') || url.includes('https://x.com/i/spaces')) {
      if (tier === 'basic' || tier === 'premium') {
        videoId = url.split('/').pop().split('?')[0];
        videoSource = 'sp';
      } else {
        return { error: 'Upgrade your plan to process X Spaces. See Account page for more detail.' };
      }
    } else if (url.includes('https://podcasts.apple.com')) {
      if (tier === 'basic' || tier === 'premium') {
        const idRegex = /id(\d+)/;
        const iRegex = /i=(\d+)/;
        const idMatch = url.match(idRegex);
        const iMatch = url.match(iRegex);
        const podcastId = idMatch ? idMatch[1] : '';
        const episodeId = iMatch ? iMatch[1] : '';
        videoId = `${podcastId}-${episodeId}`;
        videoSource = 'ap';
      } else {
        return { error: 'Upgrade your plan to process Apple Podcasts. See Account page for more detail.' };
      }
    } else if (url.includes('https://www.twitch.tv') || url.includes('https://www.twitch.com')) {
      if (tier === 'basic' || tier === 'premium') {
        const regex = /twitch\.(tv|com)\/videos\/(\d+)/;
        const match = url.match(regex);
        videoId = match ? match[2] : null;
        videoSource = 'tw';
      } else {
        return { error: 'Upgrade your plan to process Twitch recordings. See Account page for more detail.' };
      }
    } else if ((url.includes('https://x.com') || url.includes('https://twitter.com')) && 
               !url.includes('i/spaces')) {
      if (tier === 'basic' || tier === 'premium') {
        const regex = /status\/(\d+)/;
        const urlWithoutVideo = url.split('/video/')[0];
        const match = urlWithoutVideo.match(regex);
        videoId = match ? match[1] : '';
        videoSource = 'x';
      } else {
        return { error: 'Upgrade your plan to process X Videos. See Account page for more detail.' };
      }
    }

    return { videoId, videoSource };
  };

  // Submit URL handler
  const handleSubmit = () => {
    if (!isValidUrl(inputValue)) {
      setInputValue('');
      setErrorMessageSubmit('Please provide a link to a YouTube video, X Space, X Video, Twitch recording, or an Apple Podcast');
      setFailed(true);
      return;
    }

    const videoInfo = extractVideoInfo(inputValue);
    
    if (videoInfo.error) {
      setFailed(true);
      setErrorMessageSubmit(videoInfo.error);
      return;
    }

    const { videoSource } = videoInfo;

    if (!currentUser) {
      setErrorMessageSubmit('Please sign in to submit content.');
      setFailed(true);
      return;
    }

    setLoading(true);
    
    currentUser.getIdToken().then(idToken => {
      const submissionUrl = videoSource === 'tw' 
        ? inputValue.split('/video/')[0] 
        : inputValue;
        
      axios.post(
        `${API_URL}/sources/`,
        { url: submissionUrl },
        { headers: { 'id-token': idToken } }
      )
      .then(response => {
        sessionStorage.setItem('refreshCredit', 'true');
        setCreditCalled(false);
        setErrorMessageSubmit('');
        setFailed(false);
        setLoading(false);
        
        setDataArc(prevData => [...prevData, response.data]);
        setSourceIDsArc(prevIds => [...prevIds, response.data.source_id]);
        setInputValue('');
        fetchSources(0, true, true);
      })
      .catch(error => {
        let errorMsg = 'There was an error submitting the form. Please refresh the page and try again. If the issue persists, contact us at support@alphy.app';
        
        if (error.response?.data?.detail === 'Free users cannot submit X Spaces') {
          errorMsg = 'Upgrade your plan to process X Spaces. See Account page for more detail.';
        } else if (error.response?.data?.detail === 'Not enough minutes') {
          errorMsg = "You don't have enough credits.";
        }
        
        setErrorMessageSubmit(errorMsg);
        setFailed(true);
        setLoading(false);
      });
    });
  };

  // Search input handling
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      fetchSources(0, true, true);
    }
  };

  // Effects for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (searchQuery) {
      fetchSources(0, true, true);
    }
  }, [searchQuery]);

  // Effect for empty search
  useEffect(() => {
    if (prevLength > 0 && inputValue.length === 0) {
      fetchSources(0, true, true);
    }
    setPrevLength(inputValue.length);
  }, [inputValue]);

  // Initial data loading
  useEffect(() => {
    if (firstTime) {
      fetchSources(0, true, true);
      setFirstTime(false);
    }
  }, []);

  // UI Components
  const renderSearchResults = () => {
    if (isLoading && data.length === 0) {
      return [...Array(10)].map((_, index) => (
        <SkeletonItem key={index} />
      ));
    }

    if (isLoading && data.length > 0) {
      return data.map((item, index) => (
        <FeedItem
          key={index}
          item={item}
          mainFeedInput={inputValue}
          fromArc="search"
          dataArc={dataArc}
          setDataArc={setDataArc}
          sourceIDsArc={sourceIDsArc}
          setSourceIDsArc={setSourceIDsArc}
        />
      ));
    }

    return data.map((item, index) => (
      <FeedItem
        key={index + 1000}
        item={item}
        fromArc="search"
        dataArc={dataArc}
        setDataArc={setDataArc}
        sourceIDsArc={sourceIDsArc}
        setSourceIDsArc={setSourceIDsArc}
      />
    ));
  };

  const renderCreditInfo = () => {
    if (!isValidUrl(inputValue)) return null;
    
    return (
      <div className="mt-4 flex flex-col mt-6">
        <div className="flex-col flex text-sm">
          <div className="flex flex-row">
            <a href="/account" className="text-zinc-500 dark:text-zinc-400">
              {tier === 'free' && 'Starter Plan'}
              {tier === 'basic' && 'Basic Plan'}
              {tier === 'premium' && 'Premium Plan'}
            </a>
            <p className="ml-1 mr-1 text-zinc-500 dark:text-zinc-400"> - </p>
            <p className="text-zinc-500 dark:text-zinc-400 quicksand font-semibold">
              Remaining Credits: {Math.floor(credit)} minutes
            </p>
          </div>
        </div>
        
        <div className="flex flex-col">
          <p className="text-zinc-500 dark:text-zinc-400 mr-2 quicksand font-semibold mt-2">
            Need more credits?
          </p>
          {tier === 'free' && (
            <span className="quicksand font-normal text-zinc-500 dark:text-zinc-300 text-sm">
              Upgrade to a paid plan to get credit topups.
            </span>
          )}
        </div>
        
        {(tier === 'basic' || tier === 'premium') && (
          <Link
            onClick={() => sessionStorage.setItem('creditPurchase', 'true')}
            href="/account"
            className="text-indigo-400 quicksand font-normal text-sm mt-4 underline quicksand font-semibold"
          >
            Buy here.
          </Link>
        )}
      </div>
    );
  };

  const shouldShowSubmitButton = isValidUrl(inputValue);

  return (
    <div className="px-4 sm:px-20 lg:px-0 lg:grid lg:grid-cols-5 lg:w-[70vw] lg:mt-10">
      {/* Left Column */}
      <div className="col-span-2 flex justify-start min-w-[300px]">
        <div className="w-full min-w-[300px]">
          {/* Navigation */}
          <div className="flex flex-col">
            <div className="mt-10 lg:mt-0">
              <a
                onClick={handleGoBack}
                className="text-slate-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200 ease-in transition cursor-pointer flex items-center"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm quicksand font-semibold">Go Back</span>
              </a>
            </div>
            
            {/* Title Input */}
            <div className="flex flex-row w-full items-center">
              <div className="relative w-full min-w-[200px] h-12 mt-10">
                <p className="text-slate-700 dark:text-zinc-300 mb-2 ml-1 quicksand font-semibold">
                  Title
                </p>
                <input
                  value={arcTitle}
                  placeholder="Set a title..."
                  onChange={event => setArcTitle(event.target.value)}
                  className="w-full quicksand font-normal text-sm px-2 h-[50px] bg-white dark:bg-mildDarkMode border border-zinc-200 dark:border-zinc-700 focus:border-greenColor focus:outline-none focus:ring-0 rounded-lg"
                />
              </div>
            </div>
            
            {/* Description Input */}
            <div className="w-full">
              <p className="text-slate-700 dark:text-zinc-300 mb-2 mt-16 ml-1 quicksand font-semibold text-md">
                Description
              </p>
              <textarea
                className="min-h-[120px] p-2 border rounded-lg quicksand font-normal bg-white border-zinc-200 dark:border-zinc-700 dark:bg-mildDarkMode resize-none text-sm w-full text-top focus:border-greenColor focus:outline-none focus:ring-0"
                value={arcDescription}
                placeholder="Set a description for your arc..."
                onChange={event => setArcDescription(event.target.value)}
              ></textarea>
            </div>
          </div>
          
          <div className="mt-10 border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
          
          {/* Search Section */}
          <p className="mt-4 lg:mt-10 mb-2 text-slate-700 dark:text-zinc-300 ml-1 quicksand font-semibold">
            Curate your knowledge hub
          </p>
          <p className="mt-2 mb-6 text-slate-600 dark:text-zinc-400 ml-1 text-sm quicksand font-normal">
            Search by keyword or paste a link.
          </p>
          
          <div className="w-full grid grid-cols-5 lg:grid-cols-6">
            <div className="col-span-5 lg:col-span-6 relative w-full min-w-[200px] h-12">
              <input
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                placeholder=" "
                onKeyDown={handleKeyDown}
                className="peer w-full quicksand font-semibold lg:w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-black dark:focus:border-r-greenColor dark:focus:border-l-greenColor dark:focus:border-b-greenColor focus:border-greenColor pl-8"
              />
              <label
                className={`${
                  inputValue.length === 0 ? 'pl-6' : ''
                } quicksand font-normal peer-focus:pl-0 text-slate-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-greenColor before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-greenColor after:border-blue-gray-200 peer-focus:after:!border-greenColor pt-1 peer-focus:pt-0`}
              >
                Search from our database...
              </label>
              <div className="grid place-items-center absolute text-blue-gray-500 top-2/4 left-3 -translate-y-2/4 w-5 h-5">
                <SearchIcon className="text-zinc-400" fontSize="small" />
              </div>
            </div>
          </div>
          
          {/* Search Results */}
          <div className="arc-search max-h-[80vh] overflow-y-scroll mt-5">
            {inputValue.length > 0 && searchCalled && (
              <p className="mt-2 mb-8 text-zinc-600 dark:text-zinc-300 flex flex-col text-sm quicksand font-semibold">
                Can't find what you are looking for? Paste the link for the
                content above to process it first.
              </p>
            )}
            
            {renderSearchResults()}
          </div>
          
          {/* Load More Button */}
          {hasMore && (
            <div className="w-full flex justify-center">
              <button
                className="justify-center flex text-slate-700 dark:text-zinc-300 quicksand font-normal underline pb-10 quicksand font-semibold"
                onClick={loadMore}
              >
                Load more
              </button>
            </div>
          )}
          
          {/* Submit Button */}
          {shouldShowSubmitButton && (
            <div>
              <Button
                size="sm"
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-300 dark:text-slate-700 px-6 py-3 text-sm lg:text-[15px] normal-case quicksand font-semibold"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>

              {failed && (
                <div className="mx-auto mt-5 text-sm text-red-400 ml-2">
                  {errorMessageSubmit}
                </div>
              )}
            </div>
          )}
          
          {/* Credit Information */}
          {renderCreditInfo()}
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-3 grid-row-2 flex justify-start lg:p-10 drop-shadow-sm">
        <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 lg:hidden"></div>

        <div className="lg:border-l w-full lg:px-10 mx-auto lg:min-w-[550px]">
          <p className="mt-20 lg:mt-5 ml-2 text-lg font-bold text-slate-700 dark:text-zinc-300 quicksand font-semibold">
            {arcTitle.length > 0 ? arcTitle : 'Arc'}
          </p>
          
          {arcDescription.length > 0 && (
            <p className="mt-2 ml-2 mb-5 text-md text-slate-600 dark:text-zinc-200 opacity-80 quicksand font-normal">
              {arcDescription}
            </p>
          )}
          
          <p className="mt-4 ml-2 mb-5 text-md text-slate-700 dark:text-zinc-300 opacity-80 quicksand font-semibold">
            Add or remove content to change the scope of your chat assistant.
          </p>
          
          {errorMessage && dataArc.length === 0 && (
            <p className="mt-4 ml-2 mb-5 text-md text-red-500 dark:text-red-400 opacity-80 quicksand font-semibold">
              An Arc cannot be empty. Please add an item to continue.
            </p>
          )}

          {dataArc.length > 0 &&
            dataArc.map((item, index) => (
              <FeedItem
                key={index}
                item={item}
                mainFeedInput={inputValue}
                fromArc="arc"
                dataArc={dataArc}
                setDataArc={setDataArc}
                sourceIDsArc={sourceIDsArc}
                setSourceIDsArc={setSourceIDsArc}
                forCreationPool={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArcForm;