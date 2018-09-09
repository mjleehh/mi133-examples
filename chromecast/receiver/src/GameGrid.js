import _ from 'lodash'

export default class GameGrid {
    constructor(width, height) {
        if (!_.isNumber(width) || width < 1) {
            throw 'invalid width'
        }

        if (!_.isNumber(height) || height < 1) {
            throw 'invalid height'
        }

        this._width = width
        this._height = height
    }

    isInGrid(position) {
        const {x, y} = position
        return x >= 0 && x < this._width && y >= 0 && y < this._height
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    center() {
        return {
            x: Math.round(this._width / 2),
            y: Math.round(this._height / 2)
        }
    }
}
