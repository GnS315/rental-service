const knex = require('knex');
const ApiError = require('../error/ApiError')
const configs = require('../configs/index')
const db = knex(configs.development.database)


class TypeController {

    async create(req, res, next) {

            const {name} = req.body
            const type = await db('type')
            .insert({
                'name': name
            })
            .returning(db.raw('*'))
            return res.json(type)

    }

    async getAll(req, res) {

            const types = await db
            .select(['id', 'name'])
            .from('type')
            return res.json(types)

    }

    async delete(req ,res, next) {

            const {id} = req.body
            const device = await db('device')
            .where({
                'type_id': id
            })
            .delete()
            const type = await db('type')
            .where({
                'id':id
            })
            .delete()
            res.json(type)

    }
}

module.exports = new TypeController()