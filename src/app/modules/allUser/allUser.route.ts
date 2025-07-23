import express from 'express';
import authenticate from '../../middlewares/authenticate';
import adminMiddleware from '../../middlewares/adminAuthorization';
import { UserController } from './allUser.controller';

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticate, adminMiddleware, UserController.getAllUsers);

// Update user by ID (Authenticated users)
router.put('/:id', authenticate, adminMiddleware, UserController.updateUser);

// Delete user by ID (Admin only)
router.delete('/:id', authenticate, adminMiddleware, UserController.deleteUser);

export const AllUserRoutes = router;
