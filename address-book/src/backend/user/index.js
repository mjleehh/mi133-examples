import passport from 'passport'
import AuthStrategy from "./AuthStrategy"
import User from './User'

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({error: 'not logged in'}).end()
    }
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

    router.get('/user', ensureAuthenticated, (req, res) => {
        res.json(req.user)
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

}

export default function initUsers(app) {
    passport.use('local', new AuthStrategy())
    passport.serializeUser((user, done) => {
        console.log('serialize user', user)
        done(null, user.email)
    })
    passport.deserializeUser(async (email, done) => {
        console.log('deserialize user', email)
        const user = await User.findOne({email})
        done(null, user)
    })

    registerApi(app)
}
