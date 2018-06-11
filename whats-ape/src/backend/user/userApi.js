import {Router} from 'express'

import ensureAuthenticated from 'backend/util/ensureAuthenticated'
import User from "./User"


export default function userApi() {
    const router = new Router()

    router.use(ensureAuthenticated)

    router.get('/users', async (req, res, next) => {
        try {
            const users = await User.list()
            res.json({users})
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
            return
        }
        next()
    })

    router.get('/user/:userId', async (req, res, next) => {
        try {
            const {userId} = req.params
            const user = await User.findOne({_id: userId})
            res.json(user)
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
            return
        }
        next()
    })

    return router
}
