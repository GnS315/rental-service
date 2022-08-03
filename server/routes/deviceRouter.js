const Router = require('express');
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware');




router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/user', authMiddleware,  deviceController.getUserDevices)
router.post('/delete', authMiddleware, deviceController.deleteOneDevice)


module.exports = router;