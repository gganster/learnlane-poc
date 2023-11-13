import React from "react";

import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

const createFormScheme = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters long"}),
  description: z.string().min(3, {message: "Description must be at least 3 characters long"}),
});

const TaskEdit = () => {
  const close = useRef(null);
  const {auth} = useAuth();
  
  return (
    <></>
  );
};

export default TaskEdit;