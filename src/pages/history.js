import dynamic from 'next/dynamic'
import Head from 'next/head';

const History = dynamic(() => import('../components/History/History'), {
    ssr: false,
    })

export default function HistoryPage({
    loggedIn,
    setLoggedIn,
    collapsed,
    setCollapsed,
    tier,
    
    userArchipelagos,
    currentUser,
    sandboxHistory,
    setSandboxHistory,    
}
    )
    
    {
        return(
        <div>
            <Head>
                <title>Alphy - Creation History</title>
                <meta property="og:title" content={"See your creation history."} />
  <meta property="og:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
     <meta property="og:image" content="https://i.ibb.co/XCdF4tv/ALPHY.jpg" /> 
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary" />  
  <meta name="twitter:title" content={"See your creation history.   "} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />

    
                
            </Head>
       
            <History
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            currentUser={currentUser}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            tier={tier}
            
            userArchipelagos={userArchipelagos}
            sandboxHistory={sandboxHistory}
            setSandboxHistory={setSandboxHistory}

            />
             </div>
            )
        
    }