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
const types_1 = require("../types");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
const SelfDestructSequence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = types_1.selfdestructSequenceSchema.safeParse(req.body);
    if (!input.success) {
        res.status(400).json({ error: 'Code Required' });
        return;
    }
    try {
        yield prisma_1.default.gadget.update({
            where: {
                id: req.params.id
            },
            data: {
                status: "Destroyed"
            }
        });
        res.json({ message: 'Gadget destroyed successfully' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to fetch gadgets' });
    }
});
router.post("/gadgets/:id/self-destruct", SelfDestructSequence);
exports.default = router;
