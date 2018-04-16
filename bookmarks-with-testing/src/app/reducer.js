import {ADD_BOOKMARK, SET_BOOKMARKS, REMOVE_BOOKMARK} from './actions'

const initialState = () => ({
    bookmarks: []
})

export default function reducer(state = initialState(), {type, payload}) {
    switch (type) {
        case SET_BOOKMARKS: {
            return {...state, bookmarks: payload}
        }
        case ADD_BOOKMARK: {
            const bookmarks = state.bookmarks.slice()
            bookmarks.push(payload)
            return {...state, bookmarks}
        }
        case REMOVE_BOOKMARK: {
            const bookmarks = state.bookmarks.filter(bookmark => bookmark._id !== payload)
            return {...state, bookmarks}
        }
        default:
            return state
    }
}
