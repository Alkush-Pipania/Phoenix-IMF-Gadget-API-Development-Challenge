import { RequestHandler, Router } from "express";
import { signinSchema, signupSchema } from "../../types";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

const router = Router();

const SignupHandler: RequestHandler = async (req , res) =>{
    const input = signinSchema.safeParse(req.body);
    if(!input.success){
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try{
        const user = await prisma.user.findFirst({
            where:{
                email : input.data.email
            }
        })
        if(!user){
            res.status(400).json({ error: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(input.data.password, user.password);
        if(!isPasswordValid){
            res.status(400).json({ error: 'Invalid password' });
            return;
        }

        const token = jwt.sign({
            userId : user.id, email : user.email
        }, process.env.JWT_SECRET as string , {expiresIn : "3d"})

        res.status(201).json({
            message: "Signin successful",
            token : `Bearer ${token}`,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to signin' });
    }
}

router.post('/signin', SignupHandler);

export default router;
