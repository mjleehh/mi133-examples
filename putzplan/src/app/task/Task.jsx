import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import {requestRemoveTask, requestChangeTaskDone, requestChangeTaskDescription} from "app/logic/actions"
import EditableText from 'app/util/EditableText'
import SquareButton from 'app/util/SquareButton'
import Spacer from 'app/util/Spacer'
import style from './Task.iscss'

@connect(({data: {residents}}) => ({residents}))
export default class Task extends React.Component {
    constructor() {
        super()

        this.handleDescriptionChange = newDescription => {
            const {_id, dispatch} = this.props
            dispatch(requestChangeTaskDescription(_id, newDescription))
        }

        this.handleRemove = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveTask(_id))
        }

        this.handleDone = () => {
            const {_id, dispatch, status: {done}} = this.props
            if (!done) {
                dispatch(requestChangeTaskDone(_id, new Date()))
            }
        }

        this.handleRemove = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveTask(_id))
        }
    }

    render() {
        const {description, status: {done, queue}, residents} = this.props
        const resident = _.find(residents, resident => resident._id === queue[0])

        const doneValue = done ? "☑" : "☐"
        const doneStyle = done ? style.doneButtonDone : style.doneButtonNotDone

        return <div style={style.taskContainer}>
            <div style={style.innerContainer}>
                <div style={style.detailLine}>
                    <div style={style.info}>
                    <div style={style.input}><EditableText value={description} onChange={this.handleDescriptionChange}/></div>
                        <div>{resident.name} {resident.surname}</div>
                    </div>
                    <SquareButton style={doneStyle} value={doneValue} onClick={this.handleDone}/>
                    <Spacer horizontal small/>
                    <SquareButton style={style.removeButton} value="x" onClick={this.handleRemove}/>
                </div>
            </div>
        </div>
    }
}
