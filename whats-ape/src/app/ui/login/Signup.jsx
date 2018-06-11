import React from 'react'
import {connect} from 'react-redux'
import validator from 'validator'

import Spacer from 'app/util/Spacer'
import style from './styles.scss'

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
            const handler = this.props.onSignup
            if (handler) {
                const {email, nickname, password} = this.state
                handler(email, nickname, password)
            }
        }
        this.handleCancel = () => {
            const handler = this.props.onCancel
            if (handler) {
                handler()
            }
        }
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
            return 'password must have at least be 6 characters'
        }
        if (retypedPassword !== password) {
            return 'passwords missmatch'
        }
        return null
    }

    render() {
        const {email, nickname, password, retypedPassword, lastValidation} = this.state
        const errorInfoLine = !lastValidation
            ? null
            : <div style={style.badInput}>{lastValidation}</div>

        return <form style={style.form} onSubmit={this.handleSubmit}>
            <div style={style.formRow}>
                <label style={style.label}>email</label>
                <input style={style.input} type="email" value={email} onChange={this.handleChangeEmail}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>nickname</label>
                <input style={style.input} type="text" value={nickname} onChange={this.handleChangeNickname}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>password</label>
                <input style={style.input} type="password" value={password} onChange={this.handleChangePassword}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>repeat password</label>
                <input style={style.input} type="password" value={retypedPassword} onChange={this.handleChangeRetypedPassword}/>
            </div>
            {errorInfoLine}
            <Spacer/>
            <div className="row">
                <input style={style.signupButton} type="submit" value="sign up"/>
                <Spacer horizontal/>
                <input style={style.cancelSignupButton} type="button" value="cancel" onClick={this.handleCancel}/>
            </div>
        </form>
    }
}
