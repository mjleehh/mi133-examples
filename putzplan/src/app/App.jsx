import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import AddResident from 'app/residents/AddResident'
import AddTask from 'app/task/AddTask'
import TaskList from 'app/task/TaskList'
import Spacer from 'app/util/Spacer'

import style from './App.iscss'

import {closeDialog, openTasksTab, openResidentsTab} from 'app/logic/actions'
import {DIALOG_ADD_RESIDENT, DIALOG_ADD_TASK, TAB_TASKS} from 'app/logic/constants'
import ResidentList from './residents/ResidentList'

@connect(({ui: {tab, dialog}}) => ({tab, dialog}))
export default class App extends React.Component {
    constructor() {
        super()
        this.handleOpenTasks = () => this.props.dispatch(openTasksTab())
        this.handleOpenResidents = () => this.props.dispatch(openResidentsTab())
        this.handleCloseDialog = () => this.props.dispatch(closeDialog())
    }

    render() {
        const {tab, dialog} = this.props
        const tabContent = tab === TAB_TASKS ?
            <TaskList/> :
            <ResidentList/>
        let modalContent
        if (dialog === DIALOG_ADD_TASK) {
            modalContent = <AddTask onAdd={this.handleCloseDialog} onCancel={this.handleCloseDialog}/>
        } else if (dialog === DIALOG_ADD_RESIDENT) {
            modalContent = <AddResident onAdd={this.handleCloseDialog} onCancel={this.handleCloseDialog}/>
        } else {
            modalContent = <div> </div>
        }

        return <div style={style.container}>
            <div style={style.header}>Putzplan</div>
            <Spacer/>
            <div className='row'>
                <div style={style.tabItem} onClick={this.handleOpenTasks}>Tasks</div>
                <div style={style.tabItem} onClick={this.handleOpenResidents}>Residents</div>
            </div>
            {tabContent}
            <Modal isOpen={!!dialog}>
                {modalContent}
            </Modal>
        </div>
    }
}
