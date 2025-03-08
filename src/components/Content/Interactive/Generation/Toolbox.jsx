import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Lock,WandSparkles  } from 'lucide-react';
import { motion } from 'framer-motion';
import { inputMessages } from '../messageBank';

// ToolCard component remains unchanged
const ToolCard = ({ 
  commandType, 
  isSelected, 
  onSelect, 
  tier, 
  isLoading, 
  createDopeStuff 
}) => {
  const tool = inputMessages.find(obj => obj.command_type === commandType);
  const isPremium = commandType !== 'custom' && 
                    commandType !== 'twitter_thread' && 
                    commandType !== 'blog_post' && 
                    commandType !== 'space_description_generator' && 
                    commandType !== 'executive_brief_composer';
  
  return (
    <div
      className={`${isSelected && 'animated-gradient-border rounded-lg'}  flex flex-col p-0.5 transition duration-300 ease-in-ou h-[180px]`}
    >
      <div
        onClick={() => onSelect(isSelected ? '' : commandType)}
        className={`p-3 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer 
          border border-slate-200 ${commandType === 'custom' ? 'bg-gradient-to-tr from-slate-50 via-indigo-100 to-slate-100 dark:bg-gradient-to-tr dark:from-stone-900 dark:via-zinc-900 dark:to-stone-950' : 'bg-white dark:bg-mildDarkMode'} text-slate-700 
          dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col w-full`}
      >
        <div className="flex flex-row w-full">
          {tool.icon}
          {isPremium && (
            <div className="justify-end flex flex-row w-full pl-4 md:pl-6">
              {tier !== 'premium' && (
                <CheckCircle size={16} className="text-indigo-400" />
              )}
            </div>
          )}
        </div>
        <p className="text-sm quicksand font-bold text-slate-700 dark:text-zinc-300 mt-1">
          {tool.title}
        </p>
        <p className="text-xs quicksand font-normal text-slate-500 dark:text-zinc-400">
          {tool.message}
        </p>
        {commandType !== 'custom' && (
          <div
            className={`${isSelected ? 'max-h-96' : 'max-h-0'} transition-[max-height] duration-500 ease-in-out overflow-hidden`}
          >
            <Button
              onClick={event => {
                event.stopPropagation();
                createDopeStuff();
              }}
              disabled={!isSelected || (isPremium && tier !== 'premium')}
              className={`${!isSelected ? 'opacity-0' : 'opacity-100'} ${
                isPremium && tier !== 'premium' && 'flex flex-row opacity-50'
              } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-4 text-xs w-[110px] 
                bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 
                text-slate-800 quicksand font-semibold h-7`}
            >
              {isPremium && tier !== 'premium' && (
                <Lock size={12} className="mr-1" />
              )}
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 size={16} className="mx-auto w-full justify-center" />
                </motion.div>
              ) : isPremium && tier !== 'premium' ? 'Premium' : 'Generate'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

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
    setToolboxActive(selectedTool !== '');
  }, [selectedTool, setToolboxActive]);

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
  ];

  return (
    <div className=" h-full max-h-[93vh] overflow-y-auto overflow-x-hidden p-4">
      <div className="flex flex-row items-center justify-center mt-10 mb-10 gap-2 text-lg font-semibold ">
      <WandSparkles className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <span className="text-zinc-800 dark:text-zinc-300">Turn conversation into vibrant content</span>
      </div>
      <div className="gap-4 grid grid-cols-2 items-center justify-center mx-auto">
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
  );
}