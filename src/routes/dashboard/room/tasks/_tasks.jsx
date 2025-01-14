import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TaskAdd from "./__tasks_add";
import TaskEdit from "./__tasks_edit";
import { useEffect, useState, useCallback } from "react";
import { getTasksByRoomIdRealtime, updateTaskPositions, deleteTask } from "@/services/tasks";
import {getUsersByRoomIdRealTime } from "@/services/user";
import { useRoom } from "@/components/room-provider";
import { LucidePaperclip, Trash2 } from "lucide-react";
import { ReactSortable } from "react-sortablejs";

const Tasks = () => {
  const { state } = useRoom();
  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  const handleReorder = async (newOrder) => {
    setTasks(newOrder);
    await updateTaskPositions(state.room.id, newOrder);
  };

  useEffect(() => getTasksByRoomIdRealtime(state.room.id, setTasks), [state.room.id]);
  useEffect(() => getUsersByRoomIdRealTime(state.room.id, setParticipants), [state.room.id]);

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
            <TableHead></TableHead>
            <TableHead className="w-[200px]">Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Membres</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <ReactSortable
          list={tasks}
          setList={handleReorder}
          animation={150}
          tag="tbody"
          handle=".drag-handle"
        >
          {tasks.map((task) => (
            <TableRow key={task.id} className="cursor-pointer" onClick={() => handleTaskClick(task)}>
              <TableCell className="drag-handle font-medium gap-2 w-10 cursor-move">
                <span className="flex flex-col gap-1 items-center">
                  <div className="w-[3px] h-[3px] bg-gray-600 rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-gray-600 rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-gray-600 rounded-full"></div>
                </span>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                {task.attachments && task.attachments.length > 0 ? (
                  <LucidePaperclip className="bg-green-300/40 text-green-700 dark:text-green-200 border border-green-400/60 w-6 h-6 p-[5px] rounded-md" />
                ) : (
                  ""
                )}
                {task.title}
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell className="text-right">
                <small className="dark:bg-slate-800 bg-gray-200 px-2.5 py-1 rounded-sm text-xs">
                  {task?.participants?.length ?? 0}/{participants?.length ?? 0}
                </small>
              </TableCell>
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
        </ReactSortable>
      </Table>
      <TaskEdit task={selectedTask} onClose={handleCloseDialog} />
    </>
  );
};

export default Tasks;
