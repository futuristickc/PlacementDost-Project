const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const user = require('../models/User');

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deletUser);

module.exports = router;