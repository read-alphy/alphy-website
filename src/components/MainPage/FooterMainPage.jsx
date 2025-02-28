import { Twitter, Mail, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import FeedbackForm from '../SideFeed/FeedbackForm.jsx'
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function FooterMainPage({ currentUser }) {
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)

  return (
    <div className="bottom-0 text-zinc-700 dark:text-zinc-300">
   
      <div className="border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-5 mt-5 dark:opacity-40"></div>

      <div className="grid grid-cols-3 justify-items-center px-2 mb-8">
        <a
          href="https://twitter.com/alphyapp"
          className="cursor-pointer hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors p-2 rounded-full bg-slate-100 dark:bg-zinc-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter size={20} className="text-slate-600 dark:text-zinc-300" />
        </a>
        <a 
          href="mailto:support@alphy.app" 
          className="cursor-pointer hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors p-2 rounded-full bg-slate-100 dark:bg-zinc-800"
        >
          <Mail size={20} className="text-slate-600 dark:text-zinc-300" />
        </a>
        <a 
          href="https://discord.gg/N4CkQhCVv2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors p-2 rounded-full bg-slate-100 dark:bg-zinc-800"
        >
          <MessageSquare size={20} className="text-slate-600 dark:text-zinc-300" />
        </a>
      </div>

      <Dialog open={openFeedbackDialog} onOpenChange={setOpenFeedbackDialog}>
        <DialogContent className="sm:max-w-md dark:bg-mildDarkMode">
          <FeedbackForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
