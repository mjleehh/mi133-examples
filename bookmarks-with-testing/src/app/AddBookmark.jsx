import {connect} from "react-redux"
import React from "react"

import {addBookmark, requestAddBookmark} from './actions'

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

        return <form onSubmit={this.handleSubmit}>
            <div>add bookmark</div>
            <div><label>name</label><input type="text" value={name} onChange={this.handleNameChange}/></div>
            <div><label>url</label><input type="text" value={url} onChange={this.handleUrlChange}/></div>
            <div><input type="submit" value="create"/></div>
        </form>
    }
}
