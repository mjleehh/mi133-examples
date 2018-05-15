import express from 'express'

let currentCount = 0

const app = express()

app.get('/api/count', (req, res) => {
    res.json({currentCount})
})

app.put('/api/count', (req, res) => {
    currentCount += 1
    res.json({currentCount})
})

app.delete('/api/count', (req, res) => {
    currentCount = 0
    res.json({currentCount})
})

app.listen(3000)
