import React from 'react'
import {connect} from 'react-redux'

import {requestLogin, openSignupPage} from "app/logic/actions"
import style from './Login.scss'

@connect()
export default class Login extends React.Component {
    constructor() {
        super()

        this.state = {email: 'b@b.com', password: '00fh00'}

        this.handleSubmit = event => {
            event.preventDefault()
            const {email, password} = this.state
            this.props.dispatch(requestLogin(email, password))
        }
        this.handleSignup = () => this.props.dispatch(openSignupPage())
        this.handleChangeEmail = event => this.setState({email: event.target.value})
        this.handleChangePassword = event => this.setState({password: event.target.value})
    }

    render() {
        const {email, password} = this.state

        return <div style={style.container}>
            <form style={style.content} onSubmit={this.handleSubmit}>
                LOGIN
                <div className="row">
                    <label style={style.label}>email</label>
                    <input type="email" value={email} onChange={this.handleChangeEmail}/>
                </div>
                <div className="row">
                    <label style={style.label}>password</label>
                    <input type="password" value={password} onChange={this.handleChangePassword}/>
                </div>
                <div className="row">
                    <input type="submit" value="login"/>
                    <input type="button" value="sign up" onClick={this.handleSignup}/>
                </div>
            </form>
        </div>
    }
}
