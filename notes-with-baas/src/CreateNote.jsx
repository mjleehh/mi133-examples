import React from 'react'
import {connect} from 'react-redux'
import {Input, Modal} from "antd";

import {hideModal, requestAddNote} from './actions'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-markdown"
import "ace-builds/src-noconflict/theme-tomorrow"

@connect()
export default class CreateNote extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: null,
            body: '',
        }
    }

    onAddNote = () => {
        const {title, body} = this.state
        this.props.dispatch(requestAddNote({title, body}))
        this.props.dispatch(hideModal())
    }

    onCancel = () => {
        this.props.dispatch(hideModal())
    }

    onTitle = e => {
        this.setState({title: e.target.value})
    }

    onBody = body => {
        this.setState({body})
    }

    render() {
        const {title, body} = this.state

        return <Modal
            visible={this.props.visible}
            onOk={this.onAddNote}
            onCancel={this.onCancel}
        >
            <Input placeholder="title" value={title} onChange={this.onTitle}/>
            <AceEditor
                mode='markdown'
                theme='tomorrow'
                style={{width: '20em'}}
                placeholder='body'
                onChange={this.onBody}
                value={body}/>
        </Modal>
    }
}