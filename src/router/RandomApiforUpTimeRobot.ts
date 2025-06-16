import { Router, Request, Response } from "express";

const router = Router();

router.get('/one', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', name: 'one' });
});
router.get('/two', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', name: 'two' });
});
router.get('/three', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', name: 'three' });
});
router.get('/four', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', name: 'four' });
});
router.get('/five', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', name: 'five' });
});
router.get('/six', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', name: 'six' });
});
router.get('/seven', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', name: 'seven' });
});

export default router;