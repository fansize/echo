import Tag from "@/components/CustomUI/custom-tag";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  selectedTag?: number;
};

export default function TypeBar({ selectedTag }: Props) {
  const tags = [{ text: "Easy" }, { text: "Medium" }, { text: "Hard" }];

  return (
    // <ScrollArea>
    <div className="flex flex-row gap-2">
      {tags.map((tag) => (
        <div className="items-center" key={tag.text}>
          <Tag text={tag.text} />
        </div>
      ))}
    </div>
    //   <ScrollBar />
    // </ScrollArea>
  );
}
