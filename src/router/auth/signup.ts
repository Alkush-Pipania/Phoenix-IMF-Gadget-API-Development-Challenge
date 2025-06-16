import { RequestHandler, Router } from "express";
import { signupSchema } from "../../types";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

const router = Router();

const SignupHandler: RequestHandler = async (req , res) =>{
    const input = signupSchema.safeParse(req.body);
    if(!input.success){
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try{
        const hashedPassword = await bcrypt.hash(input.data.password, 10);
        const user = await prisma.user.create({
            data:{
                fullname : input.data.fullname,
                email : input.data.email,
                password : hashedPassword
            }
        })
        const token = jwt.sign({
            userId : user.id, email : user.email
        }, process.env.JWT_SECRET as string , {expiresIn : "3d"})

        res.status(201).json({
            message: "Signup successful",
            token : `Bearer ${token}`,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to signup' });
    }
}

router.post('/signup', SignupHandler);

export default router;

