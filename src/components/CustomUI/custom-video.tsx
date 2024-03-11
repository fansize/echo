import { useEffect, useRef } from "react";

interface VideoProps {
  isMuted: boolean;
  playFromStart: boolean;
  onEnded: () => void;
}

export function Video({ isMuted = false, onEnded }: VideoProps) {
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
      onEnded={onEnded}
    >
      <source
        src="https://ko7uxl8h2z5pmfxi.public.blob.vercel-storage.com/ep02-t9TlvFpSXZCNrg1zAa9c0vDucurG2Q.mp4"
        type="video/mp4"
      />
      <track
        src="https://ko7uxl8h2z5pmfxi.public.blob.vercel-storage.com/ep02-jJBRZzYrZo357XEL9FPZNzkQNRXdQX.srt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
}
