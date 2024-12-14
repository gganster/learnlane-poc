
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
import TaskAdd from "./__tasks_add";
import TaskEdit from "./__tasks_edit";
import { useEffect, useState } from "react";
import { getTasksByRoomIdRealtime } from "@/services/tasks";
import { useRoom } from "@/components/room-provider";
import { LucidePaperclip, Trash, Trash2, Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import { deleteTask } from "@/services/tasks";
import { getUsersByRoomIdRealTime } from "@/services/user";

const Tasks = (props) => {
  const {state} = useRoom();
  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  useEffect(() => getUsersByRoomIdRealTime(state.room.id, setParticipants), [state.room.id]);
  useEffect(() => getTasksByRoomIdRealtime(state.room.id, setTasks), [state.room.id]);

  const removeTask = useCallback(async (roomId, taskId) => {
    await deleteTask(roomId, taskId);
  }, []);

  return (
    <>
      <div className="flex justify-end -mb-5">
        <div className="relative -top-10">
          <TaskAdd />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Members</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="cursor-pointer" onClick={() => handleTaskClick(task)}>
              <TableCell className="font-medium flex items-center gap-2">
                {task.attachments && task.attachments.length > 0 ? <LucidePaperclip className="bg-green-300/40 text-green-700 dark:text-green-200 border border-green-400/60 w-6 h-6 p-[5px] rounded-md"/> : ''}
                {task.title}
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell className="text-right"><small className="dark:bg-slate-800 bg-gray-200 px-2.5 py-1 rounded-sm text-xs">{task?.participants?.length ?? 0}/{participants?.length ?? 0}</small></TableCell>
              <TableCell className="text-right flex justify-end">
                <Trash2
                  width={25}
                  className="w-fit bg-red-500/50 border border-red-400 dark:text-red-300 text-red-900 flex gap-2 items-center p-2 py-1 rounded-sm"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeTask(state.room.id, task.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TaskEdit
        task={selectedTask}
        onClose={handleCloseDialog}
      />
    </>
  )
}

export default Tasks;
