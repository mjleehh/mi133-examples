import request from 'supertest'
import app from '../api'
import setup from './setup'
import teardown from './teardown'

beforeAll(setup)
afterAll(teardown)

describe('residents', () => {
    it('can be listed', async () => {
        const {status, body} = await request(app).get('/api/residents')

        expect(status).toBe(200)
        expect(body.residents).toHaveLength(3)
    })

    it('have fixed ordering', async () => {
        const res = await request(app).get('/api/residents')

        expect(res.status).toBe(200)
        expect(res.body.residents).toEqual([
            expect.objectContaining({name: 'Jim'}),
            expect.objectContaining({name: 'Julie'}),
            expect.objectContaining({name: 'Chrisjen'})
        ])
    })

    it('have new residents at end in ordering', async () => {
        const kamal = await request(app)
            .post('/api/resident')
            .send({name: 'Alex', surname: 'Kamal'})
        expect(kamal.status).toBe(200)

        const {status, body} = await request(app).get('/api/residents')
        expect(status).toBe(200)
        expect(body.residents).toEqual([
            expect.objectContaining({name: 'Jim'}),
            expect.objectContaining({name: 'Julie'}),
            expect.objectContaining({name: 'Chrisjen'}),
            expect.objectContaining({name: 'Alex'}),
        ])
    })
})

describe('resident', () => {
    it('can be added', async () => {
        const res = await request(app)
            .post('/api/resident')
            .send({name: 'Fred', surname: 'Johnson'})

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id')
        expect(res.body).toMatchObject({name: 'Fred', surname: 'Johnson'})
    })

    it('requires a name', async () => {
        const res = await request(app).post('/api/resident')
            .send({surname: 'Lopez'})

        expect(res.status).toBe(400)
    })

    it('requires a name', async () => {
        const res = await request(app).post('/api/resident')
            .send({surname: 'Lopez'})

        expect(res.status).toBe(400)
    })

    it('requires a surname', async () => {
        const res = await request(app)
            .post('/api/resident')
            .send({name: 'Anderson'})

        expect(res.status).toBe(400)
    })

    it('requires surname can not be empty', async () => {
        const res = await request(app)
            .post('/api/resident')
            .send({name: 'Anderson', surname: ''})

        expect(res.status).toBe(400)
    })

    it('has server generated id', async () => {
        const res = await request(app)
            .post('/api/resident')
            .send({
                name: 'Sam',
                surname: 'Rosenberg'
            })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id')
    })

    it('can not be created with id', async () => {
        const res = await request(app)
            .post('/api/resident')
            .send({
                _id: '5adb8b5a8112783b5898692d',
                name: 'Sam',
                surname: 'Rosenberg'
            })

        expect(res.status).toBe(400)
    })

    it('has server set creation time', async () => {
        const res = await request(app)
            .post('/api/resident')
            .send({
                name: 'Sam',
                surname: 'Rosenberg',
            })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('createdAt')
    })

    it('can not be created with creation time', async () => {
        const res = await request(app)
            .post('/api/resident')
            .send({
                name: 'Sam',
                surname: 'Rosenberg',
                createdAt: '2011-11-11 11:11:11.111Z',
            })

        expect(res.status).toBe(400)
    })

    it('can be retrieved', async () => {
        const burton = await request(app)
            .post('/api/resident')
            .send({name: 'Amos', surname: 'Burton'})
        expect(burton.status).toBe(200)

        const res = await request(app).get(`/api/resident/${burton.body._id}`)
        expect(res.body).toHaveProperty('_id', burton.body._id)
        expect(res.body).toMatchObject({name: 'Amos', surname: 'Burton'})

        expect(res.status).toBe(200)
    })

    it('can be deleted', async () => {
        const mcCann = await request(app)
            .post('/api/resident')
            .send({name: 'Elder', surname: 'McCann'})
        expect(mcCann.status).toBe(200)

        const res = await request(app).del(`/api/resident/${mcCann.body._id}`)
        expect(res.status).toBe(200)
    })
})
