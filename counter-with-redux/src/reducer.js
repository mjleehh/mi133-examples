import {
    INCREMENT_COUNT,
    DECREMENT_COUNT,
    RESET_COUNT,
    SET_COUNT,

} from './actions'

function initialState() {
    return {
        count: 0,
        min: -10,
        max: 10,
    }
}

export default function reducer(state = initialState(), {type, payload}) {
    const {count, min, max} = state
    switch (type) {
        case INCREMENT_COUNT: {
            if (count >= max) {
                return state
            }
            return {...state, count: count + 1}
        }
        case DECREMENT_COUNT: {
            if (count <= min) {
                return state
            }
            return {...state, count: count - 1}
        }
        case RESET_COUNT: {
            return {...state, count: 0}
        }
        case SET_COUNT: {
            if (count >= min && count <= max) {
                return {...state, count: payload}
            }
        }
        default:
            return state
    }
}