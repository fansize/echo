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
  const episode = getAllEpisodes("日常对话")[0];
  return episode;
}

// 从数据库获取所有 episodes
export function getAllEpisodes(topic?: string): Episode[] {
  let episodes = mockEpisodes;

  if (topic) {
    episodes = episodes.filter((episode) => episode.topic === topic);
  }

  episodes.sort((episode1, episode2) =>
    episode1.slug > episode2.slug ? 1 : -1
  );

  return episodes;
}

// 通过 youtube api 地址获取视频 Caption
export async function getYoutubeCaptionBySlug(slug: string): Promise<Caption[]> {
  const response = await fetch(`/api/transcript?url=${encodeURIComponent(slug)}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch transcript");
  }

  const transcriptData: { text: string; duration: number; offset: number }[] = await response.json();
  
  const transcript: Caption[] = transcriptData.map((item, index) => ({
    index: index + 1,
    text: item.text,
    start: (item.offset / 1000).toString(),
    end: ((item.offset + item.duration) / 1000).toString(),
  }));

  return transcript;
}

// 将毫秒转换为时间格式
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function timeToMilliseconds(time: string): number {
  const [minutes, seconds] = time.split(':').map(Number);
  return (minutes * 60 + seconds) * 1000;
}

// 根据字幕地址获取字幕
export async function getCaptionByUrl(
  captionSrc: string,
  startIndex?: number,
  endIndex?: number
): Promise<Caption[]> {
  
  // try {
  //   const response = await fetch(captionSrc);
  //   const blob = await response.blob();

  //   if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  // } catch (error) {
  //   console.error('An error occurred while fetching the captions:', error);
  //   // You can also handle the error in other ways, for example, show an error message to the user
  // }

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

// 将时间转换为秒
export function convertTimeToSeconds(time: string) {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseFloat(parts[2].replace(",", "."));

  return hours * 3600 + minutes * 60 + seconds;
}
