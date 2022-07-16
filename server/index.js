const express = require('express');
const configs = require('./configs/index')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const PORT = configs.development.server.port || 5000;
const http = require ('http')
const app = express();
const server = http.Server(app)
const io = require('socket.io')(server , {
    cors: {
        origin: 'http://localhost:3000'
    }
})


io.on('connection', (socket) => {
    socket.on('join room', (data) => {
        socket.join(data.room)
        socket.on('new message', data => {
            io.in(data.room).emit('new message', {
                username: data.username,
                message: data.message,
                room: data.room
            })

        })
        socket.on('leave room', (data) => {
            socket.leave(data.room)
            socket.removeAllListeners('leave room') 
            socket.removeAllListeners('new message')
        }) 
    })
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

try {
    server.listen(PORT, () => {console.log(`server started on port ${PORT}`)})
} catch (e) {
    console.log(e);
}