import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import Chat from './Chat'
import Contact from 'app/ui/contacts/Contact'
import {requestSetActiveChat} from "app/logic/actions"

@connect(({data: {chats, users}}) => ({chats, users}))
export default class Chats extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {users, chats} = this.props

        const contactClickHandler = userId => () => this.props.dispatch(requestSetActiveChat(userId))

        const chatList = users
            .filter(user => _.includes(chats, user._id))
            .map(user => <Contact
                key={user._id}
                onClick={contactClickHandler(user._id)}
                {...user} />)

        return <div className="row">
            <div>{chatList}</div>
            <Chat/>
        </div>
    }
}