import { z } from "zod";
export const formSchema = z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).regex(/[A-Z]/, { message: "At least one cap required" }).regex(/[0-9]/, { message: "At least one number required" }),
    confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
});
export type FormSchema = typeof formSchema;