import React from 'react'
import {Button, Icon, Input} from 'antd'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-markdown"
import "ace-builds/src-noconflict/theme-tomorrow"

export default class EditableText extends React.Component {
    constructor(props) {
        super(props)

        this.state = {value: props.text}
    }

    onKeyUp = e => {
        if (e.key === 'Enter') {
            if (!this.props.multiline) {
                this.onDone()
            } else if (e.shiftKey) {
                this.onDone()
            }
            e.preventDefault()
        } else if (e.key === 'Escape') {
            this.onCancel()
            e.preventDefault()
        }
    }

    onDone = () => {
        const {onDone} = this.props
        if (onDone) {
            onDone(this.state.value)
        }
    }

    onCancel = () => {
        const {onCancel} = this.props
        if (onCancel) {
            onCancel(this.state.value)
        }
    }

    onInput = e => {
        console.log(e)
        this.setState({value: e.target.value})
    }

    onEditorChange = e => {
        console.log('value', e)
        this.setState({value: e})
    }

    render() {
        if (!this.props.multiline) {
            return <Input
                addonAfter={<Icon onClick={this.onDone} type='check'/>}
                value={this.state.value}
                onInput={this.onInput}
                onKeyUp={this.onKeyUp}
            />
        } else {
            return <div>
                <AceEditor
                    mode='markdown'
                    theme='tomorrow'
                    onChange={this.onEditorChange}
                    value={this.state.value}/>
                <Button onClick={this.onDone}><Icon type='check'/></Button>
            </div>
        }
    }
}

// return <div onKeyUp={this.onKeyUp}><Input.TextArea
//     rows={5}
//     value={this.state.value}
//     onInput={this.onInput}
// />
