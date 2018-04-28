import {connect} from 'react-redux'
import React from 'react'

import {requestAddResident} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import style from './AddResident.iscss'

function initialState() {
    return {name: '', surname: ''}
}

@connect()
export default class AddResident extends React.Component {
    constructor() {
        super()

        this.state = initialState()

        this.handleNameChange = e => this.setState({name: e.target.value})
        this.handleSurnameChange = e => this.setState({surname: e.target.value})
        this.handleSubmit = e => {
            e.preventDefault()
            const {name, surname} = this.state
            const {dispatch, onAdd} = this.props
            dispatch(requestAddResident(name, surname))

            this.setState(initialState())
            if (onAdd) {
                onAdd()
            }
        }
        this.handleCancel = () => {
            this.setState(initialState())
            const {onCancel} = this.props
            if (onCancel) {
                onCancel()
            }
        }
    }

    render() {
        const {name, surname} = this.state

        return <div style={style.container}>
            <form onSubmit={this.handleSubmit}>
                <Spacer/>
                <div className='column'>
                    <div className='row'>
                        <label style={style.label}>name</label>
                        <input style={style.input} value={name} onChange={this.handleNameChange}/>
                    </div>
                    <Spacer small/>
                    <div className='row'>
                        <label style={style.label}>surname</label>
                        <input style={style.input} type='text' value={surname} onChange={this.handleSurnameChange}/>
                    </div>
                </div>
                <Spacer/>
                <div>
                    <input style={style.createButton} type='submit' value='create'/>
                    <input type='button' value='Cancel' onClick={this.handleCancel}/>
                </div>
            </form>
        </div>
    }
}
