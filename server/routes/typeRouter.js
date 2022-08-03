const Router = require('express');
const typeController = require('../controllers/typeController');
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')



router.get('/', typeController.getAll)
router.post('/', typeController.create)
router.post('/delete', checkRole('ADMIN'), typeController.delete)


module.exports = router;