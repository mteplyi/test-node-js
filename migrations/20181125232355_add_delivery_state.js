const tableName = 'reminder';
const colName = 'delivered';

exports.up = (knex) => knex.schema.alterTable(tableName, (table) => {
  table.boolean(colName).notNullable().defaultTo(false);
});

exports.down = (knex) => knex.schema.alterTable(tableName, (table) => {
  table.dropColumn(colName);
});
