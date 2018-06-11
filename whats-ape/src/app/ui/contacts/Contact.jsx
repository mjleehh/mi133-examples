import React from 'react'

import User from './User'
import style from './Contact.scss'

export default class Contact extends React.Component {
    constructor() {
        super()

        this.handleClick = () => {
            const {onClick} = this.props
            if (onClick) {
                onClick()
            }
        }
    }

    render() {
        const {email, nickname} = this.props
        return <div style={style.container} onClick={this.handleClick}>
            <User email={email} nickname={nickname}/>
        </div>
    }
}
