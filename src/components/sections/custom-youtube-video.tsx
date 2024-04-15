import { useEffect, useState } from "react";
import { Caption } from "@/interface/Caption";
import { timeToMilliseconds } from "@/lib/api";
import YouTube, {
  YouTubeProps,
  YouTubePlayer,
  YouTubeEvent,
} from "react-youtube";

type Props = {
  caption: Caption;
  autoNextCaption: () => void;
  onClickSwitch: (direction: "previous" | "next") => void;
  uploadVideoUrl: string;
  defaultPlay?: boolean;
};

export default function YouTubeVideo({
  caption,
  autoNextCaption,
  onClickSwitch,
  uploadVideoUrl,
}: Props) {
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

  // let player: YouTubePlayer;

  const onReady = (event: YouTubeEvent) => {
    const player = event.target;
    player.playVideo();
  };

  const onPlay = (event: YouTubeEvent) => {
    const player = event.target;
    player.seekTo(caption.start);
    // opts.playerVars.start = caption.start;
    // opts.playerVars.end = caption.end;
    console.log("start:", opts.playerVars.start);
    // player.playVideo();
  };

  const onError = (error: YouTubeEvent) => {
    console.error("YouTube Player Error:", error);
  };

  // useEffect(() => {
  //     if (caption) {
  //         console.log('start:', caption.start);
  //         opts.playerVars.start = caption.start;
  //         // player.playVideo();
  //     }
  // }, [caption]);

  return (
    <div className="relative w-full pt-[56.25%]">
      <YouTube
        videoId={uploadVideoUrl}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onError={onError}
        iframeClassName="absolute inset-0 w-full h-full rounded-lg"
      />
    </div>
  );
}
