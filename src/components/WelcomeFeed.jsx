import React, { useState } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import FeedItem from './Article_components/FeedItem'
import SideFeedItem from './Article_components/FeedTabs/SideFeedItem'
import SkeletonItem from './Article_components/FeedTabs/SkeletonItem'

function Feed({ data, isLoading }) {
    const [searchText, setSearchText] = useState("");
  
    const filteredData =
      searchText === ""
        ? data
        : data.filter(value =>
            value.title.toLowerCase().includes(searchText.toLowerCase())
          );
  
    return (
      <div className="main-page-feed-section">
        <div className="main-page-feed-table-parent">
                    <form class="flex items-center">
                        <label for="voice-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <input type="text" onChange={(e) => setSearchText(e.target.value)} id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search YouTube videos or Twitter spaces..." required />
                        </div>
                        <button type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-darker rounded-lg border border-darker hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-darker dark:hover:bg-slate-700 dark:focus:ring-slate-y00">
                            <svg aria-hidden="true" class="w-5 h-5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </form>
          <table className="main-page-feed">
            <thead className="header" />
            <tbody className={`main-page-feed-elements 
            grid grid-cols-1 
            ${isLoading ? 'lg:grid-cols-2 xl:grid-cols-3': filteredData.length === 1 ? 'lg:grid-cols-1 xl:grid-cols-1' : filteredData.length<3 ? 'lg:grid-cols-2 xl:grid-cols-2' : 'lg:grid-cols-2 xl:grid-cols-3'}
            gap-4
            `}>
              {isLoading ? (
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                  <SkeletonItem key={index} />
                ))
              ) : filteredData.length === 0 ? (
                <tr>
                  <td>No results found</td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <SideFeedItem key={index} index={index} item={item} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
export default Feed