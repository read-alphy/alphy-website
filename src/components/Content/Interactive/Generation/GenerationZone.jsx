import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Settings2, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import InputArea from './InputArea';
import Settings from './Settings';
import Toolbox from './Toolbox';
import MannerArea from './MannerArea';

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

  return (
    <div className="h-full w-full flex flex-col">
      {/* Toolbox with fixed height and scrolling */}
      
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
      

      {/* Rest of the content in a scrollable area */}
      <div className="flex-grow overflow-y-auto p-4 ">
        {/* Custom Tool Area */}
        <div>
          {/* Uncomment and adjust as needed */}
          {/* <InputArea
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            createDopeStuff={createDopeStuff}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          /> */}
          
          {/* <div className="mt-4 flex flex-row justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setAdvancedSettingsToggled(!advancedSettingsToggled)}
              className="border-indigo-200 dark:border-indigo-200 text-slate-700 dark:text-zinc-300"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Advanced Settings</span>
            </Button>
            <Button
              onClick={() => createDopeStuff()}
              disabled={selectedTool === 'custom' && userPrompt.length === 0}
              className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white dark:text-slate-800 font-normal w-28"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Generate'
              )}
            </Button>
          </div> */}

          {/* <Settings
            settings={settings}
            setSettings={setSettings}
            advancedSettingsToggled={advancedSettingsToggled}
            setAdvancedSettingsToggled={setAdvancedSettingsToggled}
            theme={theme}
            tier={tier}
          /> */}

          {authError && (
            <div className="text-xl my-10">
              <Link href="/u/login" className="text-indigo-400">Sign in</Link> to start creating on Playground!
            </div>
          )}
        </div>

        {!authError && (
          <MannerArea
            settings={settings}
            setSettings={setSettings}
            theme={theme}
            manner={manner}
            setManner={setManner}
          />
        )}
      </div>
    </div>
  );
}