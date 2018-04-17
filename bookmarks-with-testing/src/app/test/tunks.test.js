import axios from 'axios'

import {
    requestSetBookmarks,
    requestAddBookmark,
    requestChangeBookmarkName,
    requestChangeBookmarkUrl,
    requestRemoveBookmark,
} from "../actions"

import {bookmarkGenerator, next} from './helpers'

jest.mock('axios')

describe('thunks', async () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('set bookmarks thunk', () => {
        it('gets bookmarks from backend', () => {
            const bookmarks = [...bookmarkGenerator()]

            axios.get.mockResolvedValue({data: {bookmarks}})
            const dispatch = jest.fn()

            return requestSetBookmarks()(dispatch).then(() => {
                const getCalls = axios.get.mock.calls
                expect(getCalls.length).toBe(1)
                expect(getCalls[0][0]).toBe('/api/bookmarks')

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(1)
                expect(dispatchCalls[0][0]).toEqual({
                    type: 'SET_BOOKMARKS',
                    payload: bookmarks
                })
            })
        })

        it('leaves the state unaltered on backend failure', () => {
            const bookmarks = [...bookmarkGenerator()]

            axios.get.mockRejectedValue()
            const dispatch = jest.fn()

            return requestSetBookmarks()(dispatch).then(() => {
                const getCalls = axios.get.mock.calls
                expect(getCalls.length).toBe(1)
                expect(getCalls[0][0]).toBe('/api/bookmarks')

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(0)
            })
        })
    })

    describe('add bookmarks thunk', () => {
        it('adds bookmark to backend and updates the state', () => {
            const res = next(bookmarkGenerator())
            const {name, url} = res
            const bookmark = {name, url}

            axios.post.mockResolvedValue({data: res})
            const dispatch = jest.fn()

            return requestAddBookmark(name, url)(dispatch).then(() => {
                const postCalls = axios.post.mock.calls
                expect(postCalls.length).toBe(1)
                expect(postCalls[0][0]).toBe('/api/bookmark')
                expect(postCalls[0][1]).toEqual(bookmark)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(1)
                expect(dispatchCalls[0][0]).toEqual({
                    type: 'ADD_BOOKMARK',
                    payload: res
                })
            })
        })

        it('leaves the state unaltered on backend failure', () => {
            const res = next(bookmarkGenerator())
            const {name, url} = res
            const bookmark = {name, url}

            axios.post.mockRejectedValue()
            const dispatch = jest.fn()

            return requestAddBookmark(name, url)(dispatch).then(() => {
                const postCalls = axios.post.mock.calls
                expect(postCalls.length).toBe(1)
                expect(postCalls[0][0]).toBe('/api/bookmark')
                expect(postCalls[0][1]).toEqual(bookmark)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(0)
            })
        })
    })

    describe('change bookmark name thunk', () => {
        it('changes bookmark name on server and updates the state', () => {
            const res = next(bookmarkGenerator())
            const {_id} = res

            axios.put.mockResolvedValue({data: res})
            const dispatch = jest.fn()

            return requestChangeBookmarkName(_id, 'a new name')(dispatch).then(() => {
                const putCalls = axios.put.mock.calls
                expect(putCalls.length).toBe(1)
                expect(putCalls[0][0]).toBe(`/api/bookmark/${_id}/name`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(1)
                expect(dispatchCalls[0][0]).toEqual({
                    type: 'CHANGE_BOOKMARK_NAME',
                    payload: {_id, name: 'a new name'}
                })
            })
        })

        it('leaves the state unalterd on backend failure', () => {
            const res = next(bookmarkGenerator())
            const {_id} = res

            axios.put.mockRejectedValue()
            const dispatch = jest.fn()

            return requestChangeBookmarkName(_id, 'a new name')(dispatch).then(() => {
                const putCalls = axios.put.mock.calls
                expect(putCalls.length).toBe(1)
                expect(putCalls[0][0]).toBe(`/api/bookmark/${_id}/name`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(0)
            })
        })
    })

    describe('change bookmark url thunk', () => {
        it('changes bookmark url in backend and updates the state', () => {
            const res = next(bookmarkGenerator())
            const {_id} = res

            axios.put.mockResolvedValue({data: res})
            const dispatch = jest.fn()

            return requestChangeBookmarkUrl(_id, 'http://www.new-url.com')(dispatch).then(() => {
                const putCalls = axios.put.mock.calls
                expect(putCalls.length).toBe(1)
                expect(putCalls[0][0]).toBe(`/api/bookmark/${_id}/url`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(1)
                expect(dispatchCalls[0][0]).toEqual({
                    type: 'CHANGE_BOOKMARK_URL',
                    payload: {_id, url: 'http://www.new-url.com'}
                })
            })
        })

        it('leaves state unaltered on backend failure', () => {
            const res = next(bookmarkGenerator())
            const {_id} = res

            axios.put.mockRejectedValue()
            const dispatch = jest.fn()

            return requestChangeBookmarkUrl(_id, 'http://www.new-url.com')(dispatch).then(() => {
                const putCalls = axios.put.mock.calls
                expect(putCalls.length).toBe(1)
                expect(putCalls[0][0]).toBe(`/api/bookmark/${_id}/url`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(0)
            })
        })
    })

    describe('remove bookmark thunk', () => {
        it('removes bookmark from the backend and updates the state', () => {
            const res = next(bookmarkGenerator())
            const {_id} = res

            axios.delete.mockResolvedValue({data: res})
            const dispatch = jest.fn()

            return requestRemoveBookmark(_id)(dispatch).then(() => {
                const postCalls = axios.delete.mock.calls
                expect(postCalls.length).toBe(1)
                expect(postCalls[0][0]).toBe(`/api/bookmark/${_id}`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(1)
                expect(dispatchCalls[0][0]).toEqual({
                    type: 'REMOVE_BOOKMARK',
                    payload: _id
                })
            })
        })

        it('leaves the state unaltered on backend failure', () => {
            const res = next(bookmarkGenerator())
            const {_id} = res

            axios.delete.mockRejectedValue()
            const dispatch = jest.fn()

            return requestRemoveBookmark(_id)(dispatch).then(() => {
                const postCalls = axios.delete.mock.calls
                expect(postCalls.length).toBe(1)
                expect(postCalls[0][0]).toBe(`/api/bookmark/${_id}`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(0)
            })
        })
    })
})