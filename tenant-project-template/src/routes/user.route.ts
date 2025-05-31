import { UserController } from '../controllers/user.conrtoller';
import { UserService } from '../services/user.service';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { PrismaClient } from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();
const userService = new UserService(prisma);
const userController = new UserController(userService);

router.post('/internal/sync', userController.SyncUser);

export default router;
