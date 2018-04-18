import {connect} from "react-redux"
import React from "react"

import {requestAddBookmark} from './actions'
import Spacer from "./Spacer"

import style from './AddBookmarks.iscss'

@connect()
export default class AddBookmark extends React.Component {
    constructor() {
        super()

        this.state = {
            name: '',
            url: '',
        }

        this.handleNameChange = e => this.setState({name: e.target.value})
        this.handleUrlChange = e => this.setState({url: e.target.value})
        this.handleSubmit = e => {
            e.preventDefault()
            const {name, url} = this.state
            this.props.dispatch(requestAddBookmark(name, url))
            this.setState({
                name: '',
                url: '',
            })
        }
    }

    render() {
        const {name, url} = this.state

        return <div style={style.container}>
            <form onSubmit={this.handleSubmit}>
                <Spacer/>
                <div className="column">
                    <div className="row">
                        <label style={style.label}>name</label>
                        <input style={style.input} value={name} onChange={this.handleNameChange}/>
                    </div>
                    <Spacer small/>
                    <div className="row">
                        <label style={style.label}>url</label>
                        <input style={style.input} type="text" value={url} onChange={this.handleUrlChange}/>
                    </div>
                </div>
                <Spacer/>
                <div><input style={style.createButton} type="submit" value="create"/></div>
            </form>
        </div>
    }
}
