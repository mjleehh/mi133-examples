import {createAction} from 'redux-actions'

export const showAddModal = createAction('SHOW_ADD_DIALOGUE')
export const hideModal = createAction('HIDE_MODAL')

export const requestLogin = createAction('REQUEST_LOGIN')
export const resetLogin = createAction('RESET_LOGIN')
export const loginChanged = createAction('LOGIN_CHANGED')

export const requestAddNote = createAction('REQUEST_ADD_NOTE')
export const requestChangeNote = createAction('REQUEST_CHANGE_NOTE')
export const notesChanging = createAction('NOTES_CHANGING')
export const notesChanged = createAction('NOTES_CHANGED')
export const requestCompleted = createAction('REQUEST_COMPLETED')
