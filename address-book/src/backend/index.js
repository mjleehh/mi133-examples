import mongoose from 'mongoose'
import express from 'express'
import bodyParser from "body-parser"
import session, {MemoryStore} from 'express-session'
import passport from 'passport'
import initUsers from './user'

async function main() {
    await mongoose.connect('mongodb://localhost/address-book')

    const sessionId = 'addressbook.sid'
    const sessionSecret = 'some very random and secure secret'
    const sessionStore = new MemoryStore()
    const sessionConfig = {
        key: sessionId,
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {},
    }

    const router = new express.Router()
    initUsers(router)

    const app = express()
    app.use(bodyParser.json())
    app.use(session(sessionConfig))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use('/api', router)


    app.listen(3000)
    console.log('listening on :3000')
}

main()
