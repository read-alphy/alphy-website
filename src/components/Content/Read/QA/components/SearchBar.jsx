import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function SearchBar({
  inputRef,
  inputValue,
  setInputValue,
  handleKeyDown,
  setQuestion,
  handleClear,
  isLoadingInside,
  fetchData,
  buttonRef
}) {
  // Handle auto-resize of input if needed
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Clear input button handler
  const onClearInput = () => {
    setInputValue('');
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    if (handleClear) {
      handleClear();
    }
  };

  

  return (
    <div className="px-2 sm:px-4 py-2 ">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full flex items-center">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            title={inputValue}
            id="questionAnswering"
            placeholder="Ask a question about this content..."
            className="pr-20 py-6 text-sm rounded-full pl-4 border-zinc-300 dark:border-zinc-700 focus-visible:ring-blue-500"
            autoComplete="off"
          />
          
          
          
          <div className="absolute right-2 sm:right-3 flex gap-2">
            <Button
              ref={buttonRef}
              onClick={fetchData}
              disabled={isLoadingInside || inputValue.length === 0}
              size="icon"
              className={`rounded-full h-8 w-8 sm:h-10 sm:w-10 transition-colors duration-200 ${
                isLoadingInside || inputValue.length === 0
                  ? 'bg-slate-200 dark:bg-zinc-700 text-slate-400 dark:text-zinc-400' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
              }`}
              aria-label="Send message"
            >
              {isLoadingInside ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </motion.div>
              ) : (
                <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 font-bold stroke-[2.5]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}