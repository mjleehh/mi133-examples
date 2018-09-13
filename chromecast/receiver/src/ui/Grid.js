import _ from 'lodash'

export default class Grid {
    constructor(fst, height) {
        if (fst instanceof Grid || _.has(fst, 'width')) {
            this._width  = fst.width
            this._height = fst.height
        } else {
            if (!_.isNumber(fst) || fst < 1) {
                throw 'invalid width'
            }

            if (!_.isNumber(height) || height < 1) {
                throw 'invalid height'
            }

            this._width = fst
            this._height = height
        }
    }

    contains(position) {
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
