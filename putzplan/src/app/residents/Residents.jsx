import React from 'react'
import {connect} from 'react-redux'

import {openAddResidentDialog} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import SquareButton from 'app/util/SquareButton'
import Resident from './Resident'
import style from './Residents.iscss'

@connect(({data: {residents}}) => ({residents}))
export default class Residents extends React.Component {
    constructor() {
        super()
        this.handleAdd = () => this.props.dispatch(openAddResidentDialog())
    }

    render() {
        const {residents} = this.props
        const residentsList = []
        for (let i = 0; i < residents.length; ++i) {
            if (i !== 0) {
                residentsList.push(<Spacer key={`spacer-${i}`} large />)
            }
            residentsList.push(<Resident key={i} {...residents[i]} />)
        }
        return <div style={style.Residents}>
            {residentsList}
            <Spacer large />
            <div style={style.buttons}>
                <SquareButton style={style.addButton} value='+' onClick={this.handleAdd}/>
            </div>
        </div>
    }
}
