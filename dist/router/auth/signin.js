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
const types_1 = require("../../types");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const SignupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = types_1.signinSchema.safeParse(req.body);
    if (!input.success) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                email: input.data.email
            }
        });
        if (!user) {
            res.status(400).json({ error: 'User not found' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(input.data.password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'Invalid password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id, email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.status(201).json({
            message: "Signin successful",
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to signin' });
    }
});
router.post('/signin', SignupHandler);
exports.default = router;
