const { Router } = require('express');
const router = Router();

// controllers
const { register, login, logout } = require('../controllers/auth');

// validators
const { registerValidation, loginValidation } = require('../validators/auth');

// middlewares
const { validationMiddleware } = require('../middlewares/validationMiddleware');

// auth routs
router.post('/register-users', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post('/logout', logout);

module.exports = router;
