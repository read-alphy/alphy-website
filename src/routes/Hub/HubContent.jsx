
import HubSourceFeed from "./HubSourceFeed"
import HubCreationBlock from "./HubCreationBlock"
import HubArcFeed from "./HubArcFeed"
import HubSubmitPage from "./HubSubmitPage"
import HubUserPage from "./HubUserPage.jsx"
import { Link } from "react-router-dom"
import WelcomeExplainer from "./WelcomeExplainer"


export default function HubContent({ arcs, currentUser, tier, userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos,
    getDataGlobalArchipelagos, credit, globalLayout, setGlobalLayout, submitLayout, setSubmitLayout,
    userLayout, setUserLayout, setMainShow, mainShow, collapsed, setCollapsed }) {

    return (
        <div className="pb-20">
            {globalLayout &&
                (mainShow == "default" ?
                    <div className="pt-10 md:pt-20 pb-10 overflow-x-hidden ">
                        <WelcomeExplainer />


                        <HubSourceFeed currentUser={currentUser} tier={tier} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                            mainShow={mainShow} setMainShow={setMainShow} credit={credit} />
                        <HubArcFeed currentUser={currentUser} tier={tier} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                            mainShow={mainShow} setMainShow={setMainShow} collapsed={collapsed} />
                    </div>
                    :
                    (
                        <div>

                            {mainShow === "sources" &&
                                <div className="min-h-[90vh]">
                                    <HubSourceFeed currentUser={currentUser} tier={tier} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                                        mainShow={mainShow} setMainShow={setMainShow} />
                                </div>
                            }

                            {mainShow == "arcs" &&
                                <div className="min-h-[90vh]">
                                    <HubArcFeed
                                        arcs={arcs} currentUser={currentUser} tier={tier} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                                        mainShow={mainShow} setMainShow={setMainShow} collapsed={collapsed} />
                                </div>
                            }
                        </div>

                    ))

            }


            {submitLayout &&
                <HubSubmitPage
                    currentUser={currentUser} tier={tier} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                    mainShow={mainShow} setMainShow={setMainShow} credit={credit}
                />
            }

            {userLayout &&
                <HubUserPage
                    currentUser={currentUser} tier={tier} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                    mainShow={mainShow} setMainShow={setMainShow} credit={credit} setGlobalLayout={setGlobalLayout} setUserLayout={setUserLayout} setSubmitLayout={setSubmitLayout} collapsed={collapsed} setCollapsed={setCollapsed}
                />
            }
        </div>
    )


}