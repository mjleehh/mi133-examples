import React from 'react'
import {connect} from 'react-redux'

import {
    setMatrixWidth,
    setMatrixHeight,
} from './actions'

@connect(({matrixWidth, matrixHeight}) => ({matrixWidth, matrixHeight}))
export default class MatrixSettings extends React.Component {
    constructor() {
        super()

        this.changeWidth = e => this.props.dispatch(setMatrixWidth(Math.floor(e.target.value)))
        this.changeHeight = e => this.props.dispatch(setMatrixHeight(Math.floor(e.target.value)))
    }

    render() {
        const {matrixWidth, matrixHeight} = this.props

        return <div className="row matrixSettings">
            <div>WIDTH:
                <input className="numberInput"
                       type="number" value={matrixWidth} min="0" max="12"
                       onChange={this.changeWidth}/>
            </div>
            <div className="timesBox">&#215;</div>
            <div>HEIGHT:
                <input className="numberInput"
                       type="number" value={matrixHeight} min="0" max="12"
                       onChange={this.changeHeight}/>
            </div>
        </div>
    }
}