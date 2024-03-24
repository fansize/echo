"use client";
import Link from "next/link";

export default function UploadPanel() {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      if (type === "video") {
        localStorage.setItem("uploadedVideoUrl", fileUrl);
      } else if (type === "subtitle") {
        localStorage.setItem("uploadedCaptionUrl", fileUrl);
      }
    }
  };

  return (
    <>
      <input
        id="video-upload"
        name="video-upload"
        type="file"
        accept="video/*"
        onChange={(event) => handleFileChange(event, "video")}
      />
      <input
        id="subtitle-upload"
        name="subtitle-upload"
        type="file"
        accept=".srt,.vtt"
        onChange={(event) => handleFileChange(event, "subtitle")}
      />

      <Link as={`/episodes/${"upload"}`} href="/episodes/[slug]">
        start
      </Link>
    </>
  );
}
