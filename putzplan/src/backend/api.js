import express from 'express'
import bodyParser from 'body-parser'

import addTaskApi from "./addTaskApi"
import addResidentApi from "./addResidentApi"

const app = express()
app.use(bodyParser.json())

addTaskApi(app)
addResidentApi(app)

export default app
