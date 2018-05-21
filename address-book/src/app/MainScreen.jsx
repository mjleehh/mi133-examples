import React from 'react'
import {connect} from 'react-redux'

import {requestLogout} from "app/logic/actions"
import Login from "app/Login"
import App from "app/App"
import FlexGap from 'app/util/FlexGap'
import Spacer from 'app/util/Spacer'
import style from './MainScreen.iscss'


@connect(({data: {userInfo}}) => ({userInfo}))
export default class MainScreen extends React.Component {
    constructor() {
        super()

        this.handleLogout = () => this.props.dispatch(requestLogout())
    }

    render() {
        const {userInfo} = this.props
        if (!userInfo) {
            return <Login/>
        }

        console.log(userInfo)
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
