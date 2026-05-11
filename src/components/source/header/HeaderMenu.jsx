import { useState } from 'react'
import { Settings, ExternalLink, Bookmark, BookmarkCheck, Eye, EyeOff, Languages, AlertTriangle } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSource } from '../context/SourceContext'
import { useAuth } from '@/hooks/useAuth'
import { getExternalSourceUrl, getSourceTypeName } from '../utils/api'
import { LANGUAGE_CODES } from '../constants/languageCodes'

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const { currentUser } = useAuth()
  const { 
    source, 
    isBookmarked, 
    toggleBookmark, 
    toggleVisibility,
    language,
    setLanguage,
    availableLanguages 
  } = useSource()
  
  if (!source) return null
  
  const externalUrl = getExternalSourceUrl(source.source_type, source.source_id)
  const sourceName = getSourceTypeName(source.source_type)
  const isOwner = currentUser?.uid === source.submitter_id
  const isUpload = source.source_type === 'up'
  
  // Reorder language codes to show available ones first
  const reorderedLanguages = Object.entries(LANGUAGE_CODES).sort(([codeA], [codeB]) => {
    const aAvailable = availableLanguages.includes(codeA)
    const bAvailable = availableLanguages.includes(codeB)
    if (aAvailable && !bAvailable) return -1
    if (!aAvailable && bAvailable) return 1
    return 0
  })

  const handleReportIssue = () => {
    setIsOpen(false)
    setShowReportDialog(true)
  }
  
  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex mt-2 rounded-full p-2.5 bg-slate-50 dark:bg-zinc-800 
              hover:bg-slate-100 dark:hover:bg-zinc-700
              transition-colors duration-200 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Settings menu"
          >
            <Settings className="h-5 w-5 text-slate-700 dark:text-zinc-300" />
          </button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-64 p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg"
          align="end"
        >
          <div className="space-y-1">
            {/* External Link */}
            {externalUrl && (
              <>
                <MenuLink href={externalUrl} icon={ExternalLink}>
                  View on {sourceName}
                </MenuLink>
                <Divider />
              </>
            )}
            
            {/* Visibility Toggle (uploads only, owner only) */}
            {isUpload && isOwner && (
              <>
                <MenuItem 
                  icon={source.is_visible ? Eye : EyeOff}
                  onClick={toggleVisibility}
                >
                  {source.is_visible ? 'Public' : 'Private'}
                </MenuItem>
                <Divider />
              </>
            )}
            
            {/* Bookmark */}
            {currentUser && (
              <MenuItem 
                icon={isBookmarked ? BookmarkCheck : Bookmark}
                iconColor={isBookmarked ? 'text-yellow-500' : undefined}
                onClick={toggleBookmark}
              >
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </MenuItem>
            )}
            
            {!currentUser && (
              <MenuItem icon={Bookmark} disabled>
                Sign in to bookmark
              </MenuItem>
            )}
            
            <Divider />
            
            {/* Language Selector */}
            <div className="py-2">
              <div className="flex items-center gap-2 mb-2 px-2">
                <Languages className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
                <span className="text-sm quicksand font-medium text-slate-700 dark:text-zinc-200">
                  Language
                </span>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full bg-slate-50 dark:bg-zinc-700 border-slate-200 dark:border-zinc-600 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {reorderedLanguages.map(([code, name], index) => {
                    if (code === '__') return null
                    const isAvailable = availableLanguages.includes(code)
                    
                    // Add divider between available and unavailable
                    const showDivider = index > 0 && 
                      availableLanguages.includes(reorderedLanguages[index - 1][0]) && 
                      !isAvailable
                    
                    return (
                      <div key={code}>
                        {showDivider && <Divider />}
                        <SelectItem 
                          value={code}
                          disabled={!isAvailable}
                          className={!isAvailable ? 'text-slate-400 dark:text-zinc-500' : ''}
                        >
                          {name}
                        </SelectItem>
                      </div>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <Divider />
            
            {/* Report Issue */}
            <MenuItem 
              icon={AlertTriangle} 
              iconColor="text-amber-500"
              onClick={handleReportIssue}
            >
              Report Issue
            </MenuItem>
          </div>
        </PopoverContent>
      </Popover>

      {/* Report Issue Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white dark:bg-zinc-800 border dark:border-zinc-700">
          <DialogHeader className="px-6 py-4 border-b dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800">
            <DialogTitle className="text-slate-700 dark:text-zinc-200 quicksand font-medium">
              Report an Issue
            </DialogTitle>
          </DialogHeader>
          
          {currentUser ? (
            <div className="w-full min-h-[300px]">
              <iframe
                className="h-full w-full border-0 p-4"
                style={{ minHeight: '400px' }}
                src={`https://tally.so/embed/wve4d8?source_type=${source.source_type}&source_id=${source.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                title="Report issue form"
              />
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-slate-700 dark:text-zinc-200 mb-4">
                Please sign in to report an issue.
              </p>
              <a 
                href="/u/login"
                className="inline-block px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors duration-200 quicksand font-medium"
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

// Helper Components
function MenuItem({ icon: Icon, iconColor, onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-3 w-full p-2 rounded-md text-left
        ${disabled 
          ? 'text-slate-400 dark:text-zinc-500 cursor-not-allowed' 
          : 'text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-700'
        }
        transition-colors duration-200`}
    >
      <Icon className={`h-4 w-4 ${iconColor || ''}`} />
      <span className="text-sm quicksand font-medium">{children}</span>
    </button>
  )
}

function MenuLink({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 w-full p-2 rounded-md
        text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-700
        transition-colors duration-200"
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm quicksand font-medium">{children}</span>
    </a>
  )
}

function Divider() {
  return <div className="border-b border-gray-100 dark:border-zinc-700 my-2" />
}
