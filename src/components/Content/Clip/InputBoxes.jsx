import React, { useEffect } from 'react';
import ZoomSlider from './ZoomSlider';

export default function InputBoxes (
    { 
        startTime,
        endTime,
        audioLength,
        setStartTime,
        setEndTime,
        recreateRegion,
        regionRef,
        inputStartHoursRef,
        inputStartMinutesRef,
        inputStartSecondsRef,
        inputEndHoursRef,
        inputEndMinutesRef,
        inputEndSecondsRef,
        waveSurferRef,
        zoomLevel,
        setZoomLevel
    }) {

        const formatToDoubleDigit = (num) => (num < 10 ? `0${num}` : `${num}`);


  useEffect(() => {
    inputStartHoursRef.current.value = formatToDoubleDigit(Math.floor(startTime / 3600))
    inputStartMinutesRef.current.value = formatToDoubleDigit(Math.floor((startTime % 3600) / 60))
    inputStartSecondsRef.current.value = formatToDoubleDigit(Math.floor(startTime % 60))
  }, [startTime]);

  useEffect(() => {
    inputEndHoursRef.current.value = formatToDoubleDigit(Math.floor(endTime / 3600))
    inputEndMinutesRef.current.value = formatToDoubleDigit(Math.floor((endTime % 3600) / 60))
    inputEndSecondsRef.current.value = formatToDoubleDigit(Math.floor(endTime % 60))
  }, [endTime]);



return(
    <div className="flex  flex-col mt-2 w-full  gap-6 items-center  justify-center mx-auto">
        <div className="flex flex-row w-full mx-auto items-center justify-center mt-10 gap-6">
          
          <p>Zoom</p>
        <ZoomSlider zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} waveSurferRef={waveSurferRef} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-row gap-2">
              <p className="mt-1 w-[50px]">Start</p>
              <div
                className={`text-sm 
                  dark:bg-zinc-800 bg-slate-100
                rounded-md p-1 outline-none border-none text-center flex items-center `}
              >
                <input
                  type="number"
                  className={`text-sm
                    dark:bg-zinc-800 bg-slate-100
                  rounded-md p-1 outline-none border-none w-12 text-center`}
                  value={Math.floor(startTime / 3600) || 0}
                  ref={inputStartHoursRef}
                  onBlur={(e) => {
                    const hours = e.target.value ? parseInt(e.target.value) : 0;
                    const newStartTime = hours * 3600 + (startTime % 3600);
                    if (newStartTime > audioLength) {
                      setStartTime(audioLength);
                    } else if (newStartTime < 0) {
                      setStartTime(0);
                    } else {
                      setStartTime(newStartTime);
                      recreateRegion(newStartTime, endTime);
                    }
                  }}
                  onChange={(e) => {
                    const hours = e.target.value ? parseInt(e.target.value) : 0;
                    const newStartTime = hours * 3600 + (startTime % 3600);
                    const currentRegion = regionRef.current;
                    if (currentRegion) {
                      currentRegion.start = newStartTime;
                    }
                    setStartTime(newStartTime);
                    recreateRegion(newStartTime, endTime);
                  }}
                  min={0}
                  max={99}
                  placeholder="hh"
                />
                <span className="select-none">:</span>
                <input
                  type="number"
                  className={`text-sm dark:bg-zinc-800 bg-slate-100 rounded-md p-1 outline-none border-none w-12 text-center`}
                  value={Math.floor((startTime % 3600) / 60) || 0}
                  ref={inputStartMinutesRef}
                  onBlur={(e) => {
                    const minutes = e.target.value
                      ? parseInt(e.target.value)
                      : 0;
                    const newStartTime =
                      Math.floor(startTime / 3600) * 3600 +
                      minutes * 60 +
                      (startTime % 60);
                    if (isNaN(newStartTime)) {
                      return;
                    }
                    if (newStartTime > audioLength) {
                      setStartTime(audioLength);
                    } else if (newStartTime < 0) {
                      setStartTime(0);
                    } else {
                      setStartTime(newStartTime);
                      recreateRegion(newStartTime, endTime);
                    }
                  }}
                  onChange={(e) => {
                    const minutes = e.target.value
                      ? parseInt(e.target.value)
                      : 0;
                    const newStartTime =
                      Math.floor(startTime / 3600) * 3600 +
                      minutes * 60 +
                      (startTime % 60);
                    const currentRegion = regionRef.current;
                    if (currentRegion) {
                      currentRegion.start = newStartTime;
                    }
                    setStartTime(newStartTime);
                    recreateRegion(newStartTime, endTime);
                  }}
                  min={0}
                  max={59}
                  placeholder="mm"
                />
                <span className="select-none">:</span>
                <input
                  type="number"
                  className={`text-sm dark:bg-zinc-800 bg-slate-100 rounded-md p-1 outline-none border-none w-12 text-center`}
                  value={formatToDoubleDigit(Math.floor(startTime % 60)) || 0}
                  ref={inputStartSecondsRef}
                  onBlur={(e) => {
                    const seconds = e.target.value
                      ? parseInt(e.target.value)
                      : 0;
                    const newStartTime =
                      Math.floor(startTime / 60) * 60 + seconds;
                    if (isNaN(newStartTime)) {
                      return;
                    }
                    if (newStartTime > audioLength) {
                      setStartTime(audioLength);
                    } else if (newStartTime < 0) {
                      setStartTime(0);
                    } else {
                      setStartTime(newStartTime);
                      recreateRegion(newStartTime, endTime);
                    }
                  }}
                  onChange={(e) => {
                    const seconds = e.target.value
                      ? parseInt(e.target.value)
                      : 0;
                    const newStartTime =
                      Math.floor(startTime / 60) * 60 + seconds;
                    const currentRegion = regionRef.current;
                    if (currentRegion) {
                      currentRegion.start = newStartTime;
                    }
                    setStartTime(newStartTime);
                    recreateRegion(newStartTime, endTime);
                  }}
                  min={0}
                  max={59}
                  placeholder="ss"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
            <p className="mt-1 w-[50px]">
              End</p>
            <div
              className={`text-sm dark:bg-zinc-800 bg-slate-100 rounded-md p-1 outline-none border-none text-center flex items-center `}
            >
              <input
                type="number"
                className={`text-sm dark:bg-zinc-800 bg-slate-100 rounded-md p-1 outline-none border-none w-12 text-center`}
                value={Math.floor(endTime / 3600) || 0}
                ref={inputEndHoursRef}
                onBlur={(e) => {
                  const hours = e.target.value ? parseInt(e.target.value) : 0;
                  const newEndTime = hours * 3600 + (endTime % 3600);
                  if (newEndTime > audioLength) {
                    setEndTime(audioLength);
                  } else if (newEndTime < 0) {
                    setEndTime(0);
                  } else {
                    setEndTime(newEndTime);
                    recreateRegion(startTime, newEndTime);
                  }
                }}
                onChange={(e) => {
                  const hours = e.target.value ? parseInt(e.target.value) : 0;
                  const newEndTime = hours * 3600 + (endTime % 3600);
                  const currentRegion = regionRef.current;
                  if (currentRegion) {
                    currentRegion.end = newEndTime;
                  }
                  setEndTime(newEndTime);
                  recreateRegion(startTime, newEndTime);
                }}
                min={0}
                max={99}
                placeholder="hh"
              />
              <span className="select-none">:</span>
              <input
                type="number"
                className={`text-sm dark:bg-zinc-800 bg-slate-100 rounded-md p-1 outline-none border-none w-12 text-center`}
                value={Math.floor((endTime % 3600) / 60) || 0}
                ref={inputEndMinutesRef}
                onBlur={(e) => {
                  const minutes = e.target.value ? parseInt(e.target.value) : 0;
                  const newEndTime =
                    Math.floor(endTime / 3600) * 3600 +
                    minutes * 60 +
                    (endTime % 60);
                  if (isNaN(newEndTime)) {
                    return;
                  }
                  if (newEndTime > audioLength) {
                    setEndTime(audioLength);
                  } else if (newEndTime < 0) {
                    setEndTime(0);
                  } else {
                    setEndTime(newEndTime);
                    recreateRegion(startTime, newEndTime);
                  }
                }}
                onChange={(e) => {
                  const minutes = e.target.value ? parseInt(e.target.value) : 0;
                  const newEndTime =
                    Math.floor(endTime / 3600) * 3600 +
                    minutes * 60 +
                    (endTime % 60);
                  const currentRegion = regionRef.current;
                  if (currentRegion) {
                    currentRegion.end = newEndTime;
                  }
                  setEndTime(newEndTime);
                  recreateRegion(startTime, newEndTime);
                }}
                min={0}
                max={59}
                placeholder="mm"
              />
              <span className="select-none">:</span>
              <input
                type="number"
                className={`text-sm dark:bg-zinc-800 bg-slate-100 rounded-md p-1 outline-none border-none w-12 text-center`}
                value={Math.floor(endTime) % 60 || 0}
                ref={inputEndSecondsRef}
                onBlur={(e) => {
                  const seconds = e.target.value ? parseInt(e.target.value) : 0;
                  const newEndTime = Math.floor(endTime / 60) * 60 + seconds;
                  if (isNaN(newEndTime)) {
                    return;
                  }
                  if (newEndTime > audioLength) {
                    setEndTime(audioLength);
                  } else if (newEndTime < 0) {
                    setEndTime(0);
                  } else {
                    setEndTime(newEndTime);
                    recreateRegion(startTime, newEndTime);
                  }
                }}
                onChange={(e) => {
                  const seconds = e.target.value ? parseInt(e.target.value) : 0;
                  const newEndTime = Math.floor(endTime / 60) * 60 + seconds;
                  const currentRegion = regionRef.current;
                  if (currentRegion) {
                    currentRegion.end = newEndTime;
                  }
                  setEndTime(newEndTime);
                  recreateRegion(startTime, newEndTime);
                }}
                min={0}
                max={59}
                placeholder="ss"
              />
            </div>
            </div>
          </div>
          </div>
)
}