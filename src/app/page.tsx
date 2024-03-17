"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/CustomUI/subtitle-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoComponent from "@/components/CustomUI/custom-video";
import Nav from "@/components/CustomUI/custom-nav";
import SubtitlePanel from "@/components/CustomUI/subtitle-panel";
import UploadVideo from "@/components/CustomUI/upload-video";
import UploadSubtitle from "@/components/CustomUI/upload-subtitle";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [selectedCaption, setSelectedCaption] = useState<Caption>();
  const [videoUrl, setVideoUrl] = useState<string>("/videos/ep03.mp4");
  const [subtitleUrl, setSubtitleUrl] = useState<string>("/videos/ep03.srt");

  const handleVideoUpload = (url: string) => {
    setVideoUrl(url);
  };

  const handleSubtitleUpload = (url: string) => {
    setSubtitleUrl(url);
  };

  // todo: 无法直接获取本地同名字幕，可能需要通过 api 获取 Whisper 来实现
  const FetchSubtitleUrl = () => {
    const subtitleUrl = videoUrl.replace(/\.mp4$/, ".srt");
    setSubtitleUrl(subtitleUrl);
  };

  const handlePlayClick = (caption: Caption) => {
    setSelectedCaption(caption);
  };

  return (
    <main className="flex justify-center pt-20 px-4">
      <Nav />
      <div className="flex gap-9">
        <Tabs
          defaultValue="subtitle"
          className="h-[calc(100vh-10rem)] w-[600px]"
        >
          <TabsList>
            <TabsTrigger value="subtitle">Captions</TabsTrigger>
            <TabsTrigger value="upload">Video</TabsTrigger>
            <TabsTrigger value="upload1">Subtitle</TabsTrigger>
          </TabsList>
          <TabsContent value="subtitle">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <SubtitlePanel
                subtitleUrl={subtitleUrl}
                onPlayClick={handlePlayClick}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="upload">
            <p>Upload Video</p>
            <UploadVideo onFileSelected={handleVideoUpload} />
          </TabsContent>
          <TabsContent value="upload1">
            <p>Upload Subtitle</p>
            <UploadSubtitle onFileSelected={handleSubtitleUpload} />
          </TabsContent>
        </Tabs>

        <div>
          <VideoComponent caption={selectedCaption} uploadVideoUrl={videoUrl} />
        </div>
      </div>
    </main>
  );
}
