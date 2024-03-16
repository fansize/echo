"use cilent";

import ModeToggle from "@/components/theme/toggle-theme-button";
import VideoComponent from "@/components/CustomUI/custom-video";

export default function Page() {
  const uploadVideoUrl = "/videos/ep03.mp4";

  return (
    <div className="mx-auto">
      <ModeToggle />

      <div className="flex mx-auto max-w-screen-sm  aspect-square p-8">
        <VideoComponent uploadVideoUrl={uploadVideoUrl} />
      </div>
    </div>
  );
}
