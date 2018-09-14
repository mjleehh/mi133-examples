import {setDirection} from "./actions";
import {
    EAST,
    NORTH,
    SOUTH,
    WEST
} from "./directions";

export default class MoveGestures {
    constructor(dispatch) {
        let touchStart = null
        let touchDelta = null

        this._startHandler = e => {
            const {clientX, clientY} = e.touches[0]
            touchStart = {clientX, clientY}
            e.preventDefault()
        }

        this._moveHandler = e => {
            const {clientX, clientY} = e.touches[0]
            if (touchStart) {
                touchDelta = {
                    x: clientX - touchStart.clientX,
                    y: clientY - touchStart.clientY,
                }
            }
            e.preventDefault()
        }

        this._endHandler = e => {
            if (!touchDelta) {
                return null
            }

            const {x, y} = touchDelta
            if (Math.abs(x) > Math.abs(y)) {
                if (x > 0) {
                    dispatch(setDirection(EAST))
                } else {
                    dispatch(setDirection(WEST))
                }
            } else {
                if (y > 0) {
                    dispatch(setDirection(SOUTH))
                } else {
                    dispatch(setDirection(NORTH))
                }
            }

            touchDelta = null
            touchStart = null
            e.preventDefault()
        }
    }

    start() {
        return this._startHandler
    }

    move() {
        return this._moveHandler
    }

    end() {
        return this._endHandler
    }
}