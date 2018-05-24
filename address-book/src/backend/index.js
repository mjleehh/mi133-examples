import './import_paths'

import mongoose from 'mongoose'
import express, {Router} from 'express'
import bodyParser from "body-parser"

import {initAuth, authApi} from 'backend/auth'
import {meApi, userApi} from 'backend/user'

async function main() {
    await mongoose.connect('mongodb://localhost/address-book')

    const routes = new Router()
    routes.use(authApi())
    routes.use(meApi())
    routes.use(userApi())

    const app = express()
    initAuth(app)

    app.use(bodyParser.json())

    app.use('/api', routes)

    app.listen(3000)
    console.log('listening on :3000')
}

main()
