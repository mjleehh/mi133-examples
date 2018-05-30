import React from 'react'
import {connect} from 'react-redux'

import Contact from 'app/ui/contacts/Contact'
import SquareButton from 'app/util/SquareButton'
import {startAddContactDialog} from 'app/logic/actions'
import s from './Contacts.scss'

@connect(({data: {contacts}}) => ({contacts}))
export default class Contacts extends React.Component {
    constructor() {
        super()

        this.handleAdd = () => this.props.dispatch(startAddContactDialog())
    }

    render() {
        const contacts = this.props.contacts.map(contact => <Contact key={contact._id} {...contact}/>)
        return <div style={s.container}>
            {contacts}
            <div style={s.addLine}>
                <SquareButton value="+" onClick={this.handleAdd}/>
            </div>
        </div>
    }
}
