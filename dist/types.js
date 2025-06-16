"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = exports.selfdestructSequenceSchema = exports.updateGadgetSchema = exports.addGadgetSchema = void 0;
const zod_1 = require("zod");
exports.addGadgetSchema = zod_1.z.object({
    gadget: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
});
exports.updateGadgetSchema = zod_1.z.object({
    gadget: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    status: zod_1.z.enum(["Available", "Deployed", "Destroyed", "Decommissioned"]),
});
exports.selfdestructSequenceSchema = zod_1.z.object({
    code: zod_1.z.string().min(4, "Code must be at least 4 characters long").max(4, "Code must be at most 4 characters long"),
});
exports.signupSchema = zod_1.z.object({
    fullname: zod_1.z.string().min(3, "Fullname must be at least 3 characters long"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
