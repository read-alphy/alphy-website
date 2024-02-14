import dynamic from 'next/dynamic'

const Auth = dynamic(() => import('../../components/Auth/Auth'), {
  ssr: false,
})

export default function RegisterPage({
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
    setLoggedIn}) {

    return (
        <Auth
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        currentUser={currentUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        tier={tier}
        setShowWelcomeForm={setShowWelcomeForm}
        showWelcomeForm={showWelcomeForm}
        userArchipelagos={userArchipelagos}
        sandboxHistory={sandboxHistory}
        setSandboxHistory={setSandboxHistory}

        />
    );
    }