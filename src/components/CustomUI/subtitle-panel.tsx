"use client";

import { useState, useEffect } from "react";
import { Airplay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type Caption = {
  start: string;
  end: string;
  text: string;
};

type SubtitlesProps = {
  subtitleUrl: string;
  onPlayClick: (caption: Caption) => void;
};

export default function SubtitlePanel({
  subtitleUrl,
  onPlayClick,
}: SubtitlesProps) {
  const [captions, setCaptions] = useState<Caption[]>([]);

  const parseSubtitles = (blob: Blob) => {
    if (!blob) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = (event.target as FileReader).result;
      if (typeof text !== "string") {
        return;
      }

      const subtitleBlocks = text.trim().split(/\n\s*\n/);

      const parsed = subtitleBlocks
        .map((subtitleBlock) => {
          let [index, timeString, ...textLines] = subtitleBlock.split("\n");
          const [start, end] = timeString.split(" --> ");
          const text = textLines
            .join("\n")
            .replace(/<[^>]*>/g, "")
            .replace(/\{.*?\}/g, "");

          if (!start || !end) {
            return null;
          }

          return { start, end, text };
        })
        .filter(
          (item): item is { start: string; end: string; text: string } =>
            item !== null
        );
      setCaptions(parsed);
    };

    reader.readAsText(blob);
  };

  useEffect(() => {
    fetch(subtitleUrl)
      .then((response) => {
        if (!response || !response.ok) {
          throw new Error("Failed to fetch subtitle file");
        }
        return response.blob();
      })
      .then(parseSubtitles)
      .catch((error) => console.error(error));
  }, [subtitleUrl]);

  return (
    <div>
      <div className="flex-col py-8">
        {captions.map((caption, index) => (
          <div className="py-2" key={index}>
            <Card>
              <div className="flex-row gap-4 py-4 px-6">
                <p className="text-base font-bold">{caption.text}</p>
                <p className="text-sm italic text-slate-500 pt-2">
                  {caption.start} - {caption.end}
                </p>
                <Button
                  variant={"outline"}
                  aria-label="Toggle bold"
                  onClick={() => onPlayClick(caption)}
                >
                  <Airplay size={12} />
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}