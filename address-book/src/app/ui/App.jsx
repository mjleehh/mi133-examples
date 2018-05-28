import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import {DIALOG_ADD_CONTACT} from 'app/logic/constants'
import Contacts from 'app/ui/contacts/Contacts'
import AddContact from 'app/ui/addcontact/AddContact'
import style from './App.scss'

@connect(({ui: {dialog}}) => ({dialog}))
export default class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {dialog} = this.props
        let modalContent
        if (dialog === DIALOG_ADD_CONTACT) {
            modalContent = <AddContact/>
        } else {
            modalContent = <div> </div>
        }

        return <div style={style.mainArea}>
            <Contacts/>
            <Modal isOpen={!!dialog}>{modalContent}</Modal>
            </div>
    }
}
