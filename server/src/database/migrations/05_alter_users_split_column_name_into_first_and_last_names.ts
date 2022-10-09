import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('name');
    table.string('first_name');
    table.string('last_name');
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', table => {
    table.string('name');
    table.dropColumn('first_name');
    table.dropColumn('last_name');
  })
}
