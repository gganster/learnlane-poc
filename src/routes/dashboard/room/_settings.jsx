
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FormField, Form, FormControl, FormDescription, FormMessage, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

const createFormScheme = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters long"}),
  description: z.string().min(3, {message: "Description must be at least 3 characters long"}),
  locked: z.boolean(),
});

const Settings = (props) => {
  const form = useForm({
    resolver: zodResolver(createFormScheme),
    defaultValues: {
      title: "",
      description: "",
      locked: false,
    }
  });

  const onSubmit = useCallback(async (data) => {

  }, []);

  return (
    <div className="flex flex-col" style={{gap: 10}}>
      <Card>
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Room settings</CardTitle>
              </CardHeader>
              <CardContent>
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
                <FormField control={form.control} name="locked" render={({field}) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Verrouillage</FormLabel>
                    <FormControl>
                      <span className="relative left-2 top-1">
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </span>
                    </FormControl>
                    <FormDescription>
                      Lock the room, no longer allow new members to join
                    </FormDescription>
                  </FormItem>
                )} />
              </CardContent>
              <CardFooter>
                <Button >Save</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </Card>
      <Alert>
        <AlertTitle className="flex items-center" style={{gap: 10}}>
          <AlertTriangle />
          <span>Danger zone</span>
        </AlertTitle>
        <AlertDescription className="mt-5">
          <Button variant="destructive">Delete room</Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default Settings;