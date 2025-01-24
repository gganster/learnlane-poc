
import { useEffect, useCallback, useState, useRef } from "react";

import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FormField, Form, FormControl, FormDescription, FormMessage, FormItem, FormLabel } from "@/components/ui/form";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

import { useRoom } from "@/components/room-provider";
import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteRoom, updateRoom, cloneRoom } from "@/services/room";
import { useNavigate } from "react-router-dom";

const createFormScheme = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters long"}),
  newtitle: z.string().min(3, {message: "Title must be at least 3 characters long"}),
  description: z.string().min(3, {message: "Description must be at least 3 characters long"}),
  locked: z.boolean(),
  stepbystep: z.boolean(),
  cloneParticipants: z.boolean(),
  cloneTasks: z.boolean(),
  cohesionMode: z.boolean(),
});

const CloneRoom = ({ isOpen, onClose }) => {
  const { state } = useRoom();
  const close = useRef(null);
  const navigate = useNavigate();
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(createFormScheme),
    defaultValues: {
      newtitle: "",
      cloneParticipants: false,
      cloneTasks: false,
    }
  });

  useEffect(() => {
    if (!state.room) return;

    form.reset({
      newtitle: state.room.title,
      cloneParticipants: false,
      cloneTasks: false,
    });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    if(data.newtitle === state.room.title) {
      return toast({
        title: "Erreur",
        description: "Le nom doit être différent de celui de la room actuelle.",
        variant: "destructive"
      })
    }
    try {
      const newRoom = await cloneRoom(state.room.id, data.newtitle, data.cloneParticipants, data.cloneTasks);
      navigate(`/dashboard/rooms/${newRoom.id}`);
      toast({
        title: "✅ Room cloned",
        variant: "default"
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "❌ Error happened",
        variant: "destructive"
      })
    } finally {
      setLoading(false);
    }
    
    onClose();
  };

  return (
    <Dialog open={!!isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.getValues());
          }} >
            <DialogHeader>
              <DialogTitle>Duplicate the room</DialogTitle>
              <DialogDescription className="mt-5">
                <FormField control={form.control} name="newtitle" render={({field}) => (
                  <FormItem>
                    <FormLabel htmlFor="newtitle">Title</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" id="newtitle" placeholder="Choisissez un nouveau nom pour la room dupliqué..." />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cloneParticipants" render={({field}) => (
                  <FormItem className="flex items-center gap-3 mt-4 mb-8 rounded-lg">
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="important:mt-0" style={{marginTop: -3}}>
                      <FormLabel className="font-bold" htmlFor="description">Clone with participants</FormLabel>
                      <FormDescription className="text-xs">Duplicate the room, giving current participants access to the duplicated room</FormDescription>
                    </div>
                  </FormItem>
                )} />
                <FormField control={form.control} name="cloneTasks" render={({field}) => (
                  <FormItem className="flex items-center gap-3 mt-4 mb-8 rounded-lg">
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="important:mt-0" style={{marginTop: -3}}>
                      <FormLabel className="font-bold" htmlFor="description">Clone with tasks</FormLabel>
                      <FormDescription className="text-xs">Duplicate the room with the actual tasks</FormDescription>
                    </div>
                  </FormItem>
                )} />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button variant="outline" type="" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Duplication..." : "Dupliquer"}
              </Button>
            </DialogFooter>
            </form>
          </Form>
      </DialogContent>
      <DialogClose ref={close} />
    </Dialog>
  );
};

