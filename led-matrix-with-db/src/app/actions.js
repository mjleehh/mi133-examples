import axios from 'axios'

export const PIXELS_FETCHED = 'PIXELS_FETCHED'
export const pixelsFetched = pixels => ({type: PIXELS_FETCHED, payload: pixels})

export const MATRIX_FETCHED = 'MATRIX_FETCHED'
export const matrixFetched = matrix => ({type: MATRIX_FETCHED, payload: matrix})

export const setPixel = (x, y, pixelValue) => async dispatch => {
    const {data: {pixels}} = await axios.put(`/api/led-matrix/pixel/${x}/${y}`, {pixelValue})
    dispatch(pixelsFetched(pixels))
}

export const setMatrixHeight = height => async dispatch => {
    const {data} = await axios.put('/api/led-matrix/height', {height})
    dispatch(matrixFetched(data))
}

export const setMatrixWidth = width => async dispatch => {
    const {data} = await axios.put('/api/led-matrix/width', {width})
    dispatch(matrixFetched(data))
}

export const fetchMatrix = () => async dispatch => {
    const {data} = await axios.get('/api/led-matrix')
    dispatch(matrixFetched(data))
}