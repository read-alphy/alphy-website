  /* import Source from '../../components/Content/Source' */

import Loading from '../../components/Loading'
import { API_URL } from '../../constants'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Twitter from '../../../public/img/twitter_space.png'
import ApplePodcastBanner from '../../../public/img/apple_podcast_banner.png'
import Twitch from '../../../public/img/twitchSource.png'
import X_Image from '../../../public/img/X.png'


const Source = dynamic(() => import('../../components/Content/Source'), {
  ssr: false,
})


// Define the fetchData function
async function fetchData(sourceType, sourceId) {
  if(sourceId === '[object Object]') {
      return { data: null, error: 'Invalid source ID' };
  }
      
      const url = `${API_URL}/sources/${sourceType}/${sourceId}`;
    
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { data: data, error: null };
  } catch (error) {
    
    console.error(`Error fetching data: ${error}`);
    return { data: null, error: error.response ? error.response.data : 'Error fetching data' };
  }
}
    
  export async function getServerSideProps(context) {
    
    const { source_type, source_id } = context.params;

    if (typeof source_id !== 'string') {
      console.error('source_id is not a string:', source_id);
      // Handle the case or log more details
    }
          const { data, error } = await fetchData(source_type, source_id);
        
          if (error || !data) {
            // Handle the case where there is an error or no data
            console.error(`Fetch error: ${error}`);
            return {
              props: {
                data:null,
                error: error || 'An unknown error occurred',
              },
            };
          }
        
          // If data is valid, return it as props
          return {
            props: {
              data: data,
              source_id,
              source_type,
              error: error
            },
          };
  
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
      setLoggedIn,
      error,
      data,
      source_id,
      source_type
  }){

    

    let imageUrl = ""
if(data !== null && data.thumbnail !== null){
  imageUrl = data.thumbnail
}
else {
  if (source_type === "x"){
  imageUrl = "/img/X.png"
  }
  else if (source_type === "yt"){
  imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`
  }
  else if (source_type === "sp"){
  imageUrl = "/img/twitter_space.png"
  }
  else if (source_type === "ap"){
  imageUrl = "/img/apple_podcast_banner.png"
  }
  else if (source_type === "tw"){
  imageUrl = "/img/twitchSource.png"
  }
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
      userArcs={userArcs}
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