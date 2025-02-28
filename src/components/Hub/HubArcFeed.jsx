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
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [called, setCalled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMemory, setSearchMemory] = useState('')

  const searchInputRef = useRef(null)
  const limit = 16
  const limit_glob = 40

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    if (searchQuery || (searchQuery === '' && searchMemory !== '')) {
      handleSearch()
    }
  }, [searchQuery])

  // Filter arcs by search term
  function searchKeyword(array) {
    if (!search) return array
    return array.filter(item =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
    )
  }

  const handleSearch = () => {
    setSearchMemory(search)
    localStorage.setItem('search', search)
    if (searchInputRef.current?.value.length === 0) {
      setSearch('')
    }
    setOffset(0)
    getData(0, true, true)
    setSubmitted(true)
  }

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      if (submitted === true) {
        localStorage.setItem('search', search)
      } else {
        localStorage.setItem('search', '')
      }
    })
  }, [submitted, search])

  const getData = (offset, firstTime, hasMore) => {
    if (!hasMore) return
    
    setIsLoading(true)
    const params = {
      offset,
      limit,
    }
    
    if (inputValue) {
      params.q = search
    }
    
    axios
      .get(`${API_URL}/sources/`, { params })
      .then(response => {
        setHasMore(!(response.data.length < limit))
        if (firstTime) {
          setData(response.data)
        } else {
          setData([...data, ...response.data])
        }
        setIsLoading(false)
      })
  }

  const loadMore = () => {
    setOffset(offset + limit)
    getData(offset + limit, false, true)
  }

  if (called === false && search.length === 0) {
    getData(0, true, true)
    setCalled(true)
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  useEffect(() => {
    // TODO this delays the loading of the page, but it's necessary to get the user's idToken.
    // Find a way to store idToken in local storage, minding the expiration behavior.
    // Would improve performance throughout.
    
    if (dataGlobalArcs.length === 0) {
      getDataGlobalArcs(0, true, true)
    }
  }, [currentUser, dataGlobalArcs])

  const getDataGlobalArcs = (offsetGlobalArcs, firstTime, hasMoreGlobalArcs) => {
    if (!hasMoreGlobalArcs) return

    axios
      .get(`${API_URL}/playlists/`, {
        params: {
          limit_glob,
          offset: offsetGlobalArcs,
          only_my: false,
        },
      })
      .then(response => {
        if (firstTime) {
          shuffleArray(response.data)
          const temporary = []
          response.data.forEach(item => {
            if (
              item.user_id === null ||
              item.user_id === 'dUfMZPwN8fcxoBtoYeBuR5ENiBD3'
            ) {
              temporary.push(item)
            }
          })
          setDataGlobalArcs(temporary)
        } else {
          shuffleArray(response.data)
          const temporary = []
          response.data.forEach(item => {
            if (
              item.user_id === null ||
              item.user_id === 'dUfMZPwN8fcxoBtoYeBuR5ENiBD3'
            ) {
              temporary.push(item)
            }
          })
          setDataGlobalArcs(temporary)
        }

        setTimeout(() => {
          const elements = document.querySelectorAll(
            '.styles-module_item-provider__YgMwz'
          )
          if (elements) {
            elements.forEach(element => {
              element.classList.add('cursor-default')
            })
          }
        }, 500)
      })
      .catch(error => {
        console.error('Error fetching data in global arcs: ', error)
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
  const ArcCard = ({ item }) => (
    <Link href={`/arc/${item.uid || item.id}`}>
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
  )

  return (
    <div className="w-full mt-10 mx-auto md:pl-10 lg:pl-16 3xl:pl-40 flex flex-row overflow-hidden">
      {mainShow === 'sources' ? (
        <div className="p-[10px] xl:min-w-[1200px] xl:max-w-[1200px]">
          

          <div className="min-h-[300px]">
            {dataGlobalArcs.length > 0 && (
              <>
                <div className="flex flex-wrap gap-4 mt-4">
                  
                  {filteredArcs.slice(0, 6).map((item, index) => (
                    <div key={index} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
                      <ArcCard item={item} />
                    </div>
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
                <div className="flex flex-wrap gap-4">

                  {filteredArcs.map((item, index) => (
                    <div key={index} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)]">
                      <ArcCard item={item} />
                    </div>
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
