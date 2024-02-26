import SubmitPage from '../components/Hub/SubmitPage'
import Head from 'next/head';




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
      <div>
        <Head >
          Alphy - Submit a Link!
          </Head>
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
                    </div>
    );
    }