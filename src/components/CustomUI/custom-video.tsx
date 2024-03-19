"use client";

import { useState, useEffect, useRef, useCallback, use } from "react";

import { Caption } from "@/lib/parse-subtitles";

import { Eye, Languages, ListRestart, Settings } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import ProcessButton from "@/components/CustomUI/process-button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type VideoProps = {
  caption?: Caption;
  autoNextCaption: () => void;
  uploadVideoUrl: string;
};

export default function VideoComponent({
  caption,
  autoNextCaption,
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
  const [autoNext, setAutoNext] = useState(false);

  // 隐藏或显示字幕
  const toggleSubtitle = () => {
    setSubtitleVisible(!isSubtitleVisible);
  };

  // 开启或关闭自动播放
  const toggleAutoNext = () => {
    setAutoNext(!autoNext);
  };

  // 点击按钮选择第步骤
  const handleButtonClick = (id: number): void => {
    setStepNumber(id);
  };

  // 视频引用
  const videoRef = useRef<HTMLVideoElement>(null);

  // 重复播放次数
  const [playCount, setPlayCount] = useState<number>(1);

  // 重复播放
  const handleRepeatClick = () => {
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

      // 监听视频播放时间，当播放到指定时间后，暂停视频
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

      // 监听中断事件
      const handleInterrupt = () => {
        if (videoRef.current) {
          // console.log("interrupt");
          videoRef.current.pause();
          videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
          videoRef.current.removeEventListener("interrupt", handleInterrupt);
        }
      };

      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("interrupt", handleInterrupt);
    }
  };

  // 回音法播放
  const echoPlay = useCallback(
    (caption: Caption) => {
      // 初始化播放器参数
      setStepNumber(0);
      setShowVideo(true);
      setMuted(false);

      const start = convertTimeToSeconds(caption.start);
      const end = convertTimeToSeconds(caption.end);
      const duration = end - start;

      let timeouts: NodeJS.Timeout[] = [];

      if (videoRef.current) {
        playFromStartToEnd(start, end, () => {
          // 播放原视频后隐藏视频
          setShowVideo(false);
          // 通过callback函数，间隔播放视频
          timeouts.push(
            setTimeout(() => {
              setShowVideo(true);
              setMuted(true);
              playFromStartToEnd(start, end, () => {
                timeouts.push(
                  setTimeout(() => {
                    setMuted(false);
                    playFromStartToEnd(start, end, () => {
                      timeouts.push(
                        setTimeout(() => {
                          playFromStartToEnd(start, end, () => {
                            // console.log("end");
                            if (autoNext) {
                              autoNextCaption();
                            }
                          });
                        }, 0)
                      );
                    });
                  }, 0)
                );
              });
            }, duration * 1000)
          );
        });
      }

      // 当函数取消时，返回一个清理函数
      return () => {
        // 清除所有计时器
        timeouts.forEach(clearTimeout);
        // 触发中断事件
        if (videoRef.current) {
          videoRef.current.dispatchEvent(new Event("interrupt"));
        }
      };
    },
    [videoRef, autoNext]
  );

  useEffect(() => {
    // 选择视频后立即加载视频
    if (videoRef.current) {
      videoRef.current.load();
    }

    let cancelEchoPlay: () => void;
    if (caption) {
      cancelEchoPlay = echoPlay(caption);
    }

    return () => {
      if (cancelEchoPlay) {
        cancelEchoPlay();
      }
    };
  }, [uploadVideoUrl, caption, echoPlay, playCount]);

  return (
    <div className="p-6 border rounded-xl">
      <div className="rounded-xl overflow-hidden">
        <div style={{ position: "relative" }}>
          <video
            ref={videoRef}
            width="850"
            height="478"
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
          {isSubtitleVisible && showVideo && caption && (
            <div className="absolute bottom-5 px-2 inset-x-0 flex items-center justify-center">
              <p className="text-2xl px-3 py-1 text-amber-500 bg-black/75 rounded-sm">
                {caption.text}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-5">
        <Button variant="ghost">
          {/* <Settings className="h-4 w-4" /> */}
        </Button>
        <div className="flex gap-4 font-mono text-sm">
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

        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                {/* <Settings className="h-4 w-4" /> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-26">
              <DropdownMenuCheckboxItem
                checked={isSubtitleVisible}
                onCheckedChange={setSubtitleVisible}
              >
                Subtitle Visible
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={autoNext}
                onCheckedChange={toggleAutoNext}
              >
                AutoNext
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <Toggle
          variant={"outline"}
          size={"sm"}
          aria-label="Toggle bold"
          onClick={toggleAutoNext}
        >
          <ListRestart className="h-4 w-4" />
        </Toggle>
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
