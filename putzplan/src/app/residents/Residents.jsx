import React from 'react'
import {connect} from 'react-redux'

import {openAddResidentDialog} from 'app/logic/actions'
import Resident from './Resident'
import style from './Residents.iscss'

@connect(({data: {residents}}) => ({residents}))
export default class Residents extends React.Component {
    constructor() {
        super()
        this.handleAdd = () => this.props.dispatch(openAddResidentDialog())
    }

    render() {
        const residentsList = this.props.residents.map((resident, idx) => {
            return <Resident key={idx} {...resident} />
        })
        return <div style={style.Residents}>
            {residentsList}
        </div>
    }
}
