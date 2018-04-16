import {
    SET_BOOKMARKS,
    ADD_BOOKMARK,
    REMOVE_BOOKMARK,
    CHANGE_BOOKMARK_NAME,
    CHANGE_BOOKMARK_URL
} from './actions'

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
        case CHANGE_BOOKMARK_NAME: {
            const {_id, name} = payload
            const bookmarks = state.bookmarks.map(bookmark => {
                if (bookmark._id === _id) {
                    return {...bookmark, name}
                }
                return bookmark
            })
            return {...state, bookmarks}
        }
        case CHANGE_BOOKMARK_URL: {
            const {_id, url} = payload
            const bookmarks = state.bookmarks.map(bookmark => {
                if (bookmark._id === _id) {
                    return {...bookmark, url}
                }
                return bookmark
            })
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
