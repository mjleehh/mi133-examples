import React from 'react'
import {connect} from 'react-redux'

import {openAddResidentDialog} from 'app/logic/actions'
import Resident from './Resident'
import style from './ResidentList.iscss'

@connect(({data: {residents}}) => ({residents}))
export default class ResidentList extends React.Component {
    constructor() {
        super()
        this.handleAdd = () => this.props.dispatch(openAddResidentDialog())
    }

    render() {
        const residentsList = this.props.residents.map((resident, idx) => {
            return <Resident key={idx} {...resident} />
        })
        return <div style={style.residentListContainer}>
            <input type='button' value='add' onClick={this.handleAdd} />
            {residentsList}
        </div>
    }
}
