
import { Router, RequestHandler } from "express";
import prisma from "../lib/prisma";
import { addGadgetSchema, updateGadgetSchema } from "../types";
import generateRandomCodename from "../lib/helper";

const router = Router();

const getAllGadgets: RequestHandler = async (req , res) =>{
    try{
        const gadgets = await prisma.gadget.findMany();
        const getAllGadgets = () => {
            return gadgets.map(gadgets => {
              const probability = Math.floor(Math.random() * 40) + 60;
              return `${gadgets.name} - ${probability}% success probability`;
            });
          };
          res.json(getAllGadgets());
    }catch(e){
       console.log(e);
       res.status(500).json({ error: 'Failed to fetch gadgets' });
    }
}



const AddGadget: RequestHandler = async (req , res) =>{
    const input = addGadgetSchema.safeParse(req.body);
    if(!input.success){
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try{
        const gadget = await prisma.gadget.create({
            data:{
                name : input.data.gadget,
                codename : generateRandomCodename(),
                status : "Available",
            }
        })
        res.json(gadget);
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to add gadget' });
    }
}

const updateGadget: RequestHandler = async(req , res) =>{
    const input = updateGadgetSchema.safeParse(req.body);
    if(!input.success){
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try{
        await prisma.gadget.update({
            where : {
                name : input.data.gadget
            },
            data : {
                status : input.data.status
            }
        })
        res.json({ message: 'Gadget updated successfully' });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to update gadget' });
    }
}

const deleteGadget: RequestHandler = async(req , res) =>{
    try{
        await prisma.gadget.update({
            where : {
               id : req.params.id
            },
            data : {
                status : "Decommissioned",
                decommissionedAt : new Date()
            }
        })
        res.json({ message: 'Gadget deleted successfully' });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to delete gadget' });
    }
}

router.get("/", getAllGadgets);
router.post("/", AddGadget);
router.put("/", updateGadget);
router.delete("/:id", deleteGadget);


export default router;