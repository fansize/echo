import { useEffect, useState, useRef, useCallback } from "react";
import { Caption } from "@/interface/Caption";
import { timeToMilliseconds } from "@/lib/api";
import YouTube, {
  YouTubeProps,
  YouTubePlayer,
  YouTubeEvent,
} from "react-youtube";
import ReactPlayer from "react-player/youtube";

type Props = {
  caption: Caption;
  autoNextCaption: () => void;
  onClickSwitch: (direction: "previous" | "next") => void;
  uploadVideoUrl: string;
  defaultPlay?: boolean;
};

export default function VideoComponent({
  caption,
  autoNextCaption,
  onClickSwitch,
  uploadVideoUrl,
}: Props) {
  const videoRef = useRef<ReactPlayer>(null);
  const [playState, setPlayState] = useState(false);

  const [showVideo, setShowVideo] = useState(true);
  const [isSubtitleVisible, setSubtitleVisible] = useState(true);
  const [isMuted, setMuted] = useState(false);

  // basic youtube props
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // start: 600,
      // end: 605,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      autohide: 1,
      // autoplay: 1,
    },
  };

  // 单次播放函数
  const playFromStartToEnd = (
    start: number,
    end: number,
    callback?: () => void
  ) => {
    if (videoRef.current) {
      videoRef.current.seekTo(start);
      setPlayState(true);
    }
    const checkTime = setInterval(() => {
      if (videoRef.current && videoRef.current.getCurrentTime() >= end) {
        if (videoRef.current) {
          setPlayState(false);
        }
        clearInterval(checkTime);
        if (callback) {
          callback();
        }
      }
    }, 100); // 每秒检查一次
  };

  // 连续播放三遍
  const echoPlay = useCallback(
    (caption: Caption) => {
      // 初始化播放器参数
      //   setStepNumber(0);
      //   setShowVideo(true);
      //   setMuted(false);

      const start = Number(caption.start);
      const end = Number(caption.end);
      const duration = end - start;

      let timeouts: NodeJS.Timeout[] = [];

      if (videoRef.current) {
        console.log("1st round");
        playFromStartToEnd(start, end, () => {
          // 播放原视频后隐藏视频
          setShowVideo(false);
          // 通过callback函数，间隔播放视频
          timeouts.push(
            setTimeout(() => {
              console.log("2nd round");
              setShowVideo(true);
              setMuted(true);
              playFromStartToEnd(start, end, () => {
                console.log("3rd round");
                timeouts.push(
                  setTimeout(() => {
                    setMuted(false);
                    playFromStartToEnd(start, end, () => {
                      timeouts.push(
                        setTimeout(() => {
                          playFromStartToEnd(start, end, () => {
                            // 最后一遍播放完毕后，判断是否自动播放下一条字幕还是暂停
                            // if (autoNext) {
                            //   autoNextCaption();
                            // } else {
                            //   setIsPlaying(false);
                            // }
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
        // if (videoRef.current) {
        //   videoRef.current.dispatchEvent(new Event("interrupt"));
        // }
      };
    },
    [videoRef]
  );

  const onError = (error: YouTubeEvent) => {
    console.error("YouTube Player Error:", error);
  };

  useEffect(() => {
    console.log("caption:", caption);
    // playFromStartToEnd(Number(caption.start), Number(caption.end));
    if (caption) {
      echoPlay(caption);
    }
  }, [caption]);

  return (
    <div className="overflow-hidden rounded-xl">
      <ReactPlayer
        ref={videoRef}
        url={uploadVideoUrl}
        width="100%"
        height={400}
        playing={playState}
      />
    </div>
  );
}
