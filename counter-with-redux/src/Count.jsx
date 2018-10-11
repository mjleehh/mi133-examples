import React from 'react'
import {connect} from 'react-redux'
import Chip from "@material-ui/core/Chip/Chip"

@connect(({count}) => ({count}))
export default class Count extends React.Component {
    render() {
        const {count} = this.props
        return <div className="row">
            <div className="grower"> </div>
            <Chip label={count}/>
            <div className="grower"> </div>
        </div>
    }
}
