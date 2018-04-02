export const TOGGLE_LED_STATE = 'TOGGLE_LED_STATE'
export const toggleLedState = (x, y) => ({type: TOGGLE_LED_STATE, payload: {x, y}})

export const SET_MATRIX_WIDTH = 'SET_MATRIX_WIDTH'
export const setMatrixWidth = width => ({type: SET_MATRIX_WIDTH, payload: width})

export const SET_MATRIX_HEIGHT = 'SET_MATRIX_HEIGHT'
export const setMatrixHeight = height => ({type: SET_MATRIX_HEIGHT, payload: height})
