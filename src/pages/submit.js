
import dynamic from 'next/dynamic'

const SubmitPage = dynamic(() => import('../components/Hub/SubmitPage'), {
  ssr: false,
})



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
    setCreditcalled,
    loggedIn,
    setLoggedIn

}) {
    return (
      <SubmitPage
      loggedIn ={loggedIn}
      setLoggedIn={setLoggedIn}
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