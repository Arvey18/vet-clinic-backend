const { Router } = require('express');
const router = Router();

// controllers
const { protectedGetUsers, protectedGetUserByEmail } = require('../controllers/users');

// middlewares
const { userAuth } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');

// auth middleware
router.use(userAuth);

// users routes
router.get('/', protectedGetUsers);
router.get('/profile/:email', validationMiddleware, protectedGetUserByEmail);

module.exports = router;
