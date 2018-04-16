import React from 'react'
import {connect} from 'react-redux'

import {
    requestChangeBookmarkName,
    requestChangeBookmarkUrl,
    requestRemoveBookmark
} from './actions'
import EditableText from "./EditableText"

@connect()
export default class Bookmark extends React.Component {
    constructor() {
        super()

        this.handleNameChange = newName => {
            const {_id, dispatch} = this.props
            dispatch(requestChangeBookmarkName(_id, newName))
        }

        this.handleUrlChange = newUrl => {
            const {_id, dispatch} = this.props
            dispatch(requestChangeBookmarkUrl(_id, newUrl))
        }

        this.handleRemove = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveBookmark(_id))
        }
    }

    render() {
        const {name, url} = this.props
        return <div>
            <div className="row">
                <label>name</label>
                <EditableText value={name} onChange={this.handleNameChange}/>
            </div>
            <div className="row">
                <label>url</label>
                <EditableText value={url} onChange={this.handleUrlChange}/>
                <a href={url}>go</a>
            </div>
            <button onClick={this.handleRemove}>x</button>
        </div>
    }
}
