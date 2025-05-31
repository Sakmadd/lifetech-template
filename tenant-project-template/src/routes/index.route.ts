import { Request, Response, Router } from 'express';
import userRoutes from './user.route';

const router = Router();

// Health check route
router.get('/', (_: Request, res: Response) => {
  res.json({ message: 'Welcome to SWMS API' });
});

router.use('/users', userRoutes);

export default router;
