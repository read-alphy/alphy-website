


import Hub from '../components/Hub/Hub'
import Head from 'next/head';


export default function Arcs({
    credit,
    currentUser,
    collapsed,
    setCollapsed,
    dataGlobalArchipelagos,
    setDataGlobalArchipelagos,
    userArchipelagos,
    setUserArchipelagos,
    tier,
    contentName,
    setContentName,
    sandboxHistory,
    setSandboxHistory,
    loggedIn,
    setLoggedIn
}){


    return(
        <div>
            <Head >
                Alphy - Arcs
            </Head>
        
        <Hub
                    arcs={true}
                    credit={credit}
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    dataGlobalArchipelagos={dataGlobalArchipelagos}
                    setDataGlobalArchipelagos={setDataGlobalArchipelagos}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    globalLayout = {true}
                    
                  />
                  </div>
    )
}