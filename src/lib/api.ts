import { Episode } from "@/interface/Episode";
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
