export const SET_DIRECTION = 'SET_DIRECTION'
export const setDirection = direction => ({type: SET_DIRECTION, payload: direction})

export const START_GAME = 'START_GAME'
export const startGame = () => ({type: START_GAME})

export const PAUSE_GAME = 'PAUSE_GAME'
export const pauseGame = ({type: PAUSE_GAME})

export const END_GAME = 'END_GAME'
export const endGame = ({type: END_GAME})

export const UPDATE = 'UPDATE'
export const update = () => ({type: UPDATE})
