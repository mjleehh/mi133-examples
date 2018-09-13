import SenderEvents from "./SenderEvents";
import KeyEvents from "./KeyEvents";
import {update} from "../../common/actions";

export default class Events {
    constructor(store) {
        this._store = store
        this._chromecast = new SenderEvents(store)
        this._keyboard = new KeyEvents(store)

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

}