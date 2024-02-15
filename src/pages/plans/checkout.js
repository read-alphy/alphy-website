import CheckoutPage from '../../components/Payment/CheckoutPage';


export default function Checkout( {collapsed, setCollapsed, tier, currentUser, sandboxHistory, setSandboxHistory, loggedIn, setLoggedIn}) {
    return (
        <CheckoutPage
        collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn ={loggedIn}
                    setLoggedIn={setLoggedIn}
                     />
    );
    }