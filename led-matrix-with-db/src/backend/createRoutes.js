import Pixel from "./Pixel"
import Router from "koa-router"
import _ from 'lodash'

const MAX_LED_MATRIX_SIZE = 15

export default function createRoutes() {
    const router = new Router({prefix: '/api'})

    /**
     * Create a new matrix.
     *
     * Erases the current matrix. The new matrix is initialized to false.
     *
     * @param {unsigned int} widthString
     * @param {unsigned int} heightString
     */
    router.put('/led-matrix/:widthString/:heightString', async (ctx, next) => {
        const {widthString, heightString} = ctx.params
        const width = _.toNumber(widthString)
        const height = _.toNumber(heightString)

        if (!_.isInteger(width) || width < 1 || width >= MAX_LED_MATRIX_SIZE) {
            ctx.status = 400
            ctx.body = {error: 'invalid width value'}
            return
        }

        if (!_.isInteger(height) || height < 1 || height >= MAX_LED_MATRIX_SIZE) {
            ctx.status = 400
            ctx.body = {error: 'invalid height value'}
            return
        }

        await Pixel.new(width, height)
        ctx.body = await Pixel.matrix()
        next()
    })

    router.get('/led-matrix', async (ctx, next) => {
        ctx.body = await Pixel.matrix()
        next()
    })

    /**
     * Set a single pixel.
     */
    router.put('/led-matrix/pixel/:xString/:yString', async (ctx, next) => {
        const {xString, yString} = ctx.params
        const x = _.toNumber(xString)
        const y = _.toNumber(yString)
        const {pixelValue} = ctx.request.body

        if (!_.isInteger(x) || x < 0) {
            ctx.status = 400
            ctx.body = {error: 'invalid x value'}
            return
        }

        if (!_.isInteger(y) || y < 0) {
            ctx.status = 400
            ctx.body = {error: 'invalid x value'}
            return
        }

        if (!_.isBoolean(pixelValue)) {
            ctx.status = 400
            ctx.body = {error: 'invalid pixel value'}
            return
        }

        await Pixel.update({x, y}, {pixelValue})
        ctx.body = await Pixel.matrix()
        next()
    })

    /**
     * Resize pixel matrix width.
     */
    router.put('/led-matrix/width', async (ctx, next) => {
        const {width} = ctx.request.body

        if (!_.isInteger(width) || width < 1 || width > MAX_LED_MATRIX_SIZE) {
            ctx.status = 400
            ctx.body = {error: 'invalid width value'}
            return
        }

        await Pixel.resizeX(width)
        ctx.body = await Pixel.matrix()
        next()
    })

    /**
     * Resize pixel matrix height.
     */
    router.put('/led-matrix/height', async (ctx, next) => {
        const {height} = ctx.request.body

        if (!_.isInteger(height) || height < 1 || height > MAX_LED_MATRIX_SIZE) {
            ctx.status = 400
            ctx.body = {error: 'invalid height value'}
            return
        }

        await Pixel.resizeY(height)
        ctx.body = await Pixel.matrix()
        next()
    })

    return router
}