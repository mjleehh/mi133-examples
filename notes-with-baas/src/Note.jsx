import React from 'react'
import {connect} from 'react-redux'
import {Button, Card} from 'antd'
import EditableText from './EditableText'
import {requestChangeNote} from './actions'
import ReactMarkdown from 'react-markdown'

@connect(({notes}, {id}) => notes.find(note => note.id === id))
export default class Note extends React.Component {
    constructor(props) {
        super(props)

        this.state = {editing: null}
    }

    onEditTitle = () => {
        this.setState({editing: 'title'})
        console.log('edit title')
    }

    onTitleChanged = title => {
        console.log('new title: ', title)
        const {id, body} = this.props
        this.setState({editing: null})
        this.props.dispatch(requestChangeNote({id, body, title}))
    }

    onEditBody = e => {
        this.setState({editing: 'body'})
        console.log('edit body')
    }

    onBodyChanged = body => {
        const {id, title} = this.props
        this.setState({editing: null})
        this.props.dispatch(requestChangeNote({id, body, title}))
    }

    cancelEdit = () => {
        this.setState({editing: null})
    }

    render() {
        const {title, body} = this.props
        const {editing} = this.state

        const titleUi = editing === 'title'
            ? <EditableText
                text={title}
                onDone={this.onTitleChanged}
                onCancel={this.cancelEdit}
            />
            : <div onClick={this.onEditTitle}>{title}</div>

        const bodyUi = editing === 'body'
            ? <EditableText
                text={body}
                onDone={this.onBodyChanged}
                onCancel={this.cancelEdit}
                multiline
            />
            : body != null
                ? <div onClick={this.onEditBody}><ReactMarkdown source={body} /></div>
                : <Button onClick={this.onEditBody}>add</Button>

        return <Card>
            {titleUi}
            {bodyUi}
        </Card>
    }
}

//    ? <div onClick={this.onEditBody}>{body}</div>