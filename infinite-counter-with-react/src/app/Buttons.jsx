import React from 'react'

import Spacer from 'app/Spacer'
import style from './Buttons.iscss'

export default class Buttons extends React.Component {
    constructor() {
        super()

        this.handleIncrement = () => {
            const {dispatch, onIncrement} = this.props
            if (onIncrement) {
                onIncrement()
            }
        }
        this.handleReset = () => {
            const {dispatch, onReset} = this.props
            if (onReset) {
                onReset()
            }
        }
    }

    render() {
        return <div style={style.buttons}>
            <button style={style.button} onClick={this.handleIncrement} >increment</button>
            <Spacer horizontal/>
            <button style={style.button} onClick={this.handleReset}>reset</button>
        </div>
    }
}
