import { Router } from 'express';

// validation middlewares
import validationMiddleware from '../middlewares/validationMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

// models
import Users from '../models/users.js';
import UsersProfile from '../models/usersProfile.js';

// controllers
import UsersController from '../controllers/users.js';

//initialize users controllers
const usersController = new UsersController(Users, UsersProfile);

// initialize auth middleware
const authMiddleware = new AuthMiddleware(Users);

// intialize router
const router = Router();

// middleware for authentication
router.use(authMiddleware.userAuth);

// Routes for users
router.get('/', usersController.protectedGetUsers);
router.get('/profile/:email', validationMiddleware, usersController.protectedGetUserByEmail);

export default router;
