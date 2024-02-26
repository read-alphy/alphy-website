import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
import Head from 'next/head';



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
        <div>
            <Head>
                <title>Alphy - Privacy Policy</title>
            </Head>
        
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
        </div>
    );
    }
