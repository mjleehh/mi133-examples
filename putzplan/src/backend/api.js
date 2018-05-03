import express from 'express'
import bodyParser from 'body-parser'

import registerTaskApi from "./registerTaskApi"
import registerResidentApi from "./registerResidentApi"
import registerWeekApi from "./registerWeekApi"

const app = express()
app.use(bodyParser.json())

registerTaskApi(app)
registerResidentApi(app)
registerWeekApi(app)

export default app
