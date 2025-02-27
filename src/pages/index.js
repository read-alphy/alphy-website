
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

<meta property="og:title" content={"Alphy - Transcribe, summarize, and generate content with AI"} />
<meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />  
  <meta name="twitter:title" content={"Alphy - Transcribe, summarize, and generate content with AI"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap')
  </style>   
   <title>Alphy - AI Transcriber, Summarizer, Assistant</title>
    
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