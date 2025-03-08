import React from 'react';
import { Languages } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSelector({ handleLanguageChange, language, reorderedLanguageCodes, languages, theme }) {
  // Handle the change event for shadcn Select
  const onValueChange = (value) => {
    // Create a mock event object to maintain compatibility with existing handleLanguageChange
    const mockEvent = {
      target: { value }
    };
    handleLanguageChange(mockEvent);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-6 h-6 ml-2 pl-0.5">
          <Languages 
            className="text-slate-700 dark:text-zinc-200" 
            size={18}
          />
        </div>
        <span className="text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
          Language
        </span>
      </div>
      
      <div className="w-full">
        <Select value={language} onValueChange={onValueChange}>
          <SelectTrigger className="w-full rounded-md bg-slate-50 dark:bg-zinc-700 border-slate-200 dark:border-zinc-600 text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg">
            <SelectGroup>
              {Object.entries(reorderedLanguageCodes).map(
                ([code, name], index) => {
                  // Divider
                  if (index === languages.length) {
                    return (
                      <div 
                        key={`divider-${code}`} 
                        className="border-t border-gray-100 dark:border-zinc-700 my-2"
                      />
                    );
                  }
                  
                  // Available or unavailable language
                  const isAvailable = languages.includes(code);
                  return (
                    <SelectItem 
                      key={code} 
                      value={code}
                      disabled={!isAvailable}
                      className={`text-sm quicksand font-medium ${
                        !isAvailable 
                          ? 'text-slate-300 dark:text-zinc-500' 
                          : 'text-slate-700 dark:text-zinc-200'
                      } hover:bg-slate-100 dark:hover:bg-zinc-700`}
                    >
                      {name}
                    </SelectItem>
                  );
                }
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}