
import HubSourceFeed from "./HubSourceFeed"
import HubCreationBlock from "./HubCreationBlock"
import HubArcFeed from "./HubArcFeed"

export default function HubContent({currentUser,hasActiveSub,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos, credit}){
    
    return(
        <div className="">
            {/* <HubCreationBlock currentUser={currentUser} hasActiveSub={hasActiveSub} credit={credit}/> */}
            <HubArcFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}/>
             <HubSourceFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}/>
        </div>
    )


}