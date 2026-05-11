import * as Selection from 'selection-popover'

const SelectionPopover = ({ children }) => {
  return (
    <Selection.Root>
      <Selection.Portal>
        <Selection.Content>
          <div className="rounded-lg border bg-white p-3 text-sm font-medium text-gray-700 drop-shadow-2xl dark:border-zinc-600 dark:bg-darkMode dark:text-gray-300">
            AI interactions are no longer available.
          </div>
        </Selection.Content>
      </Selection.Portal>

      <Selection.Trigger>{children}</Selection.Trigger>
    </Selection.Root>
  )
}

export default SelectionPopover
