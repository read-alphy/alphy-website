
import HubSourceFeed from "./HubSourceFeed"
import HubCreationBlock from "./HubCreationBlock"
import HubArcFeed from "./HubArcFeed"
import HubSubmitPage from "./HubSubmitPage"
import HubUserPage from "./HubUserPage.jsx"



export default function HubContent({currentUser,hasActiveSub,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos,
         getDataGlobalArchipelagos, credit, globalLayout,setGlobalLayout, submitLayout, setSubmitLayout,
          userLayout, setUserLayout, setMainShow, mainShow}){
    
    return(
        <div className="pt-20">
            {/* <HubCreationBlock currentUser={currentUser} hasActiveSub={hasActiveSub} credit={credit}/> */}
            {globalLayout &&
                (mainShow=="default" ?
                    <div>
                        <HubArcFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow}  />
                        <HubSourceFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow} />
                    </div>
                    :
                (
                    <div>
                    {mainShow =="arcs" &&
                    <div className="min-h-[90vh]">
                        <HubArcFeed 
                        currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow} />
                    </div>
                    }
                        {mainShow==="sources" &&
                            <div className="min-h-[90vh]">
                                <HubSourceFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                                    mainShow={mainShow} setMainShow={setMainShow} />
                            </div>
                        }
                </div>

                ))
            
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
                mainShow={mainShow} setMainShow={setMainShow} credit={credit} setGlobalLayout={setGlobalLayout} setUserLayout={setUserLayout} setSubmitLayout={setSubmitLayout}
                />
            }
        </div>
    )


}