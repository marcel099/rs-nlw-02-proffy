// Pode-se colocar todos os testes de criação de ONG e listagem de ONG no mesmo arquivo de testes
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

// async function resetDb () {
//     const results = await connection.raw(
//         `SELECT table_name 
//         FROM information_schema.tables
//         WHERE table_schema = 'mydb';`
//     )
    
//     await connection.raw("SET FOREIGN_KEY_CHECKS = 0");

//     results[0].forEach( async ({ table_name }) => {
//         await connection.raw("DROP TABLE IF EXISTS '" + table_name + "';");
//     })

//     await connection.raw("SET FOREIGN_KEY_CHECKS = 1");
// };

let [ong_id, incident_id] = [[], []]

describe('ONG', () => {      // Utiliza-se uma biblioteca que faça chamadas API para o back-end

    beforeEach( async () => {
        await connection.migrate.latest()       // Antes de realizar quaisquer testes executa as migrations
    })

    let ongs = [
    { 
        name: 'APAD',
        email: 'contato@apad.com',
        whatsapp: '1234567890',
        city: 'Rio do Sul',
        uf: 'SC'
    },
    { 
        name: 'APAE',
        email: 'contato@apae.com',
        whatsapp: '78901521548',
        city: 'Soledade',
        uf: 'RS'
    }]    
    
    ongs.forEach(ong => {
        it('should be able to create a new ONG', async () => {
            const response = await request(app)
                .post('/ongs')
                .send(ong)
                .expect(200)
            
            expect(response.body).toHaveProperty('id')
            expect(response.body.id).toHaveLength(8)
    
            ong_id.push(response.body.id)
        })
    })

    it('should be able to list the ONGs', async () => {
        const response = await request(app)
            .get('/ongs')
            .expect(200)

        expect(response.body).toHaveLength(2)

        response.body.forEach(ong => {

            expect(ong).toHaveProperty('name')
            expect(ong).toHaveProperty('email')
            expect(ong).toHaveProperty('whatsapp')
            expect(ong).toHaveProperty('city')
            expect(ong).toHaveProperty('uf')

            expect(ong.uf).toHaveLength(2)
        })
    })
})

describe('Session', () => {

    it('should be able the ONG to do login if it exists', async () => {
        const response = await request(app)
            .post('/session')
            .send({
                id: ong_id[ Math.round(Math.random()) ],        // Escolhe aleatoriamente para logar na ong 0 ou 1
            })
            .expect(200)

        expect(response.body).toHaveProperty('name')
    })

    it(`shouldn't be able the ONG to do login if it doesn't exist`, async () => {
        const response = await request(app)
            .post('/session')
            .send({
                id: '1234abcg',
            })
            .expect(400)

        expect(response.body).toHaveProperty('error')
    })
    
})

