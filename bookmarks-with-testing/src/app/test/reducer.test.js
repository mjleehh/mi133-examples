import reducer from '../reducer'

test('has initial state', () => {
    const state = reducer(undefined, {type: '@@INIT'})

    expect(state.bookmarks).toEqual([])
})