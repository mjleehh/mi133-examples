import {Router} from 'express'
import passport from "passport"
import User from "backend/user/User"

import ensureAuthenticated from 'backend/util/ensureAuthenticated'

export default function authApi() {
    const router = new Router()

    router.post('/auth/signup',  async (req, res, next) => {
        const {email, nickname, password} = req.body
        console.log(email, nickname, password)
        let user
        try {
            user = await User.createChecked(email, nickname, password)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        const savedUser = await user.save()
        req.login(savedUser, err => {
            if (err) {
                res.status(400).end()
                return
            }
            res.json(savedUser)
            next()
        })
    })

    router.get('/auth/loggedin', (req, res) => {
        if (req.isAuthenticated()) {
            res.json({loggedIn: true})
        } else {
            res.status(401).json({loggedIn: false})
        }
    })

    router.put('/auth/login', passport.authenticate('local'), (req, res) => {
        res.json(req.user)
    })

    router.put('/auth/logout', ensureAuthenticated, (req, res) => {
        req.logout()
        res.json({})
    })

    return router
}