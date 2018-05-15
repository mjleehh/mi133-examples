import React from 'react'
import {connect} from 'react-redux'

const displayStyle = {fontSize: "3em"}

@connect(({count}) => ({count}))
export default class Display extends React.Component {
    render() {
        return <div style={displayStyle}>{this.props.count}</div>
    }
}
