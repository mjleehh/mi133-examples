import React from 'react'

import Avatar from './Avatar'
import Spacer from 'app/util/Spacer'
import s from './User.scss'

export default class User extends React.Component {
    constructor() {
        super()

        this.handleClick = () => {
            const handler = this.props.onSelect
            if (handler) {
                handler(this.props._id)
            }
        }
    }

    render() {
        const {email, nickname} = this.props
        const avatarLetter = nickname[0]

        return <div style={s.container} onClick={this.handleClick}>
            <Avatar value={avatarLetter}/>
            <Spacer horizontal/>
            <div>
                <div>{nickname}</div>
                <div>{email}</div>
            </div>
        </div>
    }
}
