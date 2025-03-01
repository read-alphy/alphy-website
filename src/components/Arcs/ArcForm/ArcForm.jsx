import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ArcFormHeader from './ArcFormHeader';
import ArcFormMetadata from './ArcFormMetadata';
import ArcFormSearch from './ArcFormSearch';
import ArcFormUrlSubmit from './ArcFormUrlSubmit';
import ArcPreviewActionBar from './ArcPreviewActionBar';
import FeedItem from '../../FeedTabs/FeedItem';
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { API_URL } from '@/constants';

// Constants for URL validation
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
 * Main ArcForm component with vertical layout
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
  isEditMode = false,
  isCreateArc,
  isEditArc,
  isLoadingSubmit,
  onSave,
  onDelete,
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

  const handleAddOrRemoveItem = (item) => {

    if (sourceIDsArc.includes(item.source_id)) {
      setDataArc(prevData => prevData.filter(prevItem => prevItem.source_id !== item.source_id));
      setSourceIDsArc(prevIds => prevIds.filter(source_id => source_id !== item.source_id));
    } else {
      
      setDataArc(prevData => [...prevData, item]);
      
      setSourceIDsArc(prevIds => [...prevIds, item.source_id]);
    }
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

  // Render search results
  const renderSearchResults = () => {
    if (isLoading && data.length === 0) {
      return [...Array(5)].map((_, index) => (
        <Card key={index} className="overflow-hidden shadow-none dark:bg-zinc-800 dark:border-zinc-700 h-full">
          <Skeleton className="w-full h-40" />
          <div className="p-3">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </Card>
      ));
    }

    return data.map((item, index) => (
      <div onClick={() => handleAddOrRemoveItem(item)}>
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
      </div>
    ));
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

  return (
    <div className="max-w-[900px]">
      {/* Header */}
      <ArcFormHeader 
        isEditMode={isEditMode} 
        arcInfo={arcInfo} 
        handleGoBack={handleGoBack} 
      />
      
      {/* Title and Description */}
    {/*   <ArcFormMetadata
        arcTitle={arcTitle}
        arcDescription={arcDescription}
        setArcTitle={setArcTitle}
        setArcDescription={setArcDescription}
      /> */}
      
      
      
      {/* Search */}
      <ArcFormSearch
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyDown={handleKeyDown}
        searchCalled={searchCalled}
        isLoading={isLoading}
        renderSearchResults={renderSearchResults}
        hasMore={hasMore}
        loadMore={loadMore}
      />
      
      {/* URL Submit */}
      <ArcFormUrlSubmit
        inputValue={inputValue}
        isValidUrl={isValidUrl}
        handleSubmit={handleSubmit}
        loading={loading}
        failed={failed}
        errorMessageSubmit={errorMessageSubmit}
        tier={tier}
        credit={credit}
        setCreditCalled={setCreditCalled}
      />
      
      
      {/* Playlist Preview */}
      { currentUser && (
        <ArcPreviewActionBar
          // Preview props
          arcTitle={arcTitle}
          arcDescription={arcDescription}
          dataArc={dataArc}
          setDataArc={setDataArc}
          sourceIDsArc={sourceIDsArc}
          setSourceIDsArc={setSourceIDsArc}
          errorMessage={errorMessage}
          
          // Action bar props
          isCreateArc={isCreateArc}
          isEditArc={isEditArc}
          isLoadingSubmit={isLoadingSubmit}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default ArcForm;