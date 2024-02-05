export default function DynamicQA({
  answerData,
  areaRefs,
  answer,
  data,
  handleClear,
  handleShareLink,
  handleCopyToClipboard,
  formatAnswer,
  singleSource,
  showSource,
  updateVariable,
  DataArrayIcon,
  handleShowAllSources,
  highlightIndex,
  handleLength,
}) {
  function timestampFormatter(sourceStart, sourceEnd) {
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
    <div className="text-zinc-600 dark:text-zinc-200 pb-10">
      {answerData.answer ? (
        <div>
          <div className="flex flex-row mb-4">
            <h1 className="text-xl col-span-1 flex flex-row font-sans  text-zinc-700 dark:text-zinc-200">
              {' '}
              <span className=" font-averta-semibold">Answer from Alphy</span>
              <svg
                onClick={handleClear}
                className="ml-2 mt-1 cursor-pointer"
                width="20px"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title className="font-bold">Clear</title>
                <path
                  clipRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </h1>
            <div className="col-span-1 justify-end flex flex-row flex ">
              <svg
                onClick={handleShareLink}
                className="cursor-pointer"
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
              </svg>

              <svg
                onClick={handleCopyToClipboard}
                title="Copy question and answer"
                className="cursor-pointer"
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
          </div>

          <div
            id="answer-area"
            className=" answer-area text-md sm:text-l container text-zinc-500 dark:text-zinc-300"
          >
            <div className="whitespace-pre-line text-zinc-700 dark:text-zinc-200 font-averta-regular">
              {formatAnswer(answerData.answer, answerData)}
            </div>
          </div>

          <button
            className={`cursor-pointer justify-end mt-10 flex flex-row bg-whiteLike hover:bg-zinc-100  transition duration-300 ease-in-out dark:bg-zinc-700 dark:hover:bg-zinc-600 px-2 py-2 rounded-lg`}
            onClick={handleShowAllSources}
          >
            <span
              className={` text-zinc-600 dark:text-zinc-200 text-md pr-1 font-averta-semibold`}
            >
              {answer && !singleSource ? 'Hide sources' : 'See all sources'}{' '}
              <DataArrayIcon fontSize="sm" />
            </span>
          </button>

          {answer ? (
            <div>
              <div>
                <h1 className="mb-4 text-sm font-normal md:mb-8"> </h1>

                {answerData.sources.map((source, index) => (
                  <div
                    ref={areaRefs.current[index]}
                    className={`${
                      singleSource === true &&
                      showSource !== index + 1 &&
                      'hidden'
                    } border border-zinc-300 dark:border-zinc-600 rounded-lg p-5 drop-shadow-sm mb-5`}
                  >
                    {source.start !== null &&
                    source.start !== undefined &&
                    source.end ? (
                      data.source_type === 'yt' || data.source_type === 'tw' ? (
                        window.innerWidth > 999 ? (
                          <a
                            onClick={updateVariable}
                            className="underline cursor-pointer"
                          >
                            {timestampFormatter(source.start, source.end)}
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
                                  }?t=${twitchTimestampFormatter(source.start)}`
                            }
                            className="underline"
                          >
                            {timestampFormatter(source.start, source.end)}
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
                          {timestampFormatter(source.start, source.end)}
                        </a>
                      )
                    ) : //if the timestamp is 00:00
                    data.source_type === 'yt' || data.source_type === 'tw' ? (
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

                    <p
                      key={index}
                      className="text-zinc-500 dark:text-zinc-400  font-normal mb-10 mt-6"
                      dangerouslySetInnerHTML={{
                        __html: handleLength(source.text),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <p className="text-whiteLike flex mx-auto justify-center  text-xl">
            It seems like the content doesn't have an answer for this query. Try
            another one!
          </p>
        </div>
      )}
    </div>
  )
}
