import express from 'express'
import bodyParser from 'body-parser'

import registerTaskApi from "./registerTaskApi"
import registerResidentApi from "./registerResidentApi"

const app = express()
app.use(bodyParser.json())

registerTaskApi(app)
registerResidentApi(app)

export default app
