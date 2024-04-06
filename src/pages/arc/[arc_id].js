import dynamic from 'next/dynamic'
import Head from 'next/head';

const ArcMain = dynamic(() => import('../../components/Arcs/ArcMain'), {
  ssr: false,
})

export default function Arc({
    currentUser,
  collapsed,
  setCollapsed,
  tier,
  idToken,
  userArcs,
  setUserArcs,
  credit,
  setCreditCalled,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
    setLoggedIn
})

{
    return(
    
      <>

    <Head>
    <meta property="og:title" content={"Alphy - Talk with an AI assistant!"} />
                <meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />
  <meta property="og:image" content="/img/ALPHY_PREVIEW.png" />  
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_larger_image" />  
  <meta name="twitter:title" content={"Alphy - Talk with an AI assistant"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />

  </Head>
    
    <ArcMain
    currentUser={currentUser}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    tier={tier}
    idToken={idToken}
    userArcs={userArcs}
    setUserArcs={setUserArcs}
    credit={credit}
    setCreditCalled={setCreditCalled}
    sandboxHistory={sandboxHistory}
    setSandboxHistory={setSandboxHistory}
    loggedIn={loggedIn}
    setLoggedIn={setLoggedIn}
     

    
    />
    </>
    )
}