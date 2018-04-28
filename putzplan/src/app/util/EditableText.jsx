import React from 'react'

function setInputFocus(input) {
    if (input !== null) {
        input.focus()
    }
}

export default class EditableText extends React.Component {
    constructor() {
        super()

        this.state = {editMode: false}
        this.handleEdit = () => this.setState({editMode: true})
        this.handleBlur = e => this.handleEditDone(e.target.value)
        this.handleKey = e => {
            if (e.key === 'Enter') {
                this.handleEditDone(e.target.value)
            }

            if (e.key === 'Escape') {
                e.target.value = this.props.value
            }
        }

        this.handleEditDone = value => {
            this.setState({editMode: false})
            const {onChange} = this.props
            if (onChange) {
                onChange(value)
            }
        }
    }

    render() {
        const {value} = this.props
        const text = this.state.editMode ?
            <input
                ref={setInputFocus}
                type='text' defaultValue={value}
                onBlur={this.handleBlur}
                onKeyUp={this.handleKey}
                onChange={this.handleChange}
            /> :
            <div onClick={this.handleEdit}>{value}</div>

        return <div onClick={this.handleClick}>
            {text}
        </div>
    }
}