export default function ButtonsClip({
  startTime,
  endTime,
  clipRequest,
  videoLoading,
  videoReady,
  handleReset,
  handleDownloadVideo,
}) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center ${
        videoLoading && "hidden"
      }`}
    >
      <div className="w-full relative flex flex-row items-center margin-auto justify-center mt-6 gap-6">
        {videoReady ? (
          <div className="flex flex-row gap-2">
            <button></button>
            <button
              onClick={() => handleReset()}
              className="px-8 py-1 rounded-lg bg-sky-500 text-white font-semibold  flex flex-row gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                class="w-4 h-4 mt-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>

              <span> Reset </span>
            </button>
            <button
              onClick={() => handleDownloadVideo()}
              className="px-4 py-1 rounded-lg bg-indigo-400 text-white font-semibold flex flex-row gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                class="w-4 h-4 mt-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>

              <span>Download</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              clipRequest(startTime.toFixed(1), endTime.toFixed(1), false)
            }
            className=" px-20 py-1 rounded-lg bg-indigo-600 text-white font-averta-regular "
          >
            Clip!
          </button>
        )}
      </div>
    </div>
  );
}
