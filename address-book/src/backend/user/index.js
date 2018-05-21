import passport from 'passport'
import AuthStrategy from "./AuthStrategy"
import User from './User'
import Contact from './Contact'

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({error: 'not logged in'}).end()
    }
}

function user(req) {
    return req.session.passport.user
}

function registerApi(router) {
    router.get('/loggedin', (req, res) => {
        if (req.isAuthenticated()) {
            res.json({loggedIn: true})
        } else {
            res.status(401).json({loggedIn: false})
        }
    })

    router.put('/login', passport.authenticate('local'), (req, res) => {
        res.json(req.user)
    })

    router.put('/logout', (req, res) => {
        req.logout()
        res.json({})
    })

    router.get('/users', ensureAuthenticated, async (req, res) => {
        try {
            const users = await User.list()
            res.json({users})
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
        }
    })

    router.post('/signup',  async (req, res, next) => {
        const {email, nickname, password} = req.body
        let user
        try {
            user = await User.createChecked(email, nickname, password)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        const savedUser = await user.save()
        res.json(savedUser)
        next()
    })

    router.get('/user', ensureAuthenticated, (req, res) => {
        res.json(req.user)
    })

    router.get('/user/contacts', ensureAuthenticated, async (req, res, next) => {
        const contacts = await Contact.list(user(req))
        res.json({contacts})
        next()
    })

    router.post('/user/contact', ensureAuthenticated, async (req, res, next) => {
        let doc
        try {
            const {contact} = req.body
            doc = await Contact.createChecked(user(req), contact)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        let savedContact
        try {
            savedContact = await doc.save()
        } catch (err) {
            console.log(err)
            res.status(500).end()
            return
        }
        res.json(savedContact)
        next()
    })

    router.get('/user/contact/:contactId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {contactId} = req.params
            res.json(await Contact.get(user(req), contactId))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.delete('/user/contact/:contactId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {contactId} = req.params
            await Contact.remove(user(req), contactId)
            res.json({})
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })
}

export default function initUsers(app) {
    passport.use('local', new AuthStrategy())
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (_id, done) => done(null, await User.findOne({_id})))

    registerApi(app)
}
