import React from 'react';

export default function ModeToggle({ isSandbox, setIsSandbox }) {
  
  return (
    <>
      {isSandbox ? (
        <button
          className="cursor-pointer flex flex-row gap-2 rounded-lg items-center text-center px-2 py-2 bg-transparent border-slate-700 dark:border-zinc-200 border w-[200px] justify-center"
          onClick={() => setIsSandbox(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>

          <p className="text-[15px] quicksand font-semibold text-slate-800 dark:text-zinc-200">
            Switch to Reading
          </p>
        </button>
      ) : (
        <button
          className="cursor-pointer flex flex-row gap-2 rounded-lg px-2 py-2 bg-gradient-to-bl from-lime-100 via-sky-200 to-indigo-200 w-[220px] justify-center"
          onClick={() => setIsSandbox(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fde047"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#1e293b"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>

          <p className="text-[15px] quicksand font-semibold text-slate-700 dark:text-slate-700">
            Switch to Playground
          </p>
        </button>
      )}
    </>
  );
}