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
          <div className="search-main-feed">
            <input
              onChange={e => setSearchText(e.target.value)}
              type="text"
              className="py-1 bg-gray-100 rounded-md outline-none dark:bg-gray-600 indent-3"
              placeholder="Search Alphy's database..."
            />
          </div>
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