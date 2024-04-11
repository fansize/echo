"use client";
import { useEffect, useState } from "react";
import { getCaptionByUrl, getEpisodeBySlug, getHeroEpisode } from "@/lib/api";
import { Caption } from "@/interface/Caption";
import Video from "@/components/sections/custom-video";
import CaptionPanel from "@/components/sections/subtitle-panel";
import Container from "@/components/container/container";
import Background from "@/components/container/background";
import BackButton from "@/components/customUI/back-button";
import TypeBar from "@/components/customUI/type-bar";

// 从父页面通过 Router URL 中获取 slug

export default function HeroVideo() {
  // 根据 slug 获取单个 episode
  const episode = getHeroEpisode();

  // 设定页面各种初始参数
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<Caption>();
  const [autoNumber, setAutoNumber] = useState(0);

  // 自动播放下一条字幕
  const autoNextCaption = () => {
    // 没触发一次函数，autoNumber + 1
    setAutoNumber((prevautopNumber) => prevautopNumber + 1);
    // handleSwitchCaption("next");
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
      setSelectedCaption(captions[0]);
    });
  }, [episode]);

  // 通过autoNumber触发自动播放下一条字幕
  useEffect(() => {
    handleSwitchCaption("next");
  }, [autoNumber]);

  return (
    <div className="p-1 md:p-4 rounded-xl shadow-md dark:bg-slate-500/20">
      <Video
        caption={selectedCaption}
        autoNextCaption={autoNextCaption}
        onClickSwitch={handleSwitchCaption}
        uploadVideoUrl={episode?.videoSrc}
        defaultPlay={false}
      />
    </div>
  );
}
