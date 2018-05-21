import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import style from './App.iscss'

import {closeDialog, openTasksTab, openResidentsTab, openAddTaskDialog, openAddResidentDialog} from 'app/logic/actions'
import {DIALOG_ADD_RESIDENT, DIALOG_ADD_TASK, TAB_TASKS} from 'app/logic/constants'

import {DIALOG_ADD_CONTACT} from "app/logic/constants"
import Contacts from "app/contacts/Contacts"
import AddContact from "app/addcontact/AddContact"

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
