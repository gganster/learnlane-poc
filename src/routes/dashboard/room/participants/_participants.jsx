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
import { Separator } from "@/components/ui/separator";

const mock = [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}]

const Participants = (props) => (
  <div className="w-full">
    <div className="flex justify-center">
      <Table className="flex-1 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>name</TableHead>
            <TableHead>Task success</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mock.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>0/13</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <Separator className="my-6" />
    <div className="justify-center w-full flex">
      <Button>Invite</Button>
    </div>
  </div>
)

export default Participants;