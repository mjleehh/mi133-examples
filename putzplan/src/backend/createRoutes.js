import Bookmark, {filterBookmarkProperties} from "./Task"
import Router from "koa-router"


export default function createRoutes() {
    const router = new Router({prefix: '/api'})

    router.get('/bookmarks', async (ctx, next) => {
        try {
            const list = await Bookmark.find({})
            const bookmarksList = list.map(filterBookmarkProperties)
            ctx.body = {bookmarks: bookmarksList}
        } catch (e) {
            console.error(e)
            ctx.status = 500
            return
        }

        next()
    })

    router.del('/bookmarks', async (ctx, next) => {
        try {
            await Bookmark.remove({})
            ctx.body = {}
        } catch (e) {
            console.error(e)
            ctx.status = 500
        }
        next()
    })

    router.post('/bookmark', async (ctx, next) => {
        const bookmark = new Bookmark(ctx.request.body)

        try {
            await bookmark.validate()
        } catch (e) {
            ctx.body = {error: e.message}
            ctx.status = 400
            return
        }

        try {
            const savedBookmark = await bookmark.save()
            ctx.body = filterBookmarkProperties(savedBookmark)
        } catch (e) {
            console.error(e)
            ctx.status = 500
            return
        }

        next()
    })

    router.get('/bookmark/:bookmarkId', async (ctx, next) => {
        const {bookmarkId} = ctx.params

        try {
            const savedBookmark = await Bookmark.findOne({_id: bookmarkId})
            if (savedBookmark == null) {
                ctx.status = 404
                ctx.body = {error: `no such bookmark ${bookmarkId}`}
                return
            }
            ctx.body = filterBookmarkProperties(savedBookmark)
        } catch (e) {
            console.error(e)
            ctx.status = 500
            return
        }
        next()
    })

    router.put('/bookmark/:bookmarkId/name', async (ctx, next) => {
        const {bookmarkId} = ctx.params

        try {
            const {name} = ctx.request.body
            const savedBookmark = await Bookmark.update({_id: bookmarkId}, {$set: {name}})
            if (savedBookmark == null) {
                ctx.status = 404
                ctx.body = {error: `no such bookmark ${bookmarkId}`}
                return
            }
            ctx.body = filterBookmarkProperties(savedBookmark)
        } catch (e) {
            console.error(e)
            ctx.status = 500
            return
        }
        next()
    })

    router.put('/bookmark/:bookmarkId/url', async (ctx, next) => {
        const {bookmarkId} = ctx.params

        try {
            const {url} = ctx.request.body
            const savedBookmark = await Bookmark.update({_id: bookmarkId}, {$set: {url}})
            if (savedBookmark == null) {
                ctx.status = 404
                ctx.body = {error: `no such bookmark ${bookmarkId}`}
                return
            }
            ctx.body = filterBookmarkProperties(savedBookmark)
        } catch (e) {
            console.error(e)
            ctx.status = 500
            return
        }
        next()
    })

    router.del('/bookmark/:bookmarkId', async (ctx, next) => {
        const {bookmarkId} = ctx.params

        try {
            await Bookmark.remove({_id: bookmarkId})
            ctx.body = {}
        } catch (e) {
            console.error(e)
            ctx.status = 500
            return
        }

        next()
    })

    return router
}
