import axios from "axios/index"

export const SET_COUNT = 'SET_COUNT'
export const setCount = count => ({type: SET_COUNT, payload: count})

export const INCREMENT_COUNT = 'INCREMENT_COUNT'
export const incrementCount = () => ({type: INCREMENT_COUNT})

export const RESET_COUNT = 'RESET_COUNT'
export const resetCount = () => ({type: RESET_COUNT})

export const reqGetCount = () => async dispatch => {
    try {
        const {data: {currentCount}} = await axios.get('/api/count')
        dispatch(setCount(currentCount))
    } catch (e) {
        console.error(e)
    }
}

export const reqIncrementCount = () => async dispatch => {
    try {
        await axios.put('/api/count')
        dispatch(incrementCount())
    } catch (e) {
        console.error(e)
    }
}

export const reqResetCount = () => async dispatch => {
    try {
        await axios.delete('/api/count')
        dispatch(resetCount())
    } catch (e) {
        console.error(e)
    }
}
