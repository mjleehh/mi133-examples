import React from 'react'
import {connect} from 'react-redux'
import Slider from '@material-ui/lab/Slider'
import {setCount} from "./actions"

@connect(({count}) => ({count}))
export default class Range extends React.Component {
    setCount = (event, value) => {
        this.props.dispatch(setCount(value))
    }

    render() {
        const {count} = this.props
        return <div>
            <Slider
                min={-10} max={10} step={1}
                value={count}
                onChange={this.setCount}
            />
        </div>
    }
}