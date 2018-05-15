import {SET_COUNT, INCREMENT_COUNT, RESET_COUNT} from 'app/actions'

function initialState() {
    return {count: 0}
}

export default function reducer(state = initialState(), {type, payload}) {
    switch (type) {
        case SET_COUNT: {
            return {...state, count: payload}
        }
        case INCREMENT_COUNT: {
            return {...state, count: state.count + 1}
        }
        case RESET_COUNT: {
            return {...state, count: 0}
        }
        default:
            return state
    }
}
