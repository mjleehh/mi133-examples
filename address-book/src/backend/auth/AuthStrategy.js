import Strategy from 'passport-strategy'
import User from '../user/User'

export default class AuthStrategy extends Strategy {
    async authenticate(req) {
        const {email, password} = req.body
        try {
            const user = await User.findAuthenticated(email, password)
            this.success(user)
        } catch (err) {
            this.fail()
        }
    }
}
