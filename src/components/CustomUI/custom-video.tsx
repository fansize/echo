"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Eye, Languages, Send } from "lucide-react";
import ProcessButton from "@/components/CustomUI/process-button";
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
    { text: "1.Listen Original", id: 1 },
    { text: "2.Echo", id: 2 },
    { text: "3.Imitate", id: 3 },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  // 确定视频播放时间区间
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  // 播放一次
  const oncePlay = useCallback(
    (caption: Caption) => {
      const start = convertTimeToSeconds(caption.start);
      const end = convertTimeToSeconds(caption.end);
      setStartTime(start);

      if (videoRef.current) {
        videoRef.current.currentTime = start;
        // videoRef.current.play();

        const handleTimeUpdate = () => {
          if (videoRef.current && videoRef.current.currentTime >= end) {
            videoRef.current.pause();
            videoRef.current.removeEventListener(
              "timeupdate",
              handleTimeUpdate
            );
            setStepNumber(stepNumber + 1);
          }
        };

        videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      }
    },
    [videoRef]
  );

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

  // 当视频播放完后，自动增加StepNumber,进行下一步
  const handleVideoEnded = () => {
    if (stepNumber < 3) {
      setStepNumber(stepNumber + 1);
    } else {
      setStepNumber(1);
    }
  };

  // 每当setpNumber改变时，都会触发useEffect, 从而改变isMuted的值
  useEffect(() => {
    if (caption) {
      oncePlay(caption);
    }

    if (videoRef.current) {
      // 如果 videoRef.current 存在
      videoRef.current.load(); // 调用 load 方法
      videoRef.current.play(); // 调用 play 方法
    }
    if (stepNumber === 2) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  }, [uploadVideoUrl, caption, stepNumber]);

  return (
    <div>
      <div className="p-6 border rounded-xl">
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
        </div>
        <div className="rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            width="1080"
            height="240"
            controls
            // autoPlay
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
