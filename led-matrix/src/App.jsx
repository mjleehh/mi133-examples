import React from 'react'

import LedMatrix from './LedMatrix'


export default class App extends React.Component {
    constructor() {
        super()

        this.state = {width: 4, height: 5}

        this.changeWidth = (e) => this.setState({width: e.target.value})
        this.changeHeight = (e) => this.setState({height: e.target.value})
    }

    render() {
        const {width, height} = this.state

        return <div className="column">
            <div className="row">
                <div>width:
                    <input onChange={this.changeWidth} type="number" min="1" max="12" value={width}/>
                </div>
                <div>height:
                    <input onChange={this.changeHeight} type="number" min="1" max="12" value={height}/>
                </div>
            </div>
            <LedMatrix width={width} height={height} />
        </div>
    }
}
