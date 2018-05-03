import Task from './Task'

export default function registerTaskApi(app) {
    app.get('/api/tasks', async (req, res, next) => {
        try {
            const tasks = await Task.find({})
            res.json({tasks})
        } catch (err) {
            res.status(500).json({error: 'internal error'})
        }
        next()
    })

    app.get('/api/tasks/status', async (req, res, next) => {
        try {
            const rawTasks = await Task.find({})
            const tasks = await Promise.all(rawTasks.map(async task => {
                const status = await task.status()
                return {...task.toObject(), status}
            }))
            res.json({tasks})
        } catch (err) {
            res.status(500).json({error: 'internal error'})
        }
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

    app.get('/api/task/:taskId/status', async (req, res, next) => {
        const {taskId} = req.params
        let task
        try {
            task = await Task.findOne({_id: taskId})
        } catch (err) {
            res.status(404).json({error: err.message})
            next()
            return
        }

        try {
            const status = await task.status()
            res.json({...task.toObject(), status})
        } catch (err) {
            console.error(err.message)
            res.status(500).json('internal error')
        }
        next()
    })

    app.put('/api/task/:taskId/description', async (req, res, next) => {
        const {taskId} = req.params
        const {description} = req.body
        try {
            const task = await Task.setDescription(taskId, description)
            res.json(task)
        } catch (e) {
            res.status(404).json({error: 'not found'})
        }
        next()
    })

    app.put('/api/task/:taskId/lastDone', async (req, res, next) => {
        const {taskId} = req.params
        const {lastDone} = req.body
        try {
            const task = await Task.setLastDone(taskId, lastDone)
            res.json(task)
        } catch (e) {
            res.status(404).json({error: 'not found'})
        }
        next()
    })

    app.delete(`/api/task/:taskId`, async (req, res, next) => {
        const {taskId} = req.params
        const task = await Task.remove({_id: taskId})
        if (task === null) {
            res.status(404).json({error: 'not found'})
            next()
            return
        }
        res.json(task)
        next()
    })
}