"use client";
import { useCompletion } from "ai/react";
import { useState, useCallback, use } from "react";
import { Caption } from "@/interface/Caption";
import { ScrollArea } from "@/components/ui/scroll-area";
import LevelTab from "@/components/episode/tags";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type Props = {
  captions: Caption[];
  selectedCaption: Caption | undefined;
  onPlayClick: (caption: Caption) => void;
};

export default function CaptionPanel({
  captions,
  selectedCaption,
  onPlayClick,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [generatedBios, setGeneratedBios] = useState<String>("");
  // const [topic, setTopic] = useState<string>("日常对话");
  // const allEpisodes = getAllEpisodes(topic);

  const { complete } = useCompletion({
    api: "/api/sortByLevel",
  });

  const generateLevel = useCallback(
    async (e: string) => {
      const completion = await complete(e);
      console.log(completion);
    },
    [complete]
  );

  const handleLevelClick = (topic: string) => {
    // setTopic(topic);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <LevelTab onClick={handleLevelClick} />
        <Button
          variant={"link"}
          size={"icon"}
          onClick={() => generateLevel("hi")}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="mt-4">
        <div className="flex flex-col gap-1 ">
          {captions.map((caption, index) => (
            <div
              key={index}
              className={`inline-flex px-4 py-2 rounded-sm text-base cursor-pointer transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 ${
                caption === selectedCaption
                  ? "bg-indigo-400 hover:bg-indigo-400"
                  : ""
              }`}
              onClick={() => onPlayClick(caption)}
            >
              <p>{caption.text}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