describe('Incident', () => {

    for (let i=0; i<8; i++)
    {
        it('should be able to create a new incident', async () => {
            const response = await request(app)
                .post('/incidents')
                .send({
                    title: "Caso 1",
                    description: "Detalhes do caso",
                    value: 120
                })
                .set('Accept', 'application/json')
                .set('Authorization', ong_id[ (i%2 === 0) | 0 ])   // Usa o paridade do valor da iteração atual para escolher a fk apontando para a ong 0 ou 1
                .expect(200)                                    // Assim, gera metade dos incidentes para a ong 1 e metade para a ong 2
            
            expect(response.body).toHaveProperty('id')
            expect(response.body.id).toBeGreaterThanOrEqual(1)

            incident_id.push(response.body.id)
        })
    }

    it('should be able to list 5 incidents for the users in the page 1', async () => {
        const response = await request(app)
            .get('/incidents')
            .expect(200)

        expect(response.body).toHaveLength(5)

        response.body.forEach(incident => {
            expect(incident).toHaveProperty('id')
            expect(incident.id).toBeGreaterThanOrEqual(1)

            expect(incident).toHaveProperty('title')
            expect(incident).toHaveProperty('description')
            expect(incident).toHaveProperty('value')
            expect(incident.value).toBeGreaterThan(0)
            
            expect(incident).toHaveProperty('ong_id')
            expect(incident.ong_id).toHaveLength(8)
            
            expect(incident).toHaveProperty('name')
            expect(incident).toHaveProperty('email')
            expect(incident).toHaveProperty('whatsapp')
            expect(incident).toHaveProperty('city')

            expect(incident).toHaveProperty('uf')
            expect(incident.uf).toHaveLength(2)
        })
    })

    it(`should be able to list 3 incidents for the users in page 2`, async () => {
        const response = await request(app)
            .get('/incidents?page=2')
            .expect(200)

        expect(response.body).toHaveLength(3)

        response.body.forEach(incident => {
            expect(incident).toHaveProperty('id')
            expect(incident.id).toBeGreaterThanOrEqual(1)

            expect(incident).toHaveProperty('title')
            expect(incident).toHaveProperty('description')
            expect(incident).toHaveProperty('value')
            expect(incident.value).toBeGreaterThan(0)
            
            expect(incident).toHaveProperty('ong_id')
            expect(incident.ong_id).toHaveLength(8)
            
            expect(incident).toHaveProperty('name')
            expect(incident).toHaveProperty('email')
            expect(incident).toHaveProperty('whatsapp')
            expect(incident).toHaveProperty('city')

            expect(incident).toHaveProperty('uf')
            expect(incident.uf).toHaveLength(2)
        })
    })

    it(`shouldn't be able to list incidents in page 3`, async () => {
        const response = await request(app)
            .get('/incidents?page=4')
            .expect(200)

        expect(response.body).toHaveLength(0)
    })


    it(`shouldn't be able to delete the incident if the incident doesn't exist in the table`, async () => {
        const response = await request(app)
            .delete(`/incidents/${300}`)
            .set('Authorization', ong_id[0])
            .expect(400)

            expect(response.body).toHaveProperty('error')
    })

    it(`shouldn't be able to delete the incident if the ong_id isn't the owner`, async () => {
        const response = await request(app)
            .delete(`/incidents/${incident_id[1]}`)
            .set('Authorization', '1234abcg')
            .expect(401)
        
        expect(response.body).toHaveProperty('error')
    })

    it('should be able to delete the incident if the ong_id is the owner', async () => {
        const response = await request(app)
            .delete(`/incidents/${incident_id[0]}`)
            .set('Authorization', ong_id[1])        // Após deletar, ONG 0 tem 4 incidentes e ONG 1 tem 3 incidentes
            .expect(204)
    })

    it(`should be able to list 2 incidents for the users in page 2 after one was deleted`, async () => {
        const response = await request(app)
            .get('/incidents?page=2')
            .expect(200)

        expect(response.body).toHaveLength(2)
    })
})

describe('Profile', () => {

    afterAll( async () => {
        await connection.migrate.rollback()     // Após executar todos os testes é bom desfazer todas as alterações no database, pois pode ficar gigante em algum momento
        await connection.destroy()              // Depois de todos os testes a conexão com o banco de dados é desfeita
    })

    it('should be able to list exactly 3 incidents from the ONG 1', async () => {
        const response = await request(app)
            .get('/profile')
            .set('Authorization', ong_id[0])
            .expect(200)

        expect(response.body).toHaveLength(4)           // ONG 0 tem 4 incidentes

        response.body.forEach(incident => {
            expect(incident).toHaveProperty('title')
            expect(incident).toHaveProperty('description')
            expect(incident).toHaveProperty('value')
            expect(incident.value).toBeGreaterThan(0)
        })
    })

    it('should be able to list exactly 4 incidents from the ONG 2', async () => {
        const response = await request(app)
            .get('/profile')
            .set('Authorization', ong_id[1])
            .expect(200)

        expect(response.body).toHaveLength(3)           // ONG 1 tem 3 incidentes

        response.body.forEach(incident => {
            expect(incident).toHaveProperty('title')
            expect(incident).toHaveProperty('description')
            expect(incident).toHaveProperty('value')
            expect(incident.value).toBeGreaterThan(0)
        })
    })
})