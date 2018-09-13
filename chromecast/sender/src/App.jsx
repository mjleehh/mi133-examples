import React from 'react'
import {startGame} from "../../common/actions";

function determineTapAreaSize() {
    const areaFactor = 0.8
    const {innerWidth, innerHeight} = window
    console.log(innerWidth, innerHeight)
    const smallSide = innerWidth < innerHeight ? innerWidth : innerHeight
    return smallSide * areaFactor
}

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {tapAreaSize: determineTapAreaSize()}
        window.addEventListener('resize', this.resize.bind(this))
    }

    resize() {
        this.setState({tapAreaSize: determineTapAreaSize()})
    }

    render() {
        const resetHandler = () => cast.framework.CastContext.getInstance().getCurrentSession()
            .sendMessage('urn:x-cast:com.appspott.giraffe-game', startGame())

        const {tapAreaSize} = this.state
        const tapAreaStyle = {
            width: tapAreaSize,
            height: tapAreaSize,
        }

        return <div className="app">
            <div className="castButton">
                <google-cast-launcher />
            </div>
            <button onClick={resetHandler}>restart</button>
            <div style={tapAreaStyle} className="tapArea"> </div>
        </div>
    }
}