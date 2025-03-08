import React from 'react';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';
import { PlusCircle, Plus } from 'lucide-react';

export default function ArchipelagoMenu({ handleAddToArchipelago, userArchipelagoNames, theme }) {
  
  // Add a fallback for userArcNames if it's undefined
  const archipelagoNames = userArchipelagoNames || [];

  // Function to truncate long names
  const truncateName = (name, maxLength = 20) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  return (
    <Popover placement="right">
      <PopoverHandler>
        <button 
          className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 text-left"
          aria-label="Add to Arc menu"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <PlusCircle 
              className="text-emerald-400 dark:text-emerald-500" 
              size={18}
            />
          </div>
          <span className="text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
            Add To Arc
          </span>
        </button>
      </PopoverHandler>
      <PopoverContent className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg p-2 max-w-[200px]">
        <button
          onClick={() => handleAddToArchipelago(0, true)}
          className="flex items-center gap-2 p-2 w-full rounded-md text-slate-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 text-sm quicksand font-medium"
        >
          <Plus 
            className="text-emerald-500" 
            size={18}
          />
          <span>Create New Arc</span>
        </button>
        
        {archipelagoNames.length > 0 && (
          <div className="border-b border-gray-100 dark:border-zinc-700 my-2"></div>
        )}
        
        <div className="max-h-[200px] overflow-y-auto">
          {archipelagoNames.map(item => (
            <button
              key={item[1]}
              onClick={() => handleAddToArchipelago(item[1], false)}
              className="flex items-center p-2 w-full rounded-md text-slate-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 text-sm quicksand font-medium"
            >
              <span className="ml-6 truncate w-[130px]" title={item[0]}>
                {truncateName(item[0])}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}