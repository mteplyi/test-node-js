const tableName = 'reminder';
const oldColName = 'id';
const newColName = 'reminderId';

exports.up = (knex) => knex.schema.alterTable(tableName, (table) => {
  table.renameColumn(oldColName, newColName);
});

exports.down = (knex) => knex.schema.alterTable(tableName, (table) => {
  table.renameColumn(newColName, oldColName);
});
