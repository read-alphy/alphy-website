import dynamic from 'next/dynamic'
import Head from 'next/head';

const Account = dynamic(() => import('../components/Profile/Account'), {
  ssr: false,
})



export default function AccountPage({
    currentUser,
    collapsed,
    setCollapsed,
    tier,
    customerID,
    credit,
    sandboxHistory,
    setSandboxHistory,
    loggedIn,
    setLoggedIn
}) {
    return (
      <div>
      <Head>
      <title>Alphy - Account</title>
      <meta property="og:title" content={"Access account information, see your plan, and configure billing."} />
  <meta property="og:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
  <meta property="og:image" content="https://i.ibb.co/Xt9WRkC/ALPHY-PREVIEW.png" /> 
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary" />  
  <meta name="twitter:title" content={"Access account information, see your plan, and configure billing.yy"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />

      </Head>
     <Account
     currentUser={currentUser}
      
     credit={credit}
     tier={tier}
     
     collapsed={collapsed}
     setCollapsed={setCollapsed}
     customerID={customerID}
     sandboxHistory={sandboxHistory}
     setSandboxHistory={setSandboxHistory}
     
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
     />
     </div>
    );
    }