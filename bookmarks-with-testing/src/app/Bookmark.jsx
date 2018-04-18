import React from 'react'
import {connect} from 'react-redux'

import {
    requestChangeBookmarkName,
    requestChangeBookmarkUrl,
    requestRemoveBookmark
} from './actions'
import EditableText from "./EditableText"

import style from './Bookmark.iscss'
import Spacer from "./Spacer"

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

        this.handleUrlClick = (url) => () => window.open(url)
    }

    render() {

        const {name, url} = this.props
        return <div style={style.bookmarkContainer}>
            <div style={style.innerContainer}>
                <div className="row">
                    <EditableText value={name} onChange={this.handleNameChange}/>
                </div>
                <div style={style.urlLine}>
                    <div style={style.input}>
                        <EditableText value={url} onChange={this.handleUrlChange}/>
                    </div>
                    <Spacer horizontal small/>
                    <div style={style.goButton} onClick={this.handleUrlClick(url)}>
                        <div style={style.innerButton}>🡒</div>
                    </div>
                    <Spacer horizontal small/>
                    <div style={style.deleteButton} onClick={this.handleRemove}>
                        <div style={style.innerButton}>x</div>
                    </div>
                </div>
            </div>
        </div>
    }
}
