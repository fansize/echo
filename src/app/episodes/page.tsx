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
          <h2 className="text-2xl font-semibold tracking-tight mt-8">
            Episodes Listing
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 lg:gap-x-6 lg:gap-y-6 ">
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
