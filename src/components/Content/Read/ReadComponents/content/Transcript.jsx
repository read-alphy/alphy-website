import Loading from '../../../../Loading'
import DownloadOptions from './DownloadOptions'

const Transcript = ({
  isLoading,
  transcript,
  data,
  handleClickTimestamp,
  handleDownload,
  downloading,
  tier,
  basicDataLoaded,
  themePopover
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="content-area text-l font-normal max-w-screen-md overflow-auto h-full xl:max-h-[110vh]">
      {transcript.map((item, index) => {
        if (index % 2 === 0 && index < transcript.length) {
          // This is a timestamp entry
          return (
            <div key={index} className="flex flex-row dark:text-slate-300">
              {renderTimestampEntry(
                item, 
                index, 
                data, 
                handleClickTimestamp, 
                handleDownload, 
                downloading, 
                tier, 
                basicDataLoaded, 
                themePopover
              )}
            </div>
          );
        } else if (index % 2 === 1 && index < transcript.length) {
          // This is the transcript text
          return (
            <div className="summary-text" key={index}>
              <br />
              {item.replace(/\\h/g, ' ')}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

// Helper function to render timestamp entries
const renderTimestampEntry = (
  item, 
  index, 
  data, 
  handleClickTimestamp, 
  handleDownload, 
  downloading, 
  tier, 
  basicDataLoaded, 
  themePopover
) => {
  // For desktop view with YouTube or Twitch
  if (window.innerWidth > 999 && (data.source_type === 'yt' || data.source_type === 'tw')) {
    return (
      <>
        <a
          onClick={handleClickTimestamp}
          className={`${
            data.source_type === 'yt' || data.source_type === 'tw'
              ? 'lg:cursor-pointer lg:pointer-events-auto'
              : ''
          } lg:pointer-events-auto lg:text-slate-900 lg:font-bold underline dark:text-slate-300`}
        >
          <br />
          <p className="text-md summary-text">{item}</p>
        </a>

        {index === 0 && (
          <DownloadOptions
            handleDownload={handleDownload}
            downloading={downloading}
            tier={tier}
            basicDataLoaded={basicDataLoaded}
            themePopover={themePopover}
          />
        )}
      </>
    );
  }

  // For other source types or mobile view
  return (
    <>
      <a
        target="_blank"
        href={getExternalLink(data, item)}
        className={`summary-text ${
          data.source_type === 'yt' || data.source_type === 'tw'
            ? 'lg:cursor-pointer lg:pointer-events-auto'
            : ''
        } lg:pointer-events-auto lg:text-slate-900 dark:text-slate-300 font-bold underline`}
        rel="noreferrer"
      >
        <br />
        {item}
      </a>

      {index === 0 && (
        <DownloadOptions
          handleDownload={handleDownload}
          downloading={downloading}
          tier={tier}
          basicDataLoaded={basicDataLoaded}
          themePopover={themePopover}
        />
      )}
    </>
  );
};

// Helper function to generate external links
const getExternalLink = (data, timeString) => {
  if (data.source_type === 'up') return null;

  if (data.source_type === 'yt') {
    const parts = timeString.split(':');
    const seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    return `https://youtu.be/${data.source_id}?t=${Math.floor(seconds)}`;
  }

  if (data.source_type === 'tw') {
    const parts = timeString.split(':');
    return `https://www.twitch.tv/videos/${data.source_id}?t=${
      Math.floor(parseInt(parts[0])) + 'h' + 
      Math.floor(parseInt(parts[1])) + 'm' + 
      Math.floor(parseInt(parts[2])) + 's'
    }`;
  }

  if (data.source_type === 'sp') {
    return `https://twitter.com/i/spaces/${data.source_id}`;
  }

  return null;
};

export default Transcript;