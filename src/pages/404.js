
import NotFound from '../components/404/NotFound'
import Head from 'next/head';

export default function Custom404({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  setShowWelcomeForm,
  showWelcomeForm,
  userArchipelagos,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn,
}) {
  return(
    <div>
      <Head>
        <title>Alphy - Not Found :(</title>
        
 <meta property="og:title" content={"Alphy - Not found :/ "} />
  <meta property="og:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
    {/* <meta property="og:image" content={imageUrl} /> */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary" />  
  <meta name="twitter:title" content={"Alphy - Not found :/"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
  {/* <meta name="twitter:image" content={imageUrl} /> */}



      </Head>
    
    <NotFound 
      currentUser={currentUser}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      tier={tier}
      setShowWelcomeForm={setShowWelcomeForm}
      showWelcomeForm={showWelcomeForm}
      userArchipelagos={userArchipelagos}
      sandboxHistory={sandboxHistory}
      setSandboxHistory={setSandboxHistory}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
    />
    </div>
  )
}
