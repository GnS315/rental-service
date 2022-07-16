/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt')

  const password = 'ADMIN'


exports.seed = async function(knex) {
  const hashPassword = await bcrypt.hash(password, 5)
  const userPassword = await bcrypt.hash('USER', 5)
  await knex('messages').del()
  await knex('rooms').del()
  await knex('device').del()
  await knex('type').del()
  await knex('user').del()


  await knex('user').insert([
    {id: 1, login: 'ADMIN', password: hashPassword, role:'ADMIN', status: 'active'},
    {id: 2, login: 'ADMIN1', password: hashPassword, role:'ADMIN', status: 'active'},
    {id: 3, login: 'ADMIN2', password: hashPassword, role:'ADMIN', status: 'active'},
    {id: 4, login: 'UserName', password: userPassword, role:'USER', status: 'active'},
    {id: 5, login: 'UserName1', password: userPassword, role:'USER', status: 'active'},
    {id: 6, login: 'UserName2', password: userPassword, role:'USER', status: 'active'},
  ]);
  await knex('type').insert([
    {id: 1, name: 'Техника'},
    {id: 2, name: 'Хобби'},
    {id: 3, name: 'Инструменты'},
    {id: 4, name: 'Спорт'}
  ])
};
