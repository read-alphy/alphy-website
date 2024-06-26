import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
import { Fragment, useState } from 'react'

export default function BaseQuestions({
  key_qa,
  data,
  singleSource,
  areaRefs,
  handleCopyToClipboard,
  handleShareLink,
  handleLength,
  showSource,
  updateVariable,
  baseSources,
  collapseIndex,
  handleShowAllSources,
  handleBaseQAaccordion,
  formatAnswer,
  DataArrayIcon,
}) {
  const oct31 = new Date('2023-10-31T00:00:00+00:00')
  const added_ts = new Date(data.added_ts)



  function convertTimeToSeconds(time) {
    // Check if the input is a string and matches the ISO 8601 duration format
    if (typeof time === 'string' && time.match(/^PT/)) {
      const matches = time.match(/PT(\d+H)?(\d+M)?(\d+(?:\.\d+)?S)?/);
      let seconds = 0;
  
      // If hours are present, convert them to seconds and add to total
      if (matches[1]) {
        seconds += parseInt(matches[1]) * 3600;
      }
  
      // If minutes are present, convert them to seconds and add to total
      if (matches[2]) {
        seconds += parseInt(matches[2]) * 60;
      }
  
      // If seconds are present, add them to total
      if (matches[3]) {
        seconds += parseFloat(matches[3]);
      }
  
      return seconds;
    } else if (typeof time === 'number' || (typeof time === 'string' && time.match(/^\d+(?:\.\d+)?$/))) {
      // If the input is a numeric value or a string representing a number, parse it directly
      return parseFloat(time);
    } else {
      // If the input is neither, return null or throw an error
      return null;
    }
  }



  function timestampFormatter(sourceStart, sourceEnd) {
    sourceStart = convertTimeToSeconds(sourceStart)
    sourceEnd = convertTimeToSeconds(sourceEnd)
    return (
      <div>
        {Math.floor(sourceStart / 3600) < 10
          ? `0${Math.floor(sourceStart / 3600)}`
          : `${Math.floor(sourceStart / 3600)}`}
        {':'}
        {Math.floor(sourceStart / 60) < 10
          ? `0${Math.floor(sourceStart / 60)}`
          : Math.floor(sourceStart % 3600) < 600
          ? `0${Math.floor(
              sourceStart / 60 - Math.floor(sourceStart / 3600) * 60
            )}`
          : Math.floor(sourceStart / 60 - Math.floor(sourceStart / 3600) * 60)}
        {':'}
        {Math.floor(sourceStart % 60) < 10
          ? `0${Math.floor(sourceStart % 60)}`
          : Math.floor(sourceStart % 60)}

        {' - '}

        {Math.floor(sourceEnd / 3600) < 10
          ? `0${Math.floor(sourceEnd / 3600)}`
          : `${Math.floor(sourceEnd / 3600)}`}
        {':'}
        {Math.floor(sourceEnd / 60) < 10
          ? `0${Math.floor(sourceEnd / 60)}`
          : Math.floor(sourceEnd % 3600) < 600
          ? `0${Math.floor(sourceEnd / 60 - Math.floor(sourceEnd / 3600) * 60)}`
          : Math.floor(sourceEnd / 60 - Math.floor(sourceEnd / 3600) * 60)}
        {':'}
        {Math.floor(sourceEnd % 60) < 10
          ? `0${Math.floor(sourceEnd % 60)}`
          : Math.floor(sourceEnd % 60)}
      </div>
    )
  }

  function twitchTimestampFormatter(sourceStart) {
    const hours = Math.floor(sourceStart / 3600)
    const minutes = Math.floor((sourceStart % 3600) / 60)
    const seconds = Math.floor(sourceStart % 60)

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${formattedHours}h${formattedMinutes}m${formattedSeconds}s`
  }

  

  return (
    <div className="text-slate-700 dark:text-zinc-300">
      <p className="mb-5 underline text-l quicksand font-bold text-slate-600 dark:text-zinc-300">
        {' '}
        Questions by Alphy
      </p>
      <Fragment>
   

     
      {Object.keys(key_qa).map((item, index) => (
        <div
         className="bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300"
        >
             <Accordion   open={collapseIndex === index}>
              
        <AccordionHeader 
        onClick={event => handleBaseQAaccordion(event, index, item)}
      
        > 
      <div className=" flex flex-row dark:border-gray-700 dark:text-zinc-200 text-md 	">
              <span className="quicksand font-bold text-[16px]"><span className="text-xs text-center items-center">🟠</span> {item}</span>
              <svg
              
                className={`w-6 h-6 ${
                  index === collapseIndex && collapseIndex !== -1
                    ? 'rotate-180'
                    : ''
                } shrink-0`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </AccordionHeader>


      <AccordionBody className="text-md">
          <div
                    
          >
            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-row justify-end text-slate-400">
               {/*  <svg
                  onClick={() => handleShareLink(item)}
                  className="cursor-pointer flex flex-row"
                  width="20"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title className="font-bold">Share link to question</title>
                  <path
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg> */}
                <svg
                  onClick={() => handleCopyToClipboard(item)}
                  className="cursor-pointer flex flex-row"
                  width="20"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title className="font-bold">Copy to clipboard</title>
                  <path
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="answer-area text-slate-700 dark:text-zinc-300 font-normal text-md">
                  {added_ts > oct31 ? (
                    <div className=" font-normal quicksand">
                      {formatAnswer(key_qa[item].answer, key_qa[item])}
                    </div>
                  ) : (
                    <div
                      className="quicksand font-normal text-md text-slate-700 dark:text-zinc-300"
                      dangerouslySetInnerHTML={{ __html: key_qa[item].answer }}
                    />
                  )}
                </div>
              </div>
              <div>
                <button
                  className={`cursor-pointer justify-end mt-10 flex flex-row bg-slate-100 hover:bg-zinc-100  transition duration-300 ease-in-out dark:bg-zinc-700 dark:hover:bg-zinc-600 px-2 py-2 rounded-lg`}
                  onClick={handleShowAllSources}
                >
                  <span
                    className={` text-slate-600 dark:text-zinc-200 text-sm pr-1 quicksand font-bold`}
                  >
                    {baseSources && !singleSource
                      ? 'Hide sources'
                      : 'See all sources'}{' '}
                    <DataArrayIcon fontSize="sm" />
                  </span>
                </button>

                {baseSources ? (
                  <div className="mt-10">
                    <div className="">
                      <div className=" ">
                        {key_qa[item]
                          ? key_qa[item].sources.map((source, index) => (
                              <p
                                ref={areaRefs.current[index]}
                                className={`${
                                  singleSource === true &&
                                  showSource !== index + 1 &&
                                  'hidden'
                                } font-bold border border-zinc-300 dark:border-zinc-600 rounded-lg p-5 drop-shadow-sm mb-5 text-slate-700 dark:text-zinc-300`}
                                key={index}
                              >
                                {source.start !== null &&
                                source.start !== undefined &&
                                source.end ? (
                                  data.source_type === 'yt' ||
                                  data.source_type === 'tw' ? (
                                    window.innerWidth > 999 ? (
                                      <a
                                        onClick={updateVariable}
                                        className="underline cursor-pointer"
                                      >
                                        {timestampFormatter(
                                          source.start,
                                          source.end
                                        )}
                                      </a>
                                    ) : (
                                      <a
                                        target="_blank"
                                        href={
                                          data.source_type === 'yt'
                                            ? `https://youtu.be/${
                                                data.source_id
                                              }?t=${Math.floor(source.start)}`
                                            : `https://www.twitch.com/videos/${
                                                data.source_id
                                              }?t=${twitchTimestampFormatter(
                                                source.start
                                              )}`
                                        }
                                        className="underline"
                                      >
                                        {timestampFormatter(
                                          source.start,
                                          source.end
                                        )}
                                      </a>
                                    )
                                  ) : (
                                    <a
                                      target="_blank"
                                      href={
                                        data.source_type === 'ap'
                                          ? `https://podcasts.apple.com/podcast/id${
                                              data.source_id.split('-')[0]
                                            }?i=${data.source_id.split('-')[1]}`
                                          : data.source_type === 'sp'
                                          ? `https://twitter.com/i/spaces/${data.source_id}`
                                          : null /*for upload */
                                      }
                                      className="underline"
                                    >
                                      {timestampFormatter(
                                        source.start,
                                        source.end
                                      )}
                                    </a>
                                  )
                                ) : //if the timestamp is 00:00
                                data.source_type === 'yt' ||
                                  data.source_type === 'tw' ? (
                                  window.innerWidth > 999 ? (
                                    <a
                                      onClick={updateVariable}
                                      className="underline cursor-pointer"
                                    >
                                      00:00:00
                                    </a>
                                  ) : (
                                    <a
                                      target="_blank"
                                      href={(
                                        data.source_type === 'yt' &&
                                        `https://youtu.be/${data.source_id}`
                                      )(
                                        data.source_type === 'tw' &&
                                          `https://www.imdb.com/title/${data.source_id}`
                                      )}
                                    >
                                      00:00:00
                                    </a>
                                  )
                                ) : (
                                  <a
                                    target="_blank"
                                    href={(
                                      data.source_type === 'ap' &&
                                      `https://podcasts.apple.com/podcast/id${
                                        data.source_id.split('-')[0]
                                      }?i=${data.source_id.split('-')[1]}`
                                    )(
                                      data.source_type === 'sp'
                                        ? `https://twitter.com/i/spaces/${data.source_id}`
                                        : ''
                                    )}
                                    className="underline"
                                  >
                                    00:00:00
                                  </a>
                                )}
                                <br /> <br />
                                {
                                  <p
                                    className="text-slate-500 dark:text-zinc-400  quicksand font-normal"
                                    dangerouslySetInnerHTML={{
                                      __html: handleLength(
                                        source.text.replace(/\\h/g, ' ')
                                      ),
                                    }}
                                  />
                                }
                              </p>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          </AccordionBody>
          </Accordion>
        </div>
      ))}


      </Fragment>
    </div>
  )
}
