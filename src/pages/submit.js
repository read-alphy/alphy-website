
import SubmitPage from "../components/Hub/SubmitPage"


export default function Submit({

    currentUser,
    collapsed,
    setCollapsed,
    tier,
  
    credit,
    userArchipelagos,
    setUserArchipelagos,
    dataGlobalArchipelagos,
    setDataGlobalArchipelagos,
    sandboxHistory,
    setSandboxHistory,
    setCreditcalled

}) {
    return (
      <SubmitPage
      credit={credit}
      setCreditcalled={setCreditcalled}
    currentUser={currentUser}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    dataGlobalArchipelagos={dataGlobalArchipelagos}
    userArchipelagos={userArchipelagos}
    setUserArchipelagos={setUserArchipelagos}
    tier={tier}
    
    sandboxHistory={sandboxHistory}
    setSandboxHistory={setSandboxHistory}
                    />
    );
    }