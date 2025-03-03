import Link from 'next/link'
import { CheckCircle, User, Briefcase, Sun, Moon, MessageSquare, HelpCircle, LayoutDashboard, FileText, LogOut } from 'lucide-react'

export default function FooterMenu({
  currentUser,
  handleSignout,
  loggedIn,
  setOpenFeedbackDialog,
  handleDarkMode,
  tier,
  theme,
  isClient,
}) {
  const menuItemClass = "py-1 text-slate-700 dark:text-zinc-300 text-sm w-full cursor-pointer flex flex-row items-center hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-md px-1";
  const iconClass = "w-4 h-4 mr-1";
  const textClass = "quicksand ml-1 text-sm font-normal";

  return (
    <div className="p-4 space-y-1 rounded-lg ">
     
      {tier === 'premium' && (
        <div className="mb-3 flex flex-row w-full">
          <p className="text-indigo-400 flex flex-row items-center">
            <CheckCircle size={16} className="text-indigo-400 font-bold" />
            <span className="quicksand ml-2 text-sm ">Premium</span>
          </p>
        </div>
      )}

      {loggedIn ? (
        <Link
          className={menuItemClass}
          href="/account"
        >
          <User className={iconClass} />
          <span className={textClass}>My Plan</span>
        </Link>
      ) : (
        <Link
          className={menuItemClass}
          href="/plans"
        >
          <Briefcase className={iconClass} />
          <span className={textClass}>Pricing</span>
        </Link>
      )}

      {isClient &&
        <div className={menuItemClass} onClick={handleDarkMode}>
          {theme === 'light' ? (
            <>
              <Sun className={iconClass} />
              <span className={textClass}>Light</span>
            </>
          ) : (
            <>
              <Moon className={iconClass} />
              <span className={textClass}>Dark</span>
            </>
          )}
        </div>
      }

      <button
        className={menuItemClass}
        onClick={() => setOpenFeedbackDialog(true)}
      >
        <MessageSquare className={iconClass} />
        <span className={textClass}>Reach Us</span>
      </button>

      <Link
        className={menuItemClass}
        href="/#about"
      >
        <HelpCircle className={iconClass} />
        <span className={textClass}>FAQ</span>
      </Link>


      <Link
        className={menuItemClass}
        href="/privacypolicy"
      >
        <FileText className={iconClass} />
        <span className={textClass}>Privacy Policy</span>
      </Link>

      {currentUser !== null && currentUser !== undefined && (
        <div className="mt-2 flex flex-col">
          <div className="flex w-full border-b border-gray-100 dark:border-zinc-700 mb-3"></div>
          <button
            className={menuItemClass}
            onClick={() => handleSignout()}
          >
            <LogOut className={iconClass} />
            <span className={textClass}>Log Out</span>
          </button>
        </div>
      )}
    </div>
  )
}
