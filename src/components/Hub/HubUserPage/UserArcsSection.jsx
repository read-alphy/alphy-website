// File: components/Hub/HubUserPage/UserArcsSection.jsx
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, BookOpen } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UserArcsSection({ currentUser, userArcs, search, collapsed }) {
  // Function to filter data by search term
  function searchKeyword(array) {
    if (!search) return array
    return array.filter(
      item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Determine grid columns based on collapsed state
  const gridClass = `grid grid-cols-1 xs:grid-cols-2 ${
    collapsed ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
  } xl:grid-cols-4 2xl:grid-cols-5 gap-4`

  const filteredArcs = searchKeyword(userArcs)

  // Create Arc Card Component
  const CreateArcCard = () => (
    <Link href="/arc/createArc">
      <Card className="h-full flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 border-dashed border-2 dark:bg-zinc-800/50 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500 group">
        <CardContent className="flex flex-col items-center justify-center h-full pt-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors">
            <Plus className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-2 quicksand">Create New Arc</h3>
          <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-[200px]">
            Connect multiple audio content with AI to create a curated experience.
          </p>
        </CardContent>
        <CardFooter className="w-full pt-0">
          <div className="w-full flex justify-center">
            <Badge className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-none group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/60 transition-colors">
              Get Started
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )

  return (
    <div className="min-h-[300px]">
      <div>
        {userArcs.length > 0 ? (
          <>
            <div className={gridClass}>
              <CreateArcCard />

              {filteredArcs.map((item, index) => (
                <Link key={index} href={`/arc/${item.uid || item.id}`}>
                  <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 group">
                    <div 
                      className="w-full h-40 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: (item.thumbnail_url || item.image_url) 
                          ? `url(${item.thumbnail_url || item.image_url})` 
                          : 'linear-gradient(to right, #4f46e5, #3b82f6)',
                      }}
                    >
                      {!(item.thumbnail_url || item.image_url) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-white/70" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="p-4 pb-0">
                      <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100 quicksand line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.name || item.title || "Untitled Arc"}
                      </h3>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-2">
                      <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3">
                        {item.description || "A collection of related audio content."}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-slate-500 dark:text-zinc-500 quicksand">
                        {item.created_at && new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            
            {userArcs.length > 10 && (
              <div className="w-full flex justify-center mt-10">
                <button
                  className="text-slate-700 dark:text-zinc-300 quicksand font-bold underline"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
            <div className="text-center mb-6">
              <BookOpen className="h-16 w-16 mx-auto text-slate-400 dark:text-zinc-500 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-slate-700 dark:text-zinc-300 mb-2">No Arcs yet</h3>
              <p className="text-slate-600 dark:text-zinc-400 max-w-md mx-auto mb-6 text-sm font-normal">
                Create your first Arc to start organizing and connecting your content.
              </p>
            </div>
            
            <div className="max-w-md w-full">
              <CreateArcCard />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}