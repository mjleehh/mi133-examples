import Koa from 'koa'
import parse from 'koa-bodyparser'
import serve from 'koa-static'
import Pixel from './Pixel'
import mongoose from 'mongoose'
import createRoutes from './createRoutes'


async function main() {
    await mongoose.connect('mongodb://localhost/led-matrix-with-db')

    // make sure we have a valid pixel matrix
    {
        const {width, height} = await Pixel.dimensions()
        if (width < 1 || height < 1) {
            Pixel.new(1, 1)
        }
    }

    // start server
    {
        const router = createRoutes()
        const app = new Koa()
        app.use(parse())
        app.use(router.routes())
        app.use(router.allowedMethods())
        app.use(serve('dist'))

        app.listen(3000)
    }
}

main()
