import React from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'

import Note from './Note'

@connect(({notes, notesDirty}) => ({notes, notesDirty}))
export default class NoteView extends React.Component {
    render() {
        const {notes, requests} = this.props
        const notesUi = notes.map(({id, title, body}) => <Note key={id} id={id}/>)
        if (requests > 0) {
            return <Spin size='large'>{notesUi}</Spin>
        }
        return <div>{notesUi}</div>
    }
}
