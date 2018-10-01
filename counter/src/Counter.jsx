import React from 'react'
import Button from "@material-ui/core/Button/Button"
import Slider from '@material-ui/lab/Slider'
import Chip from '@material-ui/core/Chip'

import VerticalSpace from './VerticalSpace'

export default class Counter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {countValue: 0, min: -10, max: 10}

        this.handleIncrement = () => {
            const {countValue, max} = this.state
            if (countValue < max) {
                this.setState({countValue: countValue + 1})
            }
        }

        this.handleDecrement = () => {
            const {countValue, min} = this.state
            if (countValue > min) {
                this.setState({countValue: countValue - 1})
            }
        }

        this.handleSlider = (event, value) => {
            this.setState({countValue: value})
        }

        this.handleReset = () => {
            this.setState({countValue: 0})
        }
    }

    render() {
        const {countValue, min, max} = this.state

        const incrementDisabled = countValue >= max
        const decrementDisabled = countValue <= min
        const resetDisabled = countValue === 0

        return <div className="column">
            <div className="row">
                <div className="grower"> </div>
                <Chip label={countValue}/>
                <div className="grower"> </div>
            </div>
            <div>
                <Slider
                    min={-10} max={10} step={1}
                    value={countValue}
                    onChange={this.handleSlider}
                />
            </div>
            <div className="row">
                <Button
                    disabled={decrementDisabled}
                    variant="contained"
                    color="primary"
                    onClick={this.handleDecrement}>decrement</Button>
                <VerticalSpace/>
                <Button
                    disabled={resetDisabled}
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}>reset</Button>
                <VerticalSpace/>
                <Button
                    disabled={incrementDisabled}
                    variant="contained"
                    color="primary"
                    onClick={this.handleIncrement}>increment</Button>
            </div>
        </div>
    }
}