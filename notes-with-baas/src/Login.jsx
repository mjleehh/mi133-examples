import React from 'react'
import {connect} from 'react-redux'
import {Modal, Input} from "antd";
import {requestLogin} from "./actions";

const MODE_SIGNIN = 'MODE_SIGNIN'
const MODE_SIGNUP = 'MODE_SIGNUP'

@connect()
export default class Login extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null,
            mode: MODE_SIGNIN
        }
    }

    onEmail = e => {
        this.setState({email: e.target.value})
    }

    onPassword = e => {
        this.setState({password: e.target.value})
    }

    onSignIn = () => {
        const {email, password} = this.state
        this.props.dispatch(requestLogin({email, password}))
    }

    render() {

        const {email, password} = this.state

        return <Modal
            visible={true}
            cancelText="sign up"
            okText="sign in"
            onOk={this.onSignIn}
        >
            <Input type="email" placeholder="email" value={email} onChange={this.onEmail}/>
            <Input.Password placeholder="password" value={password} onChange={this.onPassword}/>
        </Modal>
    }
}