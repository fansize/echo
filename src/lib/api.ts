import { notFound } from "next/navigation";
import { Episode } from "@/interface/Episode";
import { Caption } from "@/interface/Caption";
import { mockEpisodes } from "@/content/episodes";

// 根据 slug 获取单个 episode
export function getEpisodeBySlug(slug: string) {
  const episode = mockEpisodes.find((episode) => episode.slug === slug);
  // 如果获取不到就返回404页面
  if (!episode) {
    return notFound();
  }
  return episode;
}

export function getHeroEpisode() {
  const episode = getAllEpisodes("all")[0];
  return episode;
}

// 从数据库获取所有 episodes
export function getAllEpisodes(topic: string): Episode[] {
  let episodes = mockEpisodes;

  if (topic === "all") {
    return episodes;
  } else {
    episodes = episodes.filter((episode) => episode.topic === topic);
  }

  episodes.sort((episode1, episode2) =>
    episode1.title > episode2.title ? 1 : -1
  );

  return episodes;
}

// TODO: 无法直接获取本地同名字幕，可能需要通过 api 获取 Whisper 来实现

// 根据字幕地址获取字幕
export async function getCaptionByUrl(
  captionSrc: string,
  startIndex?: number,
  endIndex?: number
): Promise<Caption[]> {
  const response = await fetch(captionSrc);
  const blob = await response.blob();

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = (event.target as FileReader).result;
      if (typeof text !== "string") {
        return;
      }

      const subtitleBlocks = text.trim().split(/\n\s*\n/);

      const parsed = subtitleBlocks
        .map((subtitleBlock) => {
          let [indexString, timeString, ...textLines] =
            subtitleBlock.split("\n");
          const index = parseInt(indexString);
          const [start, end] = timeString.split(" --> ");
          const text = textLines
            .join("\n")
            .replace(/<[^>]*>/g, "")
            .replace(/\{.*?\}/g, "");

          if (isNaN(index) || !start || !end) {
            return null;
          }

          return { index, start, end, text };
        })
        .filter(
          (
            item
          ): item is {
            index: number;
            start: string;
            end: string;
            text: string;
          } =>
            item !== null &&
            (startIndex === undefined || item.index >= startIndex) &&
            (endIndex === undefined || item.index <= endIndex)
        );
      resolve(parsed);
    };

    reader.onerror = () => {
      reject("Error reading blob");
    };

    reader.readAsText(blob);
  });
}
