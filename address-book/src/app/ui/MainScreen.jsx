import React from 'react'
import {connect} from 'react-redux'

import {requestLogout} from "app/logic/actions"
import Login from "app/ui/Login"
import Signup from 'app/ui/Signup'
import App from "app/ui/App"
import FlexGap from 'app/util/FlexGap'
import Spacer from 'app/util/Spacer'
import style from './MainScreen.scss'
import {LOGIN_SIGNUP} from "../logic/constants"

@connect(({data: {userInfo}, ui:{loginPage}}) => ({userInfo, loginPage}))
export default class MainScreen extends React.Component {
    constructor() {
        super()

        this.handleLogout = () => this.props.dispatch(requestLogout())
    }

    render() {
        const {userInfo, loginPage} = this.props
        if (!userInfo) {
            if (loginPage === LOGIN_SIGNUP) {
                return <Signup/>
            } else {
                return <Login/>
            }
        }

        return <div style={style.container}>
            <div style={style.header}>
                <div style={style.headerItem}>Address Book</div>
                <FlexGap/>
                <div style={style.headerItem}>
                    {userInfo.email}
                    <input type="button" value="logout" onClick={this.handleLogout}/>
                </div>
            </div>
            <Spacer large/>
            <App/>
        </div>
    }
}
