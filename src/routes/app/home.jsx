import { useAuth } from "@/components/auth-provider";
import {useRef, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ListTodo, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getRoomsBatch } from "@/services/room";

const Room = () => {
  const { auth } = useAuth();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      setRooms(await getRoomsBatch(auth.user.rooms));
    })()
  }, [])

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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <Link key={room.id} to={`/app/rooms/${room.id}`}>
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
};

export default Room;