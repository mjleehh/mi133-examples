import React from 'react'
import {connect} from 'react-redux'

function mappingFunction({currentValue}) {
    return {currentValue}
}

@connect(mappingFunction)
export default class Display extends React.Component {
    render() {
        return <div>{this.props.currentValue}</div>
    }
}
