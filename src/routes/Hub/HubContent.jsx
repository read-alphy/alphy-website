
import HubFeed from "./HubFeed"
import HubCreationBlock from "./HubCreationBlock"

export default function HubContent({currentUser,hasActiveSub,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos, credit}){

    return(
        <div className="">
            <HubCreationBlock currentUser={currentUser} hasActiveSub={hasActiveSub} credit={credit}/>
             <HubFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}/>
        </div>
    )


}