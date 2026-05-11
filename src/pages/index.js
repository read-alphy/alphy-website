
import Hub from "../components/Hub/Hub";
import Head from 'next/head';
export default function Explore({
  arcs,
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  contentName,
  credit,
  userArcs,
  dataGlobalArcs,
  setDataGlobalArcs,
  totalMinutes,
  setTotalMinutes,
  sandboxHistory,
  setSandboxHistory,
  globalLayout,
  setGlobalLayout,

  setSubmitLayout,
  loggedIn,
  setLoggedIn
}) {

/* useEffect(() => {
  setGlobalLayout(true)
  setUserLayout(false)
  setSubmitLayout(false)
}
, [])
 */
  return (
    <>
    <Head>

<link rel="icon" href="/favicon.ico" />
<link rel="icon" href="/favicon.png" type= "image/png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
  <meta property="og:image" content="/img/ALPHY_PREVIEW.png" /> 

<meta property="og:title" content={"Alphy - Read-only audio archive"} />
<meta property="og:description" content="Alphy is no longer accepting new subscriptions or processing new content. Existing materials remain online for existing users." />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Read-only audio archive" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />  
  <meta name="twitter:title" content={"Alphy - Read-only audio archive"} />
  <meta name="twitter:description" content="Alphy is being kept online for existing users. New subscriptions, uploads, and AI interactions are closed." />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap')
  </style>   
   <title>Alphy - Read-only Audio Archive</title>
    
</Head>
  <Hub
  loggedIn={loggedIn}
  setLoggedIn={setLoggedIn}
    arcs={false}
    currentUser={currentUser}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    tier={tier}
    contentName={contentName}
    credit={credit}
    userArc={userArcs}
    dataGlobalArcs={dataGlobalArcs}
    setDataGlobalArcs={setDataGlobalArcs}
    totalMinutes={totalMinutes}
    setTotalMinutes={setTotalMinutes}
    sandboxHistory={sandboxHistory}
    setSandboxHistory={setSandboxHistory}
    globalLayout={true}
    setGlobalLayout={setGlobalLayout}
    userLayout={false}
    submitLayout={false}
    setSubmitLayout={setSubmitLayout}
  />
  </>
  );
}
