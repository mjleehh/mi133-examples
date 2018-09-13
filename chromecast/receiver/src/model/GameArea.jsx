import React from 'react'
import {connect} from 'react-redux'
import Giraffe from "./Giraffe";

function draw(gameGrid, giraffe, leaf, intersection, areaSize) {
    const {width, height} = gameGrid
    const grid = new Array(width * height)
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const xOdd = !(x % 2)
            const yOdd = !(y % 2)

            if (xOdd ? !yOdd : yOdd) {
                grid[y * width + x] = "lightTile"
            } else {
                grid[y * width + x] = "darkTile"
            }
        }
    }

    for (let val of new Giraffe(giraffe).iter()) {
        const {pos, prevDirection, nextDirection} = val
        if (nextDirection === null) {
            grid[pos.y * width + pos.x] = "head"
        } else if (prevDirection === null) {
            grid[pos.y * width + pos.x] = "tail"
        } else {
            grid[pos.y * width + pos.x] = "segment"
        }
    }

    if (leaf) {
        const {x, y} = leaf
        grid[y * width + x] = "leaf"
    }

    if (intersection) {
        const {x, y} = intersection
        grid[y * width + x] = 'intersection'
    }

    const tileSize = areaSize / width
    const itemStyle = {width: `${tileSize}px`, height: `${tileSize}px`}

    const columns = []
    for (let y = 0; y < height; ++y) {
        const row = []
        for (let x = 0; x < width; ++x) {
            row.push(
                <div key={`${x},${y}`} style={itemStyle} className={grid[y * width + x]}> </div>)
        }
        columns.push(<div className="row" key={y}>{row}</div>)
    }
    return columns
}

function determineAreaSize() {
    const areaFactor = 0.8
    const {innerWidth, innerHeight} = window
    console.log(innerWidth, innerHeight)
    const smallSide = innerWidth < innerHeight ? innerWidth : innerHeight
    return smallSide * areaFactor
}

@connect(({grid, giraffe, intersection, leaf}) => ({grid, giraffe, intersection, leaf}))
export default class GameArea extends React.Component {
    constructor(props) {
        super(props)

        this.state = {areaSize: determineAreaSize()}
        window.addEventListener('resize', this.resize.bind(this))

        this.touchStart = null
        this.touchDelta = null
        this.handleTouchStart = e => {
            const {clientX, clientY} = e.touches[0]
            this.touchStart = {clientX, clientY}
        }

        this.handleTouchMove = e => {
            const {touchStart} = this
            const {clientX, clientY} = e.touches[0]
            if (touchStart) {
                this.touchDelta = {
                    x: clientX - touchStart.clientX,
                    y: clientY - touchStart.clientY,
                }
            }
        }

        this.handleTouchEnd = e => {
            const {touchDelta} = this
            const {onTouch} = this.props

            this.touchDelta = null
            this.touchStart = null

            if (!onTouch) {
                return null
            }

            if (!touchDelta) {
                return null
            }

            const {x, y} = touchDelta
            if (Math.abs(x) > Math.abs(y)) {
                if (x > 0) {
                    onTouch('e')
                } else {
                    onTouch('w')
                }
            } else {
                if (y > 0) {
                    onTouch('s')
                } else {
                    onTouch('n')
                }
            }

            e.preventDefault()
        }
    }

    resize() {
        this.setState({areaSize: determineAreaSize()})
    }

    render() {
        const {areaSize} = this.state
        const {grid, giraffe, intersection, leaf} = this.props
        return <div onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
            <div className="column">{draw(grid, giraffe, leaf, intersection, areaSize)}</div>
        </div>
    }
}
