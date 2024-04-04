import working from "../Read/working.svg";
import Image from "next/image";

export default function VideoOutput({ videoBlob, videoLoading }) {
  return (
    <div>
      {videoLoading == true ? (
        <div className="flex w-full justify-center mx-auto">
          <div className="flex flex-col">
            <Image
              className={"opacity-70 dark:opacity-90 mx-auto "}
              src={working}
              alt="My SVG"
            />
            Generating the soundbite... Please do not close the tab.
          </div>
        </div>
      ) : videoBlob !==null ? (
        <div className="flex w-full justify-center mx-auto">
          <video
            className="lg:max-w-[500px] mt-20  border-4 rounded-lg border-zinc-900 dark:border-zinc-400 drop-shadow-lg"
            autoPlay
            controls
          >
            <source src={URL.createObjectURL(videoBlob)} type="video/mp4" />
          </video>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
