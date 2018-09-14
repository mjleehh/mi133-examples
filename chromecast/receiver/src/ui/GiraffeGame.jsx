import React from 'react'
import {connect} from 'react-redux'

import GameArea from "./GameArea";
import {startGame} from "../../../common/actions";
import {GAME_OVER, GAME_STARTED, NOT_STARTED} from "../logic/constants";


@connect(({gameState, isGoogleCast}) => ({gameState, isGoogleCast}))
export default class GiraffeGame extends React.Component {
    constructor(props) {
        super(props)

        this.handleTouch = direction => {
            if (direction !== null) {
                console.log(direction)
            }
        }
    }

    render() {
        const {gameState, isGoogleCast} = this.props
        const restartButton = !isGoogleCast
            ? <button onClick={() => this.props.dispatch(startGame())}>restart</button>
            : <div> </div>

        if (gameState === GAME_OVER) {
            return <div className="fullWindow">
                {centeredGame(<GameArea />)}
                {centeredGame(<div className="centeredColumn">
                    <div>GAME OVER!</div>
                    {restartButton}
                </div>)}
            </div>
        } else if (gameState === GAME_STARTED) {
            return centeredGame(
                <GameArea onTouch={this.handleTouch} />)
        } else {
            return centeredGame(<div className="centeredColumn">
                    <div>Greedy Giraffe</div>
                    <button onClick={() => this.props.dispatch(startGame())}>start game</button>
                </div>)
        }
    }
}

function centeredGame(content) {
    return <div className="gameContainer">
        <div className="centeredColumn">
            <div>
                {content}
            </div>
        </div>
    </div>
}
