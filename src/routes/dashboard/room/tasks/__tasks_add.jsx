import {useRef, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ListTodo, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/components/auth-provider";
import { createTask } from "@/services/tasks";
import { useRoom } from "@/components/room-provider";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const createFormScheme = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters long"}),
  description: z.string().min(3, {message: "Description must be at least 3 characters long"}),
});

const TaskAdd = () => {
  const {state} = useRoom();
  const close = useRef(null);
  const {auth} = useAuth();
  const form = useForm({
    resolver: zodResolver(createFormScheme),
    defaultValues: {
      title: "",
    }
  });

  const [loading, setLoading] = useState(false); 
  const fileInputRef = useRef(null);
  
  const onSubmit = async (data) => {
    setLoading(true);
    const files = Array.from(fileInputRef.current?.files || []); // Vérifie si des fichiers sont sélectionnés
    const uploadedFiles = [];
  
    for (const file of files) {
      try {
        const storageRef = ref(storage, `tasks/${state.room.id}/${file.name}`); // Crée une référence pour le fichier
        await uploadBytes(storageRef, file); // Télécharge le fichier dans Firebase Storage
        const fileUrl = await getDownloadURL(storageRef); // Récupère l'URL publique du fichier
        uploadedFiles.push(fileUrl); // Ajoute l'URL à la liste des fichiers téléchargés
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
      }
    }
  
    try {
      await createTask({
        ...data,
        roomId: state.room.id,
        attachments: uploadedFiles,
      });
      close.current.click(); // Ferme le formulaire après la création
      form.reset(); // Réinitialise le formulaire
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Create task</Button>
        </DialogTrigger>
  
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <DialogHeader>
                <DialogTitle>Create task</DialogTitle>
                <DialogDescription>
                  <FormField control={form.control} name="title" render={({field}) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input type="text" id="title" placeholder="..." {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({field}) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[150px]" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormLabel>Attachments</FormLabel>
                  <Input type="file" multiple ref={fileInputRef} className="mb-4" />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={() => close.current.click()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
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

export default TaskAdd;