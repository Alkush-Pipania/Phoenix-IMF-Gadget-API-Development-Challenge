import express, {  RequestHandler } from 'express';
import { default as gadgetInventory } from './router/GadgetInventory';
import { default as selfdestructSequence } from './router/SelfdestructSequence';  
import { default as signup } from './router/auth/signup';
import { default as signin } from './router/auth/signin';
import { authenticateToken } from './middleware/auth';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', signup);
app.use('/', signin);

app.use(authenticateToken as RequestHandler);

app.use('/gadgets', gadgetInventory);
app.use('/', selfdestructSequence);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;