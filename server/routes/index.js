const Router = require('express');
const router = new Router()
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const deviceRouter = require('./deviceRouter');
const messageRouter = require('./messageRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/message', messageRouter)



module.exports = router;