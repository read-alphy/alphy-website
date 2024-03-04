  /* import Source from '../../components/Content/Source' */

  import Loading from '../../components/Loading'
  import { API_URL } from '../../constants'
  import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'

export const runtime = 'experimental-edge'

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
    
          const fetchDataUpload = async (url, constantFetch) => {
            setAuthorizationError(false)
            let idToken = "123"
        
            try {
              if (constantFetch === false) {
                /* setIsLoading(true) */
              }
        
              const response = await axios
                .get(url, {
                  headers: {
                    'id-token': idToken,
                  },
                })
                .then(response => {
                  /* if (response.data !== null && response.data !== undefined) {
                    if (
                      response.data.lang !== undefined &&
                      response.data.lang !== null
                    ) {
                      setLanguage(response.data.lang)
                    }
                    setData(response.data)
                    setIsVisible(response.data.is_visible)
                    setIsPublic(response.data.is_visible)
                    localStorage.setItem('isVisibleUpload', response.data.is_visible)
                    setContentName(response.data.title)
                  } */
                  return response
                })
                .catch(error => {
                  console.error('Error getting upload data', error)
                  if (error.response.data.detail === 'Source is inaccessible') {
                    setAuthorizationError(true)
                  }
                })
            } catch (error) {
              if (error.response?.status === 404) {
                /* setIsLoading(false) */
                console.log('error3', error)
                /* navigate('/404'); */
              } else {
                return error
              }
            } finally {
              /* setIsLoading(false) */
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
      userArchipelagos,
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

console.log('source_id', source_id)
console.log('source_type', source_type)

  
if (error) {
  
  return <div>Error loading data: {error}</div>;
}

if (!data || source_id === undefined || source_type === undefined) {
  return <Loading />;
}


  return(
      <div>
          <Head>
 <meta property="og:title" content={data.title!==undefined ? data.title: "Alphy - Turn audio to text, summarize, and generate content with AI"} />
  <meta property="og:description" content="Description of your content" />
  <meta property="og:image" content="URL to your image" />
  <meta property="og:url" content="URL of the page" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Your Site Name" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  
  <meta name="twitter:title" content={data.title!==undefined ? data.title: "Alphy - Turn audio to text, summarize, and generate content with AI"} />
  <meta name="twitter:description" content="Description of your content" />
  <meta name="twitter:image" content="URL to your image" />
  <meta name="twitter:creator" content="@authorhandle" />
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
      userArchipelagos={userArchipelagos}
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