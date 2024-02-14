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
}) {
    return (
     <Account
     currentUser={currentUser}
     stripe={stripePromise}
     credit={credit}
     tier={tier}
     idToken={idToken}
     collapsed={collapsed}
     setCollapsed={setCollapsed}
     customerID={customerID}
     sandboxHistory={sandboxHistory}
     setSandboxHistory={setSandboxHistory}
     
     />
    );
    }