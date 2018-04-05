import {ADD_DIGIT} from './actions'

const initialState = () => ({
    currentValue: "0",
    acc: null,
    pendingOperation: null,
})

export default function reducer(state = initialState(), {type, payload}) {
    switch (type) {
        case ADD_DIGIT: {
            const currentValue = state.currentValue + payload
            return {...state, currentValue}
        }
        default:
            return state
    }
}
