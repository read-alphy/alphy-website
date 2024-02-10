import HubSourceFeed from './HubSourceFeed'

import HubArcFeed from './HubArcFeed'
import HubSubmitPage from './HubSubmitPage'
import HubUserPage from './HubUserPage.jsx'
import { Link } from 'react-router-dom'
import WelcomeExplainer from './WelcomeExplainer'

import AISearchEngine from './AISearchEngine.jsx'

export default function HubContent({
  arcs,
  currentUser,
  tier,
  userArchipelagos,
  dataGlobalArchipelagos,
  setDataGlobalArchipelagos,
  getDataGlobalArchipelagos,
  credit,
  globalLayout,
  setGlobalLayout,
  submitLayout,
  setSubmitLayout,
  userLayout,
  setUserLayout,
  setMainShow,
  mainShow,
  collapsed,
  setCollapsed,
  totalMinutes,
  setTotalMinutes,
}) {
  return (
    <div className="">
      {globalLayout &&
        (mainShow == 'default' ? (
          <div className="pt-10 md:pt-16 3xl:pt-20 overflow-x-hidden ">
            <WelcomeExplainer
              currentUser={currentUser}
              totalMinutes={totalMinutes}
              setTotalMinutes={setTotalMinutes}
            />
          </div>
        ) : (
          <div>
            {mainShow === 'sources' && (
              <div className="min-h-[90vh]">
                {/*   <AISearchEngine collapsed={collapsed} currentUser={currentUser} /> */}
                <HubSourceFeed
                  credit={credit}
                  currentUser={currentUser}
                  tier={tier}
                  userArchipelagos={userArchipelagos}
                  dataGlobalArchipelagos={dataGlobalArchipelagos}
                  setDataGlobalArchipelagos={setDataGlobalArchipelagos}
                  getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                  mainShow={mainShow}
                  setMainShow={setMainShow}
                />
              </div>
            )}

            {mainShow == 'arcs' && (
              <div className="min-h-[90vh]">
                <HubArcFeed
                  arcs={arcs}
                  currentUser={currentUser}
                  tier={tier}
                  userArchipelagos={userArchipelagos}
                  dataGlobalArchipelagos={dataGlobalArchipelagos}
                  setDataGlobalArchipelagos={setDataGlobalArchipelagos}
                  getDataGlobalArchipelagos={getDataGlobalArchipelagos}
                  mainShow={mainShow}
                  setMainShow={setMainShow}
                  collapsed={collapsed}
                />
              </div>
            )}
          </div>
        ))}

      {submitLayout && (
        <HubSubmitPage
          currentUser={currentUser}
          tier={tier}
          userArchipelagos={userArchipelagos}
          dataGlobalArchipelagos={dataGlobalArchipelagos}
          setDataGlobalArchipelagos={setDataGlobalArchipelagos}
          getDataGlobalArchipelagos={getDataGlobalArchipelagos}
          mainShow={mainShow}
          setMainShow={setMainShow}
          credit={credit}
        />
      )}

      {userLayout && (
        <HubUserPage
          currentUser={currentUser}
          tier={tier}
          userArchipelagos={userArchipelagos}
          dataGlobalArchipelagos={dataGlobalArchipelagos}
          setDataGlobalArchipelagos={setDataGlobalArchipelagos}
          getDataGlobalArchipelagos={getDataGlobalArchipelagos}
          mainShow={mainShow}
          setMainShow={setMainShow}
          credit={credit}
          setGlobalLayout={setGlobalLayout}
          setUserLayout={setUserLayout}
          setSubmitLayout={setSubmitLayout}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      )}

      {/*    {
         mainShow ==='default' && (
          <div className="hidden sm:flex  overflow-x-hidden ">
                  <FlagArea/>
          </div>
        )}
 */}
    </div>
  )
}
