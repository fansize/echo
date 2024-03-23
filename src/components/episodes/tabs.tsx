import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadPanel from "./upload-panel";
import { tags } from "@/content/episodes";

type Props = {
  onClick: (topic: string) => void;
};

export default function TopicTab({ onClick }: Props) {
  return (
    <Tabs defaultValue="all" className="">
      <TabsList>
        <TabsTrigger value="all" onClick={() => onClick("all")}>
          All
        </TabsTrigger>
        <TabsTrigger value="ietls" onClick={() => onClick(tags.daily.topic)}>
          {tags.daily.topic}
        </TabsTrigger>
        <TabsTrigger value="travel" onClick={() => onClick(tags.series.topic)}>
          {tags.series.topic}
        </TabsTrigger>
      </TabsList>
      {/* <TabsContent value="all">Make changes to your account here.</TabsContent>
            <TabsContent value="ietls">Change your password here.</TabsContent>
            <TabsContent value="travel">Change your password here.</TabsContent> */}
      <TabsContent value="travel">
        <UploadPanel />
      </TabsContent>
    </Tabs>
  );
}
