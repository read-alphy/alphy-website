  /* import Source from '../../components/Content/Source' */

import Loading from '../../components/Loading'
import { API_URL } from '../../constants'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import {useState} from 'react'
import {useRouter} from 'next/router'

const Source = dynamic(() => import('../../components/Content/Source'), {
  ssr: false,
})





  


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
    
  }){
   const [data,setData] = useState({})
   const [isLoading, setIsLoading] = useState(false)
   const source_type='up'
    
     // Step 3: Access source_id from the URL
    
     




  return(
      <div>
      <Head>
 <meta property="og:title" content={"Private Audio File - Requires permission to read and create content on top."} />
  <meta property="og:description" content="'Explore audiovisual content like never before with Alphy. Transcribe, summarize, and interact with audio files effortlessly." />
    {/* <meta property="og:image" content={imageUrl} /> */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Transcribe, summarize, generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary" />  
  <meta name="twitter:title" content={"Alphy - Private File"} />
  <meta name="twitter:description" content={`Explore audiovisual content like never before with Alphy. Transcribe, summarize, and interact with audio files effortlessly.`} />
  {/* <meta name="twitter:image" content={imageUrl} /> */}
  
  </Head>

      {
      <Source
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
      data = {data}
      setData = {setData}
      source_type={source_type}
      
      

      />
  }
  </div>
  )

  }