const Settings = (props) => {
  const {state} = useRoom();
  const {toast} = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createFormScheme),
    defaultValues: {
      title: "",
      description: "",
      locked: false,
      stepbystep: false,
      cohesionMode: false,
      requireAllMembers: true,
      numberOfValidations: 0,
    }
  });

  useEffect(() => {
    if (!state.room) return;

    form.reset({
      title: state.room.title,
      description: state.room.description,
      locked: state.room.locked,
      stepbystep: state.room.stepbystep,
      cohesionMode: state.room.cohesionMode,
      requireAllMembers: state.room.requireAllMembers ?? form.defaultValues.requireAllMembers,
      numberOfValidations: state.room.numberOfValidations ?? form.defaultValues.numberOfValidations,
    });
  }, []);

  const onSubmit = useCallback(async (data) => {
    console.log(data)
    try {
      await updateRoom({id: state.room.id, data, uid: state.room.userId});
      toast({
        title: "✅ Room updated",
        variant: "default"
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "❌ Error happened",
        variant: "destructive"
      })
    }
  }, []);

  const onDelete = useCallback(async () => {
    try {
      await deleteRoom(state.room.id);
      navigate("/dashboard");
      toast({
        title: "✅ Room deleted",
        variant: "default"
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "❌ Error happened",
        variant: "destructive"
      })
    }
  }, []);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col mt-5 gap-4">
      <Card>
        <Form {...form}>
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.getValues());
          }} >
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
                <FormItem className="border flex items-center gap-3 mt-4 p-3 rounded-lg border-slate-900">
                  <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="important:mt-0" style={{marginTop: -3}}>
                    <FormLabel className="font-bold" htmlFor="description">Verrouillage</FormLabel>
                    <FormDescription className="text-xs">
                      Lock the room, no longer allow new members to join.
                    </FormDescription>
                  </div>
                </FormItem>
              )} />
              <FormField control={form.control} name="cohesionMode" render={({field}) => (
                <FormItem className="border mt-4 p-3 rounded-lg border-slate-900">
                  <div className={`flex items-center gap-3 ${field.value ? "mb-5" : ""}`}>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="important:mt-0" style={{marginTop: -3}}>
                      <FormLabel className="font-bold" htmlFor="description">Cohesion Mode</FormLabel>
                      <FormDescription className="text-xs">
                        Prevents access to the next task until a specific validation rule is met.
                      </FormDescription>
                    </div>
                  </div>

                  {field.value && (
                    <div className="border-t py-3">
                      <strong>Settings</strong>
                      <div className="flex flex-col gap-2 mt-3">
                        {/* Toggle to require all members */}
                        <FormField control={form.control} name="requireAllMembers" render={({field: allMembersField}) => (
                          <div className="flex items-center gap-3">
                            <FormControl>
                                <Switch 
                                  checked={allMembersField.value} 
                                  onCheckedChange={(checked) => {
                                    allMembersField.onChange(checked);
                                    form.setValue("requireAllMembers", checked); // Met à jour explicitement
                                  }} 
                                />
                            </FormControl>
                            <div className="important:mt-0" style={{marginTop: -3}}>
                              <FormDescription className="text-xs">
                                Require all members to validate the current task before proceeding to the next one.
                              </FormDescription>
                            </div>
                          </div>
                        )} />

                        {/* Number of validations (visible only if "requireAllMembers" is false) */}
                        <FormField control={form.control} name="numberOfValidations" render={({field: validationsField}) => (
                          !form.watch("requireAllMembers") && ( // Utilisation de `form.watch` pour forcer le re-rendu
                            <div className="mt-3">
                              <div className="flex justify-between w-full items-center">
                                <label className="font-bold">Number of validations</label>
                                <small className="opacity-60">
                                  Specify how many members must validate the task before unlocking the next one.
                                </small>
                              </div>
                              <Input
                                type="number"
                                className="flex-1 text-xs text-gray-200 border border-slate-400"
                                {...validationsField}
                              />
                            </div>
                          )
                        )} />
                      </div>
                    </div>
                  )}
                </FormItem>
              )} />

              <FormField control={form.control} name="stepbystep" render={({field}) => (
                <FormItem className="border flex items-center gap-3 mt-4 p-3 rounded-lg border-slate-900">
                  <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="important:mt-0" style={{marginTop: -3}}>
                    <FormLabel className="font-bold" htmlFor="description">Strict Step by Step</FormLabel>
                    <FormDescription className="text-xs">
                    Forces members to validate previous tasks before being able to do and see the next ones.
                    </FormDescription>
                  </div>
                </FormItem>
              )} />
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button type="submit">Save</Button>
              <Button variant="secondary" type="button" onClick={() => handleOpenDialog()}>Duplicate room</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Alert className="border border-slate-950">
        <AlertTitle className="flex items-center" style={{gap: 10}}>
          <AlertTriangle />
          <span>Danger zone</span>
        </AlertTitle>
        <AlertDescription className="mt-5">
          <Button variant="destructive" className='h-8 rounded-md' onClick={onDelete}>Delete room</Button>
        </AlertDescription>
      </Alert>

      <CloneRoom isOpen={isOpen} onClose={handleCloseDialog} />
    </div>
  )
}

export default Settings;