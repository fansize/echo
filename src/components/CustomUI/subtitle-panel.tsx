import { Caption } from "@/interface/Caption";

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
  return (
    <div className="flex flex-col gap-1">
      {captions.map((caption, index) => (
        <div
          key={index}
          className={`inline-flex p-2 rounded-sm text-base cursor-pointer transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 ${
            caption === selectedCaption ? "bg-amber-500 hover:bg-amber-500" : ""
          }`}
          onClick={() => onPlayClick(caption)}
        >
          <p>{caption.text}</p>
        </div>
      ))}
    </div>
  );
}
