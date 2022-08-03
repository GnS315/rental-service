const knex = require('knex');
const ApiError = require('../error/ApiError')
const configs = require('../configs/index')
const db = knex(configs.development.database)
const uuid = require('uuid')
const path = require('path');

class DeviceController {

    async create(req, res, next) {
        try {
            const {name, price, typeId, userId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await db('device')
            .insert({
                'name':name,
                'price':price,
                'type_id':typeId,
                'user_id':userId,
                'img':fileName,
                'info': info
            })
            .returning('*')
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

            let {typeId, limit, page} = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let devices;
            if (!typeId) {
                devices = await db('device')
                .join('user', 'device.user_id', '=', 'user.id')
                .select( 'device.id', 'device.name', 'device.price', 'device.img','device.info', 'user.login')
            }
            if(typeId) {
                devices = await db('device')
                .where({
                    'type_id':typeId
                })
                .join('user', {'device.user_id' : 'user.id'})
                .select( 'device.id', 'device.name', 'device.price', 'device.img','device.info', 'user.login')
            }
            return res.json(devices)

    }

    async getOne(req, res) {

            const {id} = req.params
            const device = await db('device')
            .where({'device.id': id})
            .join('user', 'device.user_id', '=', 'user.id')
            .select( 'device.id', 'device.name', 'device.price', 'device.img','device.info', 'user.login', 'device.user_id')
            return res.json({device})

    }

    async getUserDevices(req, res, next) {

            const {id} = req.body
            const devices = await db('device')
            .where({
                'user_id' : id
            })
            .select('*')
            res.json(devices) 

    }

    async deleteOneDevice(req,res, next) {

            const {id} = req.body
            const deletedDevice = await db('device')
            .where({
                'id' : id
            })
            .delete()
            res.json(deletedDevice) 

    }
}



module.exports = new DeviceController()