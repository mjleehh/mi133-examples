import {
    TOGGLE_LED_STATE,
    SET_MATRIX_WIDTH,
    SET_MATRIX_HEIGHT,

} from './actions'

const initialState = () => ({
    leds: [],
    matrixWidth: 0,
    matrixHeight: 0,
})

export default function reducer(state = initialState(), action) {
    const {type, payload} = action

    switch (type) {
        case TOGGLE_LED_STATE: {
            return state
        }
        case SET_MATRIX_WIDTH: {
            return state
        }
        case SET_MATRIX_HEIGHT: {
            return state
        }
        default:
            return state
    }
}
