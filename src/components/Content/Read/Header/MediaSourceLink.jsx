import React from 'react';
import Image from 'next/image';
import TwitchIcon from '../../../../../public/img/twitch.png';
import TwitterLogo from '../../../../../public/img/twitter_logo_blue.svg';
import YoutubeIcon from '../../../../../public/img/youtube.png';


export default function MediaSourceLink({ data, theme }) {
  const sourceType = data?.source_type;
  const sourceId = data?.source_id;

  // Don't render anything if we don't have the right source type
  if (!sourceType || !sourceId) return null;

  // Common styles for all media source links
  const linkClasses = "flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200";
  const textClasses = "text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium";

  // Return the appropriate link based on source type
  switch (sourceType) {
    case 'yt':
      return (
        <a
          target="_blank"
          className={linkClasses}
          href={`https://www.youtube.com/watch?v=${sourceId}`}
          rel="noreferrer"
          aria-label="Watch on YouTube"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <Image 
              src={YoutubeIcon} 
              width={24} 
              height={24} 
              alt="Youtube Icon" 
            />
          </div>
          <p className={textClasses}>
            Watch on YouTube
          </p>
        </a>
      );
    
    case 'sp':
      return (
        <a
          className={linkClasses}
          target="_blank"
          href={`https://x.com/i/status/${sourceId}`}
          rel="noreferrer"
          aria-label="Listen on Twitter Spaces"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <Image 
              src={TwitterLogo} 
              width={20} 
              height={20} 
              alt="Twitter Icon" 
            />
          </div>
          <p className={textClasses}>
            Listen on Twitter Spaces
          </p>
        </a>
      );
    
    case 'tw':
      return (
        <a
          className={linkClasses}
          target="_blank"
          href={`https://www.twitch.tv/videos/${sourceId}`}
          rel="noreferrer"
          aria-label="Watch on Twitch"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <Image 
              src={TwitchIcon} 
              width={20} 
              height={20} 
              alt="Twitch Icon" 
            />
          </div>
          <p className={textClasses}>
            Watch on Twitch
          </p>
        </a>
      );
    
    case 'x':
      return (
        <a
          className={linkClasses}
          target="_blank"
          href={`https://www.x.com/i/status/${sourceId}`}
          rel="noreferrer"
          aria-label="View on X"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <svg
              width={18}
              height={18}
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 512 462.799"
              className="text-slate-700 dark:text-zinc-200"
              fill="currentColor"
            >
              <path
                fillRule="nonzero"
                d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
              />
            </svg>
          </div>
          <p className={textClasses}>
            View on X
          </p>
        </a>
      );
    
    case 'ap':
      return (
        <a
          className={linkClasses}
          target="_blank"
          href={`https://podcasts.apple.com/podcast/id${
            sourceId.split('-')[0]
          }?i=${sourceId.split('-')[1]}`}
          rel="noreferrer"
          aria-label="Listen on Apple Podcasts"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <svg
              fill={theme === 'dark' ? '#f4f4f5' : '#27272a'}
              width="18"
              height="18"
              viewBox="-32 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z" />
            </svg>
          </div>
          <p className={textClasses}>
            Listen on Apple Podcasts
          </p>
        </a>
      );
    
    default:
      return null;
  }
}