import * as Selection from 'selection-popover'
import { Button } from '@material-tailwind/react'

const SelectionPopover = ({ children, handleAskAlphy }) => {
  return (
    <Selection.Root>
      <Selection.Portal>
        <Selection.Content>
          <div className="flex flex-col bg-white dark:bg-darkMode border dark:border dark:border-zinc-600 rounded-lg drop-shadow-2xl p-4">
            <Button
              size="sm"
              className="rounded-md justify-center h-[40px] bg-purple-500 mx-auto w-full mt-2 mb-2 text-white dark:text-slate-800 quicksand font-bold flex flex-row items-center text-center gap-2"
              onClick={() => handleAskAlphy('sandbox')}
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
              <p>Use in Sandbox</p>
            </Button>

            <Button
              size="sm"
              className="rounded-md bg-green-200 h-[40px] mt-2 mb-2 text-slate-700 dark:text-slate-800 quicksand font-bold drop-shadow-none"
              onClick={() => handleAskAlphy('default')}
            >
              Ask Alphy to learn more about it
            </Button>
            
            <Button
              size="sm"
              className="rounded-md bg-blue-300 h-[40px] mt-2 mb-2 text-slate-700 dark:text-slate-800 quicksand font-bold"
              onClick={() => handleAskAlphy('ELI5')}
            >
              Explain like I'm 5
            </Button>
          </div>
        </Selection.Content>
      </Selection.Portal>

      <Selection.Trigger>
        {children}
      </Selection.Trigger>
    </Selection.Root>
  );
};

export default SelectionPopover;