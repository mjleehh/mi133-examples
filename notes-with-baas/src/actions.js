import {createAction} from 'redux-actions'

export const addNote = createAction('ADD_NOTE')

export const requestLogin = createAction('REQUEST_LOGIN')
export const resetLogin = createAction('RESET_LOGIN')
export const loginChanged = createAction('LOGIN_CHANGED')