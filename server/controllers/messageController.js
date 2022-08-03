const knex = require('knex');
const ApiError = require('../error/ApiError')
const configs = require('../configs/index')
const db = knex(configs.development.database)


class MessageController {
    async createRoom(req, res, next) {
            const {firstId, secondId} = req.body
            let roomNumber;
            let first_id;
            let second_id
            if (firstId !== secondId) {
                firstId > secondId ? 
                (roomNumber = String(secondId) + String(firstId),
                first_id = secondId,
                second_id = firstId
                )
                :
                (roomNumber = String(firstId) + String(secondId),
                first_id = firstId,
                second_id = secondId
                )
                const checkRoom = await db('rooms')
                .where({
                    'room':roomNumber
                })
                .select("*")
                if (checkRoom[0]?.room == roomNumber) {
                    return res.json(checkRoom)
                }
                const room = await db('rooms') 
                    .insert({
                        'room':roomNumber,
                        'first_user_id': first_id,
                        'second_user_id': second_id
                    })
                    .returning("*")
                return res.json(room)
            } else (
                next(ApiError.badRequest('Неверно задано имя'))
            )
    }

    async getAllRooms(req, res, next) {
        const {id} = req.query
            const chatRoomsFirst = await db('rooms')
            .where({
            'first_user_id': id
            })
            .join('user', {
                'user.id': 'rooms.second_user_id'
            })
            .select('rooms.id', 'rooms.room', 'rooms.first_user_id', 'rooms.second_user_id', 'user.login', 'user.id')
            const chatRoomsSecond = await db('rooms')
            .where({
            'second_user_id': id
            })
            .join('user', {
                'user.id': 'rooms.first_user_id'
            })
            .select('rooms.id', 'rooms.room', 'rooms.first_user_id', 'rooms.second_user_id', 'user.login', 'user.id')
            const rooms = [...chatRoomsFirst, ...chatRoomsSecond]
        return res.json(rooms)
    }
    
    async createMessage (req,res, next) {
            const {userId, roomId, message} = req.body
            const sentMessage = await db('messages')
            .insert({
                'room_id': roomId,
                'user_sender_id':userId,
                'message' : message,
                'date': new Date().now
            })
            .returning('*')
            res.json(sentMessage)
    }

    async getUserMessages(req , res, next) {
            const {roomId} = req.body
            const messages = await db('messages')
            .where({
                'room_id':roomId
            })
            .join('user' , {
                'user.id': 'messages.user_sender_id'
            })
            .select('messages.id', 'messages.room_id', 'messages.user_sender_id', 'messages.message', 'messages.date', 'user.login')
            .orderBy('messages.date')
            res.json(messages)
    }
}

module.exports = new MessageController()