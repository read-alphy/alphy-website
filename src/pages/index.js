
import Hub from "../components/Hub/Hub";
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
  );
}