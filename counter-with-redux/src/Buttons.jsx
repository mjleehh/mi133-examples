import React from 'react'
import {connect} from 'react-redux'
import Button from "@material-ui/core/Button/Button"
import Space from "./Space"

import {incrementCount, decrementCount, resetCount} from './actions'

@connect(({count, min, max}) => ({count, min, max}))
export default class Buttons extends React.Component {
    increment = () => {
        this.props.dispatch(incrementCount())
    }

    decrement = () => {
        this.props.dispatch(decrementCount())
    }

    reset = () => {
        this.props.dispatch(resetCount())
    }

    render() {
        const {countValue, min, max} = this.props
        const incrementDisabled = countValue >= max
        const decrementDisabled = countValue <= min
        const resetDisabled = countValue === 0

        return (
            <div className="row">
                <Button
                    disabled={decrementDisabled}
                    variant="contained"
                    color="primary"
                    onClick={this.decrement}>decrement</Button>
                <Space/>
                <Button
                    disabled={resetDisabled}
                    variant="contained"
                    color="primary"
                    onClick={this.reset}>reset</Button>
                <Space/>
                <Button
                    disabled={incrementDisabled}
                    variant="contained"
                    color="primary"
                    onClick={this.increment}>increment</Button>
            </div>
        )
    }
}