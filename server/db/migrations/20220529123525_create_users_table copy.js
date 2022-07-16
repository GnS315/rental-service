/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema
  .createTable('user',(table) => {
      table.increments('id').primary()
      table.string('login').notNullable().unique()
      table.string('password').notNullable()
      table.string('role').defaultTo('USER')
      table.string('status').defaultTo('active')
  }),
  await knex.schema
  .createTable('type',(table) => {
      table.increments('id').primary()
      table.string('name').unique().notNullable()
  }),

  await knex.schema
  .createTable('device',(table) => {
      table.increments('id').primary()
      table.string('name').unique().notNullable()
      table.integer('price').notNullable()
      table.string('img').notNullable()
      table.string('info')
      table.integer('user_id').references('id').inTable('user')
      table.integer('type_id').references('id').inTable('type')
  }),
  await knex.schema
  .createTable('rooms', (table) => {
    table.increments('id').primary()
    table.string('room').unique()
    table.integer('first_user_id').references('id').inTable('user')
    table.integer('second_user_id').references('id').inTable('user')
  })
  .createTable('messages', (table) => {
    table.increments('id').primary()
    table.string('room_id').references('room').inTable('rooms')
    table.integer('user_sender_id').references('id').inTable('user')
    table.string('message')
    table.timestamp('date', {useTz: false}).notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('messages');
    await knex.schema.dropTable('rooms');
    await knex.schema.dropTable('device');
    await knex.schema.dropTable('type');
    await knex.schema.dropTable('user');
};
