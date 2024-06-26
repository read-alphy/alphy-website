import dynamic from 'next/dynamic'
import Head from 'next/head';

const Hub = dynamic(() => import('../components/Hub/Hub'), {
  ssr: false,
})




export default function Explore({arcs,
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
loggedIn,
setLoggedIn,
    setSubmitLayout,
  }) {


return (
  <div>
    <Head>
      <title>Alphy - Explore Our Database</title>
      <meta property="og:title" content={"Alphy - Explore Our Database"} />
  <meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />
  <meta property="og:image" content="/img/ALPHY_PREVIEW.png" /> 
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_larger_image" />  
  <meta name="twitter:title" content={"Alphy - Explore Our Database"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />

    </Head>
  
<Hub

  loggedIn = {loggedIn}
  setLoggedIn = {setLoggedIn}
  arcs={false}
  currentUser={currentUser}
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  tier={tier}
  contentName={contentName}
  credit={credit}
  userArcs={userArcs}
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
</div>
);
}