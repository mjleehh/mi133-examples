import React from 'react'

import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'


export default class Calculator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {n: 0}

        this.handleInputChange = e => {
            const {value} = e.target
            if (value > 0) {
                this.setState({n: e.target.value})
            }
        }
    }


    render() {
        const {n} = this.state
        const fibValue = this.props.functions.fib(n)
        console.log(fibValue)

        return <div className="centered-column">
                <div className="number-label">
                    <Chip label={fibValue}/>
                </div>
                <div className="number-label">
                    <TextField label="parameter n" type="number" value={n} onChange={this.handleInputChange}/>
                </div>
            </div>
    }
}