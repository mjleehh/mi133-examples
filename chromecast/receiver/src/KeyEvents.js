import {update} from '../../common/actions'
import {keyCodeToEvent} from '../../common/keybindings'

export default class KeyEvents {
    constructor(store) {
        this._store = store

        window.onkeydown = e => {
            const {keyCode} = e
            const action = keyCodeToEvent(keyCode)
            if (action !== null) {
                this._store.dispatch(action)
            }
        }
    }
}
