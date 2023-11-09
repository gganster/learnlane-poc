import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";
import { UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const roomFakeData = [
  {
    id: 1,
    name: "Room 1",
    description: "Room 1 description",
    members: [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}],
    tasks: [{id: 1, name: "Task 1", description: "Task 1 description"}, {id: 2, name: "Task 2", description: "Task 2 description"}, {id: 3, name: "Task 3", description: "Task 3 description"}]
  },
  {
    id: 2,
    name: "Room 2",
    description: "Room 2 description",
    members: [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}],
    tasks: [{id: 1, name: "Task 1", description: "Task 1 description"}, {id: 2, name: "Task 2", description: "Task 2 description"}, {id: 3, name: "Task 3", description: "Task 3 description"}]
  },
  {
    id: 3,
    name: "Room 3",
    description: "Room 3 description",
    members: [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}],
    tasks: [{id: 1, name: "Task 1", description: "Task 1 description"}, {id: 2, name: "Task 2", description: "Task 2 description"}, {id: 3, name: "Task 3", description: "Task 3 description"}]
  },
  {
    id: 4,
    name: "Room 4",
    description: "Room 4 description",
    members: [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}],
    tasks: [{id: 1, name: "Task 1", description: "Task 1 description"}, {id: 2, name: "Task 2", description: "Task 2 description"}, {id: 3, name: "Task 3", description: "Task 3 description"}]
  },
  {
    id: 5,
    name: "Room 5",
    description: "Room 5 description",
    members: [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}],
    tasks: [{id: 1, name: "Task 1", description: "Task 1 description"}, {id: 2, name: "Task 2", description: "Task 2 description"}, {id: 3, name: "Task 3", description: "Task 3 description"}]
  },
];

const DashboardHome = () => {
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
            <Button>Create room</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {roomFakeData.map((room) => (
              <Link key={room.id} to={`/dashboard/rooms/${room.id}`}>
              <Card  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900">
                <CardHeader className="relative">
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent >
                  <div className="flex items-center justify-center" style={{gap: 10}}>
                    <div className="flex items-center" style={{gap: 4}}>
                      <UserIcon />
                      {room.members.length}
                    </div>
                    <div className="flex items-center border-l pl-2" style={{gap: 4}}>
                      <ListTodo />
                      {room.tasks.length}
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