"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GadgetInventory_1 = __importDefault(require("./router/GadgetInventory"));
const SelfdestructSequence_1 = __importDefault(require("./router/SelfdestructSequence"));
const signup_1 = __importDefault(require("./router/auth/signup"));
const signin_1 = __importDefault(require("./router/auth/signin"));
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/', signup_1.default);
app.use('/', signin_1.default);
app.use(auth_1.authenticateToken);
app.use('/gadgets', GadgetInventory_1.default);
app.use('/', SelfdestructSequence_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
