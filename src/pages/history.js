import dynamic from 'next/dynamic'
import Head from 'next/head';

const History = dynamic(() => import('../components/History/History'), {
    ssr: false,
    })

export default function HistoryPage({
    loggedIn,
    setLoggedIn,
    collapsed,
    setCollapsed,
    tier,
    
    userArchipelagos,
    currentUser,
    sandboxHistory,
    setSandboxHistory,    
}
    )
    
    {
        return(
        <div>
            <Head>
                <title>Alphy - Creation History</title>
            </Head>
       
            <History
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            currentUser={currentUser}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            tier={tier}
            
            userArchipelagos={userArchipelagos}
            sandboxHistory={sandboxHistory}
            setSandboxHistory={setSandboxHistory}

            />
             </div>
            )
        
    }