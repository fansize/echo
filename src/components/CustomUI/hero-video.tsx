"use client";
import { useEffect, useState } from "react";
import { getCaptionByUrl, getEpisodeBySlug, getHeroEpisode } from "@/lib/api";
import { Caption } from "@/interface/Caption";
import Video from "@/components/CustomUI/custom-video";
import CaptionPanel from "@/components/CustomUI/subtitle-panel";
import Container from "@/components/CustomUI/container";
import Background from "@/components/CustomUI/background";
import BackButton from "@/components/CustomUI/back-button";
import TypeBar from "@/components/CustomUI/type-bar";


// 从父页面通过 Router URL 中获取 slug


export default function HeroVideo() {
    // 根据 slug 获取单个 episode
    const episode = getHeroEpisode();

    // 设定页面各种初始参数
    const [captions, setCaptions] = useState<Caption[]>([]);
    const [selectedCaption, setSelectedCaption] = useState<Caption>();



    // 自动播放下一条字幕
    const autoNextCaption = () => {
        // 没触发一次函数，autoNumber + 1
        // setAutoNumber((prevautopNumber) => prevautopNumber + 1);
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



    return (


        <div className="flex flex-col p-4 md:p-4 rounded-xl shadow-md">
            <Video
                caption={selectedCaption}
                autoNextCaption={autoNextCaption}
                onClickSwitch={handleSwitchCaption}
                uploadVideoUrl={episode?.videoSrc}
            />
        </div>

    );
}