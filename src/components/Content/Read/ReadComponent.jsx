"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Download, Play, FileText, List, MessageSquare, Layers, Languages, Sparkles } from 'lucide-react'

import Summary from './ReadComponents/content/Summary'
import Transcript from './ReadComponents/content/Transcript'
import MediaPlayer from './ReadComponents/MediaPlayer'
import MediaControls from './ReadComponents/MediaControls'
import DownloadOptions from './ReadComponents/DownloadOptions'


export default function ReadComponent({
  data,
  transcript,
  summary,
  summaryArray,
  isLoading,
  handleClickTimestamp,
  handleDownload,
  handleAskAlphy,
  activeTab,
  setActiveTab,
  keyTakeaways,
  languages,
  languagesWanted,
  language,
  errorMessage,
  contentSummaries,
  showYouTubeFrame,
  setShowYouTubeFrame,
  videoRef,
  canvasRef,
  autoplay,
  timestamp,
  title,
  basicDataLoaded,
  setBasicDataLoaded,
  handleShowYouTubeFrame,
  contentRef,
  working,
  downloading,
  themePopover,
  language_codes,
  currentUser,
  requestTranslation,
  tier,
  theme,
  activeMobilePanel,
  setActiveMobilePanel,
}) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const convertTimeToSeconds = (time) => {
    // Check if the input is a string and matches the ISO 8601 duration format
    if (typeof time === "string" && time.match(/^PT/)) {
      const matches = time.match(/PT(\d+H)?(\d+M)?(\d+(?:\.\d+)?S)?/);
      let seconds = 0;

      // If hours are present, convert them to seconds and add to total
      if (matches[1]) {
        seconds += parseInt(matches[1]) * 3600;
      }

      // If minutes are present, convert them to seconds and add to total
      if (matches[2]) {
        seconds += parseInt(matches[2]) * 60;
      }

      // If seconds are present, add them to total
      if (matches[3]) {
        seconds += parseFloat(matches[3]);
      }

      return seconds;
    } else if (
      typeof time === "number" ||
      (typeof time === "string" && time.match(/^\d+(?:\.\d+)?$/))
    ) {
      // If the input is a numeric value or a string representing a number, parse it directly
      return parseFloat(time);
    } else {
      // If the input is neither, return null or throw an error
      return null;
    }
  }

  // Content available check
  const isContentAvailable = transcript.length > 0 && 
    ((summary !== undefined && summary.complete !== undefined && language === summary.lang) || 
     (summary !== undefined && summary.complete === undefined));

  // Translation request check
  const needsTranslation = errorMessage === true || 
    languagesWanted.includes(language) === true || 
    languages.includes(language) || 
    (summary !== undefined && summary.summary !== undefined && 
     summary.summary !== null && summary.summary.length > 0) || 
    (contentSummaries !== undefined && contentSummaries.length > 1 && 
     (contentSummaries[0].lang === language || contentSummaries[1].lang === language)) || 
    language === 'en';

  // Define content tabs
  const contentTabs = [
    { id: "summary", label: "Summary", icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: "transcript", label: "Transcript", icon: <MessageSquare className="h-4 w-4 mr-2" /> }
  ];

  const toggleMobilePanel = () => {
    setActiveMobilePanel(activeMobilePanel === 'read' ? 'interactive' : 'read');
  };

  return (
    <div className="overflow-x-hidden">
      
      {isContentAvailable ? (
        <div className="flex flex-col">
          {/* Media Player Section */}
          {transcript.length > 0 && (
           <div>
                  <MediaPlayer 
                    data={data}
                    transcript={transcript}
                    showYouTubeFrame={showYouTubeFrame}
                    videoRef={videoRef}
                    canvasRef={canvasRef}
                    autoplay={autoplay}
                    timestamp={timestamp}
                    title={title}
                    theme={theme}
                  />
                  
                 
                
            </div>
          )}
          
          
          <div className=" ">
          
            {transcript.length > 0 && (
              <div className="">
                <Card className="h-full p-0 flex flex-col rounded-none border-0">
                  <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="w-full flex flex-col h-full"
                  >
                    <div className="border-b-[1px] border-zinc-200 dark:border-zinc-800 sticky top-0 bg-card z-50 ">
                      <TabsList className="bg-transparent p-4 rounded-none h-12 w-full justify-start gap-2 mb-2 flex flex-row flex-nowrap items-center">
                        {contentTabs.map((tab) => (
                          <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:dark:text-blue-300 data-[state=active]:dark:bg-blue-800 rounded-md px-3 py-1 text-sm font-medium inline-flex items-center transition-all flex-shrink-0"
                          >
                            {tab.icon}
                            {tab.label}
                          </TabsTrigger>
                        ))}

                        
                        

                        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
                          {/* Interactive button for mobile */}
                          <Button 
                            onClick={toggleMobilePanel}
                            className="lg:hidden bg-gradient-to-r from-indigo-500 to-purple-500 text-white h-8 rounded-md px-3 text-sm font-medium inline-flex items-center transition-all flex-shrink-0"
                          >
                             <Sparkles className="h-4 w-4 mr-2" />
                            Interactive
                          </Button>
                          {/* Download options for desktop */}
                          <div className="hidden lg:flex lg:items-center">
                            <DownloadOptions
                              handleDownload={handleDownload}
                              downloading={downloading}
                              tier={tier}
                              basicDataLoaded={basicDataLoaded}
                              themePopover={themePopover}
                            />
                          </div>
                        </div>
                        <div className="pl-4 hidden lg:flex lg:items-center flex-shrink-0">
                          {!showYouTubeFrame&&
                          <MediaControls 
                            data={data}
                            showYouTubeFrame={showYouTubeFrame}
                            handleShowYouTubeFrame={handleShowYouTubeFrame}
                            />
                          }
                        </div>
                      </TabsList>
                    </div>
                    
                    <div className="flex-grow overflow-auto pb-10 ">
                      <TabsContent value="summary" className="m-0 pl-4 lg:pl-0 py-4 pr-4 h-full border-0">
                        {isLoading ? (
                          <div className="flex justify-center items-center h-full ">
                            <img src={working} width={100} alt="Loading" className="opacity-70" />
                          </div>
                        ) : (
                          <Summary
                          isLoading={isLoading}
                          summaryArray={summaryArray}
                          summary={summary}
                          working={working}
                          handleClickTimestamp={handleClickTimestamp}
                          convertTimeToSeconds={convertTimeToSeconds}
                          keyTakeaways={keyTakeaways}
                          data={data}
                          />
                        )}
                      </TabsContent>
                      
                      <TabsContent value="transcript" className="m-0 py-4 pr-4 pl-4 lg:pl-0  h-full border-0">
                        <Transcript
                                  isLoading={isLoading}
                                  transcript={transcript}
                                  data={data}
                                  handleClickTimestamp={handleClickTimestamp}
                                  handleDownload={handleDownload}
                                  downloading={downloading}
                                  tier={tier}
                                  basicDataLoaded={basicDataLoaded}
                                  themePopover={themePopover}
                        />
                      </TabsContent>
                    </div>
                  </Tabs>
                </Card>
              </div>
            )}

            
            {/*  */}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <Card className="max-w-md p-6">
            {!needsTranslation ? (
              <div className="text-center">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-3 inline-flex mb-4">
                  <Languages className="h-6 w-6 text-zinc-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Content Not Available
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                  Seems like Alphy hasn't processed the content in {language_codes[language]} yet.
                </p>
                
                {tier !== undefined && tier !== 'free' ? (
                  <Button 
                    onClick={requestTranslation} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Request Translation to {language_codes[language]}
                  </Button>
                ) : (
                  <div>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-3">
                      Upgrade your plan to request translation.
                    </p>
                    <Button 
                      className="w-full" 
                      asChild
                    >
                      <a href={currentUser ? "/account" : "/plans"}>
                        View {currentUser ? "Account" : "Plans"}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-3 inline-flex mb-4">
                  <Layers className="h-6 w-6 text-zinc-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Processing Content
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  We're currently processing this content. Please check back shortly.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}