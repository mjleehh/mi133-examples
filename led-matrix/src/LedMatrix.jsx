import React from 'react'
import PropTypes from 'prop-types'


function createMatrix(width, height) {
    const numLeds = width * height
    const leds = []
    for (let i = 0; i < numLeds; ++i) {
        leds.push(false)
    }
    return leds
}

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
export default class LedMatrix extends React.Component {
    constructor(props) {
        super(props)

        const {width, height} = props
        this.state = {leds: createMatrix(width, height)}

        // higher order function that creates an event handler
        this.handleClick = (x, y) => () => this.toggleValue(x, y)
    }

    /**
     * Create a new component state, when width and height are changed.
     */
    componentWillReceiveProps(nextProps) {
        const {width, height} = nextProps
        if (width == this.props.width && height == this.props.height) {
            return
        }
        this.setState({leds: createMatrix(width, height)})
    }

    /**
     * Toggle the value of an individual LED.
     *
     * This will alter the component state and trigger re-render.
     *
     */
    toggleValue(x, y) {
        this.setState(({leds}, props) => {
            const {width} = props
            const newLeds = [...leds]
            newLeds[y * width + x] = !leds[y * width + x]
            return {leds: newLeds}
        })
    }

    /**
     * Retrieve value A(x,y) from state.
     */
    getValue(x, y) {
        const {width} = this.props
        return this.state.leds[y * width + x]
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
        const columns = []
        for (let y = 0; y < this.props.height; ++y) {
            const row = []
            for (let x = 0; x < this.props.width; ++x) {
                row.push(this.createLed(x, y, this.getValue(x, y)))
            }
            columns.push(<div className="row" key={y}>{row}</div>)
        }
        return <div className="column">{columns}</div>
    }
}

/**
 * Define the propterties allowed on the <LedMatrix> component.
 */
LedMatrix.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}
