import axios from 'axios'

// plain actions

export const SET_BOOKMARKS = 'SET_BOOKMARKS'
export const setBookmarks = bookmarks => ({type: SET_BOOKMARKS, payload: bookmarks})

export const ADD_BOOKMARK = 'ADD_BOOKMARK'
export const addBookmark = bookmark => ({type: ADD_BOOKMARK, payload: bookmark})

export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK'
export const removeBookmark = (_id) => ({type: REMOVE_BOOKMARK, payload: _id})

export const CHANGE_BOOKMARK_NAME = 'CHANGE_BOOKMARK_NAME'
export const changeBookmarkName = (_id, name) => ({type: CHANGE_BOOKMARK_NAME, payload: {_id, name}})

export const CHANGE_BOOKMARK_URL = 'CHANGE_BOOKMARK_URL'
export const changeBookmarkUrl = (_id, url) => ({type: CHANGE_BOOKMARK_URL, payload: {_id, url}})

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
        const {data: bookmark} = await axios.post('/api/bookmark', {name, url})
        dispatch(addBookmark(bookmark))
    } catch (e) {
        console.error(e)
    }
}

export const requestChangeBookmarkName = (_id, name) => async dispatch => {
    try {
        await axios.put(`/api/bookmark/${_id}/name`, {name})
        dispatch(changeBookmarkName(_id, name))
    } catch (e) {
        console.error(e)
    }
}

export const requestChangeBookmarkUrl = (_id, url) => async dispatch => {
    try {
        await axios.put(`/api/bookmark/${_id}/url`, {url})
        dispatch(changeBookmarkUrl(_id, url))
    } catch (e) {
        console.error(e)
    }
}

export const requestRemoveBookmark = _id => async dispatch => {
    try {
        await axios.delete(`/api/bookmark/${_id}`)
        dispatch(removeBookmark(_id))
    } catch (e) {
        console.error(e)
    }
}

