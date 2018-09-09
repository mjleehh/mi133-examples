import React from 'react'
import GameGrid from './GameGrid'
import Giraffe from './Giraffe'
import GameArea from "./GameArea.jsx";

function keyCodeToDirection(keyCode) {
    switch (keyCode) {
        case 37: {
            return 'w'
        }
        case 38: {
            return 'n'
        }
        case 39: {
            return 'e'
        }
        case 40: {
            return 's'
        }
        default:
            return null
    }
}

function placeLeaf(gameGrid, giraffe) {
    const {width, height} = gameGrid
    let x = 0
    let y = 0

    do {
        x = Math.floor(Math.random() * width)
        y = Math.floor(Math.random() * height)
    } while(giraffe.intersects({x, y}))

    return {x, y}
}

export default class GiraffeGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            state: 'inactive'
        }

        window.onkeydown = e => {
            const {keyCode} = e
            const direction = keyCodeToDirection(keyCode)
            if (direction !== null) {
                //this.update(direction, e.shiftKey)
                this.setState({direction})
            }
        }
    }

    startNew() {
        const gameGrid = new GameGrid(16, 16)
        const giraffe = new Giraffe(gameGrid.center())
        const leaf = placeLeaf(gameGrid, giraffe)

        this.setState({
            state: 'running',
            direction: 'w',
            gameGrid,
            giraffe,
            leaf,
            intersection: null,
        })

        let prevTime = null
        const gameLoop = (time) => {
            if (prevTime === null) {
                prevTime = time
            } else if (time - prevTime > 350) {
                prevTime = time
                this.update(this.state.direction, false)
            }

            if (this.state.state === 'running') {
                requestAnimationFrame(gameLoop)
            }
        }

        requestAnimationFrame(gameLoop)
    }

    update(direction, shiftKey) {
        if (this.state.state !== 'running') {
            return
        }

        const currentGiraffe = this.state.giraffe
        const {gameGrid} = this.state
        const nextHead = currentGiraffe.nextHead(direction)
        if (!gameGrid.contains(nextHead)) {
            this.setState({state:'gameover'})
            return
        }

        if (_.isEqual(this.state.leaf, nextHead)) {
            const {giraffe, intersection} = currentGiraffe.grow(direction)
            const leaf = placeLeaf(gameGrid, giraffe)
            this.setState({direction, giraffe, leaf, intersection})
        } else if (shiftKey) {
            const {giraffe, intersection} = currentGiraffe.grow(direction)
            if (intersection) {
                this.setState({state: 'gameover'})
                return
            }
            this.setState({direction, giraffe, intersection})
        } else {
            const {giraffe, intersection} = currentGiraffe.move(direction)
            if (intersection) {
                this.setState({state: 'gameover'})
                return
            }
            this.setState({direction, giraffe, intersection})
        }
    }

    render() {
        const {state, giraffe, gameGrid, leaf, intersection} = this.state
        if (state === 'inactive') {
            return <div>
                <div>giraffe game</div>
                <button onClick={() => this.startNew()}>start game</button>
            </div>
        } else if (state === 'gameover') {
            return <div>
                <div>giraffe game</div>
                <div>GAME OVER!</div>
                <div><button onClick={() => this.startNew()}>restart</button></div>
                <GameArea gameGrid={gameGrid} giraffe={giraffe} leaf={leaf}/>
            </div>
        } else {
            return <div>
                <div>giraffe game</div>
                <GameArea gameGrid={gameGrid} giraffe={giraffe} leaf={leaf}/>
            </div>
        }
    }
}