import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomProvider } from "@/components/room-provider";

import Tasks from "./tasks/_tasks";
import Participants from "./participants/_participants";
import Settings from "./settings/_settings";
import { useParams } from "react-router-dom";

const Room = () => {
  const {id} = useParams();
  
  return (
    <RoomProvider roomId={id}>
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks"><Tasks /></TabsContent>
        <TabsContent value="participants"><Participants /></TabsContent>
        <TabsContent value="settings"><Settings /></TabsContent>
      </Tabs>
    </RoomProvider>
  )
}

export default Room;