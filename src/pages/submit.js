import SubmitPage from '../components/Hub/SubmitPage'
import Head from 'next/head';




export default function Submit({

    currentUser,
    collapsed,
    setCollapsed,
    tier,
  
    credit,
    userArchipelagos,
    setUserArchipelagos,
    dataGlobalArchipelagos,
    setDataGlobalArchipelagos,
    sandboxHistory,
    setSandboxHistory,
    setCreditcalled,
    loggedIn,
    setLoggedIn

}) {
    return (
      <div>
        <Head >
          <title>Alphy - Submit</title>
          <meta property="og:image" content="/img/ALPHY_PREVIEW.png" /> 
      <meta property="og:title" content={"Alphy - Submit a link or upload a file"} />
      <meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />
  

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_larger_image" />  
  <meta name="twitter:title" content={"Alphy - Submit a link or upload a file"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
  
          </Head>
      <SubmitPage
      loggedIn ={loggedIn}
      setLoggedIn={setLoggedIn}
      credit={credit}
      setCreditcalled={setCreditcalled}
    currentUser={currentUser}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    dataGlobalArchipelagos={dataGlobalArchipelagos}
    userArchipelagos={userArchipelagos}
    setUserArchipelagos={setUserArchipelagos}
    tier={tier}
    
    sandboxHistory={sandboxHistory}
    setSandboxHistory={setSandboxHistory}
                    />
                    </div>
    );
    }