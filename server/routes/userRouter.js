const Router = require('express');
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware');
const checkRole= require('../middleware/checkRoleMiddleware');


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/users', authMiddleware,  userController.getAllUsers)
router.post('/ban', checkRole('ADMIN'), userController.banUser)


module.exports = router;