import HubSourceFeed from './HubSourceFeed'
import HubArcFeed from './HubArcFeed'
import HubSubmitPage from './HubSubmitPage'
import HubUserPage from './HubUserPage/HubUserPage.jsx'
import Link from 'next/link'
import WelcomeExplainer from '../MainPage/WelcomeExplainer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export default function HubContent({
  arcs,
  currentUser,
  tier,
  userArcs,
  dataGlobalArcs,
  setDataGlobalArcs,

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

  const [activeTab, setActiveTab] = useState('sources')
  
  return (
    <div className="pr-5 pl-5 lg:pl-0">
      {globalLayout &&
        (mainShow === 'default' ? (
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

                <div className="xl:max-w-[1200px] pt-10 md:px-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab('sources')}
                        className={`flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                          activeTab === 'sources'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        Sources
                      </button>
                      <button 
                        onClick={() => setActiveTab('arcs')}
                        className={`flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                          activeTab === 'arcs'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        Arcs
                      </button>
                    </div>
                    <Separator className='mt-4 mb-8 max-w-[800px]'/>
                    
                    <TabsContent value="sources">
                      <HubSourceFeed
                        credit={credit}
                        currentUser={currentUser}
                        tier={tier}
                        userArcs={userArcs}
                        dataGlobalArcs={dataGlobalArcs}
                        setDataGlobalArcs={setDataGlobalArcs}
                        mainShow={mainShow}
                        setMainShow={setMainShow}
                      />
                    </TabsContent>
                    
                    <TabsContent value="arcs">
                      <HubArcFeed
                        arcs={arcs}
                        currentUser={currentUser}
                        tier={tier}
                        userArcs={userArcs}
                        dataGlobalArcs={dataGlobalArcs}
                        setDataGlobalArcs={setDataGlobalArcs}
                        mainShow={mainShow}
                        setMainShow={setMainShow}
                        collapsed={collapsed}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        ))}

      {submitLayout && (
        <HubSubmitPage
          currentUser={currentUser}
          tier={tier}
          userArcs={userArcs}
          dataGlobalArcs={dataGlobalArcs}
          setDataGlobalArcs={setDataGlobalArcs}
          mainShow={mainShow}
          setMainShow={setMainShow}
          credit={credit}
        />
      )}

      {userLayout && (
        <HubUserPage
          currentUser={currentUser}
          tier={tier}
          userArcs={userArcs}
          dataGlobalArcs={dataGlobalArcs}
          setDataGlobalArcs={setDataGlobalArcs}
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
