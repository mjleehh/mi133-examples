import React from 'react'
import {connect} from 'react-redux'

import {setOperator} from './actions'

/**
 * Calculation operator buttons at the side of the caclulator.
 *
 * This component does not display any data and thus has no state attached.
 */
@connect()
export default class Operators extends React.Component {
    constructor() {
        super()

        this.handleOperator = operator => () => this.props.dispatch(setOperator(operator))
    }

    render() {
        return <div className="column">
            <button className="operationsButton" onClick={this.handleOperator('+')}>+</button>
            <button className="operationsButton" onClick={this.handleOperator('-')}>-</button>
            <button className="operationsButton" onClick={this.handleOperator('*')}>*</button>
            <button className="operationsButton" onClick={this.handleOperator('/')}>/</button>
        </div>
    }
}