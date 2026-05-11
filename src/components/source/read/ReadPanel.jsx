import { FileText, MessageSquare, Sparkles, Download } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useSource } from '../context/SourceContext'
import { useSourceUI } from '../context/UIContext'
import SummaryView from './SummaryView'
import TranscriptView from './TranscriptView'
import DownloadMenu from './DownloadMenu'

export default function ReadPanel() {
  const { transcript, summary } = useSource()
  const { activeReadTab, setActiveReadTab, activeMobilePanel, setActiveMobilePanel, setShowMediaPlayer } = useSourceUI()
  
  // No content yet
  if (transcript.length === 0) {
    return <ProcessingState />
  }
  
  const toggleMobilePanel = () => {
    setActiveMobilePanel(activeMobilePanel === 'read' ? 'interactive' : 'read')
  }
  
  return (
    <div className="h-full flex flex-col">
      <Tabs 
        value={activeReadTab} 
        onValueChange={setActiveReadTab}
        className="flex flex-col h-full"
      >
        {/* Tab Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-darkMode z-40">
          <TabsList className="bg-transparent p-4 h-12 w-full justify-start gap-2 flex flex-row items-center">
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 
                data-[state=active]:dark:text-blue-300 data-[state=active]:dark:bg-blue-800 
                rounded-md px-3 py-1 text-sm font-medium inline-flex items-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              Summary
            </TabsTrigger>
            
            <TabsTrigger
              value="transcript"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 
                data-[state=active]:dark:text-blue-300 data-[state=active]:dark:bg-blue-800 
                rounded-md px-3 py-1 text-sm font-medium inline-flex items-center"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Transcript
            </TabsTrigger>
            
            {/* Right side actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* Mobile: Interactive button */}
              <Button 
                onClick={toggleMobilePanel}
                className="lg:hidden bg-gradient-to-r from-indigo-500 to-purple-500 text-white h-8 rounded-md px-3 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Interactive
              </Button>
              
              {/* Desktop: Download options */}
              <div className="hidden lg:block">
                <DownloadMenu />
              </div>
            </div>
          </TabsList>
        </div>
        
        {/* Tab Content */}
        <div className="flex-grow overflow-auto pb-10">
          <TabsContent value="summary" className="m-0 p-4 h-full">
            <SummaryView />
          </TabsContent>
          
          <TabsContent value="transcript" className="m-0 p-4 h-full">
            <TranscriptView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function ProcessingState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-4 mb-4">
        <FileText className="h-8 w-8 text-zinc-400" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
        Processing Content
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
        We're working on transcribing and summarizing this content. Check back in a few minutes!
      </p>
    </div>
  )
}

