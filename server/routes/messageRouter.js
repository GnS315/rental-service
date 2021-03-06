const Router = require('express');
const messageController = require('../controllers/messageController');
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware');



router.get('/', messageController.getAllRooms)
router.post('/', messageController.createRoom)
router.post('/create', authMiddleware, messageController.createMessage)
router.post('/get',authMiddleware,  messageController.getUserMessages)


module.exports = router;