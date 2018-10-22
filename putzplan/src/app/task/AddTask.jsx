import {connect} from 'react-redux'
import React from 'react'
import Select from 'react-select'
import moment from 'moment'
import DatePicker from 'react-datepicker'

//import 'react-select/dist/react-select.css'
import 'react-datepicker/dist/react-datepicker.css'


import {requestAddTask} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import style from './AddTask.iscss'

function initialState() {
    return {description: '', firstResident: undefined, startDate: moment()}
}

@connect(({data: {residents}}) => ({residents}))
export default class AddTask extends React.Component {
    constructor() {
        super()

        this.state = initialState()

        this.handleDescriptionChange = e => this.setState({description: e.target.value})
        this.handleResidentChange = selectedOption => {
            this.setState({firstResident: selectedOption.value})
        }
        this.handleStartDateChange = date => {
            this.setState({startDate: date})
        }
        this.handleSubmit = e => {
            e.preventDefault()
            const {description, firstResident, startDate} = this.state
            const {dispatch, onAdd} = this.props
            dispatch(requestAddTask(description, firstResident, startDate.toISOString()))

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
        const {description, firstResident} = this.state

        const options = this.props.residents.map(({_id, name, surname}) => ({
            value: _id, label: `${name} ${surname}`
        }))

        return <div style={style.container}>
            <form onSubmit={this.handleSubmit}>
                <Spacer/>
                <div className='column'>
                    <div className='row'>
                        <label style={style.label}>description</label>
                        <input style={style.input} value={description} onChange={this.handleDescriptionChange}/>
                    </div>
                    <Spacer small/>
                    <div className='row'>
                        <label style={style.label}>first in line</label>
                        <div style={style.input}>
                            <Select options={options} value={firstResident} onChange={this.handleResidentChange}/>
                        </div>
                    </div>
                    <div className='row'>
                        <label style={style.label}>start date</label>
                        <div style={style.input}>
                            <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange}/>
                        </div>
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
