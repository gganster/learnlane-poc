import {useRef, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ListTodo, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/components/auth-provider";
import { createRoom, getRoomsByUserIdRealtime } from "@/services/room";

import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const roomFakeData = [
  {
    id: 1,
    name: "Room 1",
    description: "Room 1 description",
    members: [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}],
    tasks: [{id: 1, name: "Task 1", description: "Task 1 description"}, {id: 2, name: "Task 2", description: "Task 2 description"}, {id: 3, name: "Task 3", description: "Task 3 description"}]
  },
];

const createFormScheme = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters long"}),
  description: z.string().min(3, {message: "Description must be at least 3 characters long"}),
});

const CreateDialog = () => {
  const close = useRef(null);
  const {auth} = useAuth();

  const form = useForm({
    resolver: zodResolver(createFormScheme),
    defaultValues: {
      title: "",
    }
  });

  const onSubmit = async (data) => {
    console.log(close);
    await createRoom({...data, userId: auth.user.uid})
    close.current.click();
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create room</Button>
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
              <Button type="submit">Create</Button>
            </DialogFooter>
            <DialogClose asChild><span ref={close}></span></DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const DashboardHome = () => {
  const {auth} = useAuth();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    return getRoomsByUserIdRealtime(auth.user.uid, setRooms);
  }, [auth]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-bold tracking-tight">Welcome home</h2>
      </div>

      <Card>
        <CardHeader >
          <div className="flex justify-between">
            <div className="flex-1">
              <CardTitle>Your rooms</CardTitle>
            </div>
            <CreateDialog />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <Link key={room.id} to={`/dashboard/rooms/${room.id}`}>
              <Card  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900">
                <CardHeader className="relative">
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent >
                  <div className="flex items-center justify-center" style={{gap: 10}}>
                    <div className="flex items-center" style={{gap: 4}}>
                      <UserIcon />
                      {room.members?.length ?? 0}
                    </div>
                    <div className="flex items-center border-l pl-2" style={{gap: 4}}>
                      <ListTodo />
                      {room.tasks?.length ?? 0}
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardHome;