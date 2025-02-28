import React from 'react'
import { Dialog, DialogContent } from '../../components/ui/dialog'
import { Switch } from '../../components/ui/switch'
import { X, Edit } from 'lucide-react'
import FeedItem from '../FeedTabs/FeedItem'

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
  const arcImageLink = `${data.thumbnail_url ? data.thumbnail_url : ''}`
  const displayText = description ? (expanded ? description : `${description.slice(0, 50)}...`) : ''

  return (
    <div className="grid grid-cols-5 sm:grid-cols-4 mt-20 w-full sm:ml-10 px-3">
      <div className="col-span-4 sm:col-span-3 flex flex-row">
        {arcImageLink.length > 0 && (
          <img
            className="hidden sm:block w-[200px] h-[200px] sm:mr-4"
            src={arcImageLink}
            alt="arc image"
            width={200}
            height={200}
          />
        )}
        <div className="ml-2">
          <p className="text-xl text-slate-800 dark:text-zinc-300 quicksand font-bold">
            {title}
          </p>
          {displayText && (
            <p
              onClick={toggleExpand}
              className={`text-md text-slate-500 dark:text-zinc-500 quicksand font-bold ${
                !expanded && 'hover:opacity-80'
              } sm:hidden cursor-pointer`}
            >
              {displayText}
            </p>
          )}
          <p
            className="text-sm text-slate-500 dark:text-zinc-500 quicksand font-normal hidden sm:block mt-2"
          >
            {description}
          </p>
          <div className="flex">
            <p
              className="cursor-pointer underline text-slate-700 dark:text-zinc-300 quicksand font-bold text-sm"
              onClick={() => setShowTrackDetails(true)}
            >
              More Details...
            </p>
          </div>

          {/* Details Dialog */}
          <Dialog
            fullWidth="true"
            maxWidth="md"
            open={showTrackDetails}
            onClose={() => setShowTrackDetails(false)}
          >
            <div className="pt-10 pb-20 bg-white dark:bg-mildDarkMode text-sm">
              <X
                className="right-0 absolute mr-4 mt-2 cursor-pointer dark:text-zinc-300"
                onClick={() => setShowTrackDetails(false)}
              />
              <div className="mb-10 px-4 sm:px-10">
                <p className="text-slate-800 dark:text-zinc-300 text-lg quicksand font-bold">
                  {title}
                </p>
                {displayText && (
                  <p
                    onClick={toggleExpand}
                    className={`text-md text-slate-500 dark:text-zinc-500 ${
                      !expanded && 'hover:opacity-80'
                    } sm:hidden cursor-pointer`}
                  >
                    {displayText}
                  </p>
                )}
                <p
                  className="text-md text-slate-500 dark:text-zinc-500 hidden sm:block lg:max-w-[700px] quicksand font-bold"
                >
                  {description}
                </p>

                <div className="flex flex-row mt-5">
                  <p className="text-zinc-500 dark:text-zinc-500 text-md quicksand font-bold">
                    {dataArc !== null && dataArc.length} items
                  </p>
                  <div className="ml-5">
                    {currentUser !== null && currentUser.uid === arcUserID && (
                      <div className="flex flex-row w-full space-between flex-grow">
                        <div className="flex-grow flex">
                          <p
                            onClick={handleEdit}
                            className="cursor-pointer text-slate-700 dark:text-zinc-300 underline quicksand font-bold"
                          >
                            Edit
                          </p>
                          <Edit
                            onClick={handleEdit}
                            fontSize="small"
                            className="cursor-pointer text-slate-700 dark:text-zinc-300 pl-1 pt-1"
                            title="Edit arc"
                          />
                        </div>

                        <div className="relative flex flex-col ml-20">
                          <div className="relative flex flex-row group cursor-default">
                            <div className="flex flex-row text-slate-700 dark:text-zinc-300 items-center">
                              <Switch
                                checked={isVisible}
                                onCheckedChange={handleVisibility}
                                disabled={tier !== 'premium'}
                                className={tier !== 'premium' ? 'opacity-50' : ''}
                              />
                              <span className="text-sm mx-2 quicksand font-bold">
                                {localStorage.getItem('isVisible') === 'true'
                                  ? 'Public'
                                  : 'Private'}
                              </span>
                            </div>

                            {tier === 'premium' && (
                              <span className="absolute quicksand font-bold opacity-0 min-w-[200px] group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lgtext-slate-600 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-50 mb-2 ml-4">
                                {isVisible
                                  ? 'Toggle the visibility of this arc. Switching to private makes it accessible only by you.'
                                  : 'Toggle the visibility of this arc. Switching to public makes it accessible by all.'}
                              </span>
                            )}
                            {tier !== 'premium' && (
                              <span className="absolute quicksand font-bold opacity-0 min-w-[200px] group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lgtext-slate-600 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-50 mb-2 ml-4">
                                This arc is private. Switch to the Premium
                                plan to make it publicly accessible.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-10 mt-10 dark:opacity-40"></div>
              </div>
              
              {/* Item List */}
              <div className="w-full px-3 sm:px-8">
                <p className="text-slate-800 dark:text-zinc-300 text-lg quicksand font-bold">
                  Item List
                </p>
                <div
                  className={`
                    grid grid-cols-1 mt-10
                    ${
                      dataArc.length === 1
                        ? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
                        : 'lg:grid-cols-2 xl:grid-cols-2'
                    }
                    gap-4 
                  `}
                >
                  {dataArc.length > 0 &&
                    dataArc.map((item, index) => (
                      <div key={`item-${index}`} className="hover:bg-zinc-100 dark:hover:bg-zinc-700 quicksand font-bold">
                        <FeedItem
                          index={index}
                          item={item}
                          mainFeedInput=""
                          fromArc="arc"
                          dataArc={dataArc}
                          setDataArc={setDataArc}
                          forDetail={true}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ArcChatHeader