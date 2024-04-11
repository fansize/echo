"use client";
import { useState } from "react";
import { getAllEpisodes } from "@/lib/api";
import { EpisodeCard } from "@/components/customUI/episode-card";
import Container from "@/components/container/container";
import TopicTab from "@/components/episodes/tabs";
import AddEpisode from "@/components/episodes/add-episode";

export default function EpisodesPage() {
  const [topic, setTopic] = useState<string>("日常对话");
  const allEpisodes = getAllEpisodes(topic);

  const handleTopicClick = (topic: string) => {
    setTopic(topic);
  };

  return (
    <main>
      <Container>
        <div className="mx-auto max-w-2xl py-8 md:max-w-7xl">
          <div className="flex flex-row justify-between">
            <TopicTab onClick={handleTopicClick} />
            <AddEpisode />
          </div>
          <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 lg:gap-x-6 lg:gap-y-6 ">
            {allEpisodes.map((episode) => (
              <div key={episode.slug} className="group relative">
                <EpisodeCard {...episode} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
