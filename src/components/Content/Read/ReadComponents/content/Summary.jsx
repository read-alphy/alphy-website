import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Loading from '../../../../Loading'

const Summary = ({
  isLoading,
  summaryArray,
  summary,
  working,
  handleClickTimestamp,
  convertTimeToSeconds
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (summaryArray.length === 0) {
    return (
      <p className="text-l text-slate-500 dark:text-slate-200 quicksand font-bold max-w-screen-md mx-auto p-3 text-center flex flex-col">
        {summary === undefined || summary.length === 0
          ? "This content doesn't have a summary. Check out the transcript!"
          : 'Still waiting for the summary! Meanwhile, check the transcript.'}
        {summary !== undefined && summary.length !== 0 && (
          <Image
            className="opacity-70 dark:opacity-90 mx-auto"
            src={working}
            width={80}
            alt="Loading"
          />
        )}
      </p>
    );
  }

  if (typeof summaryArray[0] === 'string') {
    return (
      <>
        {summaryArray.map((item, index) => (
          <div className="mb-4 text-slate-700 dark:text-slate-200" key={index}>
            <div className="summary-text quicksand font-bold">
              <ReactMarkdown>{item}</ReactMarkdown>
            </div>
          </div>
        ))}
      </>
    );
  }

  // Object-based summary array
  return (
    <>
      {Object.values(summaryArray).map((item, index) => (
        <div className="mb-4 text-slate-800 quicksand dark:text-slate-200" key={index}>
          <div className="text-l dark:border-indigo-100 p-4">
            <h3
              className="text-xl mb-1 quicksand font-bold underline text-slate-700 cursor-pointer dark:text-slate-200"
              onClick={() => handleClickTimestamp(item.at)}
            >
              {`${item.title}`}
            </h3>
            <h5 onClick={() => handleClickTimestamp(item.at)} className="mb-2 cursor-pointer">
              {formatTimestamp(item.at, convertTimeToSeconds)}
            </h5>
            {item.summary.split('\n').map((paragraph, paraIndex) => (
              <div
                key={paraIndex}
                className="quicksand font-normal text-slate-700 dark:text-slate-300 text-md mt-4"
              >
                <ReactMarkdown className="react-markdown-edit quicksand">{paragraph}</ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

// Helper function to format timestamps
const formatTimestamp = (time, convertTimeToSeconds) => {
  let seconds;
  
  if (typeof time === 'string' && time.match(/^PT/)) {
    seconds = convertTimeToSeconds(time);
  } else {
    seconds = time;
  }
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${secs < 10 ? `0${secs}` : secs}`;
};

export default Summary;