  /* import Source from '../../components/Content/Source' */
console.log("starting")
import Loading from '../../components/Loading'
import { API_URL } from '../../constants'
import dynamic from 'next/dynamic'
import Head from 'next/head'

export const runtime = 'experimental-edge'

/* const Source = dynamic(() => import('../../components/Content/Source'), {
  ssr: false,
  loading: () => <Loading />
})
 */


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
      },
      next: { revalidate: 60 } // Optional: control revalidation
    });
    console.log(response);
    
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
    
export async function getServerSideProps(context) {
  const { source_type, source_id } = context.params;
  console.log("source_id", source_id);
  if (!source_id || typeof source_id !== 'string') {
    return {
      props: {
        data: null,
        error: 'Invalid source ID',
      },
    };
  }

  const { data, error } = await fetchData(source_type, source_id);
  console.log("data", data);
  return {
    props: {
      initialData: data || null,
      source_id,
      source_type,
      error: error || null,
    },
  };
}


  


export default function SourceMaterial({ initialData, source_id, source_type, error }) {
  // Only render minimal content on server-side
  // The Source component will be loaded client-side
  let imageUrl = "";
  if (initialData && initialData.thumbnail) {
    imageUrl = initialData.thumbnail;
  } else if (source_type === "x") {
    imageUrl = "/img/X.png";
  } else if (source_type === "yt") {
    imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`;
  } else if (source_type === "sp") {
    imageUrl = "/img/twitter_space.png";
  } else if (source_type === "ap") {
    imageUrl = "/img/apple_podcast_banner.png";
  } else if (source_type === "tw") {
    imageUrl = "/img/twitchSource.png";
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  if (!initialData) {
    return <Loading />;
  }

  return (
    <div>
      <Head>
        <meta property="og:title" content={initialData.title || "Turn audio to text, summarize, and generate content with AI"} />
        <meta name="twitter:description" content={initialData.summaries?.[0]?.key_takeaways || 'Explore audiovisual content like never before with Alphy.'} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={`https://alphy.app/${source_type}/${source_id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={initialData.title ? `Alphy - ${initialData.title}` : "Turn audio to text, summarize, and generate content with AI"} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={initialData.title || "Alphy - Turn audio to text, summarize, and generate content with AI"} />
        <meta name="twitter:image" content={imageUrl} />
        <title>{initialData.title || "Alphy - Turn audio to text, summarize, and generate content with AI"}</title>
      </Head>

      {/* Client-side rendered Source component */}
      {/* <Source 
        source_type={source_type}
        source_id={source_id}
        data={initialData}
      /> */}
    </div>
  );
}