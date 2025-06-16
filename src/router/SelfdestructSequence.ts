import { RequestHandler, Router } from "express";
import { selfdestructSequenceSchema } from "../types";
import prisma from "../lib/prisma";

const router = Router();

const SelfDestructSequence: RequestHandler = async (req , res) =>{
    const input = selfdestructSequenceSchema.safeParse(req.body);
    if(!input.success){
        res.status(400).json({ error: 'Code Required' });
        return;
    }
    try{
        await prisma.gadget.update({
            where : {
                id : req.params.id
            },
            data : {
                status : "Destroyed"
            }
        })
        res.json({ message: 'Gadget destroyed successfully' });

    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to fetch gadgets' });
    }
}

router.post("/gadgets/:id/self-destruct", SelfDestructSequence);

export default router;