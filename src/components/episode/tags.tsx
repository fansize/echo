import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tags } from "@/content/episodes";

type Props = {
  onClick: (topic: string) => void;
};

export default function LevelTab({ onClick }: Props) {
  const all = "All";
  const daily = "A1";
  const oxford3000 = "B1";

  return (
    <Tabs defaultValue={all}>
      <TabsList>
        <TabsTrigger value={all} onClick={() => onClick("")}>
          {all}
        </TabsTrigger>

        <TabsTrigger value={daily} onClick={() => onClick(daily)}>
          {daily}
        </TabsTrigger>

        <TabsTrigger value={oxford3000} onClick={() => onClick(oxford3000)}>
          {oxford3000}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
