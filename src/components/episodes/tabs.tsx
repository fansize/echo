import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tags } from "@/content/episodes";

type Props = {
  onClick: (topic: string) => void;
};

export default function TopicTab({ onClick }: Props) {
  const all = "All";
  const daily = tags.daily.topic;
  const oxford3000 = tags.oxford3000.topic;

  return (
    <Tabs defaultValue={daily}>
      <TabsList>
        <TabsTrigger value={all} onClick={() => onClick("")}>
          全部
        </TabsTrigger>

        <TabsTrigger value={daily} onClick={() => onClick(daily)}>
          {daily}
        </TabsTrigger>

        <TabsTrigger value={oxford3000} onClick={() => onClick(oxford3000)}>
          {oxford3000}
        </TabsTrigger>
      </TabsList>

      {/* <TabsContent value={all}>
        <p className="pt-2">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value={daily}>
        <p className="pt-2">Change your password here.</p>
      </TabsContent>
      <TabsContent value={oxford3000}>
        <p className="pt-2">Change your password here.</p>
      </TabsContent> */}
    </Tabs>
  );
}
