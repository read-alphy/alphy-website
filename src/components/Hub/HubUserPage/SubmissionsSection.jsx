// File: components/Hub/HubUserPage/SubmissionsSection.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Loading from '../../../components/Loading'
import HubFeedItem from '../../FeedTabs/HubFeedItemElements/HubFeedItem'
import { API_URL } from '../../../constants'
import { Link2, ArrowRight } from 'lucide-react'

export default function SubmissionsSection({ currentUser, search, collapsed }) {
  const [isLoading, setIsLoading] = useState(!!currentUser)
  const [submissions, setSubmissions] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const limit = 16

  // Filter submissions by search term
  const filteredSubmissions = search 
    ? submissions.filter(item => 
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.creator_name?.toLowerCase().includes(search.toLowerCase())
      )
    : submissions

  // Fetch submissions data
  const fetchSubmissions = (currentOffset, isInitialFetch) => {
    if (!currentUser) return
    
    setIsLoading(true)
    
    currentUser.getIdToken()
      .then(idtoken => {
        axios.get(`${API_URL}/sources/`, {
          params: {
            offset: currentOffset,
            limit,
            only_my: 'submits',
          },
          headers: {
            'id-token': idtoken,
          },
        })
        .then(response => {
          const newData = response.data
          setHasMore(newData.length >= limit)
          
          if (isInitialFetch) {
            setSubmissions(newData)
          } else {
            setSubmissions(prev => [...prev, ...newData])
          }
        })
        .catch(error => {
          console.error('Error fetching submissions:', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
      })
  }

  // Initial data load
  useEffect(() => {
    if (currentUser && !initialized) {
      fetchSubmissions(0, true)
      setInitialized(true)
    }
  }, [currentUser, initialized])

  // Load more submissions
  const loadMore = () => {
    const newOffset = offset + limit
    setOffset(newOffset)
    fetchSubmissions(newOffset, false)
  }

  // Determine grid columns based on collapsed state
  const gridClass = `grid grid-cols-1 xs:grid-cols-2 ${
    collapsed ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
  } xl:grid-cols-4 2xl:grid-cols-5 gap-4`

  return (
    <div>
      {isLoading && submissions.length === 0 ? (
        <Loading />
      ) : filteredSubmissions.length > 0 ? (
        <>
          <div className={gridClass}>
            {filteredSubmissions.map((item, index) => (
              <HubFeedItem key={index} item={item} index={index} />
            ))}
          </div>
          
          {hasMore && filteredSubmissions.length >= 10 && (
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
            <Link2 className="h-16 w-16 mx-auto text-slate-400 dark:text-zinc-500 mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-slate-700 dark:text-zinc-300 mb-2">No submissions yet</h3>
            <p className="text-slate-600 dark:text-zinc-400 max-w-md mx-auto mb-6 text-sm font-normal">
              Process your first online conversation to start building your collection.
            </p>
            <Link
              href="/submit"
              className="text-sm inline-flex items-center px-4 py-2 bg-blue-100  text-zinc-800 rounded-md transition-colors duration-200 quicksand font-bold"
              onClick={() => localStorage.setItem('newItem', 'link')}
            >
              <span className="mr-2 text-sm font-semibold">Submit Conversation</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}