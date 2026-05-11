import { MessageSquare, Sparkles, BookOpen } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useSourceUI } from '../context/UIContext'
import QAView from './QAView'
import PlaygroundView from './PlaygroundView'

export default function InteractivePanel() {
  const { 
    activeInteractiveTab, 
    setActiveInteractiveTab,
    activeMobilePanel,
    setActiveMobilePanel
  } = useSourceUI()

  const toggleMobilePanel = () => {
    setActiveMobilePanel(activeMobilePanel === 'read' ? 'interactive' : 'read')
  }

  return (
    <div className="h-full flex flex-col border-l border-zinc-200 dark:border-zinc-800">
      <Tabs 
        value={activeInteractiveTab} 
        onValueChange={setActiveInteractiveTab}
        className="flex flex-col h-full"
      >
        {/* Tab Header */}
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-darkMode z-40">
          <TabsList className="bg-transparent h-10 w-full justify-start gap-2 flex flex-row">
            <TabsTrigger 
              value="qa" 
              className="data-[state=active]:bg-zinc-100 data-[state=active]:dark:bg-zinc-800 
                rounded-md px-3 text-sm font-medium inline-flex items-center"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Q&A
            </TabsTrigger>
            
            <TabsTrigger 
              value="playground" 
              className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white
                data-[state=active]:from-indigo-500 data-[state=active]:to-purple-400 
                rounded-md px-3 text-sm font-medium inline-flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Playground
            </TabsTrigger>

            {/* Mobile: Back to Read button */}
            <Button 
              onClick={toggleMobilePanel}
              className="lg:hidden ml-auto bg-blue-500 text-white h-8 rounded-md px-3 text-sm font-medium"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Read
            </Button>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="qa" className="m-0 flex-grow overflow-auto">
          <QAView />
        </TabsContent>
        
        <TabsContent value="playground" className="m-0 flex-grow overflow-auto">
          <PlaygroundView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

