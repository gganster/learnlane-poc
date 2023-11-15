import {useRef, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ListTodo, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/components/auth-provider";
import { useCallback } from "react";
import { createTask } from "@/services/tasks";
import { useRoom } from "@/components/room-provider";


const createFormScheme = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters long"}),
  description: z.string().min(3, {message: "Description must be at least 3 characters long"}),
});

const TaskEdit = () => {
  const {state} = useRoom();
  const close = useRef(null);
  const {auth} = useAuth();
  const form = useForm({
    resolver: zodResolver(createFormScheme),
    defaultValues: {
      title: "",
    }
  });
  
  const onSubmit = useCallback(async (data) => {
    await createTask({...data, roomId: state.room.id})
    close.current.click();
    form.reset();
  }, []);

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
                <DialogTitle>Create room</DialogTitle>
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
                        <Input type="text" id="description" placeholder="..." {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )} />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={() => close.current.click()}>Cancel</Button>
                <Button type="submit">Create</Button>
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