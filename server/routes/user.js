const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authorizeToken');
const roleMiddleware = require('../middlewares/authorizeRole');


router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/profile/:id', authMiddleware, roleMiddleware, userController.getProfile);
router.put('/editprofile/:id', authMiddleware, roleMiddleware, userController.editProfile);

module.exports = router;