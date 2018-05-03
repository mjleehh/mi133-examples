import moment from 'moment'
import Week from '../common/Week'

export default function registerWeekApi(app) {
    app.get('/api/week', async (req, res, next) => {
        try {
            const now = moment()
            const week = new Week(now)
            res.json({...week.toJSON(), now: now.toISOString()})
        } catch (err) {
            res.status(500).json({error: 'internal error'})
        }
        next()
    })

    app.get('/api/week/:marker', async (req, res, next) => {
        const {marker} = req.params
        const now = moment(marker)

        if (!now.isValid()) {
            res.status(400).json({error: 'marker has to be a valid date string'})
            next()
            return
        }

        try {
            const week = new Week(now)
            res.json({...week.toJSON(), now: now.toISOString()})
        } catch (err) {
            res.status(500).json({error: 'internal error'})
        }
        next()
    })

    app.get('/api/weeks/:numWeeks', async (req, res, next) => {
        const {numWeeks} = req.params
        const numWeeksNum = Number(numWeeks)
        if (isNaN(numWeeksNum)) {
            res.status(400).json({error: 'number of weeks needs to be a number greater than 0'})
            next()
            return
        }

        try {
            const now = moment()
            const week = new Week(now)
            const weeks = week.previousWeeks(numWeeks)
            res.json({weeks, now})
        } catch (err) {

            res.status(500).json({error: 'internal error'})

        }
        next()
    })
}