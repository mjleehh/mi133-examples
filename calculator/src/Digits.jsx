import React from 'react'


/**
 * Digit input field
 *
 * This is an example of a reusable plain react component. All event handlers need to be set externally using props.
 */
export default class Digits extends React.Component {
    constructor() {
        super()

        this.handleDigit = digit => () => {
            const {onDigit} = this.props
            if (!onDigit) {
                console.log('warning: no digit handler preset')
                return
            }
            onDigit(digit)
        }
    }

    render() {
        const digits = []
        for (let i = 1; i <= 9; ++i) {
            digits.push(
                <button className="calcButton" key={i} onClick={this.handleDigit(i)}>{i}</button>)
        }

        let {onDot, onRemoveDigit} = this.props
        if (!onDot) {
            onDot = () => console.log('warning no "on dot" handler present')
        }
        if (!onRemoveDigit) {
            onRemoveDigit = () => console.log('warning no "remove digit" handler present')
        }

        return <div className="digitsContainer">
            {digits}
            <button className="calcButton" onClick={onDot}>.</button>
            <button className="calcButton" onClick={this.handleDigit('0')}>0</button>
            <button className="calcButton" onClick={onRemoveDigit}>←</button>
        </div>
    }
}