import { useEffect, useRef, useCallback } from "react";

interface VideoProps {
  isMuted: boolean;
  playFromStart: boolean;
  onEnded: () => void;
  videoUrl?: string;
  localVideo?: boolean;
}

export function Video({
  isMuted = false,
  onEnded,
  videoUrl,
  localVideo = true,
}: VideoProps) {
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

  const videoSource = localVideo
    ? "videos/ep03.mp4"
    : "https://ko7uxl8h2z5pmfxi.public.blob.vercel-storage.com/ep02-t9TlvFpSXZCNrg1zAa9c0vDucurG2Q.mp4";

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
      <source src={videoSource} type="video/mp4" />
      <track src={videoSource} kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
}
