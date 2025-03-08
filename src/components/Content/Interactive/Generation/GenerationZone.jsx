import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Settings2, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import InputArea from './InputArea';
import Settings from './Settings';
import Toolbox from './Toolbox';


export default function GenerationZone({
  settings,
  setSettings,
  outputMessage,
  userPrompt,
  setUserPrompt,
  createDopeStuff,
  isLoading,
  setIsLoading,
  theme,
  selectedTool,
  setSelectedTool,
  manner,
  setManner,
  tier,
  authError
}) {
  const [advancedSettingsToggled, setAdvancedSettingsToggled] = useState(false);
  const [toolboxActive, setToolboxActive] = useState(false);
  const [toolTransition, setToolTransition] = useState(false);

  // Handle smooth transition when tool selection changes
  useEffect(() => {
    if (selectedTool === 'custom') {
      setToolTransition(true);
    } else {
      setToolTransition(false);
    }
  }, [selectedTool]);

  return (
    <div className="h-full w-full xl:max-w-[400px] 2xl:max-w-[500px] 3xl:max-w-[600px] flex flex-col">
    
      {/* Show Toolbox only when custom is not selected */}
      <div className={`transition-opacity duration-300 ${selectedTool === 'custom' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        
        
        <Toolbox
          theme={theme}
          createDopeStuff={createDopeStuff}
          toolboxActive={toolboxActive}
          setToolboxActive={setToolboxActive}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          tier={tier}
        />
      </div>

      {/* Rest of the content in a scrollable area */}
      <div className="flex w-full overflow-y-auto">
        {/* Custom Tool Area */}
        <div className="w-full px-4 relative">
          {selectedTool === 'custom' && (
            <div className="mt-4 mb-2 transition-all duration-300 ease-in-out">
              <Button
                variant="ghost"
                onClick={() => setSelectedTool('')}
                className="p-0 text-slate-700 dark:text-zinc-300 bg-transparent hover:bg-transparent transition-colors duration-200 z-20 relative"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to tools
              </Button>
            </div>
          )}
          
          {/* Premium overlay for custom tool */}
          {tier !== 'premium' && selectedTool === 'custom' && (
            <div className="absolute inset-0 bg-sky-50/30 text-slate-700 dark:bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-10 dark:text-white rounded-lg mt-16">
              <p className="text-indigo-400 text-md mb-4">
                <CheckCircle className="h-6 w-6 mx-auto" />
              </p>
              <p>
                Go{' '}
                <Link
                  href="/account"
                  className="text-indigo-400 dark:text-indigo-300 border-b border-indigo-400"
                >
                  premium
                </Link>{' '}
                to run custom prompts on transcripts.{' '}
              </p>
            </div>
          )}
          
          {/* Show InputArea when custom is selected */}
          <div className={`w-full transition-all duration-300 ease-in-out ${selectedTool === 'custom' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 h-0 overflow-hidden'}`}>
            {selectedTool === 'custom' && (
              <InputArea
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                createDopeStuff={createDopeStuff}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </div>
          
         
          <div className={`transition-all duration-300 ease-in-out ${selectedTool === 'custom' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 h-0 overflow-hidden'}`}>
            {selectedTool === 'custom' && (
              <div className="mt-4 flex flex-row justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setAdvancedSettingsToggled(!advancedSettingsToggled)}
                  className="border-indigo-200 h-8 dark:border-indigo-200 text-slate-700 dark:text-zinc-300 transition-colors duration-200 hover:bg-transparent "
                >
                  <Settings2 className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Advanced Settings</span>
                </Button>
                <Button
                  onClick={() => createDopeStuff()}
                  disabled={userPrompt.length === 0}
                  className="bg-gradient-to-r from-purple-400 to-blue-400 h-8 hover:from-purple-500 hover:to-blue-500 text-white dark:text-slate-800 font-normal w-28 transition-all duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Generate'
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className={`transition-all duration-300 ease-in-out ${selectedTool === 'custom' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 h-0 overflow-hidden'}`}>
            {selectedTool === 'custom' && (
              <Settings
                settings={settings}
                setSettings={setSettings}
                advancedSettingsToggled={advancedSettingsToggled}
                setAdvancedSettingsToggled={setAdvancedSettingsToggled}
                theme={theme}
                tier={tier}
                manner={manner}
                setManner={setManner}
              />
            )}
          </div>

          <div className={`transition-all duration-300 ease-in-out ${authError ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 h-0 overflow-hidden'}`}>
            {authError && (
              <div className="text-xl my-10">
                <Link href="/u/login" className="text-indigo-400 hover:text-indigo-500 transition-colors duration-200">Sign in</Link> to start creating on Playground!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}