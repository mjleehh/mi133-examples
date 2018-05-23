import React from 'react'
import User from './User'
import {connect} from 'react-redux'

import {closeDialog, requestAddContact} from 'app/logic/actions'

@connect(({ui: {addContact}, data: {userInfo: {_id}}}) => ({...addContact, userId: _id}))
export default class AddContact extends React.Component {
    constructor() {
        super()

        this.handleCancel = () => this.props.dispatch(closeDialog())
        this.handleSelect = contactId => {
            const {userId, dispatch} = this.props
            console.log(contactId, userId)
            dispatch(requestAddContact(userId, contactId))
            dispatch(closeDialog())
        }
    }

    render() {
        const users = this.props.cachedUsers.map(user =>
            <User {...user} onSelect={this.handleSelect}/>)

        return <div>
            <div>{users}</div>
            <div>
                <input type="button" value="cancel" onClick={this.handleCancel}/>
            </div>
        </div>
    }
}