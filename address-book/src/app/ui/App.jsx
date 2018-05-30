import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import {DIALOG_ADD_CONTACT} from 'app/logic/constants'
import Contacts from 'app/ui/contacts/Contacts'
import AddContact from 'app/ui/contacts/AddContact'
import Dialog from 'app/util/Dialog'
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
            modalContent = <Dialog title="ADD CONTACT"><AddContact/></Dialog>
        } else {
            modalContent = <div> </div>
        }

        return <div style={style.mainArea}>
            <Contacts/>
            <Modal style={{content: style.modalContent}} isOpen={!!dialog}>{modalContent}</Modal>
            </div>
    }
}
