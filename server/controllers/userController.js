const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const knex = require('knex')
const configs = require('../configs/index')
const db = knex(configs.development.database)
const jwt = require('jsonwebtoken')

const generateJWT = (id, login, role) => {
    return jwt.sign(
        {id, login, role}, 
        configs.development.jwt.secretKey, 
        {expiresIn:'24h'}
        )
}

class UserController {
    async registration(req, res, next) {

            const {login, password, role} = req.body
            if(!login || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await db('user')
            .where({
                'login':login
            })
            .select('login')
            if (candidate[0]?.login === login) {
                next(ApiError.badRequest('Пользователь уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await db('user')
            .insert({
                'login':login,
                'password':hashPassword,
                'role':role
            })
            const userId = await db('user')
            .where({
                'login':login
            })
            .select('*')
            const tokenValue = generateJWT(userId[0].id, userId[0].login, userId[0].role)
            return res.json({token: tokenValue})

    }

    async login(req, res, next) {

            const {login, password} = req.body
            const user = await db('user')
            .where({
                'login':login
            })
            //.select('*')
            if(user[0]?.login !== login){
                return next(ApiError.internal('Пользователь с таким именем не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user[0].password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            if(user[0]?.status === 'blocked') {
                return next(ApiError.internal('Вы были забанены'))
            }
            const token = generateJWT(user[0].id, user[0].login, user[0].role)
            return res.json({'token': token})

    }

    async check(req, res, next) {

            const token = generateJWT(req.user.id, req.user.login, req.user.role)
            return res.json({token})

    }

    async getAllUsers (req, res, next) {

            const allUsers = await db('user') 
            .whereNot({
                'role': "ADMIN",
                'status':'blocked'
            })
            .select("*")
            res.json(allUsers)

    }

    async banUser (req, res, next) {

            const {id} = req.body
            const deletedDevice = await db('device')
            .where({
                'user_id':id
            })
            .delete()
            const deletedUser = await db('user')
            .where({
                'id':id
            })
            .update({
                'status': 'blocked'
            })
            res.json(deletedUser)
    }
}

module.exports = new UserController()