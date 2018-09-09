import React from 'react'

function draw(gameGrid, giraffe, leaf, intersection) {
    const {width, height} = gameGrid
    const grid = new Array(width * height)
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const xOdd = !(x % 2)
            const yOdd = !(y % 2)

            if (xOdd ? !yOdd : yOdd) {
                grid[y * width + x] = <div className="tile lightTile"> </div>
            } else {
                grid[y * width + x] = <div className="tile darkTile"> </div>
            }
        }
    }

    for (let val of giraffe.iter()) {
        const {pos, prevDirection, nextDirection} = val
        console.log(nextDirection, prevDirection)
        if (nextDirection === null) {
            grid[pos.y * width + pos.x] = <div className="tile head"> </div>
        } else if (prevDirection === null) {
            grid[pos.y * width + pos.x] = <div className="tile tail"> </div>
        } else {
            grid[pos.y * width + pos.x] = <div className="tile segment"> </div>
        }
    }

    if (leaf) {
        const {x, y} = leaf
        grid[y * width + x] = <div className="tile leaf"> </div>
    }

    if (intersection) {
        const {x, y} = intersection
        grid[y * width + x] = 'X'
    }

    const columns = []
    for (let y = 0; y < height; ++y) {
        const row = []
        for (let x = 0; x < width; ++x) {
            row.push(grid[y * width + x])
        }
        columns.push(<div className="row" key={y}>{row}</div>)
    }
    return columns
}

export default class GameArea extends React.Component {
    render() {
        const {gameGrid, giraffe, leaf} = this.props
        return <div>
            <div className="column">{draw(gameGrid, giraffe, leaf)}</div>
        </div>
    }
}