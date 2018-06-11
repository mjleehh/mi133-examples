import React from 'react'
import {connect} from 'react-redux'

import {setCurrentMessage} from 'app/logic/actions'
import SquareButton from 'app/util/SquareButton'

@connect(({data: {activeChat}, ui: {currentMessages}}) => ({currentMessages, activeChat}))
export default class Chats extends React.Component {
    constructor(props) {
        super(props)

        this.handleChangeMessage = event => {
            const {dispatch, activeChat: {otherId}} = this.props
            dispatch(setCurrentMessage(otherId, event.target.value))
        }
    }

    render() {
        console.log(this.props)
        const {activeChat, currentMessages} = this.props

        if (!activeChat) {
            return <div>open chat</div>
        }

        let currentMessage = currentMessages[activeChat.otherId]
        if (!currentMessage) {
            currentMessage = ''
        }

        return <div className="row">
            <input type="text" value={currentMessage} onChange={this.handleChangeMessage}/>
            <SquareButton value=">" onClick={this.handleSend}/>
        </div>
    }
}