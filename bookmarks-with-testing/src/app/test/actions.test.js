import reducer from '../reducer'
import {
    setBookmarks,
    addBookmark,
    changeBookmarkName,
    changeBookmarkUrl,
    removeBookmark,
} from "../actions"

import {bookmarkGenerator, next} from './helpers'

describe('app actions', () => {
    it('has set bookmarks action', () => {
        const bookmarks = [...bookmarkGenerator()]

        const {type, payload} = setBookmarks(bookmarks)

        expect(type).toEqual('SET_BOOKMARKS')
        expect(payload).toEqual(bookmarks)
    })

    it('has add bookmark action', () => {
        const bookmark = next(bookmarkGenerator())

        const {type, payload} = addBookmark(bookmark)

        expect(type).toEqual('ADD_BOOKMARK')
        expect(payload).toEqual(bookmark)
    })

    it('has change bookmark name action', () => {
        const {type, payload} = changeBookmarkName('5ad49ee9773dfc6d96b637ad', 'some other name')

        expect(type).toEqual('CHANGE_BOOKMARK_NAME')
        expect(payload).toEqual({
            _id: '5ad49ee9773dfc6d96b637ad',
            name: 'some other name',
        })
    })

    it('has change bookmark url action', () => {
        const {type, payload} = changeBookmarkUrl('5ad49ee9773dfc6d96b637af', 'http://www.some-other-url.com')

        expect(type).toEqual('CHANGE_BOOKMARK_URL')
        expect(payload).toEqual({
            _id: '5ad49ee9773dfc6d96b637af',
            url: 'http://www.some-other-url.com',
        })
    })

    it('has remove bookmark url action', () => {
        const {type, payload} = removeBookmark('5ad49ee9773dfc6d96b637ag')

        expect(type).toEqual('REMOVE_BOOKMARK')
        expect(payload).toEqual('5ad49ee9773dfc6d96b637ag')
    })
})
