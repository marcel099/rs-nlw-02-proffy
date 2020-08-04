import Knex from 'knex' // importa o tipo Knex, e não a variável Knex

export async function up(knex: Knex) {      // TS permite o autocomplete dentro do KNEX 0_0
    return knex.schema.createTable('points', table => {
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    }) // todo: está sem as colunas endereço e número
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('points')
}
