import React from 'react'
import {connect} from 'react-redux'
import {requestLogin} from "app/logic/actions"

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
        this.handleChangeEmail = event => this.setState({email: event.target.value})
        this.handleChangePassword = event => this.setState({password: event.target.value})

    }

    render() {
        const {email, password} = this.state

        return <form className="column" onSubmit={this.handleSubmit}>
            <input type="email" value={email} onChange={this.handleChangeEmail}/>
            <input type="password" value={password} onChange={this.handleChangePassword}/>
            <div className="row">
                <input type="submit" value="login"/>
                <input type="button" value="sign up"/>
            </div>
        </form>
    }
}
