import { Episode } from "@/interface/Episode";
import { Caption } from "@/interface/Caption";
import { mockEpisodes } from "@/lib/data";

// 根据 slug 获取单个 episode
export function getEpisodeBySlug(slug: string) {
  const episode = mockEpisodes.find((episode) => episode.slug === slug);
  return episode;
}

// 从数据库获取所有 episodes
export function getAllEpisodes(): Episode[] {
  const episodes = mockEpisodes.sort((episode1, episode2) =>
    episode1.id > episode1.id ? -1 : 1
  );
  return episodes;
}

// TODO: 无法直接获取本地同名字幕，可能需要通过 api 获取 Whisper 来实现

// 根据字幕地址获取字幕
export async function getCaptionByUrl(captionSrc: string): Promise<Caption[]> {
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
          } => item !== null
        );
      resolve(parsed);
    };

    reader.onerror = () => {
      reject("Error reading blob");
    };

    reader.readAsText(blob);
  });
}
