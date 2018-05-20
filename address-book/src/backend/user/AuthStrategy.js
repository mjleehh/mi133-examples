import Strategy from 'passport-strategy'
import User from './User'

export default class AuthStrategy extends Strategy {
    async authenticate(req) {
        const {email, password} = req.body
        try {
            const user = await User.findAuthenticated(email, password)
            console.log('login')
            this.success(user)
        } catch (err) {
            console.log('fail', err)
            this.fail()
        }
    }
}
