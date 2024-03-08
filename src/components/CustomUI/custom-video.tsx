import { useEffect, useRef } from "react";

interface VideoProps {
  isMuted: boolean;
  playFromStart: boolean;
}

export function Video({ isMuted = false }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playFromStart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (playFromStart) {
      playFromStart();
    }
  }, [playFromStart]);

  return (
    <video
      ref={videoRef}
      width="520"
      height="240"
      controls
      autoPlay
      muted={isMuted}
      preload="auto"
    >
      <source src="/videos/ep018.mp4" type="video/mp4" />
      <track
        src="/videos/2_English.srt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
}
