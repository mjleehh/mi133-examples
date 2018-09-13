import {setDirection} from "./logic/actions";
import {
    WEST,
    NORTH,
    EAST,
    SOUTH,
} from "./logic/constants";
import {update} from './logic/actions'

function keyCodeToDirection(keyCode) {
    switch (keyCode) {
        case 37: {
            return WEST
        }
        case 38: {
            return NORTH
        }
        case 39: {
            return EAST
        }
        case 40: {
            return SOUTH
        }
        default:
            return null
    }
}

export default class GameEvents {
    constructor(store) {
        this._store = store
        this._moveEventHandler = null
        this._pauseEventHandler = null
        this._chromecastMessageHandler = ({type, payload}) => {
            switch (type) {
                case 'MOVE': {
                    const {_moveEventHandler} = this
                    if (_moveEventHandler) {
                        _moveEventHandler(payload)
                    }
                    break
                }
                case 'PAUSE': {
                    const {_pauseEventHandler} = this
                    if (_pauseEventHandler) {
                        _pauseEventHandler()
                    }
                    break
                }
                default: {
                    console.warn(`unhandled chromecast event ${type}`)
                }
            }

        }

        window.onkeydown = e => {
            const {keyCode} = e
            const direction = keyCodeToDirection(keyCode)
            if (direction !== null) {
                this._store.dispatch(setDirection(direction))
            }
        }

        this._loopAcive = false
    }

    start() {
        console.log('starting')
        if (this._loopAcive) {
            console.error('game loop already running')
            return
        }
        this._loopAcive = true

        let prevTime = null
        const gameLoop = (time) => {
            if (prevTime === null) {
                prevTime = time
            } else if (time - prevTime > 350) {
                prevTime = time
                this._store.dispatch(update())
            }
            requestAnimationFrame(gameLoop)
        }
        requestAnimationFrame(gameLoop)
    }

    setMoveEventHandler(handler) {
        this._moveEventHandler = handler
    }

    setPauseEventHandler(handler) {
        this._pauseEventHandler = handler
    }

    connectTouch() {

    }

    connectChromecast(chromecast) {
        chromecast.setMessageHandler(this._chromecastMessageHandler)
    }
}
