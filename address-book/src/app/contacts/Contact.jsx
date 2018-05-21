import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveContact} from 'app/logic/actions'

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
        return <div>
            {email}
            {nickname}
            <input type="button" value="x" onClick={this.handleDelete}/>
        </div>
    }
}