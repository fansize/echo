import { Caption } from "@/interface/Caption";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <ScrollArea>
      <div className="flex flex-col gap-1 ">
        {captions.map((caption, index) => (
          <div
            key={index}
            className={`inline-flex px-4 py-2 rounded-sm text-base cursor-pointer transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 ${caption === selectedCaption
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
  );
}
