import React from 'react'

import LedMatrix from './LedMatrix'


export default class App extends React.Component {
    constructor() {
        super()

        this.state = {width: 5, height: 5}

        this.changeWidth = (e) => this.setState({width: e.target.value})
        this.changeHeight = (e) => this.setState({height: e.target.value})
    }

    render() {
        const {width, height} = this.state

        return <div className="column appContainer">
            <div className="row matrixSettings">
                <div>WIDTH:
                    <input className="numberInput" type="number" min="1" max="12" value={width} onChange={this.changeWidth}/>
                </div>
                <div className="timesBox">&#215;</div>
                <div>HEIGHT:
                    <input className="numberInput" type="number" min="1" max="12" value={height} onChange={this.changeHeight}/>
                </div>
            </div>
            <LedMatrix width={width} height={height} />
        </div>
    }
}
