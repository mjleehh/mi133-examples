import Resident from "./Resident"

export default function addResidentApi(app) {
    app.get('/api/residents', async (req, res, next) => {
        const residents = await Resident.sorted()
        res.json({residents})
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

    app.put(`/api/resident/:residentId/name`, async (req, res, next) => {
        const {residentId} = req.params
        const {name} = req.body

        const resident = await Resident.setName(residentId, name)
        if (!resident) {
            res.status(404).json({error: 'not found'})
            next()
            return
        }
        res.json(resident)
        next()
    })

    app.put(`/api/resident/:residentId/surname`, async (req, res, next) => {
        const {residentId} = req.params
        const {surname} = req.body

        const resident = await Resident.setSurname(residentId, surname)
        if (!resident) {
            res.status(404).json({error: 'not found'})
            next()
            return
        }
        console.log(resident)
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
}