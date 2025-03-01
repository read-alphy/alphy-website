import React from 'react';
import { ChevronLeft } from 'lucide-react';

/**
 * Header component with navigation for the ArcForm
 */
const ArcFormHeader = ({ isEditMode, arcInfo, handleGoBack }) => {
  return (
    <div className="w-full py-4">
      <a
        onClick={handleGoBack}
        className="text-slate-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 
                 duration-200 ease-in transition cursor-pointer flex items-center"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="text-sm quicksand font-semibold">Go Back</span>
      </a>
    </div>
  );
};

export default ArcFormHeader;