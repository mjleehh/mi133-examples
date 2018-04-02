import {
    MATRIX_FETCHED,
    PIXELS_FETCHED,

} from './actions'

import m from '../common/matrix'

const initialState = () => ({
    matrix: m.create(3, 3)
})

export default function reducer(state = initialState(), action) {
    const {type, payload} = action

    switch (type) {
        case MATRIX_FETCHED: {
            return {...state, matrix: payload}
        }
        case PIXELS_FETCHED: {
            const matrix = {...state.matrix, pixels: payload}
            return {...state, matrix}
        }
        default:
            return state
    }
}
