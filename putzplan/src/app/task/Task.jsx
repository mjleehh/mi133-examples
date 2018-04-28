import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveTask} from "app/logic/actions"
import EditableText from 'app/util/EditableText'
import Spacer from 'app/util/Spacer'
import style from './Task.iscss'

@connect()
export default class Task extends React.Component {
    constructor() {
        super()

        this.handleDescriptionChange = newName => {
            const {_id, dispatch} = this.props
            dispatch(requestChangeBookmarkName(_id, newName))
        }

        this.handleRemove = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveTask(_id))
        }
    }

    render() {
        const {description} = this.props
        return <div style={style.bookmarkContainer}>
            <div style={style.innerContainer}>

                <div style={style.urlLine}>
                    <div style={style.input}>
                        <EditableText value={description} onChange={this.handleDescriptionChange}/></div><Spacer horizontal small/><input type='checkbox'/>
                    <Spacer horizontal small/>
                    <div style={style.deleteButton} onClick={this.handleRemove}>
                        <div style={style.innerButton}>x</div>
                    </div>
                </div>
            </div>
        </div>
    }
}
