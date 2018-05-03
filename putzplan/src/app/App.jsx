import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import AddResident from 'app/residents/AddResident'
import AddTask from 'app/task/AddTask'
import Tasks from 'app/task/Tasks'
import Spacer from 'app/util/Spacer'
import SquareButton from 'app/util/SquareButton'
import Residents from 'app/residents/Residents'

import style from './App.iscss'

import {closeDialog, openTasksTab, openResidentsTab, openAddTaskDialog, openAddResidentDialog} from 'app/logic/actions'
import {DIALOG_ADD_RESIDENT, DIALOG_ADD_TASK, TAB_TASKS} from 'app/logic/constants'

import {TAB_RESIDENTS} from "app/logic/constants"

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
            <Tasks/> :
            <Residents/>
        let modalContent
        if (dialog === DIALOG_ADD_TASK) {
            modalContent = <AddTask onAdd={this.handleCloseDialog} onCancel={this.handleCloseDialog}/>
        } else if (dialog === DIALOG_ADD_RESIDENT) {
            modalContent = <AddResident onAdd={this.handleCloseDialog} onCancel={this.handleCloseDialog}/>
        } else {
            modalContent = <div> </div>
        }

        const taskTabStyle = tab === TAB_TASKS ? style.activeTab : style.inactiveTab
        const residentsTabSyle = tab === TAB_RESIDENTS ? style.activeTab : style.inactiveTab

        return <div style={style.container}>
            <div style={style.header}>Putzplan</div>
            <Spacer large/>
            <div style={style.contentWrapper}>
                <div style={style.content}>
                    <div className="row">
                        <div style={taskTabStyle} onClick={this.handleOpenTasks}>Tasks</div>
                        <div style={residentsTabSyle} onClick={this.handleOpenResidents}>Residents</div>
                    </div>
                    <div style={style.mainArea}>
                        {tabContent}
                    </div>

                </div>
            </div>
            <Modal isOpen={!!dialog}>
                {modalContent}
            </Modal>
        </div>
    }
}
