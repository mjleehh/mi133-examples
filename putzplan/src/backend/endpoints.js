import express from 'express'
import bodyParser from 'body-parser'
import _ from 'lodash'

import Resident, {residentProjection} from './Resident'
import Task from './Task'

const app = express()
app.use(bodyParser.json())

/**
 * Retrieve tasks.
 */
app.get('/api/tasks', async (req, res, next) => {
    const residents = await Task.find({})
    res.json(residents)
    next()
})

app.post('/api/task', async (req, res, next) => {
    let task
    try {
        task = await Task.createChecked(req.body)
    } catch (err) {
        res.status(400).json({error: err.message})
        return
    }

    let savedTask;
    try {
        savedTask = await task.save()
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'internal error'})
        return
    }

    res.json(savedTask)
    next()
})

app.get('/api/task/:taskId', async (req, res, next) => {
    const {taskId} = req.params
    const task = await Task.findOne({_id: taskId})
    if (!task) {
        res.status(404).json({error: 'not found'})
        next()
        return
    }
    res.json(task)
    next()
})

app.get('/api/residents', async (req, res, next) => {
    const residents = await Resident.sorted()
    res.json(residents)
    next()
})

app.post('/api/resident', async (req, res, next) => {
    let resident
    try {
        resident = await Resident.createChecked(req.body)
    } catch (err) {
        res.status(400).json({error: err.message})
        return
    }

    let savedResident;
    try {
        savedResident = await resident.save()
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'internal error'})
        return
    }

    res.json(savedResident)
    next()
})

app.get(`/api/resident/:residentId`, async (req, res, next) => {
    const {residentId} = req.params

    const resident = await Resident.findOne({_id: residentId})
    if (!resident) {
        res.status(404).json({error: 'not found'})
        next()
        return
    }
    res.json(resident)
    next()
})

app.delete(`/api/resident/:residentId`, async (req, res, next) => {
    const {residentId} = req.params

    const resident = await Resident.remove({_id: residentId})
    if (resident === null) {
        res.status(404).json({error: 'not found'})
        next()
        return
    }
    res.json(resident)
    next()
})

export default app
