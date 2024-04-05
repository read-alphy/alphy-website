import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";
import LoadingAudio from "./LoadingAudio";
import InputBoxes from "./InputBoxes";
import {useTheme} from 'next-themes';



const RangeSlider = ({
  audioUrl,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  audioLength,
  setAudioLength,
}) => {
  const sliderRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [showPlay, setShowPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentLoaded, setPercentLoaded] = useState(0);

  const [zoomLevel, setZoomLevel] = useState(0);
  const {theme} = useTheme();

  // Give regions a random color when they are created

  let tempStartTime = 30;
  let tempEndTime = 130;
  const regionRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const inputStartHoursRef = useRef(null);
  const inputStartMinutesRef = useRef(null);
  const inputStartSecondsRef = useRef(null);
  const inputEndHoursRef = useRef(null);
  const inputEndMinutesRef = useRef(null);
  const inputEndSecondsRef = useRef(null);

  const wsRegionsRef = useRef(null);


  useEffect(() => {
    const audioPlayer = document.getElementById("audioPlayer");
    const wavesurfer = WaveSurfer.create({
      container: wavesurferRef.current,
      waveColor: "violet",
      progressColor: "purple",
      height: 120,
      cursorWidth: 0,
      cursorColor: "white",
      barWidth: 6,
      barRadius: 25,
      barGap: 8,
      responsive: true,
      hideScrollbar: true,
      url: audioUrl,
    });

    waveSurferRef.current = wavesurfer;

    wavesurfer.on("loading", (percent) => {
      setPercentLoaded(percent);
    });

    wavesurfer.registerPlugin(
      ZoomPlugin.create({
        // the amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
        scale: 0.1,
        // Optionally, specify the maximum pixels-per-second factor while zooming
        maxZoom: 100,
      })
    );

    const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());
    wsRegionsRef.current = wsRegions;
    wavesurfer.on("decode", () => {
      wsRegions.addRegion({
        start: tempStartTime,
        end: tempEndTime,
        color: `${theme!=="light" ? "rgba(255,255,255,0.3)" : "rgba(67,56,202,0.2)"}`,
        drag: true,
        resize: true,
        loop: false,
      });
    });

   

    wavesurfer.on("error", (error) => {
      console.error("WaveSurfer error:", error);
    });

    wavesurfer.on("timeupdate", () => {
      if (waveSurferRef.current) {
        setCurrentTime(waveSurferRef.current.getCurrentTime().toFixed(1));
      }
    });

    wavesurfer.on("click", () => {
      wavesurfer.play();
    });

    wavesurfer.on("play", () => {
      setShowPlay(false);
    });
    wavesurfer.on("pause", () => {
      setShowPlay(true);
    });

    wavesurfer.on("ready", () => {
      const duration = waveSurferRef.current.getDuration();
      setIsLoading(false);
      setAudioLength(duration);
    });

    wsRegions.on("region-created", (region) => {
      regionRef.current = region;

      if (region.element) {
        region.element.style.borderRadius = "20px";
      }
      // Then, find the handles within the region element.
      const handles = region.element.querySelectorAll(
        '[part*="region-handle"]'
      );

      // Apply styles to the left handle
      const leftHandle = handles[0]; // assuming the first one is the left
      if (leftHandle) {
        leftHandle.style.opacity = 0; // hide the left handle
        // Add other styles you want to apply to the left handle here
      }

      // Apply styles to the right handle
      const rightHandle = handles[1]; // assuming the second one is the right
      if (rightHandle) {
        rightHandle.style.opacity = 0; // hide the right handle
        // Add other styles you want to apply to the right handle here
      }
    });
    wsRegions.on("region-updated", (region) => {
      const tolerance = 0.00001; // Adjust tolerance as needed for your use case
      let startTimeChanged = Math.abs(region.start - tempStartTime) > tolerance;
      let endTimeChanged = Math.abs(region.end - tempEndTime) > tolerance;

      if (startTimeChanged) {
        tempStartTime = region.start;
        setStartTime(region.start);
        wavesurfer.seekTo(region.start / region.totalDuration);
        wavesurfer.play();
      }
      if (endTimeChanged) {
        tempEndTime = region.end;
        setEndTime(region.end);
      }
    });
    wsRegions.on("region-double-clicked", (region) => {
      wsRegions.clearRegions();
      wsRegions.addRegion({
        start: wavesurfer.getCurrentTime() ? wavesurfer.getCurrentTime() : 0,
        end: wavesurfer.getCurrentTime() + tempEndTime,
        color: `${theme!=='light' ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
        drag: true,
        resize: true,
        loop: false,
      });
      setStartTime(
        wavesurfer.getCurrentTime() ? wavesurfer.getCurrentTime() : 0
      );
      setEndTime(wavesurfer.getCurrentTime() + tempEndTime);
    });
    wavesurfer.on("dblclick", () => {
      wsRegions.clearRegions();
      wsRegions.addRegion({
        start: wavesurfer.getCurrentTime() ? wavesurfer.getCurrentTime() : 0,
        end: wavesurfer.getCurrentTime() + tempEndTime,
        color: `${theme!=='light'  ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
        drag: true,
        resize: true,
        loop: false,
      });
      setStartTime(
        wavesurfer.getCurrentTime() ? wavesurfer.getCurrentTime() : 0
      );
      setEndTime(wavesurfer.getCurrentTime() + tempEndTime);
    });

    return () => {
      setStartTime(tempStartTime);
      setEndTime(tempEndTime);
      wavesurfer.destroy();
    };
  }, [audioUrl, tempStartTime, tempEndTime]);

  const togglePlay = () => {
    waveSurferRef.current.playPause();
  };

  const timeDisplay = (time) => {
    function convertTimeToSeconds(time) {
      // Check if the input is a string and matches the ISO 8601 duration format
      if (typeof time === "string" && time.match(/^PT/)) {
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
      } else if (
        typeof time === "number" ||
        (typeof time === "string" && time.match(/^\d+(?:\.\d+)?$/))
      ) {
        // If the input is a numeric value or a string representing a number, parse it directly
        return parseFloat(time);
      } else {
        // If the input is neither, return null or throw an error
        return null;
      }
    }

    return `${
      Math.floor(convertTimeToSeconds(time) / 3600) < 10
        ? `0${Math.floor(convertTimeToSeconds(time) / 3600)}`
        : `${Math.floor(convertTimeToSeconds(time) / 3600)}`
    } ${":"} ${
      Math.floor(convertTimeToSeconds(time) / 60) < 10
        ? `0${Math.floor(convertTimeToSeconds(time) / 60)}`
        : Math.floor(convertTimeToSeconds(time) % 3600) < 600
        ? `0${Math.floor(
            convertTimeToSeconds(time) / 60 -
              Math.floor(convertTimeToSeconds(time) / 3600) * 60
          )}`
        : Math.floor(
            convertTimeToSeconds(time) / 60 -
              Math.floor(convertTimeToSeconds(time) / 3600) * 60
          )
    } ${":"} ${
      Math.floor(convertTimeToSeconds(time) % 60) < 10
        ? `0${Math.floor(convertTimeToSeconds(time) % 60)}`
        : Math.floor(convertTimeToSeconds(time) % 60)
    }`;
  };

  function convertToSeconds(timeString) {
    // Remove all colons and spaces to work with just the digits
    let digits = timeString.replace(/[:\s]/g, "");

    // Check if the length of the string exceeds 6 (HH:MM:SS), indicating an error
    if (digits.length > 6) {
      // Remove the leftmost digit
      digits = digits.substring(1);
    }

    // Reformat the string to HH:MM:SS
    let correctedString = digits.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");

    const correctedTime = correctedString;

    const [hours, minutes, seconds] = correctedTime.split(":").map(Number);

    return hours * 3600 + minutes * 60 + seconds;
  }

  function recreateRegion(newStartTime, newEndTime) {
    if (!wsRegionsRef.current) {
      return;
    }
    if (newStartTime > newEndTime) {
      newEndTime = newStartTime + (endTime - startTime);
      setEndTime(newEndTime);
    }
    if (newStartTime > audioLength) {
      newStartTime = 0;
      setStartTime(0);
    }
    wsRegionsRef.current.clearRegions();
    wsRegionsRef.current.addRegion({
      start: newStartTime,
      end: newEndTime,
      color: `${theme!=='light'  ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
      drag: true,
      resize: true,
      loop: false,
    });
  }

  return (
    <div className="relative mt-10 overflow-hidden" ref={sliderRef}>
      <div className={`${isLoading ? "flex" : "hidden"} text-2xl `}>
        <LoadingAudio
          percentLoaded={percentLoaded}
          
          isLoading={isLoading}
        />
      </div>

      <div
        className={`${
          isLoading ? "hidden" : "flex flex-col"
        }  overflow-hidden relative`}
        ref={sliderRef}
      >
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-[150px]">
            <button
              onClick={togglePlay}
              className="bg-indigo-500 p-4 w-fit mx-auto text-zinc-200 rounded-full h-fit items-center my-auto justify-center flex  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${showPlay === true ? "hidden" : "flex"} w-8 h-8`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${showPlay === true ? "flex" : "hidden"} w-8 h-8`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            </button>

            <div className="flex flex-col justify-center text-center items-center">
              <span 
              onClick={() => {
                setStartTime(Math.floor(currentTime));
                setEndTime(Math.floor(currentTime) + 30);
                recreateRegion(
                  Math.floor(currentTime),
                  Math.floor(currentTime) + 30
                );
              }}
              className="text-sm dark:text-zinc-300 w-full cursor-pointer">
                {" "}
                {timeDisplay(currentTime)}
              </span>
             
            </div>
          </div>
          <div className="flex flex-col w-full">
          <div ref={wavesurferRef} className="w-full max-w-[900px]"></div>


          
          
         
        
        </div>
        </div>

        <InputBoxes
          
          startTime={startTime}
          endTime={endTime}
          audioLength={audioLength}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          recreateRegion={recreateRegion}
          regionRef={regionRef}
          inputStartHoursRef={inputStartHoursRef}
          inputStartMinutesRef={inputStartMinutesRef}
          inputStartSecondsRef={inputStartSecondsRef}
          inputEndHoursRef={inputEndHoursRef}
          inputEndMinutesRef={inputEndMinutesRef}
          inputEndSecondsRef={inputEndSecondsRef}
          waveSurferRef={waveSurferRef}
          zoomLevel = {zoomLevel}
          setZoomLevel = {setZoomLevel}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
