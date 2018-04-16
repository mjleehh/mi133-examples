import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveBookmark} from './actions'

@connect()
export default class Bookmark extends React.Component {
    constructor() {
        super()

        this.handleRemove = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveBookmark(_id))
        }
    }

    render() {
        const {name, url} = this.props
        return <div>
            <div><label>name</label>{name}</div>
            <div><label>url</label><a href={url}>{url}</a></div>
            <button onClick={this.handleRemove}>x</button>
        </div>
    }
}
