// File: components/Hub/HubUserPage/UploadsSection.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { FileAudio2, ArrowRight } from 'lucide-react'
import Loading from '../../../components/Loading'
import HubFeedItem from '../../FeedTabs/HubFeedItemElements/HubFeedItem'
import { API_URL } from '../../../constants'

export default function UploadsSection({ currentUser, search, collapsed, tier }) {
  const [hasMoreUploads, setHasMoreUploads] = useState(false)
  const [dataUploads, setDataUploads] = useState([])
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)
  const [offsetUploads, setOffsetUploads] = useState(0)
  const [called, setCalled] = useState(false)
  const limit = 16

  // Function to filter data by search term
  function searchKeyword(array) {
    if (!search) return array
    return array.filter(
      item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.creator_name?.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Function to fetch uploads
  const getDataUploads = (offset, firstTime) => {
    setIsLoadingUploads(true)

    if (currentUser) {
      currentUser.getIdToken().then(idToken => {
        const params = {
          offset,
          limit,
          only_my: 'uploads',
        }
        
        axios
          .get(`${API_URL}/sources/`, {
            params,
            headers: {
              'id-token': idToken,
            },
          })
          .then(response => {
            setHasMoreUploads(!(response.data.length < limit))
            if (firstTime) {
              setDataUploads(response.data)
            } else {
              setDataUploads([...dataUploads, ...response.data])
            }
            setIsLoadingUploads(false)
          })
          .catch(error => {
            console.error('Error fetching uploads:', error)
            setIsLoadingUploads(false)
          })
      })
    }
  }

  // Initial data load
  useEffect(() => {
    if (currentUser && !called) {
      getDataUploads(0, true)
      setCalled(true)
    }
  }, [currentUser, called])

  // Function to load more uploads
  const loadMore = () => {
    setOffsetUploads(offsetUploads + limit)
    getDataUploads(offsetUploads + limit, false)
  }

  // Determine grid columns based on collapsed state
  const gridClass = `grid grid-cols-1 xs:grid-cols-2 ${
    collapsed ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
  } xl:grid-cols-4 2xl:grid-cols-5 gap-4`

  const filteredUploads = searchKeyword(dataUploads)

  return (
    <div className="min-h-[300px]">
      <div>
      
        {isLoadingUploads && dataUploads.length === 0 ? (
          <Loading />
        ) : dataUploads.length > 0 ? (
          <>
            <div className={gridClass}>
              {filteredUploads.map((item, index) => (
                <HubFeedItem 
                  key={index} 
                  item={item} 
                  index={index}
                  setCollapsed={() => {}}
                />
              ))}
            </div>
            
            {hasMoreUploads && filteredUploads.length >= 10 && (
              <div className="w-full flex justify-center mt-10">
                <button
                  className="text-slate-700 dark:text-zinc-300 quicksand font-bold underline"
                  onClick={loadMore}
                >
                  Load more
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
            <div className="text-center mb-4">
              <FileAudio2 className="h-16 w-16 mx-auto text-slate-400 dark:text-zinc-500 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-slate-700 dark:text-zinc-300 mb-2">No uploads yet</h3>
              <p className="text-slate-600 dark:text-zinc-400 max-w-md mx-auto mb-6 text-sm font-normal">
                {tier !== 'premium' ? (
                  <>Upload your own files by upgrading to premium.</>
                ) : (
                  <>Process your first file to start building your collection.</>
                )}
              </p>
              
              {tier !== 'premium' ? (
                <Link
                  href="/account"
                  className="text-sm inline-flex items-center px-4 py-2 bg-blue-100 text-zinc-800 rounded-md transition-colors duration-200 quicksand font-bold"
                >
                  <span className="mr-2 text-sm font-semibold">Upgrade to Premium</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ) : (
                <Link
                  href="/submit"
                  className="text-sm inline-flex items-center px-4 py-2 bg-blue-100 text-zinc-800 rounded-md transition-colors duration-200 quicksand font-bold"
                  onClick={() => localStorage.setItem('newItem', 'upload')}
                >
                  <span className="mr-2 text-sm">Upload File</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}