import {useRef, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ListTodo, UserIcon } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAuth } from "@/components/auth-provider";
import { useCallback } from "react";
import { updateTask } from "@/services/tasks";
import { useRoom } from "@/components/room-provider";

import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const TaskEdit = ({ task, onClose }) => {
  const {state} = useRoom();
  const close = useRef(null);

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false); 
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const form = useForm({
    resolver: zodResolver(z.object({
    })),
  });

  const handleDeleteAttachment = async (url) => {
    try {
      const path = url.replaceAll("%2F", "/").split("tasks/")[1].split("?")[0];
      const storageRef = ref(storage, `tasks/${path}`);
      await deleteObject(storageRef);
      setEditedTask({
        ...editedTask,
        attachments: editedTask.attachments.filter((attachment) => attachment !== url),
      });
    } catch (error) {
      console.error("Failed to delete attachment:", error);
    }

    try {
      await updateTask({
        roomId: state.room.id,
        id: task.id,
        data: {
          attachments: editedTask.attachments.filter((attachment) => attachment !== url),
        }
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const files = Array.from(fileInputRef.current.files || []);
    const uploadedFiles = editedTask.attachments ? [...editedTask.attachments] : [];

    for (const file of files) {
      try {
        const storageRef = ref(storage, `tasks/${state.room.id}/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
        uploadedFiles.push(fileUrl);
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
      }
    }

    try {
      await updateTask({
        roomId: state.room.id,
        id: task.id,
        data: {
          title: editedTask.title,
          description: editedTask.description,
          attachments: uploadedFiles,
        }
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setLoading(false);
    }

    onClose();
  };

  return (
    <>
      <Dialog open={!!task} onOpenChange={onClose}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <DialogHeader>
                <DialogTitle>Edit task</DialogTitle>
                <DialogDescription>
                  <FormField control={form.control} name="title" render={({field}) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input type="text" id="title" {...field} value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({field}) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[150px]" value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}/>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )} />
                  {editedTask && editedTask.attachments && editedTask.attachments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-bold">Attachments:</h3>
                      <ul>
                        {editedTask.attachments.map((url, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                              Attachment {index + 1}
                            </a>
                            <Button type="button" variant="ghost" onClick={() => handleDeleteAttachment(url)}>
                              Delete
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <FormLabel className="mt-4">Add Attachments</FormLabel>
                  <Input type="file" multiple ref={fileInputRef} className="mb-4" />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={() => close.current.click()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Editing..." : "Edit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
        <DialogClose ref={close} />
      </Dialog>
    </>
  );
};

export default TaskEdit;