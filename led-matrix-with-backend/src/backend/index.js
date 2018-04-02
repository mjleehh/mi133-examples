import Koa from 'koa'
import Router from 'koa-router'
import parse from 'koa-bodyparser'
import m from '../common/matrix'
import serve from 'koa-static'
import _ from 'lodash'

const app = new Koa()
const router = new Router()

const MAX_LED_MATRIX_SIZE = 15

let matrix = m.create(5, 5)

router.get('/api/led-matrix', (ctx, next) => {
    ctx.body = matrix
    next()
})

router.put('/api/led-matrix/pixel/:xString/:yString', (ctx, next) => {
    const {xString, yString} = ctx.params
    const x = _.toNumber(xString)
    const y = _.toNumber(yString)
    const {pixelValue} = ctx.request.body

    if (!_.isInteger(x) || x < 0 || x >= matrix.width) {
        ctx.status = 400
        ctx.body = {error: 'invalid x value'}
        return
    }

    if (!_.isInteger(y) || y < 0 || y >= matrix.height) {
        ctx.status = 400
        ctx.body = {error: 'invalid x value'}
        return
    }

    if (!_.isBoolean(pixelValue)) {
        ctx.status = 400
        ctx.body = {error: 'invalid pixel value'}
        return
    }

    m.setValue(matrix, x, y, pixelValue)
    ctx.body = matrix

    console.log(`pixel (${x},${y}) set to ${pixelValue}`)
    next()
})

router.put('/api/led-matrix/width', (ctx, next) => {
    const {width} = ctx.request.body
    const {height} = matrix

    if (!_.isInteger(width) || width < 0 || width > MAX_LED_MATRIX_SIZE) {
        ctx.status = 400
        ctx.body = {error: 'invalid width value'}
        return
    }

    matrix = m.create(width, height)
    ctx.body = matrix

    console.log(`matrix width set to ${width}`)
    next()
})

router.put('/api/led-matrix/height', (ctx, next) => {
    const {height} = ctx.request.body
    const {width} = matrix

    if (!_.isInteger(height) || height < 0 || height > MAX_LED_MATRIX_SIZE) {
        ctx.status = 400
        ctx.body = {error: 'invalid height value'}
        return
    }

    matrix = m.create(width, height)
    ctx.body = matrix

    console.log(`matrix height set to ${height}`)
    next()
})

app.use(parse())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve('dist'))

app.listen(3000)