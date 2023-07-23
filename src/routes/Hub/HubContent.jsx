
import HubFeed from "./HubFeed"
import HubCreationBlock from "./HubCreationBlock"

export default function HubContent({currentUser,hasActiveSub,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos}){

    return(
        <div className="md:pl-20">
            <HubCreationBlock/>
             <HubFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}/>
        </div>
    )


}