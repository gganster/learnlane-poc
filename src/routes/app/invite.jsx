import { useAuth } from "@/components/auth-provider";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { useCallback } from "react";

import { useParams } from "react-router-dom";

const formScheme = z.object({
  userName: z.string().min(3, { message: "Username must be at least 3 characters long"}),
  userSurname: z.string().min(3, { message: "Surname must be at least 3 characters long"}),
});

const Invite = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: {
      userName: "",
      userSurname: "",
    }
  });

  const onSubmit = useCallback(async (data) => {

  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Invite</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField control={form.control} name="userName" render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="userName">Name</FormLabel>
                  <FormControl>
                    <Input type="text" id="userName" placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="userSurname" render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="userSurname">Surname</FormLabel>
                  <FormControl>
                    <Input type="text" id="userSurname" placeholder="Surname" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
};

export default Invite;