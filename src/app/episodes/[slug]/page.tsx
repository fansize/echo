"use client";
import { useEffect, useState } from "react";
import { getCaptionByUrl, getYoutubeCaptionBySlug, getEpisodeBySlug, getHeroEpisode } from "@/lib/api";
import { Episode } from "@/interface/Episode";
import { Caption } from "@/interface/Caption";
import Video from "@/components/CustomUI/custom-video";
import CaptionPanel from "@/components/CustomUI/subtitle-panel";
import Container from "@/components/CustomUI/container";
import BackButton from "@/components/CustomUI/back-button";
import TypeWriter from "@/components/episodes/type-writer";
import YouTubeVideo from "@/components/CustomUI/custom-youtube-video";

// 从父页面通过 Router URL 中获取 slug
type Params = {
  params: {
    slug: string;
  };
};

export default function EpisodePage({ params }: Params) {
  // 获取默认 Episode
  const heroEpisode = getHeroEpisode();

  // 设定页面各种初始参数
  const [episode, setEpisode] = useState<Episode>(heroEpisode);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<Caption>(captions[0]);
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

  useEffect(() => {
    if (captions.length > 0) {
      setSelectedCaption(captions[0]);
    }
  }, [captions]);

  // 根据 captionSrc 获取字幕
  useEffect(() => {
    // 从本地上传获得的视频和字幕
    if (params.slug === "upload") {
      // If the slug is "upload", use the local video URL
      const videoUrl = localStorage.getItem("uploadedVideoUrl");
      const captionUrl = localStorage.getItem("uploadedCaptionUrl");
      // console.log(videoUrl, captionUrl);
      episode.videoSrc = videoUrl || "";
      episode.captionSrc = captionUrl || "";
      episode.startIndex = undefined;
      episode.endIndex = undefined;
      getCaptionByUrl(episode.captionSrc).then((captions) => {
        setCaptions(captions);
        setSelectedCaption(captions[0]);
      });
    } else {
      // 从数据库获得的视频和字幕
      const episode = getEpisodeBySlug(params.slug);
      setEpisode(episode);

      // 如果episode是youtube视频，则通过youtube api获取字幕
      if (episode.captionSrc === "") {
        getYoutubeCaptionBySlug(episode.slug)
          .then((captions) => {
            setCaptions(captions);
          })
          .catch((error) => {
            console.error("Failed to get captions by slug:", error);
            // 这里可以添加你的错误处理逻辑
          });
      } else {
        getCaptionByUrl(
          episode.captionSrc,
          episode.startIndex,
          episode.endIndex
        ).then((captions) => {
          setCaptions(captions);
          setSelectedCaption(captions[0]);
        });
      }
    }
  }, [params.slug, episode]);

  // 通过autoNumber触发自动播放下一条字幕
  useEffect(() => {
    handleSwitchCaption("next");
  }, [autoNumber]);

  return (
    <main>
      <Container>
        <div className="mt-4">
          <BackButton title={episode.title} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="hidden sm:flex flex-col p-4 md:p-8 h-[200px] md:w-1/3 md:h-[calc(100vh-10rem)] bg-neutral-200/20 dark:dark:bg-slate-500/20 rounded-lg shadow-md">
            <CaptionPanel
              captions={captions}
              selectedCaption={selectedCaption}
              onPlayClick={handlePlayClick}
            />
          </div>

          <div className="flex flex-col p-4 md:p-8 bg-neutral-200/20 dark:dark:bg-slate-500/20 rounded-lg md:w-2/3 shadow-md">
            {episode.captionSrc === "" ? (
              <YouTubeVideo
                caption={selectedCaption}
                autoNextCaption={autoNextCaption}
                onClickSwitch={handleSwitchCaption}
                uploadVideoUrl={episode?.videoSrc}
              />
            ) : (
              <Video
                caption={selectedCaption}
                autoNextCaption={autoNextCaption}
                onClickSwitch={handleSwitchCaption}
                uploadVideoUrl={episode?.videoSrc}
              />
            )}

            {/* {selectedCaption && <TypeWriter targetContent={selectedCaption.text} />} */}
          </div>
        </div>

        <div className="flex sm:hidden flex-col mt-6 p-4 h-[500px] bg-neutral-200/20 dark:dark:bg-slate-500/20 rounded-lg shadow-md">
          <CaptionPanel
            captions={captions}
            selectedCaption={selectedCaption}
            onPlayClick={handlePlayClick}
          />
        </div>
      </Container>
    </main>
  );
}
