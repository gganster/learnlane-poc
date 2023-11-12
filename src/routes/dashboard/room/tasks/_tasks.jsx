
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

const mock = [{id: 1, name: "User 1"}, {id: 2, name: "User 2"}]

const Tasks = (props) => (
  <>
    <div className="flex justify-end -mb-10">
      <Button className="relative -top-10">Add Task</Button>
    </div>
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Taskname</TableHead>
          <TableHead>description</TableHead>
          <TableHead className="text-right">Members</TableHead>
          <TableHead className="text-right">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[].map((user) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
)

export default Tasks;