"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const types_1 = require("../types");
const helper_1 = __importDefault(require("../lib/helper"));
const router = (0, express_1.Router)();
const getAllGadgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gadgets = yield prisma_1.default.gadget.findMany();
        const getAllGadgets = () => {
            return gadgets.map(gadgets => {
                const probability = Math.floor(Math.random() * 40) + 60;
                return `${gadgets.name} - ${probability}% success probability`;
            });
        };
        res.json(getAllGadgets());
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to fetch gadgets' });
    }
});
const AddGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = types_1.addGadgetSchema.safeParse(req.body);
    if (!input.success) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try {
        const gadget = yield prisma_1.default.gadget.create({
            data: {
                name: input.data.gadget,
                codename: (0, helper_1.default)(),
                status: "Available",
            }
        });
        res.json(gadget);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to add gadget' });
    }
});
const updateGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = types_1.updateGadgetSchema.safeParse(req.body);
    if (!input.success) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try {
        yield prisma_1.default.gadget.update({
            where: {
                name: input.data.gadget
            },
            data: {
                status: input.data.status
            }
        });
        res.json({ message: 'Gadget updated successfully' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to update gadget' });
    }
});
const deleteGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.gadget.update({
            where: {
                id: req.params.id
            },
            data: {
                status: "Decommissioned",
                decommissionedAt: new Date()
            }
        });
        res.json({ message: 'Gadget deleted successfully' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to delete gadget' });
    }
});
router.get("/", getAllGadgets);
router.post("/", AddGadget);
router.put("/", updateGadget);
router.delete("/:id", deleteGadget);
exports.default = router;
