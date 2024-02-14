import dynamic from 'next/dynamic'

const Account = dynamic(() => import('../components/Profile/Account'), {
  ssr: false,
})



export default function AccountPage({
    currentUser,
    collapsed,
    setCollapsed,
    tier,
    customerID,
    credit,
    sandboxHistory,
    setSandboxHistory,
    loggedIn,
    setLoggedIn
}) {
    return (
     <Account
     currentUser={currentUser}
      
     credit={credit}
     tier={tier}
     
     collapsed={collapsed}
     setCollapsed={setCollapsed}
     customerID={customerID}
     sandboxHistory={sandboxHistory}
     setSandboxHistory={setSandboxHistory}
     
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
     />
    );
    }