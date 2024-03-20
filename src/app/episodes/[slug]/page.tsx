"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Caption } from "@/lib/parse-caption";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcw } from "lucide-react";
import Video from "@/components/CustomUI/custom-video";
import Nav from "@/components/CustomUI/custom-nav";
import CaptionPanel from "@/components/CustomUI/subtitle-panel";
import UploadVideo from "@/components/CustomUI/upload-video";
import UploadSubtitle from "@/components/CustomUI/upload-subtitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ParseSubtitles } from "@/lib/parse-caption";
import SwitchCaption from "@/components/CustomUI/custom-pagination";
import { getCaptionByUrl, getEpisodeBySlug } from "@/lib/api";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BackButton from "@/components/CustomUI/back-button";

// 从父页面通过 Router URL 中获取 slug
type Params = {
  params: {
    slug: string;
  };
};

export default function EpisodePage({ params }: Params) {
  // 根据 slug 获取单个 episode
  const episode = getEpisodeBySlug(params.slug);

  // 如果没有找到对应的 episode，返回 404 页面
  if (!episode) {
    return notFound();
  }

  // 设定页面各种初始参数
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<Caption>();
  const [autoNumber, setAutoNumber] = useState(0);

  // 点击某一条字幕
  const handlePlayClick = (caption: Caption) => {
    setSelectedCaption(caption);
  };

  // 自动播放下一条字幕
  const autoNextCaption = () => {
    // 没触发一次函数，autoNumber + 1
    setAutoNumber((prevautopNumber) => prevautopNumber + 1);
  };

  // 上一条/下一条字幕
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

  // 根据 captionSrc 获取字幕
  useEffect(() => {
    getCaptionByUrl(episode.captionSrc).then((captions) => {
      setCaptions(captions);
    });
  }, [episode]);

  // 通过autoNumber触发自动播放下一条字幕
  useEffect(() => {
    handleSwitchCaption("next");
  }, [autoNumber]);

  return (
    <main>
      <div className="mt-4">
        <BackButton title={episode.title} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex flex-col content-start h-[200px] md:w-1/3 md:h-[calc(100vh-10rem)] bg-white rounded-lg shadow-md p-8">
          <ScrollArea className="">
            <CaptionPanel
              captions={captions}
              selectedCaption={selectedCaption}
              onPlayClick={handlePlayClick}
            />
          </ScrollArea>
        </div>

        <div className="flex flex-col bg-white rounded-lg md:w-2/3 shadow-md p-8">
          <Video
            caption={selectedCaption}
            autoNextCaption={autoNextCaption}
            onClickSwitch={handleSwitchCaption}
            uploadVideoUrl={episode?.videoSrc}
          />
        </div>
      </div>
    </main>
  );
}
