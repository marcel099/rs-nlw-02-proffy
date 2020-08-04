
// Método up sempre será responsável pela criação da tabela
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  });           // Precisa retornar uma Promise
};

// Usado para desfazer migrations caso tenha dado algum problema
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
