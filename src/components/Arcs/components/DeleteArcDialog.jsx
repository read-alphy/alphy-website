// components/DeleteArcDialog.jsx
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

const DeleteArcDialog = ({ 
  isOpen, 
  onClose, 
  onDelete, 
  isLoading 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 sm:p-8 w-[280px] md:w-[400px] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-mildDarkMode rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          
          <DialogTitle className="text-lg font-bold mb-2 text-slate-800 dark:text-zinc-100">
            Delete Arc
          </DialogTitle>
          
          <p className="mb-6 quicksand text-slate-600 dark:text-zinc-400">
            Are you sure you want to delete this arc? This action cannot be undone.
          </p>
          
          {isLoading ? (
            <div className="flex flex-col items-center py-2">
              <Loader2 className="h-6 w-6 animate-spin mb-3 text-indigo-500" />
              <p className="text-slate-500 dark:text-zinc-400 quicksand">
                Deleting arc...
              </p>
            </div>
          ) : (
            <div className="flex gap-3 w-full justify-center mt-2">
              <Button
                variant="outline"
                className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 quicksand font-medium"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 quicksand font-medium"
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteArcDialog