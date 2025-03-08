import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Plus, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { API_URL } from '../../constants'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HubArcFeed({
  dataGlobalArcs,
  setDataGlobalArcs,
  currentUser,
  mainShow,
  collapsed,
}) {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMemory, setSearchMemory] = useState('')

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  // Filter arcs by search term
  function searchKeyword(array) {
    if (!search) return array
    return array.filter(item =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Determine grid columns based on collapsed state
  const gridClass = `grid grid-cols-1 xs:grid-cols-2 ${
    collapsed ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
  } xl:grid-cols-4 2xl:grid-cols-5 gap-4`

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  useEffect(() => {
    if (dataGlobalArcs.length === 0) {
      getAllArcs()
    }
  }, [currentUser, dataGlobalArcs])

  const getAllArcs = () => {
    setIsLoading(true)
    axios
      .get(`${API_URL}/playlists/`, {
        params: {
          only_my: false,
        },
      })
      .then(response => {
        shuffleArray(response.data)
        // Show all arcs without filtering
        setDataGlobalArcs(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data in global arcs: ', error)
        setIsLoading(false)
      })
  }
  // Filter arcs by search term
  const filteredArcs = searchKeyword(dataGlobalArcs)
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
  // Arc Card Component
  const ArcCard = ({ item }) => {
    // Check if thumbnail exists and is valid
    const [thumbnailError, setThumbnailError] = useState(false)
    const thumbnailUrl = (item.uid === 'iJST5Qk') ? null : (item.thumbnail_url || item.image_url)
    
    // Generate a consistent gradient based on the item's id or title
    const generateGradient = () => {
      const seed = (item.id || item.uid || item.name || item.title || "").toString()
      const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const hue1 = hash % 360
      const hue2 = (hue1 + 40) % 360
      return `linear-gradient(to right, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 70%, 50%))`
    }

    return (
      <Link href={`/arc/${item.uid || item.id}`}>
        <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 group">
          <div 
            className="w-full h-40 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: thumbnailUrl && !thumbnailError
                ? `url(${thumbnailUrl})`
                : generateGradient(),
            }}
          >
            {thumbnailUrl && !thumbnailError && (
              <img 
                src={thumbnailUrl} 
                alt=""
                className="hidden"
                onError={() => setThumbnailError(true)}
              />
            )}
            
            {(!thumbnailUrl || thumbnailError) && (
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
    )
  }

  return (
    <div className="w-full flex flex-row overflow-hidden">
      {mainShow === 'sources' ? (
        <div className="p-[10px] xl:min-w-[1200px] xl:max-w-[1200px]">
          <div className="min-h-[300px]">
            {dataGlobalArcs.length > 0 && (
              <>
                <div className={gridClass}>
                  <CreateArcCard />
                  
                  {filteredArcs.map((item, index) => (
                    <ArcCard key={index} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="xl:max-w-[1400px]">
            <p className="mb-10 text-xl lg:text-2xl text-slate-700 dark:text-slate-200 quicksand font-bold">
              Discover All Arcs
            </p>

            <div className="min-h-[300px]">
              {dataGlobalArcs.length > 0 ? (
                <div className={gridClass}>
                  <CreateArcCard />

                  {filteredArcs.map((item, index) => (
                    <ArcCard key={index} item={item} />
                  ))}
                </div>
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
        </div>
      )}
    </div>
  )
}
