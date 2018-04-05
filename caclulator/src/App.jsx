import React from 'react'

import Display from './Display'
import Digits from './Digits'

export default class App extends React.Component {
    render() {
        return <div className="column appContainer">
            <Display/>
            <Digits/>
        </div>
    }
}
