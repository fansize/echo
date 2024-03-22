import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TopicTab() {
    return (
        <Tabs defaultValue="all" className="">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="ietls">IETLS</TabsTrigger>
                <TabsTrigger value="travel">Travel</TabsTrigger>
            </TabsList>
            {/* <TabsContent value="all">Make changes to your account here.</TabsContent>
            <TabsContent value="ietls">Change your password here.</TabsContent>
            <TabsContent value="travel">Change your password here.</TabsContent> */}
        </Tabs>
    )
}
