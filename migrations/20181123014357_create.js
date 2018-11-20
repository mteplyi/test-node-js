const tableName = 'reminder';

exports.up = (knex) => knex.schema.createTable(tableName, (table) => {
  table.increments('id').primary();
  table.dateTime('remindAt').notNullable();
  table.text('name').notNullable();
});

exports.down = (knex) => knex.schema.dropTable(tableName);
