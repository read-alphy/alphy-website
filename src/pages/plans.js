

import dynamic from 'next/dynamic'
import Head from 'next/head';

const Profile = dynamic(() => import('../components/Profile/Profile'), {
  ssr: false,
})



export default function Plans({ currentUser, collapsed, setCollapsed, tier, sandboxHistory, setSandboxHistory, loggedIn, setLoggedIn}){

    return (
      <div>
        <Head>
          <title>Alphy - Pricing Plans</title>
          <meta property="og:image" content="/img/ALPHY_PREVIEW.png" /> 
      <meta property="og:title" content={"Alphy - Pricing Plans"} />
      <meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />
  

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_larger_image" />  
  <meta name="twitter:title" content={"Alphy - Pricing Plans"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
  
        </Head>
      
      <Profile
      
      loggedIn = {loggedIn}
      setLoggedIn={setLoggedIn}
      tier={tier}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      currentUser={currentUser}
      sandboxHistory={sandboxHistory}
      setSandboxHistory={setSandboxHistory}
      
      />
      </div>
    );
}