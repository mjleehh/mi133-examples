import React from 'react'
import {connect} from 'react-redux'

import {reqIncrementCount, reqResetCount} from 'app/actions'
import Display from 'app/Display'
import Buttons from 'app/Buttons'
import Spacer from 'app/Spacer'

import style from './App.iscss'

@connect()
export default class App extends React.Component {
    render() {
        const {dispatch} = this.props
        const onIncrement = () => dispatch(reqIncrementCount())
        const onReset = () => dispatch(reqResetCount())

        return <div style={style.wrapper}>
            <div style={style.title}>Infinite Counter</div>
            <div style={style.container}>
                <Spacer/>
                <Display/>
                <Spacer/>
                <Buttons onIncrement={onIncrement} onReset={onReset} />
            </div>
        </div>
    }
}