import Success from '../../../components/Payment/Success'


export default function SuccessPage({
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
        <Success 
        
        currentUser={currentUser}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        credit={credit}
        tier={tier}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        customerID={customerID}
        sandboxHistory={sandboxHistory}
        setSandboxHistory={setSandboxHistory}
        
            />
    );
    }
