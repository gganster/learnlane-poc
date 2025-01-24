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

import { ref, set, onValue } from "firebase/database";
import { realtimeDb } from "@/firebase";


const Participants = (props) => {
  const {toast} = useToast();
  const {state} = useRoom();
  const {room} = state;
  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const roomOnlineRef = ref(realtimeDb, `onlineUsers`);
    const unsubscribe = onValue(roomOnlineRef, (snapshot) => {
      const onlineData = snapshot.val() || {};
      const now = Date.now();
      const updatedOnlineUsers = Object.entries(onlineData).reduce((acc, [key, value]) => {
        if (now - value.lastPing < 60000) {
          acc[key] = true;
        }
        return acc;
      }, {});
      setOnlineUsers(updatedOnlineUsers);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => getTasksByRoomIdRealtime(room.id, setTasks), [room.id]);
  useEffect(() => getUsersByRoomIdRealTime(room.id, setParticipants), [room.id]);

  const link = useMemo(() => {
    return `${window.location.origin}/app/invite/${room?.id}`
  }, [room]);

  const copyInviteLink = useCallback(() => {
    navigator.clipboard.writeText(link);
    toast({title: "Invite link copied!", type: "success"});
  }, [link]);

  return (
    <div className="w-full">
      <div className="justify-center w-full flex items-stretch gap-3 mt-7 mb-3">
        <Input value={link} readOnly className="flex-1 text-xs text-gray-300" />
        <Button onClick={copyInviteLink}><Copy width={14} /></Button>
      </div>
      {/* <Separator className="my-6" /> */}
      <div className="flex justify-center">
        <Table className="flex-1 w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">🆔</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Task Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((user) => (
              <TableRow key={user.id}>
                <TableCell><code className="dark:bg-slate-800 bg-gray-200 p-2 py-1 rounded-sm text-[12px]">{user.id}</code></TableCell>
                <TableCell>{user.userName} {user.userSurname}</TableCell>
                <TableCell>
                  {onlineUsers[user.id] ? (
                    <span className="bg-green-500/30 border text-green-500 dark:text-white/60 border-green-500/50 text-xs rounded-md px-3 py-1">En ligne</span>
                  ) : (
                    <span className="bg-gray-500/30 border text-gray-500 dark:text-white/60 border-gray-500/50 text-xs rounded-md px-3 py-1">Hors ligne</span>
                  )}
                </TableCell>
                <TableCell className="text-green-500">{tasks.filter(i => i.participants.includes(user.id)).length}/{tasks?.length ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Participants;