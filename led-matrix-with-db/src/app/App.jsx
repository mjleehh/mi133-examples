import React from 'react'

import MatrixSettings from './MatrixSettings'
import LedMatrix from './LedMatrix'

export default class App extends React.Component {
    render() {
        return <div className="column appContainer">
            <MatrixSettings/>
            <LedMatrix/>
        </div>
    }
}
