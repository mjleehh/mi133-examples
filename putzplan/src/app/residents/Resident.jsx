import React from 'react'
import {connect} from 'react-redux'

import {
    requestChangeResidentName,
    requestChangeResidentSurname,
    requestRemoveResident,
} from 'app/logic/actions'
import EditableText from 'app/util/EditableText'
import Spacer from 'app/util/Spacer'
import style from './Resident.iscss'

@connect()
export default class Resident extends React.Component {
    constructor() {
        super()

        this.handleNameChange = newName => {
            const {_id, dispatch} = this.props
            dispatch(requestChangeResidentName(_id, newName))
        }

        this.handleSurnameChange = newSurname => {
            const {_id, dispatch} = this.props
            dispatch(requestChangeResidentSurname(_id, newSurname))
        }

        this.handleRemove = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveResident(_id))
        }

        this.handleUrlClick = (url) => () => window.open(url)
    }

    render() {

        const {name, surname} = this.props
        return <div style={style.bookmarkContainer}>
            <div style={style.innerContainer}>
                <div className='row'>
                    <EditableText value={name} onChange={this.handleNameChange}/>
                </div>
                <div style={style.urlLine}>
                    <div style={style.input}>
                        <EditableText value={surname} onChange={this.handleSurnameChange}/>
                    </div>
                    <Spacer horizontal small/>
                    <div style={style.deleteButton} onClick={this.handleRemove}>
                        <div style={style.innerButton}>x</div>
                    </div>
                </div>
            </div>
        </div>
    }
}
