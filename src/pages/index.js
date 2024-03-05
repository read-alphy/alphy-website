
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
  userArchipelagos,
  dataGlobalArchipelagos,
  setDataGlobalArchipelagos,
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
<meta property="og:image" content="https://i.ibb.co/Xt9WRkC/ALPHY-PREVIEW.png" /> 


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
    userArchipelagos={userArchipelagos}
    dataGlobalArchipelagos={dataGlobalArchipelagos}
    setDataGlobalArchipelagos={setDataGlobalArchipelagos}
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