import path from 'path';

module.exports = {      // infelizmente, o knex não suporta a sintaxe export default
    client: 'sqlite3',
    
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {       // nem sempre o último param é um arquivo
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true,
}