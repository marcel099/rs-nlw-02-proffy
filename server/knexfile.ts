import path from 'path';
import 'dotenv/config';

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
  migrations: {
    directory: path.resolve(
      __dirname,
      'src',
      'shared',
      'database',
      'migrations'
    ),
  },
  seeds: {
    // eslint-disable-next-line prettier/prettier
    directory: path.resolve(
      __dirname,
      'src',
      'shared',
      'database',
      'seeds'
    ),
  },
  useNullAsDefault: true,
};
