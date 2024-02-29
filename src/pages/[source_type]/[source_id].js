import Source from '../../components/Content/Source'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'


export default function SourceMaterial({
    collapsed,
    setCollapsed,
    tier,
    setContentName,
    userArchipelagos,
    currentUser,
    sandboxHistory,
    setSandboxHistory,
    getSandboxHistory,
    loggedIn,
    setLoggedIn
}){
    const router = useRouter()

  
    const {source_id,source_type} = router.query;
    

  

    /*  if (router.asPath.split('/')[2].split('&q=')[0] !== undefined) {
       {source_id} = router.asPath.split('/')[2].split('&q=')[0]
     } else {
       source_id = router.asPath.split('/')[2]
       
     } */
return(
    <div>
        
    {
        (source_id===undefined|| source_type===undefined) ?  <Loading /> : 
    <Source
    source_type={source_type}
    source_id={source_id}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    tier={tier}
    setContentName={setContentName}
    userArchipelagos={userArchipelagos}
    currentUser={currentUser}
    sandboxHistory={sandboxHistory}
    setSandboxHistory={setSandboxHistory}
    loggedIn={loggedIn}
    setLoggedIn={setLoggedIn}
    getSandboxHistory = {getSandboxHistory}
    />
}
</div>
)

}