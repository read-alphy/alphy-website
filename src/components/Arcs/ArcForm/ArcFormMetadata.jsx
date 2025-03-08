import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Title and Description component for the ArcForm
 * Redesigned with shadcn UI components
 */
const ArcFormMetadata = ({ arcTitle, arcDescription, setArcTitle, setArcDescription }) => {
  return (
    <div className="w-full ">
      <div className="mb-2">
        <p className="text-slate-700 dark:text-zinc-300 quicksand font-semibold mb-1">
          Title
        </p>
        <Input
          id="arc-title"
          value={arcTitle}
          placeholder="Set a title..."
          onChange={event => setArcTitle(event.target.value)}
          className="w-full quicksand font-normal text-sm bg-white dark:bg-zinc-900
                   border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500
                   focus:ring-1 focus:ring-indigo-500 rounded-md"
        />
      </div>
      
      <div className="space-y-2">
        <p className="text-slate-700 dark:text-zinc-300 quicksand font-semibold">
          Description
        </p>
        <Textarea
          id="arc-description"
          className="min-h-[120px] quicksand font-normal bg-white 
                   border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 resize-none 
                   text-sm w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={arcDescription}
          placeholder="Set a description for your arc..."
          onChange={event => setArcDescription(event.target.value)}
        />
      </div>
    </div>
  );
};

export default ArcFormMetadata;