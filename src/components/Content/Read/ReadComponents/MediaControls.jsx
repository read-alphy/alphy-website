import Image from 'next/image'
import { X, Youtube, Twitter } from 'lucide-react'
import TwitchIcon from '../../../../../public/img/twitch.png'

const MediaControls = ({
  data,
  showYouTubeFrame,
  handleShowYouTubeFrame
}) => {

  
  return (
    <>
      {/* YouTube Button */}
      {data.source_type === 'yt' && (
        <button
          onClick={handleShowYouTubeFrame}
          className={`z-50 ${showYouTubeFrame ? 
            'absolute bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-red-400 transform transition-all duration-500 ease-in-out hover:-translate-y-2 dark:bg-zinc-60' : 
            'lg:flex rounded-full bg-red-400 p-1 transition-opacity duration-200 hover:opacity-80 dark:bg-zinc-60'
          }`}
        >
          {showYouTubeFrame ? (
            <X size={28} className="text-white" />
          ) : (
            <Youtube size={20} className="text-white" strokeWidth={1.5}/>
          )}
        </button>
      )}

      {/* Twitch Button */}
      {data.source_type === 'tw' && (
        <button
          onClick={handleShowYouTubeFrame}
          className={`z-50 ${showYouTubeFrame ? 
            'fixed bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-[#9146ff] transform transition-all duration-500 ease-in-out hover:-translate-y-2 dark:bg-zinc-60' : 
            'lg:flex rounded-full bg-[#9146ff] p-2 transition-opacity duration-200 hover:opacity-80 dark:bg-zinc-60'
          }`}
        >
          {showYouTubeFrame ? (
            <X size={28} className="text-black" />
          ) : (
            <Image
              src={TwitchIcon}
              className="text-white opacity-80"
              width={24}
              height={24}
              alt="Twitch"
            />
          )}
        </button>
      )}

      {/* Twitter Spaces Button */}
      {/* {data.source_type === 'sp' && (
        <button
          onClick={handleShowYouTubeFrame}
          className={`z-50 ${showYouTubeFrame ? 
            'fixed bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-[#7366d7] transform transition-all duration-500 ease-in-out hover:-translate-y-2' : 
            'lg:flex rounded-full bg-[#7366d7] p-2 transition-opacity duration-200 hover:opacity-80'
          }`}
        >
          {showYouTubeFrame ? (
            <X size={28} className="text-white" />
          ) : (
            <Twitter size={20} className="text-white" />
          )}
        </button>
      )} */}

      {/* X (Twitter) Video Button */}
      {data.source_type === 'x' && (
        <button
          onClick={handleShowYouTubeFrame}
          className={`z-50 ${showYouTubeFrame ? 
            'fixed bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-black transform transition-all duration-500 ease-in-out hover:-translate-y-2' : 
            'lg:flex rounded-full bg-black p-2 transition-opacity duration-200 hover:opacity-80'
          }`}
        >
          {showYouTubeFrame ? (
            <X size={28} className="text-white" />
          ) : (
            <Twitter size={20} className="text-white" />
          )}
        </button>
      )}

      {/* Apple Podcast Button */}
      {data.source_type === 'ap' && (
        <button
          onClick={handleShowYouTubeFrame}
          className={`z-50 ${showYouTubeFrame ? 
            'fixed bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-[#ff4cd7] transform transition-all duration-500 ease-in-out hover:-translate-y-2 dark:bg-zinc-60' : 
            'lg:flex rounded-full bg-[#ff4cd7] p-2 transition-opacity duration-200 hover:opacity-80 dark:bg-zinc-60'
          }`}
        >
          {showYouTubeFrame ? (
            <X size={28} className="text-white" />
          ) : (
            <svg
              fill="#ffffff"
              width="24px"
              height="24px"
              viewBox="-32 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z" />
              </g>
            </svg>
          )}
        </button>
      )}
    </>
  );
};

export default MediaControls;