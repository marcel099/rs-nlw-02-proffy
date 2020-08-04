const generateUniqueId = require('../../src/utils/generateUniqueId')

// Categoria de teste
describe('Generate Unique ID', () => {     // o it vem do pronome pessoal inglês it
    it('should generate an unique ID', () => {   // Dá-se um nome para os testes para depois ser muito claro para saber qual falhou
        const id = generateUniqueId()

        expect(id).toHaveLength(8)
    })   
 })
 
