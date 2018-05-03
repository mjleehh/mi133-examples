import React from 'react'
import {connect} from 'react-redux'


import Week from 'common/Week'
import FlexibleGrid from 'app/util/FlexibleGrid'
import SquareButton from 'app/util/SquareButton'
import Spacer from 'app/util/Spacer'
import {openAddTaskDialog} from 'app/logic/actions'
import Task from './Task'
import style from './Tasks.iscss'

@connect(({data: {tasks}}) => ({tasks}))
export default class Tasks extends React.Component {
    constructor() {
        super()
        this.handleAdd = () => this.props.dispatch(openAddTaskDialog())
    }

    render() {
        const taskList = this.props.tasks.map((task, idx) => {
            return <Task key={idx} {...task} />
        })
        const week = new Week()
        return <div style={style.tasksContainer}>
            <FlexibleGrid width={3} gap="1em">
                {taskList}
            </FlexibleGrid>
            <Spacer large/>
            <div style={style.buttons}>
                <SquareButton value='+' onClick={this.handleAdd}/>
                <div style={style.gap}> </div>
                <div style={style.currentWeek}><div>Current Week: {week.toString()}</div></div>
            </div>
        </div>
    }
}
