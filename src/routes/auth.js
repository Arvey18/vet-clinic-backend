import { Router } from 'express';

// models
import Users from '../models/users.js';

// controllers
import AuthController from '../controllers/auth.js';

// validation middlewares
import validationMiddleware from '../middlewares/validationMiddleware.js';

// validators
import AuthValidator from '../validators/auth.js';

// initialize auth validator
const authValidator = new AuthValidator(Users);
// initialize auth controllers
const authController = new AuthController(Users);

// intialize router
const router = Router();

// Auth routes
router.post('/register-users', authValidator.registerValidation, validationMiddleware, authController.register);
router.post('/login', authValidator.loginValidation, validationMiddleware, authController.login);
router.post('/logout', authController.logout);

export default router;
