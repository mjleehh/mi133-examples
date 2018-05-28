import React from 'react'
import {connect} from 'react-redux'
import validator from 'validator'

import {requestSignup, openLoginPage} from "app/logic/actions"
import style from './Login.scss'

@connect()
export default class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            nickname: '',
            password: '',
            retypedPassword: '',
            lastValidation: null
        }

        this.handleSubmit = event => {
            event.preventDefault()
            const validationResult = this.validate()
            if (validationResult) {
                this.setState({lastValidation: validationResult})
                return
            }
            const {email, nickname, password} = this.state
            this.props.dispatch(requestSignup(email, nickname, password))
        }
        this.handleCancel = () => this.props.dispatch(openLoginPage())
        this.handleChangeEmail = event => this.setState({email: event.target.value})
        this.handleChangeNickname = event => this.setState({nickname: event.target.value})
        this.handleChangePassword = event => this.setState({password: event.target.value})
        this.handleChangeRetypedPassword = event => this.setState({retypedPassword: event.target.value})
    }

    validate() {
        const {email, nickname, password, retypedPassword} = this.state
        if (email !== '' && !validator.isEmail(this.state.email)) {
            return 'please enter valid email'
        }
        if (nickname.length < 3) {
            return 'nickname too short'
        }
        if (password.length < 6) {
            return 'password must at least be 6 characters'
        }
        if (retypedPassword !== password) {
            return 'passwords missmatch'
        }
        return null
    }

    render() {
        const {email, nickname, password, retypedPassword, lastValidation} = this.state

        const validationResult = this.validate()
        console.log(lastValidation)

        return <div style={style.container}>
            <form style={style.content} onSubmit={this.handleSubmit}>
                SIGNUP
                <div className="row">
                    <label style={style.label}>email</label>
                    <input type="email" value={email} onChange={this.handleChangeEmail}/>
                </div>
                <div className="row">
                    <label style={style.label}>nickname</label>
                    <input type="text" value={nickname} onChange={this.handleChangeNickname}/>
                </div>
                <div className="row">
                    <label style={style.label}>password</label>
                    <input type="password" value={password} onChange={this.handleChangePassword}/>
                </div>
                <div className="row">
                    <label style={style.label}>password</label>
                    <input type="password" value={retypedPassword} onChange={this.handleChangeRetypedPassword}/>
                </div>
                <div>{lastValidation}</div>
                <div className="row">
                    <input type="submit" value="sign up"/>
                    <input type="button" value="cancel" onClick={this.handleCancel}/>
                </div>
            </form>
        </div>
    }
}
