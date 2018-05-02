import React from 'react'
import {connect} from 'react-redux'

import {openAddTaskDialog} from 'app/logic/actions'
import FlexibleGrid from 'app/util/FlexibleGrid'
import Task from './Task'
import style from './Tasks.iscss'

@connect(({data: {tasks}}) => ({tasks}))
export default class Tasks extends React.Component {
    render() {
        const taskList = this.props.tasks.map((task, idx) => {
            return <Task key={idx} {...task} />
        })
        return <div style={style.tasksContainer}>
            <FlexibleGrid width={3} gap="1em">
                {taskList}
            </FlexibleGrid>
        </div>
    }
}
