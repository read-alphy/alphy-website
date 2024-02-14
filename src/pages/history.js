import dynamic from 'next/dynamic'

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
            )
        
    }