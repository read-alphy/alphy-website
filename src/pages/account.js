import dynamic from 'next/dynamic'
import Head from 'next/head';

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
      <div>
      <Head>
      <title>Alphy - Account</title>
      </Head>
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
     </div>
    );
    }