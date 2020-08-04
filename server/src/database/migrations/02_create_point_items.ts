import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('point_items', table => {
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points')

        table.integer('item_id')  
            .notNullable()
            .references('id')
            .inTable('items')
        
        // adicionei a primary key para que não hajam pontos de coleta com dois itens iguais
        table.primary(['point_id', 'item_id'])
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('point_items')
}
