import dynamic from 'next/dynamic'

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
/*   
  useEffect(() => {
    setGlobalLayout(true)
    setUserLayout(false)
    setSubmitLayout(false)
  }
  , []) */

return (
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
  userArchipelagos={userArchipelagos}
  dataGlobalArchipelagos={dataGlobalArchipelagos}
  setDataGlobalArchipelagos={setDataGlobalArchipelagos}
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
);
}