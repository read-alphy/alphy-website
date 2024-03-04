  import Source from '../../components/Content/Source'

  import Loading from '../../components/Loading'
  import { API_URL } from '../../constants'
  import axios from 'axios'

// Define the fetchData function
async function fetchData(sourceType, sourceId) {
  const url = `${API_URL}/sources/${sourceType}/${sourceId}`;
  try {
    const response = await axios.get(url);
    return { data: response.data, error: null };
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
    const { source_id, source_type } = context.params;
    const { data, error } = await fetchData(source_type, source_id);
  
    if (error || !data) {
      // Handle the case where there is an error or no data
      console.error(`Fetch error: ${error}`);
      return {
        props: {
          error: error || 'An unknown error occurred',
        },
      };
    }
  
    // If data is valid, return it as props
    return {
      props: {
        sourceData: data,
        source_id,
        source_type,
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
      redirect,
      data,
      source_id,
      source_type
  }){

console.log(source_id, source_type, sourceData)
if (error) {
  
  return <div>Error loading data: {error}</div>;
}

if (!sourceData || source_id === undefined || source_type === undefined) {
  return <Loading />;
}


  return(
      <div>
      {
          (source_id===undefined|| source_type===undefined || sourceData=== null) ?  <Loading /> : 
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