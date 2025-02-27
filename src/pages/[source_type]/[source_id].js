  /* import Source from '../../components/Content/Source' */

import Loading from '../../components/Loading'
import { API_URL } from '../../constants'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Source from '../../components/Content/Source'

async function fetchData(sourceType, sourceId) {
  if(sourceId === '[object Object]') {
    return { data: null, error: 'Invalid source ID' };
  }
      
  const url = `${API_URL}/sources/${sourceType}/${sourceId}`;
    
  try {
    // Add explicit timeout and headers to make fetch more robust
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data: data, error: null };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return { 
      data: null, 
      error: error.message || 'Error fetching data' 
    };
  }
}

export default function SourceMaterial({
    collapsed,
    setCollapsed,
    tier,
    setContentName,
    userArcs,
    currentUser,
    sandboxHistory,
    setSandboxHistory,
    getSandboxHistory,
    loggedIn,
    setLoggedIn
}){
  const router = useRouter();
  const { source_type, source_id } = router.query;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!source_type || !source_id) return;
      
      if (typeof source_id !== 'string' || source_id === '[object Object]') {
        setError('Invalid source ID');
        setLoading(false);
        return;
      }

      const { data, error } = await fetchData(source_type, source_id);
      setData(data);
      setError(error);
      setLoading(false);

      // Set image URL
      if (data !== null && data.thumbnail !== null) {
        setImageUrl(data.thumbnail);
      } else {
        if (source_type === "x") {
          setImageUrl("/img/X.png");
        } else if (source_type === "yt") {
          setImageUrl(`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`);
        } else if (source_type === "sp") {
          setImageUrl("/img/twitter_space.png");
        } else if (source_type === "ap") {
          setImageUrl("/img/apple_podcast_banner.png");
        } else if (source_type === "tw") {
          setImageUrl("/img/twitchSource.png");
        }
      }
    }

    loadData();
  }, [source_type, source_id]);

  if (loading || !router.isReady) {
    return <Loading />;
  }
  
  if (error) {    
    return <div>Error loading data: {error}</div>;
  }

  if (!data || source_id === undefined || source_type === undefined) {
    return <Loading />;
  }


  return(
      <div>
          <Head>
 <meta property="og:title" content={data.title!==undefined ? data.title: "Turn audio to text, summarize, and generate content with AI"} />
 <meta name="twitter:description" content={`${data.summaries!== undefined && data.summaries[0]!== undefined && data.summaries[0].key_takeaways!==null ? data.summaries[0].key_takeaways : 'Explore audiovisual content like never before with Alphy. Transcribe, summarize, and interact with audio files effortlessly.'}`} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:url" content={`https://alphy.app/${source_type}/${source_id}`} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={data.title!==undefined ? `Alphy - ${data.title}`: "Turn audio to text, summarize, and generate content with AI"} />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />  
  <meta name="twitter:title" content={data.title!==undefined ? data.title: "Alphy - Turn audio to text, summarize, and generate content with AI"} />
  <meta name="twitter:description" content={`${data.summaries!== undefined && data.summaries[0]!== undefined && data.summaries[0].key_takeaways!==null ? data.summaries[0].key_takeaways : 'Explore audiovisual content like never before with Alphy. Transcribe, summarize, and interact with audio files effortlessly.'}`} />
  <meta name="twitter:image" content={imageUrl} />
  <title>{data.title!==undefined ? data.title : "Alphy - Turn audio to text, summarize, and generate content with AI"}</title>
  </Head>

      {
          (source_id===undefined|| source_type===undefined || data=== null) ?  <Loading /> : 
      <Source
      source_type={source_type}
      source_id={source_id}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      tier={tier}
      setContentName={setContentName}
      userArchipelagos={userArcs}
      currentUser={currentUser}
      sandboxHistory={sandboxHistory}
      setSandboxHistory={setSandboxHistory}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      getSandboxHistory = {getSandboxHistory}
      data={data}

      />
  }
  </div>
  )

  }