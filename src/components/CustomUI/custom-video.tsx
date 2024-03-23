import { useState, useEffect, useRef, useCallback } from "react";
import { Caption } from "@/interface/Caption";
import PlayButton from "@/components/CustomUI/play-button";
import StepBar from "@/components/CustomUI/step-bar";
import SettingPanel from "@/components/CustomUI/setting-panel";
import CaptionBlock from "@/components/CustomUI/caption-block";

type Props = {
  caption?: Caption;
  autoNextCaption: () => void;
  onClickSwitch: (direction: "previous" | "next") => void;
  uploadVideoUrl: string;
  defaultPlay?: boolean;
};

export default function Video({
  caption,
  autoNextCaption,
  onClickSwitch,
  uploadVideoUrl,
  defaultPlay = true,
}: Props) {
  const [stepNumber, setStepNumber] = useState(1);
  const [showVideo, setShowVideo] = useState(true);
  const [isSubtitleVisible, setSubtitleVisible] = useState(true);
  const [isMuted, setMuted] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  // 视频引用
  const videoRef = useRef<HTMLVideoElement>(null);

  // 隐藏或显示字幕
  const toggleSubtitle = () => {
    setSubtitleVisible(!isSubtitleVisible);
  };

  // 开启或关闭自动播放
  const toggleAutoNext = () => {
    setAutoNext(!autoNext);
  };

  // 播放或暂停视频
  const [isPlaying, setIsPlaying] = useState(defaultPlay);
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 切换学习步骤
  const handleButtonClick = (id: number): void => {
    setStepNumber(id);
  };

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
                            // 最后一遍播放完毕后，判断是否自动播放下一条字幕还是暂停             
                            if (autoNext) {
                              autoNextCaption();
                            } else {
                              setIsPlaying(false);
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

  // 选择视频后立即加载视频
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [uploadVideoUrl]);

  useEffect(() => {
    let cancelEchoPlay: () => void;
    if (caption) {
      cancelEchoPlay = echoPlay(caption);
    }

    return () => {
      if (cancelEchoPlay) {
        cancelEchoPlay();
      }
    };
  }, [caption]);

  return (
    <>
      <div className="relative rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          width="1920"
          height="1080"
          // controls   // 显示播放器的控制按钮
          // autoPlay   // 加载页面后自动开始播放
          muted={isMuted}
          preload="auto"
          onClick={handlePlayPause}
        >
          <source src={uploadVideoUrl} type="video/mp4" />
        </video>

        <button
          className="absolute inset-0 flex justify-center items-center"
          onClick={handlePlayPause}
        >
          {isPlaying ? null : <PlayButton />}
        </button>

        {!showVideo && (
          <div className="absolute inset-0 bg-black flex justify-center items-center">
            <p className="text-lg text-white">...</p>
          </div>
        )}

        {isSubtitleVisible && showVideo && caption && isPlaying && (
          <div className="absolute flex-col bottom-5 px-2 inset-x-0 flex items-center justify-center">
            <CaptionBlock text={caption.text} />
            <div className="hidden md:block">
              <StepBar stepNumber={stepNumber} />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center md:hidden">
        <StepBar stepNumber={stepNumber} />
      </div>
      <SettingPanel
        toggleSubtitle={toggleSubtitle}
        toggleAutoNext={toggleAutoNext}
        onClickSwitch={onClickSwitch}
      />
    </>
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
