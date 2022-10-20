import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('classes', (table) => {
    table.dropColumn('subject');

    table
      .integer('subject_id')
      .notNullable()
      .references('id')
      .inTable('subjects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('classes', (table) => {
    table.dropColumn('subject_id');
    table.string('subject').notNullable();
  });
}
