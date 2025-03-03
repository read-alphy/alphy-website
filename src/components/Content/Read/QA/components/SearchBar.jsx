import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, X, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function SearchBar({
  inputRef,
  inputValue,
  setInputValue,
  handleKeyDown,
  handleClear,
  isLoadingInside,
  fetchData,
  buttonRef
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Set a minimum height - smaller on mobile
      const minHeight = window.innerWidth < 640 ? 60 : 100;
      // Set a maximum height - smaller on mobile
      const maxHeight = window.innerWidth < 640 ? 120 : 200;
      
      // Calculate the new height based on content
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Apply the height within min and max constraints
      textareaRef.current.style.height = 
        `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    }
  }, [inputValue]);

  // Add resize event listener to adjust textarea height on window resize
  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        // Reset height to auto to get the correct scrollHeight
        textareaRef.current.style.height = 'auto';
        
        // Set a minimum height - smaller on mobile
        const minHeight = window.innerWidth < 640 ? 60 : 100;
        // Set a maximum height - smaller on mobile
        const maxHeight = window.innerWidth < 640 ? 120 : 200;
        
        // Calculate the new height based on content
        const scrollHeight = textareaRef.current.scrollHeight;
        
        // Apply the height within min and max constraints
        textareaRef.current.style.height = 
          `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="px-2 sm:px-3">
      <div className="mt-4 sm:mt-6 xl:mt-8">
        <div className="relative w-full">
          <Textarea
            ref={(el) => {
              textareaRef.current = el;
              if (inputRef) inputRef.current = el;
            }}
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            title={inputValue}
            id="questionAnswering"
            placeholder="Type your question here..."
            className="focus:border-none focus:ring-0 focus:outline-none pr-14 sm:pr-20 py-3 sm:py-4 rounded-xl quicksand font-normal text-slate-800
             dark:text-zinc-300 dark:placeholder:text-slate-500 text-sm sm:text-base
             shadow-md bg-white dark:bg-zinc-800 min-h-[60px] sm:min-h-[100px] max-h-[120px] sm:max-h-[200px] resize-none overflow-y-auto"
          />
          
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex gap-2">
            {inputValue.length > 0 && (
              <Button
                ref={buttonRef}
                onClick={fetchData}
                disabled={isLoadingInside}
                size="icon"
                className={`rounded-full h-8 w-8 sm:h-10 sm:w-10 ${
                  isLoadingInside 
                    ? 'bg-slate-100 dark:bg-zinc-700 text-slate-400 dark:text-zinc-400' 
                    : 'bg-blue-400 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
                }`}
                aria-label="Send message"
              >
                {isLoadingInside ? (
                  <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 font-bold stroke-[2.5]" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}