import React from 'react'
import {connect} from 'react-redux'

import Display from './Display'
import Digits from './Digits'
import Operators from './Operators'
import Operations from './Operations'

import {
    addDigit,
    addDot,
    removeDigit,
    reset,
} from './actions'


/**
 * Main app component
 */
@connect()
export default class App extends React.Component {
    render() {
        const {dispatch} = this.props
        return <div className="appContainer">
            <div className="column">
                <Display/>
                <div className="row">
                    <Digits
                        onDot={() => dispatch(addDot())}
                        onRemoveDigit={() => dispatch(removeDigit())}
                        onDigit={(d) => dispatch(addDigit(d))}
                    />
                    <Operators/>
                </div>
                <Operations/>
            </div>
        </div>
    }
}
