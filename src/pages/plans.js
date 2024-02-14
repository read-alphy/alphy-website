

import dynamic from 'next/dynamic'

const Pricing = dynamic(() => import('../components/Profile/Pricing'), {
  ssr: false,
})



export default function Plans({ currentUser, collapsed, setCollapsed, tier, sandboxHistory, setSandboxHistory, loggedIn, setLoggedIn}){

    return (
      <Pricing
      
      loggedIn = {loggedIn}
      setLoggedIn={setLoggedIn}
      tier={tier}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      currentUser={currentUser}
      sandboxHistory={sandboxHistory}
      setSandboxHistory={setSandboxHistory}
      
      />
    );
}