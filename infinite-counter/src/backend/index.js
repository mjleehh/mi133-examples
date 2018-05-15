import Koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'

async function main() {
    let currentCount = 0

    const router = new Router({prefix: '/api'})

    router.get('/count', (ctx, next) => {
      ctx.body = {currentCount}
      next()
    })

    router.put('/count', (ctx, next) => {
      currentCount += 1
      ctx.body = {currentCount}
      next()
    })

    router.del('/count', (ctx, next) => {
      currentCount = 0
      ctx.body = {currentCount}
      next()
    })

    const app = new Koa()
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.use(serve('dist'))

    app.listen(3000)
}

main()
