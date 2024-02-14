import Hub from "../components/Hub/Hub";
import { useEffect } from "react";


export default function Myhub({arcs,
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
    userLayout,
    setUserLayout,
    submitLayout,
    setSubmitLayout,
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