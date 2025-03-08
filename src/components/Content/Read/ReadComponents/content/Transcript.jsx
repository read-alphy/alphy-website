import React from 'react';
import Loading from '../../../../Loading';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="content-area text-base font-normal max-w-screen-md overflow-auto h-full xl:max-h-[110vh] px-1"
    >
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
            <div className="summary-text leading-relaxed mb-4" key={index}>
              <br />
              {item.replace(/\\h/g, ' ')}
            </div>
          );
        }
        return null;
      })}
    </motion.div>
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
          } lg:pointer-events-auto lg:text-slate-900 lg:font-semibold underline hover:text-blue-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-blue-400`}
        >
          <br />
          <p className="text-sm tracking-wide summary-text">{item}</p>
        </a>
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
        } lg:pointer-events-auto lg:text-slate-900 dark:text-slate-300 font-semibold underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200`}
        rel="noreferrer"
      >
        <br />
        <span className="text-sm tracking-wide">{item}</span>
      </a>
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