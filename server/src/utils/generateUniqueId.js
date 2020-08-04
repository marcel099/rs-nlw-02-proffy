const crypto = require('crypto')

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX')
}

// Por que separar isso em outro arquivo?
// Caso outra parte da aplicação também use a mesma funcionalidade
//concentra-se toda a geração em um único local