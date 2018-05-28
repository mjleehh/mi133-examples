import React from 'react'

export default class User extends React.Component {
    constructor() {
        super()

        this.handleClick = () => {
            const handler = this.props.onSelect
            if (handler) {
                handler(this.props._id)
            }
        }
    }

    render() {
        return <div onClick={this.handleClick}>{this.props.email}</div>
    }
}
