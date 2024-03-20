import { getAllEpisodes } from "@/lib/api";
import { EpisodeCard } from "@/components/CustomUI/episode-card";
import Container from "@/components/CustomUI/container";

export default function EpisodesPage() {
  const allEpisodes = getAllEpisodes();
  const heroEpisode = allEpisodes[0];

  return (
    <main>
      <Container>
        <div className="mx-auto max-w-2xl py-8 md:max-w-7xl">
          <h2 className="font-semibold tracking-tight">Episodes Listing</h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {allEpisodes.map((episode) => (
              <div key={episode.id} className="group relative">
                <EpisodeCard {...episode} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
