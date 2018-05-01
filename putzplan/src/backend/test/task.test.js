import request from 'supertest'
import _ from 'lodash'
import app from '../api'
import setup from './setup'
import teardown from './teardown'

beforeAll(setup)
afterAll(teardown)

function expectTask(value) {
    expect(value).toContainKeys([
        '_id',
        'description',
        'firstResident',
        'startDate',
        'lastDone',
    ])
}

function expectStatus(value) {
    expect(value).toContainKeys([
        'done',
        'queue',
    ])
    expect(value.queue).toBeArray()
}

describe('tasks', () => {
    it('can be listed', async () => {
        const {status, body: {tasks}} = await request(app).get('/api/tasks')

        expect(status).toBe(200)
        expect(tasks).toBeArray()
        _.forEach(tasks, elem => expectTask(elem))
    })

    it('can be listed with additional status', async () => {
        const {status, body: {tasks}} = await request(app).get('/api/tasks/status')

        expect(status).toBe(200)
        expect(tasks).toBeArray()
        _.forEach(tasks, elem => expectTask(elem))
        _.forEach(tasks, elem => expectStatus(elem.status))
    })
})

describe('task', () => {
    it('can be added', async () => {
        const startDate = (new Date()).toISOString()

        const hackTransponder = await request(app)
            .post('/api/task')
            .send({
                description: 'hack transponder',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate,
            })
        expect(hackTransponder.status).toBe(200)
        expect(hackTransponder.body).toHaveProperty('_id')
    })

    it('can be retrieved', async () => {
        const startDate = (new Date()).toISOString()

        const batterySearch = await request(app)
            .post('/api/task')
            .send({
                description: 'find all batteries',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate,
            })
        expect(batterySearch.status).toBe(200)

        const {status, body} = await request(app).get(`/api/task/${batterySearch.body._id}`)
        expect(status).toBe(200)
        expectTask(body)
        expect(body).toHaveProperty('_id', batterySearch.body._id)
        expect(body).toMatchObject({description: 'find all batteries'})
    })

    it('can be retrieved with additional status', async () => {
        const startDate = (new Date()).toISOString()

        const gasFreighterCamouflage = await request(app)
            .post('/api/task')
            .send({
                description: 'add gas tanks',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate,
            })
        expect(gasFreighterCamouflage.status).toBe(200)

        const {status, body} = await request(app).get(`/api/task/${gasFreighterCamouflage.body._id}/status`)
        expect(status).toBe(200)
        expectTask(body)
        expectStatus(body.status)
    })

    it('requires a description', async () => {
        const startDate = (new Date()).toISOString()

        const res = await request(app)
            .post('/api/task')
            .send({
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate,
            })
        expect(res.status).toBe(400)
    })



    it('description can not be empty', async () => {
        const startDate = (new Date()).toISOString()

        const res = await request(app)
            .post('/api/task')
            .send({
                description: '',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate,
            })
        expect(res.status).toBe(400)
    })

    it('requires someone who is first', async () => {
        const startDate = (new Date()).toISOString()

        const batterySearch = await request(app)
            .post('/api/task')
            .send({
                description: 'find all batteries',
                startDate,
            })
        expect(batterySearch.status).toBe(400)
    })

    it('can be created with a date the task was last done', async () => {
        const startDate = (new Date()).toISOString()
        const lastDone = (new Date()).toISOString()

        const res = await request(app)
            .post('/api/task')
            .send({
                description: 'find all batteries',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate,
                lastDone,
            })
        expect(res.status).toBe(200)
    })

    it('last done has to be after start date', async () => {
        const startDate = new Date('2018-04-24T09:44:07.285Z')
        const lastDone = new Date('2018-03-24T09:44:07.285Z')

        const batterySearch = await request(app)
            .post('/api/task')
            .send({
                description: 'find all batteries',
                firstResident: '5ade08d55af1423599d5ce9e',
                startDate,
                lastDone,
            })
        expect(batterySearch.status).toBe(400)
    })

    it('can change description', async () => {
        const startDate = (new Date()).toISOString()
        const {status, body: {_id}} = await
            request(app)
                .post('/api/task')
                .send({
                    description: 'some description',
                    firstResident: '5ade08d55af1423599d5ce9e',
                    startDate,
                })
        expect(status).toBe(200)

        const res = await
            request(app)
                .put(`/api/task/${_id}/description`)
                .send({description: 'updated description',})
        expect(res.status).toBe(200)
        expect(res.body.description).toBe('updated description')
    })

    it('updated description can not be empty ', async () => {
        const startDate = (new Date()).toISOString()
        const {status, body: {_id}} = await
            request(app)
                .post('/api/task')
                .send({
                    description: 'some description',
                    firstResident: '5ade08d55af1423599d5ce9e',
                    startDate,
                })
        expect(status).toBe(200)

        const res = await
            request(app)
                .put(`/api/task/${_id}/description`)
                .send({description: ''})
        expect(res.status).toBe(404)
    })

    it('can change last done', async () => {
        const {status, body: {_id}} = await
            request(app)
                .post('/api/task')
                .send({
                    description: 'some description',
                    firstResident: '5ade08d55af1423599d5ce9e',
                    lastDone: '2018-04-24T09:44:07.285Z',
                    startDate: '2018-03-24T09:44:07.285Z',
                })
        expect(status).toBe(200)

        const lastDone = '2018-04-24T09:44:07.285Z'
        const res = await
            request(app)
                .put(`/api/task/${_id}/lastDone`)
                .send({lastDone})
        expect(res.status).toBe(200)
        expect(res.body.lastDone).toBe(lastDone)
    })

    it('new last done has to be after start date', async () => {
        const {status, body: {_id}} = await
            request(app)
                .post('/api/task')
                .send({
                    description: 'some description',
                    firstResident: '5ade08d55af1423599d5ce9e',
                    lastDone: '2018-04-24T09:44:07.285Z',
                    startDate: '2018-03-24T09:44:07.285Z',
                })
        expect(status).toBe(200)

        const lastDone = '2018-03-22T09:44:07.285Z'
        const res = await
            request(app)
                .put(`/api/task/${_id}/lastDone`)
                .send({lastDone})
        expect(res.status).toBe(404)
    })
})
