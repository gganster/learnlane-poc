import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Tasks from "./_tasks";
import Participants from "./_participants";
import Settings from "./_settings";

const Room = () => {
  return (
    <>
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">tasks</TabsTrigger>
          <TabsTrigger value="participants">participants</TabsTrigger>
          <TabsTrigger value="settings">settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks"><Tasks /></TabsContent>
        <TabsContent value="participants"><Participants /></TabsContent>
        <TabsContent value="settings"><Settings /></TabsContent>
      </Tabs>
    </>
  )
}

export default Room;