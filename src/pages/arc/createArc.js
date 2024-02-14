import ArcMain from '../../components/Arcs/ArcMain'


export default function CreateArc({
    currentUser,
  collapsed,
  setCollapsed,
  tier,
  idToken,
  userArchipelagos,
  setUserArchipelagos,
  credit,
  setCreditCalled,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
    setLoggedIn
})

{
    return(<ArcMain
    currentUser={currentUser}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    tier={tier}
    idToken={idToken}
    userArchipelagos={userArchipelagos}
    setUserArchipelagos={setUserArchipelagos}
    credit={credit}
    setCreditCalled={setCreditCalled}
    sandboxHistory={sandboxHistory}
    setSandboxHistory={setSandboxHistory}
    loggedIn={loggedIn}
    setLoggedIn={setLoggedIn}
     

    
    />)
}