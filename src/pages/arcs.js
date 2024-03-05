


import Hub from '../components/Hub/Hub'
import Head from 'next/head';


export default function Arcs({
    credit,
    currentUser,
    collapsed,
    setCollapsed,
    dataGlobalArchipelagos,
    setDataGlobalArchipelagos,
    userArchipelagos,
    setUserArchipelagos,
    tier,
    contentName,
    setContentName,
    sandboxHistory,
    setSandboxHistory,
    loggedIn,
    setLoggedIn
}){


    return(
        <div>
            <Head >
                <title>Alphy - Arcs</title>
                <meta property="og:title" content={"Alphy - Free-to-use AI Assistants"} />
                <meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />
  <meta property="og:image" content="/img/ALPHY_PREVIEW.png" /> 
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_larger_image" />  
  <meta name="twitter:title" content={"Alphy - Free-to-use AI Assistants"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />

            </Head>
        
        <Hub
                    arcs={true}
                    credit={credit}
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    dataGlobalArchipelagos={dataGlobalArchipelagos}
                    setDataGlobalArchipelagos={setDataGlobalArchipelagos}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    globalLayout = {true}
                    
                  />
                  </div>
    )
}