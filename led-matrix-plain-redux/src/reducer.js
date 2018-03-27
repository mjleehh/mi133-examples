import {
    TOGGLE_LED_STATE,
    SET_MATRIX_WIDTH,
    SET_MATRIX_HEIGHT,

} from './actions'

import m from './matrix'

const initialState = () => ({
    matrix: m.create(5, 5)
})

export default function reducer(state = initialState(), action) {
    const {type, payload} = action

    switch (type) {
        case TOGGLE_LED_STATE: {
            const {matrix} = state
            const {x, y} = payload
            return {
                ...state,
                matrix: m.setValue(matrix, x, y, !m.getValue(matrix, x, y))
            }
        }
        case SET_MATRIX_WIDTH: {
            const {height} = state.matrix
            return {...state, matrix: m.create(payload, height)}
        }
        case SET_MATRIX_HEIGHT: {
            const {width} = state.matrix
            return {...state, matrix: m.create(width, payload)}
        }
        default:
            return state
    }
}
