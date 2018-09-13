import React from 'react'
import {connect} from 'react-redux'

import GameArea from "./GameArea";
import {startGame} from "../../../common/actions";
import {GAME_OVER, GAME_STARTED, NOT_STARTED} from "../logic/constants";


@connect(({gameState}) => ({gameState}))
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
        const {gameState} = this.props
        if (gameState === GAME_OVER) {
            return centeredGame(
                <div>
                    <div>GAME OVER!</div>
                    <div><button onClick={() => this.props.dispatch(startGame())}>restart</button></div>
                    <GameArea />
                </div>)
        } else if (gameState === GAME_STARTED) {
            return centeredGame(
                <GameArea onTouch={this.handleTouch} />)
        } else {
            return centeredGame(<button onClick={() => this.props.dispatch(startGame())}>start game</button>)
        }
    }
}

function centeredGame(content) {
    return <div className="gameContainer">
        <div className="innerGameContainer">
            <div>
                <div>Greedy Giraffe</div>
                {content}
            </div>
        </div>
    </div>
}