// File: ArcChatInputSection.jsx
import React from 'react'

const ArcChatInputSection = ({
  inputValue,
  setInputValue,
  handleKeyDown,
  handleClear,
  handleSubmit,
  isLoadingInside,
  buttonRef,
  errorMessage
}) => {
  return (
    <div className="sm:ml-10 px-3">
      <div>
        <div className="flex items-center pr-1 mt-6 xl:mt-8 max-w-[900px]">
          <div className="flex flex-row drop-shadow-md w-full flex-grow relative dark:bg-zinc-800 border border-black/10 dark:text-white rounded-xl dark:rounded-xl gizmo:rounded-2xl shadow-xs dark:shadow-xs bg-white">
            <input
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              title={inputValue}
              type="text"
              id="questionAnswering"
              placeholder="Type your question here..."
              className="m-0 w-full quicksand font-normal text-slate-800 dark:text-zinc-300 dark:placeholder:text-slate-500 text-sm resize-none border-0 bg-transparent dark:bg-transparent py-[10px] pr-16 focus:outline-none focus:ring-0 focus-visible:ring-0 md:py-4 md:pr-20 gizmo:md:py-3.5 pl-4 md:pl-[26px]"
            />
            {inputValue.length > 0 && (
              <div
                onClick={handleClear}
                className="cursor-pointer absolute inset-y-0 right-0 flex items-center mr-10 md:mr-14 dark:text-zinc-500 text-slate-500"
              >
                <svg
                  width="20"
                  onClick={handleClear}
                  className="cursor-pointer"
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

            <button
              ref={buttonRef}
              onClick={handleSubmit}
              className={`absolute rounded-md p-1 gizmo:md:bottom-2.5 ${
                isLoadingInside
                  ? 'pointer-events-none cursor-default bg-transparent md:p-2 md:right-3 bottom-0 right-2'
                  : 'bg-green-200 md:p-2 md:right-3 bottom-2 right-2'
              }`}
            >
              {isLoadingInside ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] p-1 cursor-default z-50 text-slate-700 dark:text-slate-300" />
              ) : (
                <svg
                  className="w-4 h-4 text-slate-700 dark:text-slate-800"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="mt-4 text-slate-600 dark:text-slate-500">
          <p className="quicksand font-bold">
            Please{' '}
            <a
              href="/u/login"
              className="underline text-greenColor dark:text-green-200 quicksand font-bold"
            >
              sign in
            </a>{' '}
            to start asking questions.
          </p>
        </div>
      )}
    </div>
  )
}

export default ArcChatInputSection