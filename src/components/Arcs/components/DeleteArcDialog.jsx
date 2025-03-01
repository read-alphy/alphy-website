// components/DeleteArcDialog.jsx
import React from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

const DeleteArcDialog = ({ 
  isOpen, 
  onClose, 
  onDelete, 
  isLoading 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-10 w-[240px] h-[120px] flex md:w-[360px] md:h-[180px] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-mildDarkMode items-center text-center justify-center drop-shadow-sm flex-col">
        <p className="mb-10 quicksand font-semibold">
          You are about to delete this arc. Would you like to continue?
        </p>
        <div>
          {isLoading ? (
            <div>
              <Loader2 className="h-5 w-5 animate-spin mx-auto opacity-40 mb-2" />
              <p className="text-zinc-500 dark:text-zinc-600 italic quicksand font-semibold">
                Deleting...
              </p>
            </div>
          ) : (
            <div className="flex flex-row">
              <p
                className="text-greenColor cursor-pointer quicksand font-semibold"
                onClick={onClose}
              >
                Cancel
              </p>
              <div className="border-r h-full mr-4 ml-4"></div>
              <p
                className="text-red-400 cursor-pointer quicksand font-semibold"
                onClick={onDelete}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteArcDialog