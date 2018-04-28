import React from 'react'
import {connect} from 'react-redux'

import {openAddTaskDialog} from 'app/logic/actions'
import Task from './Task'
import style from './TaskList.iscss'

@connect(({data: {tasks}}) => ({tasks}))
export default class TaskList extends React.Component {
    constructor() {
        super()
        this.handleAdd = () => this.props.dispatch(openAddTaskDialog())
    }

    render() {
        const taskList = this.props.tasks.map((task, idx) => {
            return <Task key={idx} {...task} />
        })
        return <div style={style.taskListContainer}>
            <input type='button' value='add' onClick={this.handleAdd} />
            {taskList}
        </div>
    }
}
