const { Router } = require('express');
const router = Router();

// controllers
const { getUsers, register, login, protectedGetUsers, logout } = require('../controllers/auth');

// validators
const { registerValidation, loginValidation } = require('../validators/auth');

// middlewares
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { userAuth } = require('../middlewares/authMiddleware');

router.get('/get-users', getUsers);
router.get('/protected-get-users', userAuth, protectedGetUsers);
router.post('/register-users', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);

module.exports = router;
