import { useAuth } from "@/components/auth-provider";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { useCallback } from "react";

import { useParams } from "react-router-dom";
import { createAnonymousUser } from "@/services/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formScheme = z.object({
  userName: z.string().min(3, { message: "Username must be at least 3 characters long"}),
  userSurname: z.string().min(3, { message: "Surname must be at least 3 characters long"}),
});

const Invite = () => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: {
      userName: "",
      userSurname: "",
    }
  });

  const onSubmit = useCallback(async (data) => {
    try {
      await createAnonymousUser({
        data: {
          ...data,
          roomId: id,
        }
      }).then(() => {
        navigate(`/app`);
      });
    } catch (e) {
      console.error(e);
      toast({title: "Error happened", type: "destructive"})
    }
  }, [id]);

  return (
    <div className="h-[70vh] w-screen flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[400px] ">
          <Card className="w-full">
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
            <CardFooter>
              <Button type="submit">submit</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
};

export default Invite;