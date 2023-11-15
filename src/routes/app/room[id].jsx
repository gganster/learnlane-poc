
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
import { useEffect, useState } from "react";
import { getTasksByRoomIdRealtime } from "@/services/tasks";
import { useRoom } from "@/components/room-provider";
import { Trash } from "lucide-react";
import { useCallback } from "react";
import { deleteTask } from "@/services/tasks";
import { getUsersByRoomIdRealTime } from "@/services/user";
import { useParams } from "react-router-dom";
import { useAuth } from "@/components/auth-provider";
import { Square } from "lucide-react";
import { CheckSquare } from "lucide-react";

import {doc, getDoc, addDoc, collection, onSnapshot, query, where, setDoc, deleteDoc} from "../../services/firebase";
import {db} from "@/firebase";
import { getFirestore } from "firebase/firestore";

const Room = () => {
  const {id} = useParams();
  const {auth} = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => getTasksByRoomIdRealtime(id, setTasks), [id]);

  const check = async (taskId) => {
    console.log(taskId)
    setDoc(doc("rooms", id, "tasks", taskId), {
      participants: [...tasks.find(task => task.id === taskId).participants, auth.user.uid]
    }, {merge: true});
  }
  const uncheck = async (taskId) => {
    setDoc(doc("rooms", id, "tasks", taskId), {
      participants: tasks.find(task => task.id === taskId).participants.filter(participant => participant !== auth.user.uid)
    }, {merge: true});
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Taskname</TableHead>
            <TableHead>description</TableHead>
            <TableHead className="text-right">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell className="text-right flex justify-end">
                {task.participants?.includes(auth.user.uid) ? (
                  <Button variant="ghost" onClick={() => uncheck(task.id)}>
                    <CheckSquare />
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={() => check(task.id)}>
                    <Square />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

    //<RoomProvider roomId={id}>
    //</RoomProvider>
export default Room;