import dynamic from 'next/dynamic'
import Head from 'next/head';

const Hub = dynamic(() => import('../components/Hub/Hub'), {
  ssr: false,
})



export default function Myhub({
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
/*   
  useEffect(() => {
    setGlobalLayout(true)
    setUserLayout(false)
    setSubmitLayout(false)
  }
  , []) */

return (
  <div>
    <Head>
      <title>Alphy - My Hub</title>
      <meta property="og:image" content="/img/ALPHY_PREVIEW.png" /> 
      <meta property="og:title" content={"Alphy - Welcome to Your Hub!"} />
      <meta property="og:description" content="Upload a file or submit a link to transcribe, summarize, and generate new content from audiovisual with ease!" />
  

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alphy - Turn audio to text, summarize, and generate content with AI" />
  <meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_larger_image" />  
  <meta name="twitter:title" content={"Alphy - Welcome to Your Hub!"} />
  <meta name="twitter:description" content="Explore audiovisual content like never before with Alphy. Transcribe, summarize, and generate new content from audiovisual with ease." />
  
    </Head>
  
<Hub
loggedIn= {loggedIn}
setLoggedIn= {setLoggedIn}
  arcs={arcs}
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
    globalLayout={false}
    setGlobalLayout={setGlobalLayout}
    userLayout={true}
    submitLayout={false}
    setSubmitLayout={setSubmitLayout}
/>
</div>
);
}