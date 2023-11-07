import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCallback } from "react";

const formScheme = z.object({
  email: z.string().email({ message: "Please enter a valid email"}),
  password: z.string().min(8, { message: "Password must be at least 8 characters long"}),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center" >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input type="email" id="email" placeholder="@" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" id="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter className="justify-center">
              <Button type="submit">Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default Login;