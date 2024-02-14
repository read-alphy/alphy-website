import dynamic from 'next/dynamic'

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
    userArchipelagos,
    dataGlobalArchipelagos,
    setDataGlobalArchipelagos,
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
);
}