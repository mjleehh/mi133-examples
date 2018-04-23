import request from 'supertest'
import app from '../endpoints'
import setup from './setup'
import teardown from './teardown'

beforeAll(setup)
afterAll(teardown)

describe('tasks', () => {
    it('can be listed', async () => {
        const res = await request(app).get('/api/tasks')

        expect(res.status).toBe(200)
    })
})

describe('task', () => {
    it('can be added', async () => {
        const now = (new Date()).toISOString()

        const res = await request(app)
            .post('/api/task')
            .send({
                name: 'hack transponder',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate: now,
            })
        expect(res.status).toBe(200)
    })

    it('can be retrieved', async () => {
        const now = (new Date()).toISOString()

        const batterySearch = await request(app)
            .post('/api/task')
            .send({
                name: 'find all batteries',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate: now,
            })
        expect(batterySearch.status).toBe(200)

        const res = await request(app).get(`/api/task/${batterySearch.body._id}`)
        expect(res.body).toHaveProperty('_id', batterySearch.body._id)
        expect(res.body).toMatchObject({name: 'find all batteries'})

        expect(res.status).toBe(200)
    })
})
