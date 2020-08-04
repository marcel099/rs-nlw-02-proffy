const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
// Segments representam os segmentos que temos dentro de uma requisição
// query, route, body, header

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router()

// O Express é como um telefone sem fio
// As coisas vão passando de um pra outro até chegar ao usuário
// Esse conceito é chamado de Midwares

// Mesmo que não esteja criando nada no banco de dados, ele cria uma sessão
routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().length(8),
    })
}), SessionController.create)


routes.get('/ongs', OngController.index)

// Sempre que a chave de um objeto for uma variável do JavaScript deve-se colocar colchetes por volta
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),     // verifica se é um e-mail válido
        whatsapp: Joi.string().required().min(10).max(11),      // min max com number não trabalha com o número de dígitos
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create)     // Se invertesse ele primeiro iria criar a ONG pra depois fazer as validações dos dados do usuário


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index)

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.create)

routes.delete('/incidents/:id', celebrate({         // Tá com erro
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete)


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({     // Atualmente o id tá sendo gerado aleatoriamente, mas poderia ser usado um formato específico, como o uuid (universal unique id)
        authorization: Joi.string().required().length(8)                          // sempre vai converter para letra minúscula, mesmo que o que tenha sido enviado esteja em upper case
    }).unknown()    // Tem que ser o unknown pq não sabemos quem são todos valores que estão nos header da página                                           // Também tem o regex
}), ProfileController.index)

module.exports = routes
