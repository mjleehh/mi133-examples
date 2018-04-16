import Koa from 'koa'
import parse from 'koa-bodyparser'
import serve from 'koa-static'
import Pixel from './Bookmark'
import mongoose from 'mongoose'
import createRoutes from './createRoutes'


async function main() {
    await mongoose.connect('mongodb://localhost/bookmarks-with-testing')

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
