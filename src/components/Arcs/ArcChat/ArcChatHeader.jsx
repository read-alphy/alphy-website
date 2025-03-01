import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { X, Edit, Info, Eye, EyeOff, List } from 'lucide-react'
import FeedItem from '../../FeedTabs/FeedItem'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const ArcChatHeader = ({
  data,
  arcUserID,
  title,
  description,
  expanded,
  toggleExpand,
  showTrackDetails,
  setShowTrackDetails,
  dataArc,
  setDataArc,
  currentUser,
  handleEdit,
  isVisible,
  handleVisibility,
  tier
}) => {
  const arcImageLink = data.thumbnail_url || ''
  const displayText = description ? (expanded ? description : `${description.slice(0, 50)}...`) : ''
  return (
    <div className="mt-4 sm:mt-10 w-full px-3 ">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {arcImageLink.length > 0 && (
          <div className="hidden md:flex justify-center sm:justify-start sm:block flex-shrink-0 mb-2 sm:mb-0">
            <img
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-lg object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
              src={arcImageLink}
              alt={title}
              width={200}
              height={200}
            />
          </div>
        )}
        <div className="flex flex-col space-y-3 sm:space-y-4 flex-grow">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-zinc-100 quicksand tracking-tight text-center sm:text-left">
            {title}
          </h1>
          
          {displayText && (
            <p
              onClick={toggleExpand}
              className={`text-md text-slate-600 dark:text-zinc-400 quicksand ${
                !expanded && 'hover:opacity-80'
              } sm:hidden cursor-pointer transition-all duration-200`}
            >
              {displayText}
              {!expanded && (
                <span className="text-indigo-500 dark:text-indigo-400 ml-1 font-medium">Read more</span>
              )}
            </p>
          )}
          
          <p className="text-md text-slate-600 dark:text-zinc-400 quicksand hidden sm:block max-w-2xl leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center mt-2 flex-wrap gap-3 justify-center sm:justify-start">
            <button
              className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-indigo-900/30 text-blue-600 dark:text-indigo-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors duration-200 quicksand font-semibold text-sm"
              onClick={() => setShowTrackDetails(true)}
            >
              <Info size={16} className="mr-1.5" />
              View Details
            </button>
            
            <Badge variant="outline" className="px-3 py-1.5  bg-slate-50 dark:bg-zinc-800/70 text-slate-700 dark:text-zinc-300 rounded-full border-slate-200 dark:border-zinc-700">
              <span className="font-medium text-sm">{data?.tracks?.length || 0}</span>
              <span className="ml-1 opacity-80 text-sm">items</span>
            </Badge>
          </div>



          {/* Details Dialog */}
          <Dialog open={showTrackDetails} onOpenChange={setShowTrackDetails}>
            <DialogContent className="max-w-[800px] p-0 bg-white dark:bg-zinc-900 border-none shadow-xl max-h-[90vh] overflow-scroll">
              <Card className="pt-6 pb-10 bg-white dark:bg-zinc-900 border-none shadow-xl h-full flex flex-col">
               
                
                <CardContent className="flex-1 overflow-hidden flex flex-col">
                  <div className="px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                      {arcImageLink.length > 0 && (
                        <img
                          className="w-[100px] h-[100px] rounded-lg object-cover mb-4 sm:mb-0 sm:mr-6"
                          src={arcImageLink}
                          alt={title}
                        />
                      )}
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-md font-bold text-slate-800 dark:text-zinc-200 quicksand mb-2">
                          {title}
                        </h2>
                        
                        <p className="text-sm text-slate-600 dark:text-zinc-400 quicksand max-w-2xl leading-relaxed">
                          {description}
                        </p>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start mt-5 gap-x-6 gap-y-3">
                          <div className="flex items-center">
                            {/* <List size={16} className="mr-2 text-slate-500 dark:text-zinc-400" /> */}
                            <span className="text-slate-600 dark:text-zinc-400 text-sm quicksand">
                              {data?.tracks?.length || 0} items
                            </span>
                          </div>
                          
                          {currentUser !== null && currentUser.uid === arcUserID && (
                            <>
                              <button
                                onClick={handleEdit}
                                className="flex items-center text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors quicksand font-semibold text-sm"
                              >
                                <Edit size={16} className="mr-1" />
                                Edit Arc
                              </button>

                              <div className="relative group">
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={isVisible}
                                    onCheckedChange={handleVisibility}
                                    disabled={tier !== 'premium'}
                                    className={tier !== 'premium' ? 'opacity-50' : ''}
                                  />
                                  <div className="flex items-center">
                                    {isVisible ? (
                                      <Eye size={16} className="mr-1 text-slate-600 dark:text-zinc-400" />
                                    ) : (
                                      <EyeOff size={16} className="mr-1 text-slate-600 dark:text-zinc-400" />
                                    )}
                                    <span className="text-sm quicksand font-semibold text-slate-600 dark:text-zinc-400">
                                      {isVisible ? 'Public' : 'Private'}
                                    </span>
                                  </div>
                                </div>

                                {tier === 'premium' ? (
                                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-2 text-xs w-60 z-50 top-full mt-2 right-0">
                                    {isVisible
                                      ? 'Toggle to make this arc private and accessible only by you.'
                                      : 'Toggle to make this arc public and accessible by everyone.'}
                                  </div>
                                ) : (
                                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-2 text-xs w-60 z-50 top-full mt-2 right-0">
                                    This arc is private. Upgrade to Premium to make it publicly accessible.
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 dark:border-zinc-800 my-8"></div>
                  </div>
                  
                  {/* Item List */}
                  <div className="w-full px-4 sm:px-6 overflow-y-auto flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200 quicksand mb-6 flex items-center sticky top-0 bg-white dark:bg-zinc-900 py-2">
                      <List size={18} className="mr-2" />
                      Content Items
                    </h3>
                    
                    <div className={`
                      grid grid-cols-1 gap-4
                      ${data?.tracks?.length === 1 ? 'lg:grid-cols-1 xl:grid-cols-1 lg:max-w-2xl' : 'lg:grid-cols-2 xl:grid-cols-2'}
                    `}>
                      {data?.tracks?.length > 0 &&
                        data.tracks.map((item, index) => (
                          <div 
                            key={`item-${index}`} 
                            className="rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors duration-200"
                          >
                            <FeedItem
                              index={index}
                              item={item}
                              mainFeedInput=""
                              fromArc="arc"
                              dataArc={data.tracks}
                              setDataArc={setDataArc}
                              forDetail={true}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogContent>
          
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ArcChatHeader