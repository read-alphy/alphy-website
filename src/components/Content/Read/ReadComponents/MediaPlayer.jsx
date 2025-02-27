import Image from 'next/image'
import TwitterSpaces from '../../../../../public/img/twitter_space.png'
import X from '../../../../../public/img/X.png'

const MediaPlayer = ({
  data,
  transcript,
  showYouTubeFrame,
  videoRef,
  canvasRef,
  autoplay,
  timestamp,
  title,
  theme
}) => {
  if (!showYouTubeFrame) return null;

  return (
    <div>
      {/* YouTube Player */}
      {data.source_type === 'yt' && (transcript.length > 0 || data.complete === true) && (
        <div className={`hidden lg:flex justify-center items-center`}>
          <div>
            <iframe
              id="player"
              ref={videoRef}
              title="My YouTube Video"
              className={`fixed bottom-24 right-4 w-[480px] h-[320px] rounded-lg z-50 transition-all duration-500 ease-in-out transform hover:scale-105 ${
                showYouTubeFrame ? 'opacity-100' : 'opacity-0'
              }}`}
              src={`https://www.youtube.com/embed/${data.source_id}?autoplay=${autoplay}&start=${timestamp}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        </div>
      )}

      {/* Twitch Player */}
      {data.source_type === 'tw' && (transcript.length > 0 || data.complete === true) && (
        <div className={`hidden lg:flex justify-center items-center`}>
          <div>
            <iframe
              ref={videoRef}
              className={`fixed bottom-24 right-4 w-[480px] h-[320px] rounded-lg z-50 transition-all duration-500 ease-in-out transform hover:scale-105 ${
                showYouTubeFrame ? 'opacity-100' : 'opacity-0'
              }}`}
              src={`https://player.twitch.tv/?video=v${
                data.source_id
              }&parent=${
                window.location.href.includes('localhost')
                  ? 'localhost'
                  : window.location.href.includes('alphy.app')
                  ? 'alphy.app'
                  : 'staging--alphy-web.netlify.app'
              }&autoplay=${
                autoplay === 0 ? 'false' : 'true'
              }&t=${timestamp}`}
              width="100%"
              height="100%"
              allowFullScreen={true}
              title={title ? title : ''}
            ></iframe>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        </div>
      )}

      {/* Apple Podcast Player */}
      {data.source_type === 'ap' && (transcript.length > 0 || data.complete === true) && (
        <div className={`hidden lg:flex justify-center items-center`}>
          <div>
            <iframe
              ref={videoRef}
              className={`fixed drop-shadow-xl bottom-24 right-4 w-[540px] h-[160px] rounded-lg z-50 transition-all duration-500 ease-in-out transform hover:scale-105 ${
                showYouTubeFrame ? 'opacity-100' : 'opacity-0'
              }}`}
              src={`https://embed.podcasts.apple.com/podcast/id${
                data.source_id.split('-')[0]
              }?i=${data.source_id.split('-')[1]}&theme=${
                theme === 'dark' ? 'dark' : 'light'
              }`}
              width="100%"
              height="100%"
              allowFullScreen={true}
              title={title ? title : ''}
            ></iframe>
          </div>
        </div>
      )}

      {/* Twitter Spaces Link */}
      <div
        className={`bg-white dark:bg-mildDarkMode border pt-6 cursor-default items-center border-zinc-300 dark:border-zinc-500 drop-shadow-lg rounded-xl fixed bottom-24 right-4 min-w-[360px] max-w-[400px] min-h-[240px] z-50 ${
          data.source_type === 'sp' ? 'hidden lg:flex' : ' hidden'
        }`}
      >
        <a
          className="flex flex-col col-span-1 hidden lg:flex mx-auto mb-5 mt-3"
          target="_blank"
          href={`https://twitter.com/i/spaces/${data.source_id}`}
          rel="noreferrer"
        >
          <Image
            src={TwitterSpaces}
            className="w-[240px] h-[120px] mx-auto"
            width={240}
            alt="X Spaces"
          />
          <p className="text-md text-slate-600 dark:text-slate-300 mt-10 text-center px-5 mx-auto underline quicksand font-bold">
            Listen to{' '}
            <span className="font-bold pb-6 hyphenate quicksand font-bold">
              "{`${title}`.substring(0, 90)}{' '}
              {title.length > 90 && '...'}"
            </span>{' '}
            on Twitter
          </p>
        </a>
      </div>

      {/* X (Twitter) Video Link */}
      <div
        className={`bg-white dark:bg-mildDarkMode border pt-6 cursor-default items-center border-zinc-300 dark:border-zinc-500 drop-shadow-lg rounded-xl fixed bottom-24 right-4 min-w-[360px] max-w-[400px] min-h-[240px] z-50 ${
          data.source_type === 'x' ? 'hidden lg:flex' : ' hidden'
        }`}
      >
        <a
          className="flex flex-col col-span-1 hidden lg:flex mx-auto mb-5 mt-3"
          target="_blank"
          href={`https://twitter.com/i/status/${data.source_id}`}
          rel="noreferrer"
        >
          <Image 
            src={X} 
            className="w-[240px] h-[120px] mx-auto" 
            width={240}
            alt="X Video"
          />
          <p className="text-md text-slate-600 dark:text-slate-300 mt-10 text-center px-5 mx-auto underline quicksand font-bold">
            Watch{' '}
            <span className="font-bold pb-6 hyphenate quicksand font-bold">
              "{`${title}`.substring(0, 90)}{' '}
              {title.length > 90 && '...'}"
            </span>{' '}
            on Twitter
          </p>
        </a>
      </div>
    </div>
  );
};

export default MediaPlayer;