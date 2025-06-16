import {z} from 'zod';

export const addGadgetSchema = z.object({
    gadget : z.string().min(3, "Name must be at least 3 characters long"),
})

export const updateGadgetSchema = z.object({
    gadget : z.string().min(3, "Name must be at least 3 characters long"),
    status : z.enum(["Available", "Deployed", "Destroyed", "Decommissioned"]),
})

export const selfdestructSequenceSchema = z.object({
    code : z.string().min(4, "Code must be at least 4 characters long").max(4, "Code must be at most 4 characters long"),
})

export const signupSchema = z.object({
    fullname : z.string().min(3, "Fullname must be at least 3 characters long"),
    email : z.string().email(),
    password : z.string().min(6, "Password must be at least 6 characters long"),
})

export const signinSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6, "Password must be at least 6 characters long"),
})
