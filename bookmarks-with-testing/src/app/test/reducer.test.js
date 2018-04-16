import reducer from '../reducer'
import {
    addBookmark, removeBookmark,
    setBookmarks
} from "../actions"

test('has initial state', () => {
    const state = reducer(undefined, {type: '@@INIT'})

    expect(state.bookmarks).toEqual([])
})

test('bookmarks can be set', () => {
    const bookmarks = [
        {
            _id: '5ad49ee9773dfc6d96b637ad',
            name: 'google',
            url: 'https://www.google.com'
        },
        {
            _id: '5ad4a1c27288f070d99020c7',
            name: 'yahoo',
            url: 'http://yahoo.com'
        },
    ]
    const action = setBookmarks(bookmarks)
    const state = reducer(undefined, action)

    expect(state.bookmarks).toEqual(expect.arrayContaining(bookmarks))
})

test('bookmarks can be added', () => {
    const bookmark = {
        _id: '5ad49ee9773dfc6d96b637ad',
        name: 'google',
        url: 'https://www.google.com'
    }
    const action = addBookmark(bookmark)
    const state = reducer(undefined, action)

    expect(state.bookmarks).toContainEqual(bookmark)
})

test('bookmarks can be added', () => {
    const bookmark1 = {
        _id: '5ad49ee9773dfc6d96b637ad',
        name: 'google',
        url: 'https://www.google.com'
    }
    const bookmark2 = {
        _id: '5ad4a1c27288f070d99020c7',
        name: 'yahoo',
        url: 'http://yahoo.com'
    }
    const initialState = {bookmarks: [bookmark1, bookmark2]}

    const action = removeBookmark('5ad49ee9773dfc6d96b637ad')
    const state = reducer(initialState, action)

    expect(state.bookmarks).not.toContainEqual(bookmark1)
})