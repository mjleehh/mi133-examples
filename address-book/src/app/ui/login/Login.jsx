import React from 'react'
import {connect} from 'react-redux'

import Spacer from 'app/util/Spacer'
import style from './styles.scss'

@connect()
export default class Login extends React.Component {
    constructor() {
        super()

        this.state = {email: 'b@b.com', password: '00fh00'}

        this.handleSubmit = event => {
            event.preventDefault()
            const handler = this.props.onLogin
            if (handler) {
                const {email, password} = this.state
                handler(email, password)
            }


        }
        this.handleSignup = () => {
            const handler = this.props.onSignup
            if (handler) {
                handler()
            }
        }

        this.handleChangeEmail = event => this.setState({email: event.target.value})
        this.handleChangePassword = event => this.setState({password: event.target.value})
    }

    render() {
        const {email, password} = this.state

        return <form style={style.form} onSubmit={this.handleSubmit}>
                <Spacer/>
                <div style={style.formRow}>
                    <label style={style.label}>email</label>
                    <input style={style.input} type="email" value={email} onChange={this.handleChangeEmail}/>
                </div>
                 <div style={style.formRow}>
                    <label style={style.label}>password</label>
                    <input style={style.input} type="password" value={password} onChange={this.handleChangePassword}/>
                </div>
                <div className="row">
                    <input style={style.loginButton} type="submit" value="login"/>
                    <Spacer horizontal />
                    <input style={style.showSignupButton} type="button" value="sign up" onClick={this.handleSignup}/>
                </div>
            </form>
    }
}
