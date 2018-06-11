import {Router} from 'express'

import userId from 'backend/util/userId'
import ensureAuthenticated from 'backend/util/ensureAuthenticated'
import Message from "./Message"

export default function meApi() {
    const router = new Router()

    router.use(ensureAuthenticated)

    router.get('/chats', async (req, res, next) => {
        try {
            const chats = await Message.listChats()
            res.json({chats})
            next()
        } catch(e) {
            console.log(err)
            res.status(500).end()
            return
        }
    })

    router.get('/chat/:otherUserId', async (req, res, next) => {
        const {otherUserId} = req.params
        console.log(otherUserId)
        try {
            const messages = await Message.getChat(userId(req), otherUserId)
            res.json({messages})
            next()
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
            return
        }
    })

    router.post('/chat/:otherUserId/message', async (req, res, next) => {
        let doc
        try {
            const {message} = req.body
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

    return router
}