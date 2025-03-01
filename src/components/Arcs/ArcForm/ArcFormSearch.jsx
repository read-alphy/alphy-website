import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Search component for the ArcForm
 * Redesigned with modern UI components
 */
const ArcFormSearch = ({ 
  inputValue, 
  setInputValue, 
  handleKeyDown, 
  searchCalled, 
  isLoading,
  renderSearchResults,
  hasMore,
  loadMore
}) => {
  return (
    <div className="w-full mb-8">
      <div className="mb-4">
        <h3 className="mb-2 text-slate-700 dark:text-zinc-300 quicksand font-semibold">
          Curate your knowledge hub
        </h3>
        <p className="mb-4 text-slate-600 dark:text-zinc-400 text-sm quicksand font-normal">
          Search by keyword or paste a link to add content to your arc.
        </p>
      </div>
      
      <div className="relative w-full mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
          <Search className="h-4 w-4" />
        </div>
        <Input
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          placeholder="Search from our database..."
          onKeyDown={handleKeyDown}
          className="w-full py-6 pl-10 pr-4 rounded-lg border border-zinc-200 dark:border-zinc-700 
                   bg-white dark:bg-zinc-900 focus-visible:ring-1 focus-visible:ring-indigo-500
                   quicksand font-normal text-sm"
        />
      </div>
      
      {inputValue.length > 0 && searchCalled && (
        <Card className="p-3 mb-4 bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800">
          <p className="text-indigo-700 dark:text-indigo-300 text-sm quicksand font-semibold">
            Can't find what you're looking for? Paste the link directly above to process it.
          </p>
        </Card>
      )}
      
      <div className="max-h-[50vh] overflow-y-auto mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderSearchResults()}
        </div>
      </div>
      
      {hasMore && (
        <div className="w-full flex justify-center mb-4">
          <Button
            variant="ghost"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 quicksand font-semibold"
            onClick={loadMore}
          >
            Load more results
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArcFormSearch;