import {Router} from 'express'

import userId from 'backend/util/userId'
import ensureAuthenticated from 'backend/util/ensureAuthenticated'
import Contact from "./Contact"

export default function meApi() {
    const router = new Router()

    router.use(ensureAuthenticated)

    router.get('/me', ensureAuthenticated, (req, res) => {
        res.json(req.user)
    })

    router.get('/me/contacts', ensureAuthenticated, async (req, res, next) => {
        try {
            const contacts = await Contact.list(userId(req))
            res.json({contacts})
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
            return
        }
        next()
    })

    router.post('/me/contact', ensureAuthenticated, async (req, res, next) => {
        let doc
        try {
            const {contact} = req.body
            doc = await Contact.createChecked(userId(req), contact)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        let savedContact
        try {
            savedContact = await doc.save()
        } catch (err) {
            console.log(err)
            res.status(500).end()
            return
        }
        res.json(savedContact)
        next()
    })

    router.get('/me/contact/:contactId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {contactId} = req.params
            res.json(await Contact.get(userId(req), contactId))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.delete('/me/contact/:contactId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {contactId} = req.params
            await Contact.remove(userId(req), contactId)
            res.json({})
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })
    return router
}