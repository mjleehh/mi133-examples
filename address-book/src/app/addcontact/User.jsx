import React from 'react'
import User from "app/addcontact/User"

export default class Users extends React.Component {
    render() {
        const contacts = this.props.contacts.map(contact => <User key={contact._id} {...contact}/>)
        return <div>{contacts}</div>
    }
}
