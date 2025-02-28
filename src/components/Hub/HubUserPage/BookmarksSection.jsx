// File: components/Hub/HubUserPage/BookmarksSection.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Loading from '../../../components/Loading'
import HubFeedItem from '../../FeedTabs/HubFeedItemElements/HubFeedItem'
import { API_URL } from '../../../constants'
import { Bookmark, ArrowRight } from 'lucide-react'

export default function BookmarksSection({ currentUser, search, collapsed }) {
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(false)
  const [dataBookmarks, setDataBookmarks] = useState([])
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true)
  const [offsetBookmarks, setOffsetBookmarks] = useState(0)
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

  // Function to fetch bookmarks
  const getDataBookmarks = (offset, firstTime) => {
    setIsLoadingBookmarks(true)
    if (currentUser) {
      currentUser
        .getIdToken()
        .then(idtoken => {
          const params = {
            offset,
            limit,
            only_my: 'bookmarks',
          }
          
          axios
            .get(`${API_URL}/sources/`, {
              params,
              headers: {
                'id-token': idtoken,
              },
            })
            .then(response => {
              setHasMoreBookmarks(!(response.data.length < limit))
              if (firstTime) {
                setDataBookmarks(response.data)
              } else {
                setDataBookmarks([...dataBookmarks, ...response.data])
              }
              setIsLoadingBookmarks(false)
            })
        })
        .catch(error => {
          console.error('Error fetching bookmarks:', error)
          setIsLoadingBookmarks(false)
        })
    }
  }

  // Initial data load
  useEffect(() => {
    if (currentUser && !called) {
      getDataBookmarks(0, true)
      setCalled(true)
    }
  }, [currentUser, called])

  // Function to load more bookmarks
  const loadMore = () => {
    setOffsetBookmarks(offsetBookmarks + limit)
    getDataBookmarks(offsetBookmarks + limit, false)
  }

  // Determine grid columns based on collapsed state
  const gridClass = `grid grid-cols-1 xs:grid-cols-2 ${
    collapsed ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
  } xl:grid-cols-4 2xl:grid-cols-5 gap-4`

  const filteredBookmarks = searchKeyword(dataBookmarks)

  return (
    <div className="min-h-[300px]">
      <div>
        
        {isLoadingBookmarks && dataBookmarks.length === 0 ? (
          <Loading />
        ) : dataBookmarks.length > 0 ? (
          <>
            <div className={gridClass}>
              {filteredBookmarks.map((item, index) => (
                <HubFeedItem
                  key={index}
                  item={item}
                  index={index}
                  myBookmarks={true}
                  currentUser={currentUser}
                />
              ))}
            </div>
            
            {hasMoreBookmarks && filteredBookmarks.length >= 10 && (
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
          <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 ">
            <div className="text-center mb-4">
              <Bookmark className="h-16 w-16 mx-auto text-slate-400 dark:text-zinc-500 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-slate-700 dark:text-zinc-300 mb-2">No bookmarks yet</h3>
              <p className="text-slate-600 dark:text-zinc-400 max-w-md mx-auto mb-6 text-sm font-normal">
                Save interesting content to revisit later by bookmarking items you find valuable.
              </p>
              <Link
                href="/explore"
                className="text-sm inline-flex items-center px-4 py-2 bg-indigo-400 hover:bg-indigo-600 text-white rounded-md transition-colors duration-200 quicksand font-bold"
              >
                <span className="mr-2 text-sm">Discover Content</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}