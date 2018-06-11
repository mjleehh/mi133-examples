import React from 'react'
import {connect} from 'react-redux'

import {
    openSignupPage,
    openLoginPage,
    requestLogout
} from 'app/logic/actions'
import {LOGIN_SIGNUP} from 'app/logic/constants'
import App from 'app/ui/App'
import FlexGap from 'app/util/FlexGap'
import Spacer from 'app/util/Spacer'
import Dialog from 'app/util/Dialog'
import Login from 'app/ui/login/Login'
import Signup from 'app/ui/login/Signup'
import style from './MainScreen.scss'
import {requestLogin, requestSignup} from "../logic/actions"


@connect(({data: {userInfo}, ui:{loginPage}}) => ({userInfo, loginPage}))
export default class MainScreen extends React.Component {
    constructor() {
        super()

        this.handleLogin = (email, password) => this.props.dispatch(requestLogin(email, password))
        this.handleShowSignup = () => this.props.dispatch(openSignupPage())
        this.handleSignup = (email, nickname, password) => this.props.dispatch(requestSignup(email, nickname, password))
        this.handleCancelSignup = () => this.props.dispatch(openLoginPage())
        this.handleLogout = () => this.props.dispatch(requestLogout())
    }

    render() {
        const {userInfo, loginPage} = this.props
        if (!userInfo) {
            if (loginPage === LOGIN_SIGNUP) {
                return <Dialog title="SIGNUP">
                    <Signup onSignup={this.handleSignup} onCancel={this.handleCancelSignup}/>
                </Dialog>
            } else {
                return <Dialog title="LOGIN">
                    <Login onLogin={this.handleLogin} onSignup={this.handleShowSignup} />
                </Dialog>
            }
        }

        return <div style={style.container}>
            <div style={style.header}>
                <div style={style.headerItem}>WhatsApe</div>
                <FlexGap/>
                <div style={style.headerItem}>
                    <div>{userInfo.email}</div>
                    <Spacer horizontal/>
                    <div onClick={this.handleLogout}>&#x23FB;</div>
                </div>
            </div>
            <Spacer large/>
            <App/>
        </div>
    }
}
