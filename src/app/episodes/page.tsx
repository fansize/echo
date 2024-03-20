import { getAllEpisodes } from "@/lib/api";
import Link from "next/link";
import { EpisodeCard } from "@/components/CustomUI/episode-card";

export default function EpisodesPage() {
  const allEpisodes = getAllEpisodes();
  const heroEpisode = allEpisodes[0];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight">Episodes Listing</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {allEpisodes.map((episode) => (
          <div key={episode.id} className="group relative">
            <EpisodeCard {...episode} />
          </div>
        ))}
      </div>
    </div>
  );
}
