import express from 'express';
import { userController } from '../controllers/userController';
import { userService } from '../services/userServices';
import { isAdmin, userMiddleware } from '../util/middleware';

export const userRoutes = express.Router();

userRoutes.use(express.json());

const user = new userService();
export const UserController = new userController(user);
// CRUD
// Login
userRoutes.post('/login', UserController.login);

// Register account
userRoutes.post('/register', UserController.register);

// Get account details
userRoutes.get('/account', userMiddleware, UserController.getAccount);

// Update account details
userRoutes.patch('/account', userMiddleware, UserController.patchAccount);

// Change password
userRoutes.patch('/password', userMiddleware, UserController.patchPassword);

// Authorize admin
userRoutes.patch('/accountAdmin', userMiddleware, isAdmin, UserController.patchAccountAdmin)
