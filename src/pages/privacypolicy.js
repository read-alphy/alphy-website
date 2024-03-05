import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
import Head from 'next/head';



export default function PrivacyPolicyPage({
    
    loggedIn, 
    setLoggedIn,
    currentUser,
    collapsed,
    setCollapsed,
    tier,
    
    sandboxHistory,
    setSandboxHistory,
    }) {

    return (
        <div>
            <Head>
                <title>Alphy - Privacy Policy</title>
                <meta property="og:image" content="/img/ALPHY_PREVIEW.png" /> 
      <meta property="og:title" content={"Alphy - Privacy Policy"} />
      <meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />
  

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_larger_image" />  
  <meta name="twitter:title" content={"Alphy - Privacy Policy"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
  
            </Head>
        
        <PrivacyPolicy
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        currentUser={currentUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        tier={tier}
        sandboxHistory={sandboxHistory}
        setSandboxHistory={setSandboxHistory}




        />
        </div>
    );
    }
