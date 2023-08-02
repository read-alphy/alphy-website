
import HubSourceFeed from "./HubSourceFeed"
import HubCreationBlock from "./HubCreationBlock"
import HubArcFeed from "./HubArcFeed"
import HubSubmitPage from "./HubSubmitPage"
import HubUserPage from "./HubUserPage.jsx"



export default function HubContent({currentUser,hasActiveSub,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos,
         getDataGlobalArchipelagos, credit, globalLayout, submitLayout,
          userLayout, setMainShow, mainShow}){
    
    return(
        <div className="">
            {/* <HubCreationBlock currentUser={currentUser} hasActiveSub={hasActiveSub} credit={credit}/> */}
            {globalLayout &&
                mainShow=="default" ?
                    <div>
                        <HubArcFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow}  />
                        <HubSourceFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow} />
                    </div>
                    :
                (mainShow =="arcs" &&
                <div className="min-h-[90vh]">
                    <HubArcFeed 
                    currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                    mainShow={mainShow} setMainShow={setMainShow} />
                </div>
                )
            
            }
            

            {submitLayout &&
                <HubSubmitPage
                currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow} credit={credit}
                />
            }

            {userLayout &&
                <HubUserPage
                currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                mainShow={mainShow} setMainShow={setMainShow} credit={credit}
                />
            }
        </div>
    )


}