  import Source from '../../components/Content/Source'

  import Loading from '../../components/Loading'
  import { API_URL } from '../../constants'
  import axios from 'axios'


  const fetchData = async (url) => {
      
    let data = {}
            try {
        
              await axios
                .get(url)
                .then(response => {
                  data = response.data
                  
                  return response.data
                })
                // Example error handling response
                .catch(error => {
                  return { error: true, statusCode: error.response?.status, message: error.message };
                });
    
            } catch (error) {
              if (error.response?.status === 404) {
                /* setIsLoading(false) */
                
                
              }
              console.error(`Error fetching data: ${error}`)
            } finally {
              /* setIsLoading(false) */
            }
            
    
            return data
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
      
      
    
      const {source_id,source_type} = context.params 




      
      const url = `${API_URL}/sources/${source_type}/${source_id}`
      
    
      // Fetch data using source_id or any other relevant data
      let data = {}
      let error = null
      
      try {
          let response
          if(source_type =='up'){
              response = await fetchDataUpload(url, false)
          }
        else{
          response = await fetchData(url, false)
          if (response.error) {
            console.error(`Fetch error: ${response.message}`);
            // Redirect to a custom error page or handle the error appropriately
            return {
              redirect: {
                destination: '/404', // Ensure the path is correct
                permanent: false,
              },
            };
          }
        
          
        }

        data = response
        

      } catch (err) {
        
        return {
          redirect: {
            destination: '/404', // Assuming you have a custom error page
            permanent: false,
          },
        };


      
      }
    
      // Pass the fetched data as props to the page component
      return {
        props: {
          sourceData: data, // Rename 'sourceData' as needed
          source_id: source_id,
          source_type: source_type,
          error
        },
      }
    



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
      sourceData,
      source_id,
      source_type
  }){

console.log(source_id, source_type, sourceData)
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
      data={sourceData}

      />
  }
  </div>
  )

  }