import React from 'react'
import {connect} from 'react-redux'

import {toggleLedState} from './actions'
import m from './matrix'

/**
 * Implements the LED matrix as an input widget.
 *
 * State is held inside the component. There is no side effects, when the state changes.
 *
 * The LED matrix state is stored as an array with the following addressing scheme:
 *
 *         A = A(x, y)
 *
 *               x
 *
 *           0 1 2 3 . m
 *        +---------------
 *      0 |  o o o o   o
 *      1 |  o o o o   o
 *      2 |  o o o o   o
 *   y  3 |  o o o o   o
 *      . |
 *      n |  o o o o   o
 *
 *
 *   s: Array<bool> = [A(0,0), A(1,0) ... A(m,0),
 *                     A(0,1), A(1,1) ... A(m,1),
 *                     ...
 *                     A(0,n), A(1,n) .... A(m,n)]
 *
 */
@connect(({matrix}) => ({matrix}))
export default class LedMatrix extends React.Component {
    constructor(props) {
        super(props)

        // higher order function that creates an event handler
        this.handleClick = (x, y) => () => this.props.dispatch(toggleLedState(x, y))
    }

    /**
     * Helper to create a single LED HTML view.
     */
    createLed(x, y, value) {
        const className = value ? "ledDot activeLedDot" : "ledDot inactiveLedDot"
        return <div key={x} className="led">
            <div onClick={this.handleClick(x, y)} className={className} />
        </div>
    }

    /**
     * Return the view of the components state.
     *
     * Called each time the state is changed.
     */
    render() {
        const {matrix} = this.props
        const columns = []
        for (let y = 0; y < matrix.height; ++y) {
            const row = []
            for (let x = 0; x < matrix.width; ++x) {
                row.push(this.createLed(x, y, m.getValue(matrix, x, y)))
            }
            columns.push(<div className="row" key={y}>{row}</div>)
        }
        return <div className="column">{columns}</div>
    }
}
