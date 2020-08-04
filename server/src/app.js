const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('./routes')     // Se não passar o ./ ao importar um arquivo ele vai interpretar como sendo um pacote

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);        // Tem que estar obrigatoriamente abaixo do express.json()
app.use(errors())

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 *
 * GET: Buscar uma informação do Back-End
 * POST: Criar uma informação no Back-End
 * PUT: Alterar uma informação no Back-End
 * DELETE: Deletar uma informação no Back-End
 *
 */

 /**
  * Tipos de parâmetros:
  *
  * ? Pode enviar mais de um parâmetro definido
 ** Query Parms: Parâmetros nomeados/enviados na rota após o "?" (filtros, paginação)
  * /users?name=Marcelo
  * /users?page=2&name=Marcelo&idade=25
  *
  * ? No route params não se pode enviar mais parâmeteos do que é o esperado
 ** Route Parms: parâmetros utilizados para identifcar recursos
  * /users/2        -> /users/:id
  *
 ** Request Body: corpo da requisição, utilizado para criar ou alterar recursos
  */

 /**
  * SQL: MySQL, SQLite, PostresSQL, Oracle, Microsoft SQL Server
  * NoSQL: MongoDB, CouchDB, etc
  */

 /**
  * Driver: SELECT * FROM users;
  * Query Builder: tabela('users').select('*').where();             // KNex.js. Query Builder mais utilizado no ambiente node
  */




module.exports = app
// app.listen(3333);


/**
 * src      -> source: pasta com todo o código escrito por nós devs na aplicação
 */
