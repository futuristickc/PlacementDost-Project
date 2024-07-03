const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const user = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', userController.createUser);
router.get('/users', authMiddleware('admin'), userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware('admin'), userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;