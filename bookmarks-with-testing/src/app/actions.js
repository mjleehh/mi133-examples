import axios from 'axios'

// plain actions

export const SET_BOOKMARKS = 'SET_BOOKMARKS'
export const setBookmarks = bookmarks => ({type: SET_BOOKMARKS, payload: bookmarks})

export const ADD_BOOKMARK = 'ADD_BOOKMARK'
export const addBookmark = bookmark => ({type: ADD_BOOKMARK, payload: bookmark})

export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK'
export const removeBookmark = (id) => ({type: REMOVE_BOOKMARK, payload: id})

// thunks

export const requestSetBookmarks = () => async dispatch => {
    try {
        const {data: {bookmarks}} = await axios.get('/api/bookmarks')
        dispatch(setBookmarks(bookmarks))
    } catch (e) {
        console.error(e)
    }
}

export const requestAddBookmark = (name, url) => async dispatch => {
    try {
        const {data: bookmark} = await axios.put('/api/bookmark', {name, url})
        dispatch(addBookmark(bookmark))
    } catch (e) {
        console.error(e)
    }
}


