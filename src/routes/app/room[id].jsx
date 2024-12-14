
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
import { LucideArrowBigLeft, LucideArrowLeft, LucideArrowLeftSquare, LucideArrowUpLeft, LucideLock, LucidePaperclip, Trash } from "lucide-react";
import { useCallback } from "react";
import { deleteTask } from "@/services/tasks";
import { getUsersByRoomIdRealTime } from "@/services/user";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/components/auth-provider";
import { Square } from "lucide-react";
import { CheckSquare } from "lucide-react";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import {doc, getDoc, addDoc, collection, onSnapshot, query, where, setDoc, deleteDoc} from "../../services/firebase";
import {db} from "@/firebase";
import { getFirestore } from "firebase/firestore";

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { getRoomById } from "@/services/room";

const TaskDialog = ({ task, onClose, onToggleComplete }) => {
  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task?.title || "No task selected"}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ReactMarkdown 
              remarkPlugins={[remarkBreaks]} 
              children={task?.description.replace(/\n/gi, "&nbsp;\n")}
           />
          {task?.attachments && task.attachments.length > 0 && (
            <div>
              <h3 className="mt-4 mb-1 underline font-bold">Attachments:</h3>
              <ul>
                {task.attachments.map((url, index) => {
                  const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)/i);
                  const isVideo = url.match(/\.(mp4|webm|ogg|mov)/i);

                  const file_name = url.replaceAll("%2F", "/").split("?")[0].split("/")[9]

                  return (
                    <li key={index} className="mb-2 w-full">
                      {isImage && (
                        <a href={url} className="text-slate-600 w-full p-3 py-2 border border-slate-900 rounded-md flex flex-col gap-3">
                          <div className="flex gap-2">
                            <span className="text-white font-bold text-sm">Download</span><span>{file_name}</span>
                          </div>
                          <img
                            src={url}
                            alt={`${file_name}`}
                            className="w-32 h-auto object-cover rounded-md"
                          />
                        </a>
                      )}
                      {isVideo && (
                        <video
                          src={url}
                          controls
                          className="w-64 h-32 rounded-md"
                        />
                      )}
                      {!isImage && !isVideo && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 w-full p-3 py-2 border border-slate-900 rounded-md flex gap-2"
                        >
                          <span className="text-white font-bold text-sm">Download</span><span>{file_name}</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </DialogDescription>
        <DialogFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const LockedBadge = () => {
  return <>
    <span className="w-fit bg-red-500/50 border border-red-400 dark:text-red-300 text-red-900 flex gap-2 items-center p-2 py-1 rounded-sm">
    <LucideLock width={14}/>
    Locked
    </span>
  </>;
}

const Room = () => {
  const {id} = useParams();
  const {auth} = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [stepByStep, setStepByStep] = useState(false);
  
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  useEffect(() => {
    getTasksByRoomIdRealtime(id, setTasks);

    const fetchRoomSettings = async () => {
      try {
        const roomData = await getRoomById(id);
        if (roomData) {
          setStepByStep(roomData.stepbystep);
        }
      } catch (error) {
        console.error("Failed to fetch room settings:", error);
      }
    };

    fetchRoomSettings(stepByStep);
  }, [id]);

  const check = async (taskId) => {
    setDoc(doc("rooms", id, "tasks", taskId), {
      participants: [...tasks.find(task => task.id === taskId).participants, auth.user.uid]
    }, {merge: true});
  }
  const uncheck = async (taskId) => {
    setDoc(doc("rooms", id, "tasks", taskId), {
      participants: tasks.find(task => task.id === taskId).participants.filter(participant => participant !== auth.user.uid)
    }, {merge: true});
  }

  const isTaskLocked = (index) => {
    if (!stepByStep) return false; // Si stepByStep est désactivé, tout est accessible
    if (index === 0) return false; // La première tâche est toujours déverrouillée
    return !tasks[index - 1]?.participants?.includes(auth.user.uid); // Verrouille si la tâche précédente n'est pas complétée
  };

  return (
    <>
      <Link to={"/app"}><Button variant="secondary" size='sm' className="flex gap-1"><LucideArrowBigLeft width={20}/>My Rooms</Button></Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={task.id} onClick={() => { if (!isTaskLocked(index)) {handleTaskClick(task)}}} className="cursor-pointer">
              <TableCell className="font-medium flex items-center gap-2">
                {task.attachments && task.attachments.length > 0 ? <LucidePaperclip className="bg-green-300/40 text-green-700 dark:text-green-200 border border-green-400/60 w-6 h-6 p-[5px] rounded-md"/> : ''}
                {!isTaskLocked(index) ? task.title : <LockedBadge/>}
              </TableCell>
              <TableCell>
                {!isTaskLocked(index) ? <ReactMarkdown children={task?.description.replace(/\n/gi, "&nbsp;")}/> : "********************************"}
              </TableCell>
              <TableCell className="text-right flex justify-end">
              {task.participants?.includes(auth.user.uid) ? (
                  <Button
                    variant="ghost"
                    onClick={(event) => {
                      event.stopPropagation();
                      uncheck(task.id);
                    }}
                  >
                    <CheckSquare />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={(event) => {
                      event.stopPropagation();
                      !isTaskLocked(index) && check(task.id);
                    }}
                    disabled={isTaskLocked(index)}
                  >
                    <Square />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TaskDialog
        task={selectedTask}
        onClose={handleCloseDialog}
      />
    </>
  )
}

    //<RoomProvider roomId={id}>
    //</RoomProvider>
export default Room;