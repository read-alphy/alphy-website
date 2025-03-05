// File: components/Hub/HubUserPage/index.js
import React, { useState } from 'react'
import UserArcsSection from './UserArcsSection'
import SubmissionsSection from './SubmissionsSection'
import BookmarksSection from './BookmarksSection.jsx'
import UploadsSection from './UploadsSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { LogIn, UserCircle } from 'lucide-react'

export default function HubUserPage({
  currentUser,
  credit,
  tier,
  userArcs,
  setUserLayout,
  setGlobalLayout,
  setSubmitLayout,
  mainShow,
  setMainShow,
  collapsed,
  loggedIn
}) {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('submissions')
  
  function handleHubNavigation(type) {
    if (type === 'submit') {
      setUserLayout(false)
      setGlobalLayout(false)
      setSubmitLayout(true)
    } else if (type === 'global') {
      setUserLayout(false)
      setGlobalLayout(true)
      setSubmitLayout(false)
    }
  }

  return (
    <div className="xl:max-w-[1200px]  ">
     
      {currentUser ? (
        <div className="mt-10">
          <Tabs defaultValue="arcs" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex">
             
              <button
                onClick={() => setActiveTab('submissions')}
                className={`flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeTab === 'submissions'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Submissions
              </button>
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeTab === 'bookmarks'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Bookmarks
              </button>
              <button
                onClick={() => setActiveTab('uploads')}
                className={`flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeTab === 'uploads'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Uploads
              </button>
              <button
                onClick={() => setActiveTab('arcs')}
                className={`flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeTab === 'arcs'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Arcs
              </button>
            </div>
            <Separator className='mt-4 mb-8 max-w-[800px]'/>
            
            <TabsContent value="arcs">
              <UserArcsSection 
                currentUser={currentUser}
                userArcs={userArcs}
              />
            </TabsContent>
            
            <TabsContent value="submissions">
              <SubmissionsSection 
                currentUser={currentUser}
                search={search}
                collapsed={collapsed}
              />
            </TabsContent>
            
            <TabsContent value="bookmarks">
              <BookmarksSection 
                currentUser={currentUser}
                search={search}
              />
            </TabsContent>
            
            <TabsContent value="uploads">
              <UploadsSection 
                currentUser={currentUser}
                search={search}
                collapsed={collapsed}
                tier={tier}
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
          <div className="text-center mb-6">
            <UserCircle className="h-16 w-16 mx-auto text-indigo-400 dark:text-indigo-500 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold text-slate-700 dark:text-zinc-300 mb-2">Sign in to continue</h3>
            <p className="text-slate-600 dark:text-zinc-400 max-w-md mx-auto mb-6 text-sm font-normal">
              Create an account to access your personal content and collections with Alphy
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/u/login" 
              className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/u/register" 
              className="px-5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-colors border border-zinc-200 dark:border-zinc-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}