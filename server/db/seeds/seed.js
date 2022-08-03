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
    {login: 'ADMIN', password: hashPassword, role:'ADMIN', status: 'active'},
    {login: 'ADMIN1', password: hashPassword, role:'ADMIN', status: 'active'},
    {login: 'ADMIN2', password: hashPassword, role:'ADMIN', status: 'active'},
    {login: 'UserName', password: userPassword, role:'USER', status: 'active'},
    {login: 'UserName1', password: userPassword, role:'USER', status: 'active'},
    {login: 'UserName2', password: userPassword, role:'USER', status: 'active'},
  ]);
  await knex('type').insert([
    {name: 'Техника'},
    {name: 'Хобби'},
    {name: 'Инструменты'},
    {name: 'Спорт'}
  ])
};
