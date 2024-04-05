import Konva from "konva";
import { Stage, Layer, Circle } from "react-konva";

import React, { useState, useEffect } from "react";
import RangeSlider from "./RangeSlider";
import VideoOutput from "./VideoOutput";
import axios from "axios";
import ButtonsClip from "./ButtonsClip";

export default function Clip({ timestamp, data }) {
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [startTime, setStartTime] = useState(30);
  const [endTime, setEndTime] = useState(130);
  const [isPreview, setIsPreview] = useState(true);
  const [title, setTitle] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [dataReady, setDataReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [audioLength, setAudioLength] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    setTitle(data.title);
    setCreatorName(data.creator_name);
    setDataReady(true);
  }, [data]);

  useEffect(() => {
    if (audioLength !== 0) {
        console.log("Audio loaded");
      setAudioLoaded(true);
    }
  }, [audioLength]);

  const audioUrl =
    "https://storage.googleapis.com/furkan-s3-audio-demo/gush_28.mp3";

  const handleIntervalChange = (startTime, endTime) => {
    // Handle the selected interval
    console.log(`Selected interval: ${startTime}s - ${endTime}s`);
  };

  const clipRequest = async (startTime, endTime, forPreview) => {
    setIsPreview(forPreview);
    setVideoBlob(null);
    setVideoLoading(true);
    setVideoReady(false);
    try {
      const response = await axios.post(
        `http://35.222.44.57:3001/create_audiogram?start_time=${startTime}&end_time=${endTime}&title=${title}&creator_name=${creatorName}&is_preview=${forPreview}`,
        {},
        { responseType: "blob", timeout: 60000 }
      );

      setVideoBlob(response.data);
      setVideoLoading(false);
      setVideoReady(true);
    } catch (error) {
      setIsPreview(false);
      setVideoLoading(false);
      setVideoReady(false);
      setVideoBlob(null);
      if (error.response) {
        console.error("Backend error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const handleReset = () => {
    setIsPreview(true);
    setVideoBlob(null);
    setVideoReady(false);
  };

  const handleDownloadVideo = () => {
    const url = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.mp4`;
    document.body.appendChild(a); 
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  

  return (
    <div className="max-w-[1000px]">
      {dataReady && (
        <div>
          {videoBlob === null && videoLoading === false ? (
            <RangeSlider
              audioUrl={audioUrl}
              onIntervalChange={handleIntervalChange}
              timestamp={timestamp}
              clipRequest={clipRequest}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              audioLength={audioLength}
              setAudioLength={setAudioLength}
            />
          ) : (
            <VideoOutput videoBlob={videoBlob} videoLoading={videoLoading} />
          )}

{audioLoaded &&
          <ButtonsClip
            clipRequest={clipRequest}
            startTime={startTime}
            endTime={endTime}
            videoLoading={videoLoading}
            isPreview={isPreview}
            setIsPreview={setIsPreview}
            handleReset={handleReset}
            videoReady={videoReady}
            handleDownloadVideo={handleDownloadVideo}
          />
}
        </div>
      )}
    </div>
  );
}
