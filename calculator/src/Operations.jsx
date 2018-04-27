import React from 'react'
import {connect} from 'react-redux'

import {
    calculate,
    reset
} from './actions'

/**
 * Equals and reset buttons.
 *
 * This component does not display any data and thus has no state attached.
 */
@connect()
export default class Operations extends React.Component {
    constructor() {
        super()

        this.handleEqual = () => this.props.dispatch(calculate())
        this.handleC = () => this.props.dispatch(reset())
    }

    render() {
        return <div className="row">
            <button
                className="calcButton equalsButton"
                onClick={this.handleEqual}>=</button>
            <button className="calcButton" onClick={this.handleC}>c</button>
        </div>
    }
}