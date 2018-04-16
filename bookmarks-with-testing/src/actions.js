export const ADD_BOOKMARK = 'ADD_BOOKMARK'
export const addBookmark = (name, url) => ({type: ADD_BOOKMARK, payload: {name, url}})

export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK'
export const removeBookmark = (id) => ({type: REMOVE_BOOKMARK, payload: id})
