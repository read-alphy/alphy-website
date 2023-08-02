import HubCreationBlockReworked from "./HubCreationBlockReworked";









export default function HubSubmitPage({currentUser,hasActiveSub,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos, mainShow, setMainShow,credit }){
    
	
	

    return(
        <div className="min-h-[90vh]">


            <div className="mt-40">
            
            
            <HubCreationBlockReworked
            currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
            mainShow={mainShow} setMainShow={setMainShow} credit={credit}
            />
            </div>
                
        </div>
    )
}