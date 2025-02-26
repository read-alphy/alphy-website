import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'

export default function ReportIssueButton({ handleReportIssue, showReportIssue, setShowReportIssue, currentUser, data, theme }) {

  return (
    <>
      <button
        className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 text-left"
        onClick={handleReportIssue}
        aria-label="Report an issue"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <ReportProblemOutlinedIcon 
            className="text-amber-500 dark:text-amber-400" 
            fontSize="small" 
          />
        </div>
        <span className="text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
          Report an issue
        </span>
      </button>

      <Dialog
        open={showReportIssue}
        onClose={() => setShowReportIssue(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: theme === 'dark' ? '#27272a' : '#ffffff',
            borderRadius: '0.5rem',
            border: theme === 'dark' ? '1px solid #3f3f46' : 'none',
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle className="flex justify-between items-center bg-gray-50 dark:bg-zinc-800 px-6 py-4">
          <span className="text-slate-700 dark:text-zinc-200 quicksand font-medium">
            Report an Issue
          </span>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setShowReportIssue(false)}
            aria-label="close"
            size="small"
            className="text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        
        <DialogContent className="p-0">
          {currentUser ? (
            <div className="w-full">
              {theme === 'light' ? (
                <iframe
                  className="h-[600px] md:h-[640px] w-full border-0"
                  src={`https://tally.so/embed/wve4d8?source_type=${data?.source_type || ''}&source_id=${data?.source_id || ''}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                  title="Report issue form"
                ></iframe>
              ) : (
                <iframe
                  className="h-[600px] md:h-[640px] w-full border-0"
                  src={`https://tally.so/embed/wMNL70?source_type=${data?.source_type || ''}&source_id=${data?.source_id || ''}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                  title="Report issue form (dark mode)"
                ></iframe>
              )}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-slate-700 dark:text-zinc-200 mb-4">
                Please sign in to access the form.
              </p>
              <a 
                className="inline-block px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors duration-200 quicksand font-medium" 
                href="/u/login"
              >
                Sign In
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}