import React from 'react'
import GameGrid from './GameGrid'
import Giraffe from './Giraffe'

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

function draw(gameGrid, giraffe, leaf, intersection) {
    const {width, height} = gameGrid
    const grid = new Array(width * height).fill('.')

    for (let val of giraffe.iter()) {
        const {pos, index} = val
        if (index === 0) {
            grid[pos.y * width + pos.x] = '8'
        } else {
            grid[pos.y * width + pos.x] = 'o'
        }
    }

    if (leaf) {
        const {x, y} = leaf
        grid[y * width + x] = '%'
    }

    if (intersection) {
        const {x, y} = intersection
        grid[y * width + x] = 'X'
    }

    let res = ''
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            res += grid[y * width + x]
        }
        res += '\n'
    }

    return res
}

export default class GiraffeGame extends React.Component {
    constructor(props) {
        super(props)

        const gameGrid = new GameGrid(16, 16)
        const giraffe = new Giraffe(gameGrid.center())
        const leaf = placeLeaf(gameGrid, giraffe)

        this.state = {
            direction: 'w',
            gameGrid,
            giraffe,
            leaf,
            intersection: null,
        }

        console.log(leaf)

        window.onkeydown = e => {
            const {keyCode} = e
            const direction = keyCodeToDirection(keyCode)
            if (direction !== null) {
                const nextHead = this.state.giraffe.nextHead(direction)
                if (_.isEqual(this.state.leaf, nextHead)) {
                    const {giraffe, intersection} = this.state.giraffe.grow(direction)
                    const leaf = placeLeaf(this.state.gameGrid, giraffe)
                    this.setState({direction, giraffe, leaf, intersection})
                } else if (e.shiftKey) {
                    const {giraffe, intersection} = this.state.giraffe.grow(direction)
                    console.log(intersection)
                    this.setState({direction, giraffe, intersection})
                } else {
                    const {giraffe, intersection} = this.state.giraffe.move(direction)
                    console.log(intersection)
                    this.setState({direction, giraffe, intersection})
                }
            }
        }
    }

    render() {
        const {giraffe, gameGrid, leaf, intersection} = this.state
        return <div>
            <div>giraffe game</div>
            <pre>{draw(gameGrid, giraffe, leaf, intersection)}</pre>
        </div>
    }
}