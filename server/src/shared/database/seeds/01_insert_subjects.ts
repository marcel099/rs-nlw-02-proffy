import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('subjects').del();

  await knex('subjects').insert([
    { id: 1, name: 'Matemática' },
    { id: 2, name: 'Português' },
    { id: 3, name: 'Biologia' },
    { id: 4, name: 'Química' },
    { id: 5, name: 'Física' },
    { id: 6, name: 'Geografia' },
    { id: 7, name: 'História' },
    { id: 8, name: 'Artes' },
    { id: 9, name: 'Educação Física' },
  ]);
}
