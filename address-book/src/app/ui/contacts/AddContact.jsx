import React from 'react'
import {connect} from 'react-redux'

import {closeDialog, requestAddContact} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import FlexGap from 'app/util/FlexGap'
import User from './User'
import s from './AddContact.scss'

@connect(({ui: {addContact}, data: {userInfo: {_id}, contacts}}) => ({...addContact, userId: _id, contacts}))
export default class AddContact extends React.Component {
    constructor() {
        super()

        this.handleCancel = () => this.props.dispatch(closeDialog())
        this.handleSelect = contactId => {
            const {userId, dispatch} = this.props
            dispatch(requestAddContact(userId, contactId))
            dispatch(closeDialog())
        }
    }

    render() {
        const {cachedUsers, userId, contacts} = this.props
        const filteredUsers = cachedUsers.filter(user => {
            const otherId = user._id
            const isSelf = otherId === userId
            const isContact = contacts.some(contact => contact._id === otherId)
            return !(isSelf || isContact)
        })
        const users = filteredUsers.map(user =>
            <div key={user._id}>
                <User {...user} onSelect={this.handleSelect}/>
                <Spacer/>
            </div>)

        return <div style={s.container}>
            <div>{users}</div>
            <div style={s.cancelRow}>
                <input type="button" value="cancel" onClick={this.handleCancel}/>
            </div>
        </div>
    }
}