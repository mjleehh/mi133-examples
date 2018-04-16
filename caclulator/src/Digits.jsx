import React from 'react'
import {connect} from 'react-redux'

import {addDigit} from './actions'

@connect()
export default class Digits extends React.Component {
    constructor() {
        super()

        this.handleClick = () => this.props.dispatch(addDigit(1))
    }

    render() {
        return <div>
            <button onClick={this.handleClick}>1</button>
        </div>
    }
}