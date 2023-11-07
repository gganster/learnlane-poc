import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Email:</Label>
          <Input />
          <Label>Password:</Label>
          <Input />
        </CardContent>
        <CardFooter>
          <Button variant="primary">Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login;