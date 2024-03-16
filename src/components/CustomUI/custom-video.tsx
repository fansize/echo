"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Eye, Languages, Send } from "lucide-react";
import ProcessButton from "@/components/CustomUI/process-button";
import { Caption } from "@/components/CustomUI/subtitle-panel";
import { once } from "events";

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
    { text: "1.Listen Original", id: 1 },
    { text: "2.Echo", id: 2 },
    { text: "3.Imitate", id: 3 },
  ];

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
  const [playCount, setPlayCount] = useState<number>(0);

  const handleCaptionClick = () => {
    setPlayCount(playCount + 1);
  };

  // 单次播放函数
  const playFromStartToEnd = (start: number, end: number, callback?: () => void) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start;
      videoRef.current.play();

      setStepNumber(prevStepNumber => prevStepNumber + 1);

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

      if (videoRef.current) {
        playFromStartToEnd(start, end, () => {
          // 通过callback函数，间隔播放视频
          setTimeout(() => {
            playFromStartToEnd(start, end, () => {
              setTimeout(() => {
                playFromStartToEnd(start, end);
              }, 0);
            });
          }, 2000);
        });
      }
    },
    [videoRef]
  );

  // 播放一次
  const oncePlay = useCallback(
    (caption: Caption) => {
      const start = convertTimeToSeconds(caption.start);
      const end = convertTimeToSeconds(caption.end);

      console.log(`Start: ${start}, End: ${end}`);

      if (videoRef.current) {
        videoRef.current.currentTime = start;
        videoRef.current.play();

        const handleTimeUpdate = () => {
          if (videoRef.current && videoRef.current.currentTime >= end) {
            console.log("handleTimeUpdate:", videoRef.current.currentTime);
            videoRef.current.pause();
            videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
          }
        };

        const handleSeeked = () => {
          if (videoRef.current) {
            console.log("handleSeeked:", videoRef.current.currentTime);
            videoRef.current.removeEventListener("seeked", handleSeeked);
          }
        };

        videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
        videoRef.current.addEventListener("seeked", handleSeeked);
      }
    },
    [videoRef]
  );


  // 每当setpNumber改变时，都会触发useEffect, 从而改变isMuted的值
  useEffect(() => {
    if (caption) {
      echoPlay(caption);
    }
  }, [uploadVideoUrl, caption, echoPlay, playCount]);

  return (
    <div>
      <div className="p-6 border rounded-xl aspect-square">
        <div className="flex flex-wrap pb-4 gap-5 font-mono text-sm">
          {buttons.map((button) => (
            <div className="items-center" key={button.id}>
              <ProcessButton
                buttonID={button.id}
                text={button.text}
                onClick={() => handleButtonClick(button.id)}
                className={`${button.id === stepNumber ? "bg-blue-400" : ""}`}
              />
            </div>
          ))}
          <Button onClick={handleCaptionClick}>Repeat</Button>
          <p>{playCount}</p>
        </div>
        <div className="rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            width="600"
            height="240"
            // controls   // 显示播放器的控制按钮
            // autoPlay   // 加载页面后自动开始播放
            muted={isMuted}
            preload="auto"
          // onEnded={handleVideoEnded}
          // onTimeUpdate={handleTimeUpdate}
          >
            <source src={uploadVideoUrl || ""} type="video/mp4" />
          </video>
        </div>
        <div className="flex pt-4 gap-2 items-center">
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
          {isSubtitleVisible && <p>{caption?.text}</p>}
          {startTime}
        </div>
        <div className="flex pt-4 gap-2 items-center">
          <Input />
          <Button variant={"outline"} aria-label="Toggle bold">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  function convertTimeToSeconds(time: string) {
    const parts = time.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2].replace(",", "."));

    return hours * 3600 + minutes * 60 + seconds;
  }
}
