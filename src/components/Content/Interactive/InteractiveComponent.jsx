import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ExternalLink, Sparkles, Download, BookOpen } from 'lucide-react';
import QuestionAnswering from '../Read/QA/QuestionAnswering';
import Sandbox from './Sandbox';

const InteractiveComponent = ({ 
  data, 
  summary, 
  transcript, 
  working, 
  handleAskAlphy, 
  selectionCall, 
  setSelectionCall, 
  inputValue, 
  setInputValue, 
  setShowYouTubeFrame, 
  buttonRef, 
  inputRef, 
  timestampChanger,
  currentUser,
  askAlphyForSandbox,
  setAskAlphyForSandbox,
  askText,
  getSandboxHistory,
  tier,
  activeMobilePanel,
  setActiveMobilePanel,
}) => {
  const [activeTab, setActiveTab] = useState("qa");

  const toggleMobilePanel = () => {
    setActiveMobilePanel(activeMobilePanel === 'read' ? 'interactive' : 'read');
  };

  return (
    <div className="w-full">
      <Card className="h-full rounded-none border-t-0 border-b-0 border-r border-l 2xl:border-r  shadow-none ">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-card z-50">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="qa" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="bg-transparent rounded-none h-full mt-2 lg:mt-0 h-10 w-full justify-start space-x-2">
                <TabsTrigger 
                  value="qa" 
                  className="data-[state=active]:bg-zinc-100 data-[state=active]:dark:bg-zinc-800 h-9 rounded-md px-3 text-sm font-medium flex items-center transition-all"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Q&A
                </TabsTrigger>
                <TabsTrigger 
                  value="sandbox" 
                  className="data-[state=active]:bg-zinc-100 data-[state=active]:dark:bg-zinc-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white h-9 rounded-md px-3 text-sm font-medium flex items-center transition-all"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Playground
                </TabsTrigger>
                <Button 
                  onClick={toggleMobilePanel}
                  className="lg:hidden ml-2 bg-blue-500 text-white h-9 rounded-md px-3 text-sm font-medium flex items-center transition-all"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read
                </Button>
              </TabsList>
            </Tabs>
            <div className="flex items-center space-x-2">
            {/*   <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAskAlphy('sandbox')}
                className="h-8 rounded-md"
                title="Open in new window"
              >
                <ExternalLink className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="qa" value={activeTab} className="w-full flex flex-col h-full">
      
          <TabsContent value="qa" className="m-0 flex-grow overflow-auto">
            <ScrollArea className="h-full ">
              <div className="">
                {summary?.key_qa === null || !summary?.key_qa ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                      Generating questions... plugging in an AI assistant...
                    </p>
                    <img
                      src={working}
                      width={80}
                      alt="Working"
                      className="opacity-70 dark:opacity-90"
                    />
                  </div>
                ) : (
                  <QuestionAnswering
                    source_id={data.source_id}
                    source_type={data.source_type}
                    selectionCall={selectionCall}
                    setSelectionCall={setSelectionCall}
                    key_qa={summary.key_qa}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    setShowYouTubeFrame={setShowYouTubeFrame}
                    buttonRef={buttonRef}
                    inputRef={inputRef}
                    data={data}
                    transcript={transcript}
                    timestampChanger={timestampChanger}
                    currentUser={currentUser}
                  />
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="sandbox" className="m-0 flex-grow overflow-auto">
            <ScrollArea className="">
              <div className="">
                <Sandbox
                  data={data}
                  askAlphyForSandbox={askAlphyForSandbox}
                  setAskAlphyForSandbox={setAskAlphyForSandbox}
                  askText={askText}
                  currentUser={currentUser}
                  getSandboxHistory={getSandboxHistory}
                  tier={tier}
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default InteractiveComponent;
