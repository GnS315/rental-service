const jwt = require('jsonwebtoken')
const configs = require('../configs/index')

module.exports = function (role) {
    return function(req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, configs.development.jwt.secretKey)
            if(decoded.role !== role) {
                res.status(403).json({message: 'нет доступа'})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: 'Не авторизован'})
        }
    }   
}