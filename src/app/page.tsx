"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/lib/parse-subtitles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcw } from "lucide-react";
import VideoComponent from "@/components/CustomUI/custom-video";
import Nav from "@/components/CustomUI/custom-nav";
import SubtitlePanel from "@/components/CustomUI/subtitle-panel";
import UploadVideo from "@/components/CustomUI/upload-video";
import UploadSubtitle from "@/components/CustomUI/upload-subtitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ParseSubtitles } from "@/lib/parse-subtitles";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<Caption>();
  const [videoUrl, setVideoUrl] = useState<string>("/videos/ep03.mp4");
  const [subtitleUrl, setSubtitleUrl] = useState<string>("/videos/ep03.srt");

  // 上传视频
  const handleVideoUpload = (url: string) => {
    setVideoUrl(url);
  };

  // 上传字幕
  const handleSubtitleUpload = (url: string) => {
    setSubtitleUrl(url);
  };

  // todo: 无法直接获取本地同名字幕，可能需要通过 api 获取 Whisper 来实现
  const FetchSubtitleUrl = () => {
    const subtitleUrl = videoUrl.replace(/\.mp4$/, ".srt");
    setSubtitleUrl(subtitleUrl);
  };

  // 切换字幕
  const handleSwitchCaption = (direction: "previous" | "next") => {
    if (!selectedCaption) {
      setSelectedCaption(captions[0]);
      return;
    }

    const currentIndex = captions.findIndex(
      (caption) => caption === selectedCaption
    );

    if (
      direction === "next" &&
      currentIndex !== -1 &&
      currentIndex < captions.length - 1
    ) {
      setSelectedCaption(captions[currentIndex + 1]);
    } else if (direction === "previous" && currentIndex > 0) {
      setSelectedCaption(captions[currentIndex - 1]);
    }
  };

  // 点击某一条字幕
  const handlePlayClick = (caption: Caption) => {
    setSelectedCaption(caption);
  };

  useEffect(() => {
    ParseSubtitles(subtitleUrl).then((captions) => {
      setCaptions(captions);
    });
  }, [subtitleUrl]);

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
                captions={captions}
                selectedCaption={selectedCaption}
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

        <div className="flex flex-col gap-4">
          <VideoComponent
            caption={selectedCaption}
            autoNextCaption={handleSwitchCaption}
            uploadVideoUrl={videoUrl}
          />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handleSwitchCaption("previous")}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
                  <RefreshCcw size={16} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handleSwitchCaption("next")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
