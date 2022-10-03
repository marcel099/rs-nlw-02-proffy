import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.string('email');
    table.string('password');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('email');
    table.dropColumn('password');
  })
}

