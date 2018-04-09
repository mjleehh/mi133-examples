import React from 'react'
import {connect} from 'react-redux'

function mappingFunction({wholePar}) {
    return {currentValue}
}

/**
 * Display at the top of the calculator
 *
 * This is a pure view that does not generate any actions.
 */
@connect(({wholePart, fracPart, acc}) => ({wholePart, fracPart, acc}))
export default class Display extends React.Component {
    render() {
        const {wholePart, fracPart, acc} = this.props
        const upperRow = acc !== null ?
            <div>{acc.number} {acc.operator}</div> :
            <div> </div>
        const lowerRow = fracPart != null ?
            <div>{wholePart}.{fracPart}</div> :
            <div>{wholePart}</div>

        return <div className="displayContainer column">
            <div className="displayRow">{upperRow}</div>
            <div className="displayRow">{lowerRow}</div>
        </div>
    }
}
