import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";



export default function PrivacyPolicyPage({
    
    loggedIn, 
    setLoggedIn,
    currentUser,
    collapsed,
    setCollapsed,
    tier,
    
    sandboxHistory,
    setSandboxHistory,
    }) {

    return (
        <PrivacyPolicy
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        currentUser={currentUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        tier={tier}
        sandboxHistory={sandboxHistory}
        setSandboxHistory={setSandboxHistory}




        />
    );
    }
