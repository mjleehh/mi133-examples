import {ADD_BOOKMARK} from './actions'

const initialState = () => ({
    bookmarks: []
})

export default function reducer(state = initialState(), {type, payload}) {
    switch (type) {
        case ADD_BOOKMARK: {
            const bookmarks = state.bookmarks.slice()
            bookmarks.push(payload)
            return {...state, bookmarks}
        }
        default:
            return state
    }
}
