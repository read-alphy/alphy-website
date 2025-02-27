// File: components/QuestionAnswering/components/SearchBar.js
import React from 'react';
import { Spinner } from '@material-tailwind/react';

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
  return (
    <div className="w-full px-2 py-4">
      <div className="relative group">
        {/* Main input container with enhanced styling */}
        <div className="flex items-center relative overflow-hidden w-full 
             bg-white dark:bg-zinc-800 
             border border-slate-200 dark:border-zinc-700
             shadow-md hover:shadow-lg dark:shadow-zinc-900/30
             transition-all duration-300 ease-in-out
             rounded-xl">
          
          {/* Decorative accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 to-blue-400"></div>
          
          {/* Search icon */}
          <div className="flex items-center justify-center pl-4 text-slate-400 dark:text-zinc-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          {/* Input field with improved styling */}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            title={inputValue}
            type="text"
            id="questionAnswering"
            placeholder="Ask anything about the content..."
            className="m-0 w-full quicksand font-medium
                      text-slate-700 dark:text-zinc-300 
                      text-sm md:text-base
                      placeholder:text-slate-400 dark:placeholder:text-zinc-500
                      placeholder:opacity-80 placeholder:font-normal
                      border-0 bg-transparent 
                      py-3 md:py-4 px-3
                      focus:outline-none focus:ring-0"
          />
          
          {/* Clear button with animated hover effect */}
          {inputValue.length > 0 && (
            <div
              onClick={handleClear}
              className="flex items-center justify-center 
                        h-8 w-8 md:h-9 md:w-9
                        mx-1 md:mx-2
                        rounded-full
                        hover:bg-slate-100 dark:hover:bg-zinc-700
                        cursor-pointer
                        transition-colors duration-200"
            >
              <svg
                width="16"
                height="16"
                className="text-slate-400 dark:text-zinc-500 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          )}
          
          {/* Loading spinner or submit button */}
          <div className="flex items-center pr-3">
            {isLoadingInside ? (
              <div className="relative h-9 w-9 flex items-center justify-center">
                <Spinner color="green" className="opacity-80 w-5 h-5" />
              </div>
            ) : (
              <button
                ref={buttonRef}
                onClick={fetchData}
                className="relative h-9 w-9 
                          flex items-center justify-center
                          bg-gradient-to-br from-emerald-400 to-teal-500 
                          hover:from-emerald-500 hover:to-teal-600
                          rounded-lg
                          text-white
                          transition-all duration-300 ease-in-out
                          shadow-md hover:shadow-lg
                          transform hover:scale-105"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Focus ring effect */}
        <div className="absolute inset-0 rounded-xl 
                      pointer-events-none
                      border-2 border-transparent
                      group-focus-within:border-green-300 dark:group-focus-within:border-teal-500
                      transition-all duration-300"></div>
      </div>
      
      {/* Optional subtle hint text */}
      <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2 ml-4 font-normal">
        Try asking about specifics or request a summary of the content
      </p>
    </div>
  );
}