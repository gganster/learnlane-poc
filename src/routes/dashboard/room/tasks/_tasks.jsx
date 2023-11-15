
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
import TaskEdit from "./__tasks_edit";
import { useEffect, useState } from "react";
import { getTasksByRoomIdRealtime } from "@/services/tasks";
import { useRoom } from "@/components/room-provider";
import { Trash } from "lucide-react";
import { useCallback } from "react";
import { deleteTask } from "@/services/tasks";
import { getUsersByRoomIdRealTime } from "@/services/user";

const Tasks = (props) => {
  const {state} = useRoom();
  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => getUsersByRoomIdRealTime(state.room.id, setParticipants), [state.room.id]);
  useEffect(() => getTasksByRoomIdRealtime(state.room.id, setTasks), [state.room.id]);

  const removeTask = useCallback(async (roomId, taskId) => {
    await deleteTask(roomId, taskId);
  }, []);

  return (
    <>
      <div className="flex justify-end -mb-10">
        <div className="relative -top-10">
          <TaskEdit />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Taskname</TableHead>
            <TableHead>description</TableHead>
            <TableHead className="text-right">Members</TableHead>
            <TableHead className="text-right">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell className="text-right">{task?.participants?.length ?? 0}/{participants?.length ?? 0}</TableCell>
              <TableCell className="text-right flex justify-end">
                <Trash onClick={() => removeTask(state.room.id, task.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Tasks;