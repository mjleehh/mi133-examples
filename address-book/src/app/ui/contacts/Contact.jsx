import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveContact} from 'app/logic/actions'
import SquareButton from 'app/util/SquareButton'
import FlexGap from 'app/util/FlexGap'
import User from './User'
import style from './Contact.scss'

@connect()
export default class Contact extends React.Component {
    constructor() {
        super()

        this.handleDelete = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveContact(_id))
        }
    }

    render() {
        const {email, nickname} = this.props

        return <div style={style.container}>
            <User email={email} nickname={nickname}/>
            <FlexGap/>
            <SquareButton style={style.deleteButton} value="x" onClick={this.handleDelete}/>
        </div>
    }
}