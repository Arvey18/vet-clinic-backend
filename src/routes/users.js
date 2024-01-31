const { Router } = require('express');
const router = Router();

// controllers
const { protectedGetUsers, protectedGetUserByEmail } = require('../controllers/users');

// middlewares
const { userAuth } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');

// users routes
router.get('/', userAuth, protectedGetUsers);
router.get('/profile/:email', userAuth, validationMiddleware, protectedGetUserByEmail);

module.exports = router;
