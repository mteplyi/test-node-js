const tableName = 'reminder';
const colName = 'userId';

exports.up = (knex) => knex.schema.alterTable(tableName, (table) => {
  table.bigInteger(colName).unsigned().notNullable();
});

exports.down = (knex) => knex.schema.alterTable(tableName, (table) => {
  table.dropColumn(colName);
});
