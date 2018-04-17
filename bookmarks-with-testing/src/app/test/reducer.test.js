import reducer from '../reducer'
import {
    addBookmark, changeBookmarkName, changeBookmarkUrl, removeBookmark,
    setBookmarks
} from "../actions"

import {bookmarkGenerator, next} from './helpers'

describe('the main reducer', () => {
    it('has initial state', () => {
        const state = reducer(undefined, {type: '@@INIT'})

        expect(state.bookmarks).toEqual([])
    })

    it('can set bookmarks', () => {
        const bookmarks = [...bookmarkGenerator()]
        const action = setBookmarks(bookmarks)
        const state = reducer(undefined, action)

        expect(state.bookmarks).toEqual(expect.arrayContaining(bookmarks))
    })

    it('can add a bookmark', () => {
        const bookmark = next(bookmarkGenerator())
        const action = addBookmark(bookmark)
        const state = reducer(undefined, action)

        expect(state.bookmarks).toContainEqual(bookmark)
    })

    it('can change a bookmark name', () => {
        const gen = bookmarkGenerator()
        const bookmark1 = next(gen)
        const bookmark2 = next(gen)
        const initialState = {bookmarks: [bookmark1, bookmark2]}

        const bookmark2Id = bookmark2._id
        const action = changeBookmarkName(bookmark2Id, 'yahoo')
        const state = reducer(initialState, action)

        const alterdBookmark2 = {...bookmark2, name: 'yahoo'}

        expect(state.bookmarks).toContainEqual(alterdBookmark2)
    })

    it('can change a bookmark url', () => {
        const gen = bookmarkGenerator()
        const bookmark1 = next(gen)
        const bookmark2 = next(gen)
        const initialState = {bookmarks: [bookmark1, bookmark2]}

        const bookmark1Id = bookmark1._id
        const action = changeBookmarkUrl(bookmark1Id, 'https://www.google.com')
        const state = reducer(initialState, action)

        const alteredBookmark1 = {...bookmark1, url: 'https://www.google.com'}

        expect(state.bookmarks).toContainEqual(alteredBookmark1)
    })

    it('can remove a bookmark', () => {
        const gen = bookmarkGenerator()
        const bookmark1 = next(gen)
        const bookmark2 = next(gen)
        const bookmark3 = next(gen)
        const initialState = {bookmarks: [bookmark1, bookmark2, bookmark3]}

        const bookmark3Id = bookmark3._id
        const action = removeBookmark(bookmark3Id)
        const state = reducer(initialState, action)

        expect(state.bookmarks).not.toContainEqual(bookmark3)
    })
})
