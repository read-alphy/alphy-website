
import NotFound from '../components/404/NotFound'
import Head from 'next/head';

export default function Custom404({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  setShowWelcomeForm,
  showWelcomeForm,
  userArchipelagos,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn,
}) {
  return(
    <div>
      <Head>
        <title>Alphy - Not Found :(</title>
      </Head>
    
    <NotFound 
      currentUser={currentUser}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      tier={tier}
      setShowWelcomeForm={setShowWelcomeForm}
      showWelcomeForm={showWelcomeForm}
      userArchipelagos={userArchipelagos}
      sandboxHistory={sandboxHistory}
      setSandboxHistory={setSandboxHistory}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
    />
    </div>
  )
}
