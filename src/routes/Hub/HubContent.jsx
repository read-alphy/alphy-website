
import HubSourceFeed from "./HubSourceFeed"
import HubCreationBlock from "./HubCreationBlock"
import HubArcFeed from "./HubArcFeed"
import HubSubmitPage from "./HubSubmitPage"
import HubUserPage from "./HubUserPage.jsx"
import {Link} from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChatIcon from '@mui/icons-material/Chat';
import LinkIcon from '@mui/icons-material/Link';


export default function HubContent({arcs, currentUser,hasActiveSub,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos,
         getDataGlobalArchipelagos, credit, globalLayout,setGlobalLayout, submitLayout, setSubmitLayout,
          userLayout, setUserLayout, setMainShow, mainShow, collapsed, setCollapsed}){
    
    return(
        <div>
            {/* <HubCreationBlock currentUser={currentUser} hasActiveSub={hasActiveSub} credit={credit}/> */}
            {globalLayout &&
                (mainShow=="default" ?
                    <div className="pt-10 md:pt-20 pb-10 overflow-x-hidden ">
                      <div className="pl-4 sm:hidden mb-20 ">

                           <p className="text-zinc-700 dark:text-zinc-300 mb-5 mx-auto mt-4 text-xl font-semibold">Unlock audio with Alphy now.</p>
                           <p className="text-zinc-700 dark:text-zinc-300 mb-5 mx-auto mt-4 text-md">Submit a link to a conversation, upload an audio file, or create a chatbot on Alphy's database.</p>
                           
                           <div className="container flex flex-row text-center mt-10 gap-3 xs:gap-6">
                            
                          {/*  <Link to="/submit" className={`text-zinc-700  transition duration-300 ease-in-out ${submitLayout ? " drop-shadow-sm ":"drop-shadow-lg  scale-105 transform"}   bg-green-200 text-zinc-600 dark:text-zinc-700 rounded-lg px-2 text-md max-w-[120px] flex flex-row py-2`} >
                            
									
										<p>Start Creating</p>
                                       
									</Link>
                                    {currentUser ? null : <Link to="/u/register" className="text-green-300 dark:text-green-200 font-semibold underline ml-10 pt-2">Sign in</Link>} */}
                                <Link to="/submit" onClick={() => {localStorage.setItem("newItem", "link")}} className="rounded-lg text-zinc-700  text-sm xs:text-md bg-green-200 px-2 py-2">Submit a Link
                                </Link>
                            <Link to="/submit" onClick={() => {localStorage.setItem("newItem", "upload")}} className="rounded-lg text-zinc-700 text-sm xs:text-md bg-indigo-300 px-2 py-2">Upload A File</Link>
                           <Link to="/arc/createArc" className="rounded-lg text-zinc-700 text-sm xs:text-md bg-red-200 px-2 py-2">Create an Arc</Link> 
                           
                                    
                        </div>
                                    
                            </div>
                            
                        <HubArcFeed  currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow}  collapsed={collapsed}/>
                        <HubSourceFeed currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow} />
                    </div>
                    :
                (
                    <div>
                    {mainShow =="arcs" &&
                    <div className="min-h-[90vh]">
                        <HubArcFeed 
                         arcs={arcs} currentUser={currentUser} hasActiveSub={hasActiveSub} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                        mainShow={mainShow} setMainShow={setMainShow}  collapsed={collapsed}/>
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
                mainShow={mainShow} setMainShow={setMainShow} credit={credit} setGlobalLayout={setGlobalLayout} setUserLayout={setUserLayout} setSubmitLayout={setSubmitLayout} collapsed={collapsed} setCollapsed={setCollapsed}
                />
            }
        </div>
    )


}