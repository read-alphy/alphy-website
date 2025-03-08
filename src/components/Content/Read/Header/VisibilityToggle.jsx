import React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

export default function VisibilityToggle({ isVisible, handleVisibility, tier, theme }) {
  
  const getTooltipText = () => {
    if (tier !== 'premium') {
      return "This content is private. Switch to the Premium plan to make it publicly accessible."
    }
    
    return isVisible
      ? "Toggle the visibility of this content. Switching to private makes it accessible only by you."
      : "Toggle the visibility of this content. Switching to public makes it accessible by all."
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-center w-6 h-6">
              {isVisible ? (
                <Eye 
                  className="text-emerald-500 dark:text-emerald-400" 
                  size={18} 
                />
              ) : (
                <EyeOff 
                  className="text-slate-500 dark:text-zinc-400" 
                  size={18} 
                />
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
                {isVisible ? 'Public' : 'Private'}
              </span>
              
              <Switch
                checked={isVisible}
                onCheckedChange={handleVisibility}
                disabled={tier !== 'premium'}
                aria-label="Toggle content visibility"
                className={tier !== 'premium' ? 'cursor-not-allowed' : ''}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="right"
          className={`
            ${theme === 'dark' ? 'bg-[#27272a] text-[#e4e4e7] border-[#3f3f46]' : 'bg-white text-[#3f3f46] border-[#e2e8f0]'}
            border shadow-md rounded-md py-2 px-3 text-xs quicksand font-medium max-w-[220px]
          `}
        >
          {getTooltipText()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}