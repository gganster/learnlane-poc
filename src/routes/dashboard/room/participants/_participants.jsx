import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCallback } from "react";
import { useMemo } from "react";
import { useRoom } from "@/components/room-provider";
import {Input} from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { getUsersByRoomIdRealTime } from "@/services/user";
import { getTasksByRoomIdRealtime } from "@/services/tasks";

const mock = [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}]

const Participants = (props) => {
  const {toast} = useToast();
  const {state} = useRoom();
  const {room} = state;
  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => getTasksByRoomIdRealtime(room.id, setTasks), [room.id]);
  useEffect(() => getUsersByRoomIdRealTime(room.id, setParticipants), [room.id]);

  const link = useMemo(() => {
    return `${window.location.origin}/app/invite/${room?.id}`
  }, [room]);

  const copyInviteLink = useCallback(() => {
    navigator.clipboard.writeText(link);
    toast({title: "Copied invite link"});
  }, [link]);

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Table className="flex-1 w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>name</TableHead>
              <TableHead>Task success</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.userName} {user.userSurname}</TableCell>
                <TableCell>{tasks.filter(i => i.participants.includes(user.id)).length}/{tasks?.length ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Separator className="my-6" />
      <div className="justify-center w-full flex items-stretch">
        <Input value={link} readOnly className="flex-1" />
        <Button onClick={copyInviteLink}><Copy /></Button>
      </div>
    </div>
  )
}

export default Participants;