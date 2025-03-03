import React, { useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import { Loader2, CheckCircle } from 'lucide-react'

import { inputMessages } from '../messageBank'

// Tool card component to avoid repetition
const ToolCard = ({ 
  commandType, 
  isSelected, 
  onSelect, 
  tier, 
  isLoading, 
  createDopeStuff 
}) => {
  const tool = inputMessages.find(obj => obj.command_type === commandType)
  const isPremium = commandType !== 'custom' && 
                    commandType !== 'twitter_thread' && 
                    commandType !== 'blog_post' && 
                    commandType !== 'space_description_generator' && 
                    commandType !== 'executive_brief_composer'
  
  return (
    <div
      className={`${
        isSelected && 'animated-gradient-border rounded-lg '
      } flex flex-col h-[210px] p-0.5 transition duration-300 ease-in-out`}
    >
      <div
        onClick={() => onSelect(isSelected ? '' : commandType)}
        className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer 
          border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 
          dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col max-w-[350px] sm:max-w-[240px]`}
      >
        <div className="flex flex-row w-full">
          {tool.icon}
          {isPremium && (
            <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
              {tier !== 'premium' && (
                <CheckCircle fontSize="small" className="ml-2 text-indigo-400" />
              )}
            </div>
          )}
        </div>

        <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
          {tool.title}
        </p>
        <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
          {tool.message}
        </p>

        <div
          className={`${
            isSelected ? 'max-h-96' : 'max-h-0'
          } transition-[max-height] duration-500 ease-in-out overflow-hidden`}
        >
          <Button
            onClick={event => {
              event.stopPropagation()
              createDopeStuff()
            }}
            ripple={true}
            disabled={!isSelected || (isPremium && tier !== 'premium')}
            className={`${
              !isSelected ? 'opacity-0' : 'opacity-100'
            } ${
              isPremium && tier !== 'premium' && 'flex flex-row opacity-50'
            } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] 
              bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
              from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 
              text-slate-800 quicksand font-normal normal-case`}
          >
            {isPremium && tier !== 'premium' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-1 -mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            )}
            {isLoading ? (
              <Loader2
                color="inherit"
                size={20}
                className="mx-auto w-full justify-center"
              />
            ) : isPremium && tier !== 'premium' ? (
              'Premium'
            ) : (
              'Generate'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Toolbox({
  tier,
  createDopeStuff,
  isLoading,
  toolboxActive,
  setToolboxActive,
  selectedTool,
  setSelectedTool,
}) {
  useEffect(() => {
    setToolboxActive(selectedTool !== '')
  }, [selectedTool, setToolboxActive])

  // List of all tool command types
  const tools = [
    'custom',
    'twitter_thread',
    'blog_post',
    'space_description_generator',
    'executive_brief_composer',
    'audiogram',
    'investment_analysis',
    'newsletter_generator',
    'highlight_generator',
    'youtube_shorts',
    'video_topic_generator',
    'video_description',
    'space_idea_generator',
    'keyword_identifier',
    'get_actionables',
    'generate_quizzes',
    'investment_insight_extractor'
  ]

  return (
    <div className="w-full max-w-[800px]">
      <div className="flex flex-wrap mt-4 gap-6 justify-center sm:justify-normal">
        {tools.map(tool => (
          <ToolCard
            key={tool}
            commandType={tool}
            isSelected={selectedTool === tool}
            onSelect={setSelectedTool}
            tier={tier}
            isLoading={isLoading}
            createDopeStuff={createDopeStuff}
          />
        ))}
      </div>
    </div>
  )
}