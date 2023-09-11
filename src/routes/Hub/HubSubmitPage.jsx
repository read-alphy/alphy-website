import HubCreationBlockReworked from "./HubCreationBlockReworked";









export default function HubSubmitPage({currentUser,tier,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos, mainShow, setMainShow,credit }){
    
	
	

    return(
        <div className="">


            <div className="">
            
            
            <HubCreationBlockReworked
            currentUser={currentUser} tier={tier} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
            mainShow={mainShow} setMainShow={setMainShow} credit={credit}
            />
            </div>
                
        </div>
    )
}