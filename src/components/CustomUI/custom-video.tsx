"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Eye, Languages, RefreshCcw } from "lucide-react";
import ProcessButton from "@/components/CustomUI/process-button";
import InputCheck from "@/components/CustomUI/custom-input";
import { Caption } from "@/components/CustomUI/subtitle-panel";

type VideoProps = {
  caption?: Caption;
  uploadVideoUrl: string;
};

export default function VideoComponent({
  caption,
  uploadVideoUrl,
}: VideoProps) {
  const [stepNumber, setStepNumber] = useState(1);
  const buttons = [
    { text: "听原声", id: 1 },
    { text: "静音模仿", id: 2 },
    { text: "同步读x1", id: 3 },
    { text: "同步读x2", id: 4 },
  ];

  const [showVideo, setShowVideo] = useState(true);
  const [isSubtitleVisible, setSubtitleVisible] = useState(true);
  const [isMuted, setMuted] = useState(false);

  // 隐藏或显示字幕
  const toggleSubtitle = () => {
    setSubtitleVisible(!isSubtitleVisible);
  };

  // 点击按钮选择第步骤
  const handleButtonClick = (id: number): void => {
    setStepNumber(id);
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  // 确定视频播放时间区间
  const [startTime, setStartTime] = useState<number>(0);
  // 播放次数
  const [playCount, setPlayCount] = useState<number>(1);

  const handleCaptionClick = () => {
    setPlayCount(playCount + 1);
  };

  // 单次播放函数
  const playFromStartToEnd = (
    start: number,
    end: number,
    callback?: () => void
  ) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start;
      videoRef.current.play();

      setStepNumber((prevStepNumber) => prevStepNumber + 1);

      const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= end) {
          videoRef.current.pause();
          videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);

          // callback函数要放置在handleTimeUpdate函数内部，确保上一遍已经播放完毕
          if (callback) {
            console.log("callback");
            callback();
          }
        }
      };
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
  };

  // 回音法播放
  const echoPlay = useCallback(
    (caption: Caption) => {
      setStepNumber(0);
      const start = convertTimeToSeconds(caption.start);
      const end = convertTimeToSeconds(caption.end);
      const duration = end - start;

      if (videoRef.current) {
        playFromStartToEnd(start, end, () => {
          // 播放原视频后隐藏视频
          setShowVideo(false);
          // 通过callback函数，间隔播放视频
          setTimeout(() => {
            setShowVideo(true);
            setMuted(true);
            playFromStartToEnd(start, end, () => {
              setTimeout(() => {
                setMuted(false);
                playFromStartToEnd(start, end, () => {
                  setTimeout(() => {
                    playFromStartToEnd(start, end);
                  }, 0);
                });
              }, 0);
            });
          }, duration * 1000);
        });
      }
    },
    [videoRef]
  );

  // 每当setpNumber改变时，都会触发useEffect, 从而改变isMuted的值
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
    if (caption) {
      echoPlay(caption);
    }
  }, [uploadVideoUrl, caption, echoPlay, playCount]);

  return (
    <div className="p-6 border rounded-xl w-[650px]">
      <div className="rounded-xl overflow-hidden">
        <div style={{ position: "relative" }}>
          <video
            ref={videoRef}
            width="650"
            height="360"
            // controls   // 显示播放器的控制按钮
            // autoPlay   // 加载页面后自动开始播放
            muted={isMuted}
            preload="auto"
          >
            <source src={uploadVideoUrl} type="video/mp4" />
          </video>
          {!showVideo && (
            <div className="absolute inset-0 bg-black flex justify-center items-center">
              <p className="text-lg text-white">...</p>
            </div>
          )}
          {isSubtitleVisible && showVideo && (
            <div className="absolute bottom-5 inset-x-0 flex items-center justify-center">
              <p className=" pl-2 text-2xl text-amber-500">{caption?.text}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex pt-5 gap-4 font-mono text-sm">
          {buttons.map((button) => (
            <div className="items-center" key={button.id}>
              <ProcessButton
                buttonID={button.id}
                text={button.text}
                onClick={() => handleButtonClick(button.id)}
                className={`${
                  button.id === stepNumber ? "bg-amber-500 font-bold" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex pt-5 gap-2 items-center">
        <Toggle
          variant={"outline"}
          size={"sm"}
          aria-label="Toggle bold"
          onClick={toggleSubtitle}
        >
          <Eye className="h-4 w-4" />
        </Toggle>
        <Toggle variant={"outline"} size={"sm"} aria-label="Toggle bold">
          <Languages className="h-4 w-4" />
        </Toggle>
      </div> */}
      {/* <div>
        <div className="flex items-center justify-center text-sm gap-2">
          <p>{playCount}</p>
          <Button onClick={handleCaptionClick} size={"sm"}>
            <RefreshCcw size={18} />
          </Button>
        </div>
        <InputCheck />
      </div> */}
    </div>
  );
}

// 将时间转换为秒
function convertTimeToSeconds(time: string) {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseFloat(parts[2].replace(",", "."));

  return hours * 3600 + minutes * 60 + seconds;
}
