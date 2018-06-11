import session, {MemoryStore} from "express-session"
import passport from "passport"

import User from "backend/user/User"
import AuthStrategy from "./AuthStrategy"

export default function initAuth(app) {
    const sessionId = 'addressbook.sid'
    const sessionSecret = 'some very random and secure secret'
    const sessionStore = new MemoryStore()
    const sessionConfig = {
        key: sessionId,
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {},
    }
    app.use(session(sessionConfig))
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use('local', new AuthStrategy())
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (_id, done) => done(null, await User.findOne({_id})))
}
