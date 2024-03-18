"use client";

import { Caption } from "@/lib/parse-subtitles";

type SubtitlesProps = {
  captions: Caption[];
  selectedCaption: Caption | undefined;
  onPlayClick: (caption: Caption) => void;
};

export default function SubtitlePanel({
  captions,
  selectedCaption,
  onPlayClick,
}: SubtitlesProps) {
  return (
    <div>
      <div className="flex flex-col gap-1">
        {captions.map((caption, index) => (
          <div className="flex" key={index}>
            <p
              className={`inline-flex items-center justify-center p-2 rounded-sm text-base font-medium cursor-pointer transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 ${
                caption === selectedCaption
                  ? "bg-amber-500 hover:bg-amber-500"
                  : ""
              }`}
              onClick={() => onPlayClick(caption)}
            >
              {caption.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
